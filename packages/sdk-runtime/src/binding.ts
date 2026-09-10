/**
 * The shape of a Target binding: the facts the Runtime needs about the target
 * it is serving. Generated per package into `gen/binding.ts` from the Target
 * config and the parsed schema, and reached through the `#registry` alias.
 *
 * Value-level facts live here. The three type-level maps — ResourceFields,
 * ResourceSortFields, ResourceTypeLock — cannot be injected and are re-exported
 * by the same generated module.
 */
export type TargetBinding = {
  /**
   * Fixed API subdomain, e.g. `provisioning`. Undefined for organization-scoped
   * APIs, where the organization slug forms the subdomain and `organization`
   * becomes a required init option.
   */
  readonly subdomain: string | undefined
  /** Short target name, sent as `X-CL-SDK: js/<name>-v<sdkVersion>`. */
  readonly name: string
  /** This package's own version, from its package.json. */
  readonly sdkVersion: string
  /** The API version the emitted types were generated for. */
  readonly schemaVersion: string
  /** Every API version this build accepts as `apiVersion`. Empty on legacy schemas. */
  readonly supportedVersions: readonly string[]
  /** The target's resource catalogue. */
  readonly resourceList: readonly string[]
  /** The catalogue, optionally sorted. */
  readonly getResources: (sort?: boolean) => readonly string[]
}
