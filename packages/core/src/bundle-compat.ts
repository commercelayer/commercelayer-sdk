// Back-compat entry for `@commercelayer/sdk/bundle` (a public subpath since
// v7). The bundle is now the default export of `@commercelayer/sdk`, so this
// subpath is redundant — kept only so v7 code keeps compiling on v8. The
// re-declarations below carry `@deprecated` TSDoc so editors strike through
// imports from this path and nudge callers to the default entry. The impl in
// `./bundle` is intentionally NOT deprecated (the default root re-exports it).

import CommerceLayerBundleFactory, { type CommerceLayerBundle as CommerceLayerBundleImpl } from '../gen/bundle'

/**
 * @deprecated Import from `@commercelayer/sdk` instead — the bundle is now the
 * default export. The `@commercelayer/sdk/bundle` subpath is kept for
 * backwards compatibility with v7 and will be removed in a future major.
 */
const CommerceLayer = CommerceLayerBundleFactory

/**
 * @deprecated Import from `@commercelayer/sdk` instead. Kept for v7
 * backwards compatibility; slated for removal in a future major.
 */
type CommerceLayerBundle = CommerceLayerBundleImpl

export default CommerceLayer
export { CommerceLayer, type CommerceLayerBundle }
