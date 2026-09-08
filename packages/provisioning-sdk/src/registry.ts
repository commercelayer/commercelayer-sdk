/**
 * Target binding for the shared runtime (`@runtime/*`).
 *
 * The runtime is target-agnostic and imports everything target-specific from
 * `#registry`, which each SDK package aliases to its own copy of this file
 * (tsconfig `paths` for typechecking, tsup `alias` for the bundle). That keeps
 * one copy of the runtime source while `QueryParamsList<Order>` and friends
 * stay precise per target.
 */

// Generated per target — the resource catalogue and its field/sort type maps.
export type { ResourceFields, ResourceSortFields, ResourceTypeLock } from '../gen/enum'
export { resourceList } from '../gen/enum'
// Generated per target — this package's own version, from its package.json.
export { SDK_VERSION } from '../gen/version'

/**
 * Telemetry target name, sent as `X-CL-SDK: js/<SDK_TARGET>-v<SDK_VERSION>` —
 * e.g. `js/core-v8.0.0`. Each SDK reports its own target and its own version,
 * so Core API and Provisioning API traffic is distinguishable.
 */
export const SDK_TARGET = 'provisioning'

/**
 * Fixed API subdomain: the Provisioning API is not organization-scoped, so
 * requests go to `https://provisioning.<domain>/api` and `organization` is not
 * a required init option.
 */
export const API_SUBDOMAIN: string | undefined = 'provisioning'
