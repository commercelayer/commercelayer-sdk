import { defineConfig } from 'vitest/config'
import { GLOBAL_TIMEOUT } from './test/common'


export default defineConfig({
  test: {
    testTimeout: GLOBAL_TIMEOUT,
    include: ['specs/**/fake.spec.ts'],
    globals: true,
    coverage: {
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.ts']
    }
  }
})
