import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['specs/**/*.spec.ts'],
    exclude: ['**/node_modules/**'],
    watch: false,
  },
})
