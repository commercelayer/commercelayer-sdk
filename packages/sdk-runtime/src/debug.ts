/**
 * Minimal namespaced debug logging, gated on the `DEBUG` environment variable.
 *
 * This replaces an opportunistic `require('debug')` wrapped in an empty catch.
 * `debug` was declared by no package in the workspace, so under pnpm's strict
 * isolation it was unresolvable, the require threw, the catch swallowed it, and
 * every one of the call sites across the Runtime was a permanent no-op — with
 * no way to discover that by using it.
 *
 * Reimplemented rather than declared as a dependency: both published packages
 * have zero runtime dependencies, and that is worth more than format-specifier
 * fidelity. The interface is unchanged, so call sites did not move.
 *
 * Usage: `DEBUG=clsdk:*` or `DEBUG=clsdk:client,clsdk:resource`.
 */

type Debugger = (pattern: string, ...args: any[]) => void

const PREFIX = 'clsdk'
const NOOP: Debugger = () => {}

/** `process` is absent in browsers, so this must never assume it exists. */
const debugEnv = (): string => {
  try {
    return typeof process !== 'undefined' ? (process.env?.DEBUG ?? '') : ''
  } catch {
    return ''
  }
}

/** Turns one `DEBUG` entry into a matcher. `*` matches any run of characters. */
const toMatcher = (pattern: string): RegExp =>
  new RegExp(`^${pattern.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*')}$`)

const isEnabled = (namespace: string): boolean => {
  const env = debugEnv()
  if (!env) return false
  return env
    .split(',')
    .map((p) => p.trim())
    .filter(Boolean)
    .some((p) => toMatcher(p).test(namespace))
}

/**
 * Substitutes the format specifiers the call sites actually use. Deliberately
 * not `node:util`'s `format`: importing a Node builtin here would break the
 * browser builds this SDK also ships.
 */
const interpolate = (pattern: string, args: any[]): string => {
  let i = 0
  const out = pattern.replace(/%[oOjsdi%]/g, (token) => {
    if (token === '%%') return '%'
    if (i >= args.length) return token
    const arg = args[i++]
    switch (token) {
      case '%s':
        return String(arg)
      case '%d':
      case '%i':
        return String(Number(arg))
      default:
        try {
          return JSON.stringify(arg)
        } catch {
          return String(arg)
        }
    }
  })
  // Anything not consumed by a specifier still gets shown.
  const rest = args.slice(i)
  return rest.length > 0 ? `${out} ${rest.map((a) => safeStringify(a)).join(' ')}` : out
}

const safeStringify = (value: unknown): string => {
  if (typeof value === 'string') return value
  try {
    return JSON.stringify(value) ?? String(value)
  } catch {
    return String(value)
  }
}

/**
 * Returns a debugger for the given namespace. Enablement is read per call, not
 * cached at module load, so setting `DEBUG` after import still works.
 */
const debug = (namespace: string): Debugger => {
  const full = `${PREFIX}:${namespace}`
  return (pattern: string, ...args: any[]): void => {
    if (!isEnabled(full)) return
    // stderr, as the `debug` package does, so stdout stays clean for callers.
    console.error(`${full} ${interpolate(pattern, args)}`)
  }
}

export default debug
export type { Debugger }
export { NOOP as noopDebugger }
