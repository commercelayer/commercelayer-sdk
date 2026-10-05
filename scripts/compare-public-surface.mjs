#!/usr/bin/env node
/**
 * Compares a locally built package's public surface against what is published
 * on npm, so a restructuring can be shown not to have changed the contract.
 *
 * Checks, per entry point in the package's `exports` map:
 *   - runtime export names, by importing both builds
 *   - declared type names in the emitted .d.ts
 *
 * Only the `exports` map is inspected. Files that merely happen to exist under
 * lib/ are not part of the contract and differ legitimately — e.g. the eleven
 * runtime modules stopped being emitted as separate chunks once they moved to
 * packages/sdk-runtime, which is invisible to consumers.
 *
 * Usage:
 *   node scripts/compare-public-surface.mjs packages/core-sdk [<npm-spec>]
 *
 * <npm-spec> defaults to <name>@<version> from the package's own package.json.
 */

import { execFileSync } from 'node:child_process'
import { existsSync, mkdtempSync, readdirSync, readFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'

const pkgDir = resolve(process.argv[2] ?? 'packages/core-sdk')
const pkg = JSON.parse(readFileSync(join(pkgDir, 'package.json'), 'utf8'))
const spec = process.argv[3] ?? `${pkg.name}@${pkg.version}`

/** Entry points from the exports map, as { name, importPath, typesPath }. */
const entries = Object.entries(pkg.exports ?? { '.': null }).map(([key, val]) => {
  const imp = val?.import?.default ?? val?.import ?? val
  const types = val?.import?.types ?? val?.types
  return { key, js: imp, dts: types }
})

const declaredNames = (file) => {
  if (!file || !existsSync(file)) return null
  const s = readFileSync(file, 'utf8')
  const out = new Set()
  for (const blk of s.matchAll(/export\s*(?:type\s*)?\{([^}]*)\}/gs)) {
    for (let part of blk[1].split(',')) {
      part = part.trim()
      if (!part) continue
      part = part.replace(/^type\s+/, '')
      const as = part.match(/\bas\s+([A-Za-z_$][\w$]*)$/)
      out.add(as ? as[1] : part.split(/\s+/)[0])
    }
  }
  for (const m of s.matchAll(/export\s+(?:declare\s+)?(?:type|interface|class|const|function)\s+([A-Za-z_$][\w$]*)/g)) {
    out.add(m[1])
  }
  out.delete('default')
  return out
}

const diff = (label, a, b) => {
  if (a === null || b === null) {
    console.log(`     ${label}: not comparable (missing file)`)
    return false
  }
  const missing = [...a].filter((k) => !b.has(k)).sort()
  const added = [...b].filter((k) => !a.has(k)).sort()
  if (!missing.length && !added.length) {
    console.log(`     ${label}: identical (${a.size})`)
    return true
  }
  if (missing.length) console.log(`     ${label}: MISSING in local: ${missing.join(', ')}`)
  if (added.length) console.log(`     ${label}: added in local:   ${added.join(', ')}`)
  return false
}

const work = mkdtempSync(join(tmpdir(), 'cl-surface-'))
console.log(`Fetching ${spec} ...`)
execFileSync('npm', ['pack', spec, '--silent'], { cwd: work, stdio: ['ignore', 'ignore', 'inherit'] })
const tgz = readdirSync(work).find((f) => f.endsWith('.tgz'))
execFileSync('tar', ['xzf', tgz], { cwd: work })
const pubDir = join(work, 'package')

let ok = true
for (const e of entries) {
  console.log(`\n  ${e.key}`)
  // Older packages have no exports map: `main` is CJS and `module` is ESM.
  // Importing the CJS build yields interop noise (`module.exports`), so prefer
  // the published package's own ESM entry when comparing the root entry point.
  const pubPkg = JSON.parse(readFileSync(join(pubDir, 'package.json'), 'utf8'))
  const pubRootEsm = pubPkg.exports?.['.']?.import?.default ?? pubPkg.module ?? pubPkg.main
  const pubJs = e.key === '.' && pubRootEsm ? join(pubDir, pubRootEsm) : e.js && join(pubDir, e.js)
  const locJs = e.js && join(pkgDir, e.js)
  if (pubJs && existsSync(pubJs) && existsSync(locJs)) {
    const [a, b] = await Promise.all([import(pubJs), import(locJs)])
    ok = diff('runtime exports', new Set(Object.keys(a)), new Set(Object.keys(b))) && ok
  } else {
    console.log('     runtime exports: not comparable (missing build)')
    ok = false
  }
  const pubDts = e.key === '.' && !pubPkg.exports ? join(pubDir, pubPkg.types ?? e.dts) : e.dts && join(pubDir, e.dts)
  ok = diff('type surface', declaredNames(pubDts), declaredNames(e.dts && join(pkgDir, e.dts))) && ok
}

console.log(ok ? '\nPublic surface unchanged.' : '\nPublic surface DIFFERS — review above.')
process.exit(ok ? 0 : 1)
