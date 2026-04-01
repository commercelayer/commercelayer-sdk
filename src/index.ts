

// Resource adapters
export * from './api'
// SDK
export { CommerceLayer, default } from './commercelayer'

// Commerce Layer static functions
export { CommerceLayerStatic } from './static'


/** ** TYPES ** **/

// Commerce Layer client type
export type { CommerceLayerClient, CommerceLayerConfig, CommerceLayerInitConfig } from './commercelayer'
// Resource API types
export type {
  CreatableResource,
  CreatableResourceType,
  DeletableResource,
  DeletableResourceType,
  ListableResource,
  ListableResourceType,
  ResourceTypeLock,
  RetrievableResource,
  RetrievableResourceType,
  TaggableResource,
  TaggableResourceType,
  UpdatableResource,
  UpdatableResourceType,
  VersionableResource, 
  VersionableResourceType
} from './enum'
// Error types
export type { ApiError, SdkError } from './error'
// Raw response reader and request/response interceptors
export type { ErrorObj, HeadersObj, RequestObj, ResponseObj } from './interceptor'
// Resource model types
export type * from './model'
// Query filter types
export type {
  QueryFields,
  QueryFilter, 
  QueryInclude,
  QueryPageNumber,
  QueryPageSize,
  QueryParams,
  QueryParamsList,
  QueryParamsRetrieve,
  QuerySort
} from './query'
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
  ResourceUpdate
} from './resource'
