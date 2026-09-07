/**
 * Target configuration — everything about an API surface that the public
 * resources schema cannot express, declared by hand in each SDK package's
 * `sdk.config.ts`. See docs/adr/0005.
 *
 * The generator runs with the package directory as its working directory, so
 * the config is loaded from `./sdk.config.ts` and all output paths stay
 * relative to the package.
 */

/** A non-CRUD endpoint hosted at a sub-path of a resource. */
export type CustomAction = {
  /** Method name on the generated resource class, e.g. `resend`. */
  name: string
  /** HTTP verb. Only POST and PATCH are supported by the runtime adapter. */
  method: 'POST' | 'PATCH'
  /** Sub-path appended after the resource id, e.g. `resend`. */
  path: string
  /**
   * Name of a hand-written payload type the action accepts. Omit for actions
   * that take no body. The type must be exported by the package so the
   * generated import resolves.
   */
  payload?: string
}

export type TargetConfig = {
  /**
   * Hosts serving `/api/public/resources`, keyed by environment name. Must
   * include `production`, which is the default when no `--env` is passed.
   * Each target declares its own map so CI does not hardcode one API's hosts.
   */
  environments: Readonly<Record<string, string>>
  /**
   * Path segment under docs.commercelayer.io used for `@link` JSDoc, e.g.
   * `core-api-reference`.
   */
  docsPath: string
  /** Client factory and class name, e.g. `CommerceLayer`. */
  clientName: string
  /** Static helper object name, e.g. `CommerceLayerStatic`. */
  staticName: string
  /**
   * Whether this SDK publishes the tree-shakeable single-client entry point in
   * addition to the bundle client. Provisioning is bundle-only — see ADR-0007.
   */
  singleClient: boolean
  /**
   * Whether this API has a `tags` resource. When false the taggable machinery
   * is omitted entirely rather than generated empty.
   */
  taggable: boolean
  /**
   * Resources present in the schema but deliberately not exposed. Singular ids
   * or plural types both work.
   */
  exclude?: readonly string[]
  /** Custom actions, keyed by plural resource type. */
  actions?: Readonly<Record<string, readonly CustomAction[]>>
}

/** Fields a config may omit; everything else must be declared explicitly. */
const DEFAULTS = {
  singleClient: true,
  taggable: true,
  exclude: [] as readonly string[],
  actions: {} as Readonly<Record<string, readonly CustomAction[]>>,
} satisfies Partial<TargetConfig>

const REQUIRED = ['docsPath', 'clientName', 'staticName'] as const

/**
 * Loads and validates `./sdk.config.ts` from the working directory. Missing
 * required fields are a hard error: silently defaulting a host or a docs path
 * would generate a plausible-looking SDK pointed at the wrong API.
 */
export const loadTargetConfig = async (path = './sdk.config.ts'): Promise<TargetConfig> => {
  const resolved = new URL(path, `file://${process.cwd()}/`).href

  let mod: { default?: unknown }
  try {
    mod = (await import(resolved)) as { default?: unknown }
  } catch (error) {
    throw new Error(
      `Cannot load target config at ${path} (resolved to ${resolved}). ` +
        `The generator runs with the SDK package as its working directory and expects the config there. ` +
        `Cause: ${(error as Error).message}`,
    )
  }

  const cfg = mod.default as Partial<TargetConfig> | undefined
  if (!cfg || typeof cfg !== 'object') {
    throw new Error(`Target config at ${path} must have a default export.`)
  }

  const missing = REQUIRED.filter((k) => typeof cfg[k] !== 'string' || (cfg[k] as string).length === 0)
  if (missing.length > 0) {
    throw new Error(`Target config at ${path} is missing required field(s): ${missing.join(', ')}.`)
  }

  const envs = cfg.environments
  if (!envs || typeof envs !== 'object' || typeof envs.production !== 'string') {
    throw new Error(`Target config at ${path} must declare an \`environments\` map including a \`production\` host.`)
  }

  return { ...DEFAULTS, ...cfg } as TargetConfig
}

/**
 * Resolves the host to generate against. `--api-host` wins as a raw escape
 * hatch; otherwise `--env` selects from the target's own map. An unknown
 * environment name is an error rather than a silent fall back to production —
 * generating the wrong API's schema into a package is close to invisible.
 */
export const resolveHost = (target: TargetConfig, opts: { apiHost?: string; env?: string }): string => {
  if (opts.apiHost) return opts.apiHost
  const env = opts.env ?? 'production'
  const host = target.environments[env]
  if (!host) {
    throw new Error(
      `Unknown environment '${env}'. This target declares: ${Object.keys(target.environments).sort().join(', ')}.`,
    )
  }
  return host
}
