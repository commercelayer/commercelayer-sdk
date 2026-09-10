// SDK — single entry point exposing the bundle client. Unlike the Core API SDK
// there is no tree-shakeable single-client surface.
import CommerceLayerProvisioning, { type CommerceLayerProvisioningClient } from '../gen/bundle'

export { API_SCHEMA_VERSION, API_SUPPORTED_VERSIONS, type ApiVersion, SDK_VERSION } from '../gen/version'
export { CommerceLayerProvisioning, type CommerceLayerProvisioningClient }

export default CommerceLayerProvisioning

// The resource catalogue, as values. 2.10.2 exposed these; they must be real
// value exports, not type-only, or consumers get bindings that fail at runtime.
export { resourceList, singletonList } from '../gen/enum'
// Commerce Layer Provisioning static functions
export { CommerceLayerProvisioningStatic } from './static'

/** ** TYPES ** **/

// Curated rather than wildcarded. 2.10.2 built its surface from `export type *`
// over api/model/query/resource, but sdk8's modules have different shapes: the
// same wildcards re-export resource *instances* and enum helper *functions*
// into the .d.ts while the runtime exports only six names — so consumers could
// import bindings that typecheck and then fail at runtime.

// Error types
export type { ApiError, ErrorType, SdkError } from '@runtime/error'
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
  SingletonUpdate,
} from '@runtime/resource'
// Resource classes, as 2.10.2 exposed them
export type {
  ApiCredentials,
  ApplicationMemberships,
  IdentityProviders,
  MembershipProfiles,
  Memberships,
  Organizations,
  Permissions,
  Roles,
  Users,
  Versions,
} from '../gen/api'
// Resource API type unions
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
  UpdatableResource,
  UpdatableResourceType,
} from '../gen/enum'
// Resource model types — model.ts declares types only, so a wildcard is safe
export type * from '../gen/model'
// Payload types for custom actions
export type { TransferOwnershipDataType } from './actions'
// Client config types
export type { CommerceLayerConfig, CommerceLayerInitConfig } from './commercelayer'
