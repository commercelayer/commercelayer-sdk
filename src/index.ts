
// SDK
export { default, CommerceLayer } from './commercelayer'

// Resource adapters
export * from './api'

// Commerce Layer static functions
export { CommerceLayerStatic } from './static'


/** ** TYPES ** **/

// Commerce Layer client type
export type { CommerceLayerClient, CommerceLayerInitConfig, CommerceLayerConfig } from './commercelayer'

// Query filter types
export type {
  QueryInclude,
  QueryFields,
  QueryParamsRetrieve,
  QueryParamsList,
  QueryParams,
  QueryPageNumber,
  QueryPageSize,
  QuerySort,
  QueryFilter
} from './query'


// Raw response reader and request/response interceptors
export type { RequestObj, ResponseObj, ErrorObj, HeadersObj } from './interceptor'

// Error types
export type { SdkError, ApiError } from './error'


// Resource types
export type {
  Metadata,
  ResourceType,
  ResourceId,
  Resource,
  ResourceCreate,
  ResourceUpdate,
  ListResponse,
  ListMeta,
  ResourceRel,
  ResourceSort,
  ResourceFilter,
  ResourcesConfig,
  ResourcesInitConfig
} from './resource'


// Resource model types
export type * from './model'


// Resource API types
export type {
  ResourceTypeLock,
  RetrievableResourceType,
  RetrievableResource,
  ListableResourceType,
  ListableResource,
  CreatableResourceType,
  CreatableResource,
  UpdatableResourceType,
  UpdatableResource,
  DeletableResourceType,
  DeletableResource,
  TaggableResourceType,
  TaggableResource,
  VersionableResourceType,
  VersionableResource
} from './enum'
