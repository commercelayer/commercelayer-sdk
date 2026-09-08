// SDK — default entry: the bundle client (all resources on one instance,
// isolated per client). For the lightweight, tree-shakeable single-client
// model (direct resource imports, one global token) use
// `@commercelayer/sdk/single-client`.
import { CommerceLayer, type CommerceLayerBundle, type CommerceLayerClient } from '../gen/bundle'

export { API_SCHEMA_VERSION, API_SUPPORTED_VERSIONS, type ApiVersion, SDK_VERSION } from './commercelayer'
// Preferred: the named export. Clean, and the form we're standardising on.
// `CommerceLayerClient` is the bundled client type (sdk6 naming);
// `CommerceLayerBundle` is a deprecated alias kept for backwards compatibility.
export { CommerceLayer, type CommerceLayerBundle, type CommerceLayerClient }

/**
 * @deprecated Use the named import instead:
 * `import { CommerceLayer } from '@commercelayer/sdk'`. The default export is
 * kept for backwards compatibility and will be removed in a future major.
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
} from '../gen/enum'
// Resource model types
export type * from '../gen/model'
// Commerce Layer client type
export type { CommerceLayerConfig, CommerceLayerInitConfig } from './commercelayer'
