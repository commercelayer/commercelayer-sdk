// Resource adapters
export * from './api'

// SDK
import { CommerceLayer } from './commercelayer'

// Preferred: the named export. Clean, and the form we're standardising on.
export {
  API_SCHEMA_VERSION,
  API_SUPPORTED_VERSIONS,
  type ApiVersion,
  CommerceLayer,
  SDK_VERSION,
} from './commercelayer'

/**
 * @deprecated Use the named import instead:
 * `import { CommerceLayer } from '@commercelayer/sdk/single-client'`. The
 * default export is kept for backwards compatibility and will be removed in
 * a future major.
 */
const CommerceLayerDefault = CommerceLayer
export default CommerceLayerDefault

// Commerce Layer static functions
export { CommerceLayerStatic } from './static'

/** ** TYPES ** **/

// Error types
export type { ApiError, SdkError } from '@runtime/error'
// Raw response reader and request/response interceptors
export type { ErrorObj, HeadersObj, RequestObj, ResponseObj } from '@runtime/interceptor'
// Query filter types
export type {
  QueryFields,
  QueryFilter,
  QueryInclude,
  QueryPageCursor,
  QueryPageNumber,
  QueryPageSize,
  QueryParams,
  QueryParamsList,
  QueryParamsRetrieve,
  QuerySort,
} from '@runtime/query'
// Resource types
export type {
  ApiResource,
  ApiSingleton,
  ListMeta,
  ListResponse,
  Metadata,
  Resource,
  ResourceCreate,
  ResourceFilter,
  ResourceId,
  ResourceRel,
  ResourceSort,
  ResourcesConfig,
  ResourcesInitConfig,
  ResourceType,
  ResourceUpdate,
} from '@runtime/resource'
// Commerce Layer client type — the single-token client (no resource
// accessors; import resources directly). Named distinctly from the bundle's
// `CommerceLayerClient`.
export type { CommerceLayerConfig, CommerceLayerInitConfig, CommerceLayerSingleClient } from './commercelayer'
// Resource API types
export type {
  CreatableResource,
  CreatableResourceType,
  DeletableResource,
  DeletableResourceType,
  ListableResource,
  ListableResourceType,
  ResourceFields,
  ResourceSortFields,
  ResourceTypeLock,
  RetrievableResource,
  RetrievableResourceType,
  TaggableResource,
  TaggableResourceType,
  UpdatableResource,
  UpdatableResourceType,
} from './enum'
// Resource model types
export type * from './model'
