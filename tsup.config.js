import { defineConfig } from 'tsup'

const env = process.env.NODE_ENV


export default defineConfig(() => ({
  sourcemap: env === 'development',
  clean: true,
  dts: true,
  format: ['cjs', 'esm'],
  minify: (env === 'production'),
  bundle: false,
  treeshake: true,
  watch: false, //(env === 'development'),
  target: 'es2024',
  entry: ['src/**/*.ts'],
  outDir: 'lib',
  splitting: false,
  shims: true,
  cjsInterop: true,
  skipNodeModulesBundle: true,
  silent: false
}))
