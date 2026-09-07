import { readdirSync } from 'node:fs'
import { defineConfig } from 'tsup'

/**
 * Maps output name -> source file. `src/registry.ts` is excluded: it is the
 * `#registry` alias target, and processing it as an entry breaks the dts build.
 * `gen/specs` is test code and must not ship.
 */
const buildEntry = () => {
  const entry = {}
  for (const f of readdirSync('src')) {
    if (!f.endsWith('.ts') || f === 'registry.ts') continue
    entry[f.replace(/\.ts$/, '')] = `src/${f}`
  }
  for (const f of readdirSync('gen')) {
    if (f.endsWith('.ts')) entry[f.replace(/\.ts$/, '')] = `gen/${f}`
  }
  for (const f of readdirSync('gen/resources')) {
    if (f.endsWith('.ts')) entry[`resources/${f.replace(/\.ts$/, '')}`] = `gen/resources/${f}`
  }
  return entry
}

const env = process.env.NODE_ENV || 'development'

const isDev = env === 'development'
const isProd = env === 'production'

const watch = isDev && process.argv.filter((arg) => arg === '--watch' || arg === '-w').length > 0

export default defineConfig(() => ({
  sourcemap: isDev,
  clean: true,
  dts: true,
  format: ['cjs', 'esm'],
  minify: isProd,
  bundle: true,
  treeshake: true,
  watch,
  target: 'es2024',
  // registry.ts is internal plumbing: it is the `#registry` alias target, not a
  // published entry point. Leaving it in `entry` makes the dts worker process
  // the same file as both an entry and an alias target, which fails.
  // Explicit entry map, not globs. Entries now span two directories (src/ and
  // gen/), and tsup derives outDir structure from their common base — with
  // globs that base becomes the package root, so output lands in lib/src/ and
  // lib/gen/ and every path in the exports map breaks. Naming each entry keeps
  // the published layout identical to when everything lived under src/.
  entry: buildEntry(),
  outDir: 'lib',
  splitting: true,
  shims: true,
  cjsInterop: true,
  skipNodeModulesBundle: true,
  silent: false,
}))
