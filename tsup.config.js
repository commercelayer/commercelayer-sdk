import { defineConfig } from 'tsup'

const env = process.env.NODE_ENV


export default defineConfig(() => ({
  sourcemap: env === 'development',
  clean: true,
  dts: true,
  format: ['cjs', 'esm'],
  minify: true,
  bundle: true,
  // treeshake: true,
  // watch: env === 'development',
  target: 'es2020',
  entry: ['src/index.ts'],
  outDir: 'lib',
  splitting: false,
  shims: true,
  cjsInterop: true
}))