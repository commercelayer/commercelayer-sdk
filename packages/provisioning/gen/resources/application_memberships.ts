import type { QueryParamsRetrieve } from '@runtime/query'
import type {
  Resource,
  ResourceCreate,
  ResourceId,
  ResourceRel,
  ResourceSort,
  /* ResourceFilter */ ResourcesConfig,
  ResourceUpdate,
} from '@runtime/resource'
import { ApiResource } from '@runtime/resource'

import type { ApiCredential, ApiCredentialType } from './api_credentials'
import type { MembershipProfile, MembershipProfileType } from './membership_profiles'
import type { Membership, MembershipType } from './memberships'
import type { Organization, OrganizationType } from './organizations'
import type { Role, RoleType } from './roles'

type ApplicationMembershipType = 'application_memberships'
type ApplicationMembershipRel = ResourceRel & { type: ApplicationMembershipType }
type ApiCredentialRel = ResourceRel & { type: ApiCredentialType }
type MembershipRel = ResourceRel & { type: MembershipType }
type MembershipProfileRel = ResourceRel & { type: MembershipProfileType }
type OrganizationRel = ResourceRel & { type: OrganizationType }
type RoleRel = ResourceRel & { type: RoleType }

export type ApplicationMembershipSort = Pick<ApplicationMembership, 'id'> & ResourceSort
// export type ApplicationMembershipFilter = Pick<ApplicationMembership, 'id' | 'filters'> & ResourceFilter

/**
 * The Application membership object is returned as part of the response body of each successful list, retrieve, create, update or delete API call to the /api/application_memberships endpoint.
 *
 * @link https://docs.commercelayer.io/provisioning-api-reference/application_memberships/object
 */
interface ApplicationMembership extends Resource {
  readonly type: ApplicationMembershipType

  /**
   * Set of key-value pairs that contains restrictions and scopes of the application membership.
   * @example ```{"market_id_in":[202,203]}```
   */
  filters?: Record<string, any> | null

  api_credential?: ApiCredential | null
  membership?: Membership | null
  membership_profile?: MembershipProfile | null
  organization?: Organization | null
  role?: Role | null
}

interface ApplicationMembershipCreate extends ResourceCreate {
  /**
   * Set of key-value pairs that contains restrictions and scopes of the application membership.
   * @example ```{"market_id_in":[202,203]}```
   */
  filters?: Record<string, any> | null

  api_credential: ApiCredentialRel
  membership?: MembershipRel | null
  membership_profile?: MembershipProfileRel | null
  organization: OrganizationRel
  role: RoleRel
}

interface ApplicationMembershipUpdate extends ResourceUpdate {
  /**
   * Set of key-value pairs that contains restrictions and scopes of the application membership.
   * @example ```{"market_id_in":[202,203]}```
   */
  filters?: Record<string, any> | null

  membership_profile?: MembershipProfileRel | null
  role?: RoleRel | null
}

class ApplicationMemberships extends ApiResource<ApplicationMembership> {
  static readonly TYPE: ApplicationMembershipType = 'application_memberships' as const

  async create(
    resource: ApplicationMembershipCreate,
    params?: QueryParamsRetrieve<ApplicationMembership>,
    options?: ResourcesConfig,
  ): Promise<ApplicationMembership> {
    return this.resources.create<ApplicationMembershipCreate, ApplicationMembership>(
      { ...resource, type: ApplicationMemberships.TYPE },
      params,
      options,
    )
  }

  async update(
    resource: ApplicationMembershipUpdate,
    params?: QueryParamsRetrieve<ApplicationMembership>,
    options?: ResourcesConfig,
  ): Promise<ApplicationMembership> {
    return this.resources.update<ApplicationMembershipUpdate, ApplicationMembership>(
      { ...resource, type: ApplicationMemberships.TYPE },
      params,
      options,
    )
  }

  async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
    await this.resources.delete(typeof id === 'string' ? { id, type: ApplicationMemberships.TYPE } : id, options)
  }

  async api_credential(
    applicationMembershipId: string | ApplicationMembership,
    params?: QueryParamsRetrieve<ApiCredential>,
    options?: ResourcesConfig,
  ): Promise<ApiCredential> {
    const _applicationMembershipId =
      (applicationMembershipId as ApplicationMembership).id || (applicationMembershipId as string)
    return this.resources.fetch<ApiCredential>(
      { type: 'api_credentials' },
      `application_memberships/${_applicationMembershipId}/api_credential`,
      params,
      options,
    ) as unknown as ApiCredential
  }

  async membership(
    applicationMembershipId: string | ApplicationMembership,
    params?: QueryParamsRetrieve<Membership>,
    options?: ResourcesConfig,
  ): Promise<Membership> {
    const _applicationMembershipId =
      (applicationMembershipId as ApplicationMembership).id || (applicationMembershipId as string)
    return this.resources.fetch<Membership>(
      { type: 'memberships' },
      `application_memberships/${_applicationMembershipId}/membership`,
      params,
      options,
    ) as unknown as Membership
  }

  async membership_profile(
    applicationMembershipId: string | ApplicationMembership,
    params?: QueryParamsRetrieve<MembershipProfile>,
    options?: ResourcesConfig,
  ): Promise<MembershipProfile> {
    const _applicationMembershipId =
      (applicationMembershipId as ApplicationMembership).id || (applicationMembershipId as string)
    return this.resources.fetch<MembershipProfile>(
      { type: 'membership_profiles' },
      `application_memberships/${_applicationMembershipId}/membership_profile`,
      params,
      options,
    ) as unknown as MembershipProfile
  }

  async organization(
    applicationMembershipId: string | ApplicationMembership,
    params?: QueryParamsRetrieve<Organization>,
    options?: ResourcesConfig,
  ): Promise<Organization> {
    const _applicationMembershipId =
      (applicationMembershipId as ApplicationMembership).id || (applicationMembershipId as string)
    return this.resources.fetch<Organization>(
      { type: 'organizations' },
      `application_memberships/${_applicationMembershipId}/organization`,
      params,
      options,
    ) as unknown as Organization
  }

  async role(
    applicationMembershipId: string | ApplicationMembership,
    params?: QueryParamsRetrieve<Role>,
    options?: ResourcesConfig,
  ): Promise<Role> {
    const _applicationMembershipId =
      (applicationMembershipId as ApplicationMembership).id || (applicationMembershipId as string)
    return this.resources.fetch<Role>(
      { type: 'roles' },
      `application_memberships/${_applicationMembershipId}/role`,
      params,
      options,
    ) as unknown as Role
  }

  isApplicationMembership(resource: any): resource is ApplicationMembership {
    return resource.type && resource.type === ApplicationMemberships.TYPE
  }

  relationship(id: string | ResourceId | null): ApplicationMembershipRel {
    return super.relationshipOneToOne<ApplicationMembershipRel>(id)
  }

  relationshipToMany(...ids: string[]): ApplicationMembershipRel[] {
    return super.relationshipOneToMany<ApplicationMembershipRel>(...ids)
  }

  type(): ApplicationMembershipType {
    return ApplicationMemberships.TYPE
  }
}

const instance = new ApplicationMemberships()
export default instance

export type {
  ApplicationMembership,
  ApplicationMembershipCreate,
  ApplicationMemberships,
  ApplicationMembershipType,
  ApplicationMembershipUpdate,
}
