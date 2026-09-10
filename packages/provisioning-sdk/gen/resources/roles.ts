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
import type { ApiCredential } from './api_credentials'
import type { Membership } from './memberships'
import type { Organization, OrganizationType } from './organizations'
import type { Permission } from './permissions'
import type { Version } from './versions'

type RoleType = 'roles'
type RoleRel = ResourceRel & { type: RoleType }
type OrganizationRel = ResourceRel & { type: OrganizationType }

export type RoleSort = Pick<Role, 'id' | 'name'> & ResourceSort
// export type RoleFilter = Pick<Role, 'id' | 'name' | 'kind'> & ResourceFilter

/**
 * The Role object is returned as part of the response body of each successful list, retrieve, create or update API call to the /api/roles endpoint.
 *
 * @link https://docs.commercelayer.io/provisioning-api-reference/roles/object
 */
interface Role extends Resource {
  readonly type: RoleType

  /**
   * The role name.
   * @example ```"Custom role"```
   */
  name: string
  /**
   * The kind of role, one of: `custom`, `admin`, `read_only`.
   * @example ```"custom"```
   */
  kind: string

  organization?: Organization | null
  permissions?: Permission[] | null
  memberships?: Membership[] | null
  api_credentials?: ApiCredential[] | null
  versions?: Version[] | null
}

interface RoleCreate extends ResourceCreate {
  /**
   * The role name.
   * @example ```"Custom role"```
   */
  name: string

  organization: OrganizationRel
}

interface RoleUpdate extends ResourceUpdate {
  /**
   * The role name.
   * @example ```"Custom role"```
   */
  name?: string | null
  /**
   * Send this attribute if you want to update the role base permissions.
   * @example ```true```
   */
  _add_missing_base_permissions?: boolean | null
}

class Roles extends ApiResource<Role> {
  static readonly TYPE: RoleType = 'roles' as const

  async create(resource: RoleCreate, params?: QueryParamsRetrieve<Role>, options?: ResourcesConfig): Promise<Role> {
    return this.resources.create<RoleCreate, Role>({ ...resource, type: Roles.TYPE }, params, options)
  }

  async update(resource: RoleUpdate, params?: QueryParamsRetrieve<Role>, options?: ResourcesConfig): Promise<Role> {
    return this.resources.update<RoleUpdate, Role>({ ...resource, type: Roles.TYPE }, params, options)
  }

  async organization(
    roleId: string | Role,
    params?: QueryParamsRetrieve<Organization>,
    options?: ResourcesConfig,
  ): Promise<Organization> {
    const _roleId = (roleId as Role).id || (roleId as string)
    return this.resources.fetch<Organization>(
      { type: 'organizations' },
      `roles/${_roleId}/organization`,
      params,
      options,
    ) as unknown as Organization
  }

  async permissions(
    roleId: string | Role,
    params?: QueryParamsList<Permission>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<Permission>> {
    const _roleId = (roleId as Role).id || (roleId as string)
    return this.resources.fetch<Permission>(
      { type: 'permissions' },
      `roles/${_roleId}/permissions`,
      params,
      options,
    ) as unknown as ListResponse<Permission>
  }

  async memberships(
    roleId: string | Role,
    params?: QueryParamsList<Membership>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<Membership>> {
    const _roleId = (roleId as Role).id || (roleId as string)
    return this.resources.fetch<Membership>(
      { type: 'memberships' },
      `roles/${_roleId}/memberships`,
      params,
      options,
    ) as unknown as ListResponse<Membership>
  }

  async api_credentials(
    roleId: string | Role,
    params?: QueryParamsList<ApiCredential>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<ApiCredential>> {
    const _roleId = (roleId as Role).id || (roleId as string)
    return this.resources.fetch<ApiCredential>(
      { type: 'api_credentials' },
      `roles/${_roleId}/api_credentials`,
      params,
      options,
    ) as unknown as ListResponse<ApiCredential>
  }

  async versions(
    roleId: string | Role,
    params?: QueryParamsList<Version>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<Version>> {
    const _roleId = (roleId as Role).id || (roleId as string)
    return this.resources.fetch<Version>(
      { type: 'versions' },
      `roles/${_roleId}/versions`,
      params,
      options,
    ) as unknown as ListResponse<Version>
  }

  async _add_missing_base_permissions(
    id: string | Role,
    params?: QueryParamsRetrieve<Role>,
    options?: ResourcesConfig,
  ): Promise<Role> {
    return this.resources.update<RoleUpdate, Role>(
      { id: typeof id === 'string' ? id : id.id, type: Roles.TYPE, _add_missing_base_permissions: true },
      params,
      options,
    )
  }

  isRole(resource: any): resource is Role {
    return resource.type && resource.type === Roles.TYPE
  }

  relationship(id: string | ResourceId | null): RoleRel {
    return super.relationshipOneToOne<RoleRel>(id)
  }

  relationshipToMany(...ids: string[]): RoleRel[] {
    return super.relationshipOneToMany<RoleRel>(...ids)
  }

  type(): RoleType {
    return Roles.TYPE
  }
}

const instance = new Roles()
export default instance

export type { Role, RoleCreate, Roles, RoleType, RoleUpdate }
