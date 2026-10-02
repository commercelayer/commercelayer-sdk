import type { QueryParamsList, QueryParamsRetrieve } from '@runtime/query'
import type {
  ListResponse,
  Resource,
  ResourceCreate,
  ResourceId,
  ResourceRel,
  ResourceSort,
  /* ResourceFilter */ ResourcesConfig,
  ResourceUpdate,
} from '@runtime/resource'
import { ApiResource } from '@runtime/resource'
import type { ApplicationMembership, ApplicationMembershipType } from './application_memberships'
import type { Organization, OrganizationType } from './organizations'

type MembershipProfileType = 'membership_profiles'
type MembershipProfileRel = ResourceRel & { type: MembershipProfileType }
type OrganizationRel = ResourceRel & { type: OrganizationType }
type ApplicationMembershipRel = ResourceRel & { type: ApplicationMembershipType }

export type MembershipProfileSort = Pick<MembershipProfile, 'id' | 'name'> & ResourceSort
// export type MembershipProfileFilter = Pick<MembershipProfile, 'id' | 'name' | 'access_scope'> & ResourceFilter

/**
 * The Membership profile object is returned as part of the response body of each successful list, retrieve, create, update or delete API call to the /api/membership_profiles endpoint.
 *
 * @link https://docs.commercelayer.io/provisioning-api-reference/membership_profiles/object
 */
interface MembershipProfile extends Resource {
  readonly type: MembershipProfileType

  /**
   * The membership profile name.
   * @example ```"Marketing group"```
   */
  name: string
  /**
   * Reflects the organization's access scope, either test_access or all_access.
   * @example ```true```
   */
  test_enabled: boolean
  /**
   * The access scope for applications. One of `live_access` (default), `test_access`, `all_access`.
   * @example ```"live_access"```
   */
  access_scope: 'live_access' | 'test_access' | 'all_access'

  organization?: Organization | null
  application_memberships?: ApplicationMembership[] | null
}

interface MembershipProfileCreate extends ResourceCreate {
  /**
   * The membership profile name.
   * @example ```"Marketing group"```
   */
  name: string
  /**
   * The access scope for applications. One of `live_access` (default), `test_access`, `all_access`.
   * @example ```"live_access"```
   */
  access_scope: 'live_access' | 'test_access' | 'all_access'

  organization: OrganizationRel
  application_memberships?: ApplicationMembershipRel[] | null
}

interface MembershipProfileUpdate extends ResourceUpdate {
  /**
   * The membership profile name.
   * @example ```"Marketing group"```
   */
  name?: string | null
  /**
   * The access scope for applications. One of `live_access` (default), `test_access`, `all_access`.
   * @example ```"live_access"```
   */
  access_scope?: 'live_access' | 'test_access' | 'all_access' | null

  application_memberships?: ApplicationMembershipRel[] | null
}

class MembershipProfiles extends ApiResource<MembershipProfile> {
  static readonly TYPE: MembershipProfileType = 'membership_profiles' as const

  async create(
    resource: MembershipProfileCreate,
    params?: QueryParamsRetrieve<MembershipProfile>,
    options?: ResourcesConfig,
  ): Promise<MembershipProfile> {
    return this.resources.create<MembershipProfileCreate, MembershipProfile>(
      { ...resource, type: MembershipProfiles.TYPE },
      params,
      options,
    )
  }

  async update(
    resource: MembershipProfileUpdate,
    params?: QueryParamsRetrieve<MembershipProfile>,
    options?: ResourcesConfig,
  ): Promise<MembershipProfile> {
    return this.resources.update<MembershipProfileUpdate, MembershipProfile>(
      { ...resource, type: MembershipProfiles.TYPE },
      params,
      options,
    )
  }

  async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
    await this.resources.delete(typeof id === 'string' ? { id, type: MembershipProfiles.TYPE } : id, options)
  }

  async organization(
    membershipProfileId: string | MembershipProfile,
    params?: QueryParamsRetrieve<Organization>,
    options?: ResourcesConfig,
  ): Promise<Organization> {
    const _membershipProfileId = (membershipProfileId as MembershipProfile).id || (membershipProfileId as string)
    return this.resources.fetch<Organization>(
      { type: 'organizations' },
      `membership_profiles/${_membershipProfileId}/organization`,
      params,
      options,
    ) as unknown as Organization
  }

  async application_memberships(
    membershipProfileId: string | MembershipProfile,
    params?: QueryParamsList<ApplicationMembership>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<ApplicationMembership>> {
    const _membershipProfileId = (membershipProfileId as MembershipProfile).id || (membershipProfileId as string)
    return this.resources.fetch<ApplicationMembership>(
      { type: 'application_memberships' },
      `membership_profiles/${_membershipProfileId}/application_memberships`,
      params,
      options,
    ) as unknown as ListResponse<ApplicationMembership>
  }

  isMembershipProfile(resource: any): resource is MembershipProfile {
    return resource.type && resource.type === MembershipProfiles.TYPE
  }

  relationship(id: string | ResourceId | null): MembershipProfileRel {
    return super.relationshipOneToOne<MembershipProfileRel>(id)
  }

  relationshipToMany(...ids: string[]): MembershipProfileRel[] {
    return super.relationshipOneToMany<MembershipProfileRel>(...ids)
  }

  type(): MembershipProfileType {
    return MembershipProfiles.TYPE
  }
}

const instance = new MembershipProfiles()
export default instance

export type {
  MembershipProfile,
  MembershipProfileCreate,
  MembershipProfiles,
  MembershipProfileType,
  MembershipProfileUpdate,
}
