import { defineConfig } from 'tsup'

const env = 'production' // process.env.NODE_ENV


export default defineConfig(() => ({
  sourcemap: env === 'development',
  clean: true,
  dts: true,
  format: ['cjs', 'esm'],
  minify: (env === 'production'),
  bundle: true,
  treeshake: true,
  watch: (env === 'development'),
  target: 'es2020',
  entry: ['src/index.ts'],
  outDir: 'lib',
  splitting: true,
  shims: true,
  cjsInterop: true,
  skipNodeModulesBundle: true,
  footer: {
    js: 'module.exports = module.exports.default;'
  }
}))