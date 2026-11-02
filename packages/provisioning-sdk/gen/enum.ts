import type { Resource } from '@runtime/resource'
import type * as models from './model'

const apiResources = [
  // ##__API_RESOURCE_LIST_START__##
  'addresses',
  'agreements',
  'agreement_identities',
  'api_credentials',
  'application_memberships',
  'identity_providers',
  'markets',
  'memberships',
  'membership_profiles',
  'organizations',
  'permissions',
  'roles',
  'users',
  'versions',
  // ##__API_RESOURCE_LIST_STOP__##
] as const

export type ResourceTypeLock = (typeof apiResources)[number]
export const resourceList: readonly ResourceTypeLock[] = apiResources

// Singleton resources
export const singletonList = [
  // ##__API_RESOURCE_SINGLETON_START__##
  'users',
  // ##__API_RESOURCE_SINGLETON_STOP__##
] as const

// Retrievable resources
export type RetrievableResourceType = ResourceTypeLock

export type RetrievableResource = Resource & {
  type: RetrievableResourceType
}

// Listable resources
export type ListableResourceType = Exclude<
  ResourceTypeLock,
  // ##__API_RESOURCE_NOT_LISTABLE_START__##
  'addresses' | 'markets' | 'users'
  // ##__API_RESOURCE_NOT_LISTABLE_STOP__##
>

export type ListableResource = Resource & {
  type: ListableResourceType
}

// Creatable resources
export const creatableResources = [
  // ##__API_RESOURCE_CREATABLE_START__##
  'agreements',
  'agreement_identities',
  'api_credentials',
  'application_memberships',
  'identity_providers',
  'memberships',
  'membership_profiles',
  'organizations',
  'permissions',
  'roles',
  // ##__API_RESOURCE_CREATABLE_STOP__##
] as const

export type CreatableResourceType = (typeof creatableResources)[number]
export type CreatableResource = Resource & {
  type: CreatableResourceType
}

// Updatable resources
export const updatableResources = [
  // ##__API_RESOURCE_UPDATABLE_START__##
  'agreements',
  'agreement_identities',
  'api_credentials',
  'application_memberships',
  'identity_providers',
  'memberships',
  'membership_profiles',
  'organizations',
  'permissions',
  'roles',
  // ##__API_RESOURCE_UPDATABLE_STOP__##
] as const

export type UpdatableResourceType = (typeof updatableResources)[number]
export type UpdatableResource = Resource & {
  type: UpdatableResourceType
}

// Deletable resources
export const deletableResources = [
  // ##__API_RESOURCE_DELETABLE_START__##
  'agreements',
  'agreement_identities',
  'api_credentials',
  'application_memberships',
  'identity_providers',
  'memberships',
  'membership_profiles',
  // ##__API_RESOURCE_DELETABLE_STOP__##
] as const

export type DeletableResourceType = (typeof deletableResources)[number]
export type DeletableResource = Resource & {
  type: DeletableResourceType
}

// Utility functions
export function getResources(sort?: boolean): readonly ResourceTypeLock[] {
  return sort ? [...resourceList].sort() : resourceList
}

export function getSingletons(sort?: boolean): readonly string[] {
  return sort ? [...singletonList].sort() : singletonList
}

export function isSingleton(resource: ResourceTypeLock): boolean {
  return (singletonList as readonly ResourceTypeLock[]).includes(resource)
}

export function isCreatable(resource: ResourceTypeLock): boolean {
  return (creatableResources as readonly ResourceTypeLock[]).includes(resource)
}

export function isUpdatable(resource: ResourceTypeLock): boolean {
  return (updatableResources as readonly ResourceTypeLock[]).includes(resource)
}

export function isDeletable(resource: ResourceTypeLock): boolean {
  return (deletableResources as readonly ResourceTypeLock[]).includes(resource)
}

// Helper types
export type ResourceFields = {
  // ##__API_RESOURCE_FIELDS_START__##
  addresses: models.Address
  agreements: models.Agreement
  agreement_identities: models.AgreementIdentity
  api_credentials: models.ApiCredential
  application_memberships: models.ApplicationMembership
  identity_providers: models.IdentityProvider
  markets: models.Market
  memberships: models.Membership
  membership_profiles: models.MembershipProfile
  organizations: models.Organization
  permissions: models.Permission
  roles: models.Role
  users: models.User
  versions: models.Version
  // ##__API_RESOURCE_FIELDS_STOP__##
}

export type ResourceSortFields = {
  // ##__API_RESOURCE_SORTABLE_FIELDS_START__##
  addresses: models.AddressSort
  agreements: models.AgreementSort
  agreement_identities: models.AgreementIdentitySort
  api_credentials: models.ApiCredentialSort
  application_memberships: models.ApplicationMembershipSort
  identity_providers: models.IdentityProviderSort
  markets: models.MarketSort
  memberships: models.MembershipSort
  membership_profiles: models.MembershipProfileSort
  organizations: models.OrganizationSort
  permissions: models.PermissionSort
  roles: models.RoleSort
  users: models.UserSort
  versions: models.VersionSort
  // ##__API_RESOURCE_SORTABLE_FIELDS_STOP__##
}
