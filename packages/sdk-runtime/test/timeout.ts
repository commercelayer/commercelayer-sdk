/**
 * Default timeout for the SDK test suites, in milliseconds. Shared by both
 * targets so the two suites cannot drift apart.
 *
 * Imported by relative path rather than through the `@runtime/*` alias, and
 * kept in a module that imports nothing. Vite loads a config by bundling it,
 * and since Vite 8 that bundle externalises bare specifiers: a config reaching
 * this value through the alias, or through a module that itself imports
 * `@runtime/*`, fails to resolve and no tests run at all. The alias is a
 * tsconfig path, not a package, so nothing on disk answers for it.
 */
export const GLOBAL_TIMEOUT = 15000
