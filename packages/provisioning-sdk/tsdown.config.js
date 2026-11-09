import { readdirSync } from 'node:fs'
import { defineConfig } from 'tsdown'

/**
 * Maps output name -> source file. `src/registry.ts` is excluded: it is the
 * `#registry` alias target, internal plumbing rather than a published entry.
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

export default defineConfig({
  // Published output is readable and self-explanatory: consumers' bundlers
  // minify, and maps would roughly double the unpacked size for little gain.
  sourcemap: false,
  minify: false,
  clean: true,
  dts: true,
  format: ['cjs', 'esm'],
  target: 'es2024',
  // Explicit entry map, not globs. Entries span two directories (src/ and
  // gen/); naming each one keeps the published layout flat under lib/, which
  // is what the exports map points at.
  entry: buildEntry(),
  outDir: 'lib',
  // tsdown defaults to .mjs/.d.mts on the node platform. The exports map and
  // typesVersions expect the package-type extensions: .js/.d.ts for ESM,
  // .cjs/.d.cts for CJS.
  fixedExtension: false,
  // Entries export both named bindings and a default. In CJS that already
  // means `require(...).default`; this only silences Rolldown's MIXED_EXPORTS
  // warning about it.
  outputOptions: { exports: 'named' },
  // publint + arethetypeswrong over the packed tarball on every build: the
  // last chance to catch a broken exports map before it is immutable on npm.
  // attw defaults to the `esm-only` profile and to warnings; require every
  // resolution mode (CJS included) and fail the build instead.
  publint: true,
  attw: { profile: 'strict', level: 'error' },
})
