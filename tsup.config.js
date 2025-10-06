import { defineConfig } from 'tsup'


const env = process.env.NODE_ENV || 'development'

const isDev = env === 'development'
const isProd = env === 'production'

const watch = isDev && (process.argv.filter(arg => (arg === '--watch') || (arg === '-w')).length > 0)


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
  entry: ['src/**/*.ts'],
  outDir: 'lib',
  splitting: true,
  shims: true,
  cjsInterop: true,
  skipNodeModulesBundle: true,
  silent: false
}))
