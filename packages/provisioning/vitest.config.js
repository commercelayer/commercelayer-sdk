import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'
import { GLOBAL_TIMEOUT } from './test/common'

export default defineConfig({
  resolve: {
    alias: {
      // The shared runtime imports its target-specific catalogue from
      // `#registry`. Vite does not read tsconfig `paths`, so the binding has to
      // be repeated here — see tsconfig.json and tsup.config.js.
      '#registry': fileURLToPath(new URL('./src/registry.ts', import.meta.url)),
      // The shared runtime is consumed as source via a path alias rather than
      // as a package: tsup's dts build cannot cross a package boundary whose
      // exports map points at raw .ts files.
      '@runtime': fileURLToPath(new URL('../runtime/src', import.meta.url)),
    },
  },
  test: {
    testTimeout: GLOBAL_TIMEOUT,
    include: ['specs/**/*.spec.ts', 'gen/specs/**/*.spec.ts'],
    exclude: ['**/node_modules/**'],
    globals: true,
    coverage: {
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.ts', 'gen/**/*.ts'],
    },
    watch: false,
  },
})
