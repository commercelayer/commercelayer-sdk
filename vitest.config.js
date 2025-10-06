import { defineConfig } from 'vitest/config'
import { GLOBAL_TIMEOUT } from './test/common'


export default defineConfig({
  test: {
    testTimeout: GLOBAL_TIMEOUT,
    include: ['specs/**/*.spec.ts'],
    globals: true,
    coverage: {
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.ts']
    },
    // fileParallelism: false,
    // testTimeout: 15_000,
    // maxConcurrency: 1
    watch: false
  }
})
