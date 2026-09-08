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

import type { Organization } from './organizations'
import type { Role, RoleType } from './roles'
import type { Version } from './versions'

type PermissionType = 'permissions'
type PermissionRel = ResourceRel & { type: PermissionType }
type RoleRel = ResourceRel & { type: RoleType }

export type PermissionSort = Pick<Permission, 'id'> & ResourceSort
// export type PermissionFilter = Pick<Permission, 'id' | 'can_create' | 'can_read' | 'can_update' | 'can_destroy' | 'subject' | 'restrictions'> & ResourceFilter

/**
 * The Permission object is returned as part of the response body of each successful list, retrieve, create or update API call to the /api/permissions endpoint.
 *
 * @link https://docs.commercelayer.io/provisioning-api-reference/permissions/object
 */
interface Permission extends Resource {
  readonly type: PermissionType

  /**
   * Determines if the permission have access to create rights.
   */
  can_create: boolean
  /**
   * Determines if the permission have access to read rights.
   */
  can_read: boolean
  /**
   * Determines if the permission have access to update rights.
   */
  can_update: boolean
  /**
   * Determines if the permission have access to destroy rights.
   */
  can_destroy: boolean
  /**
   * The resource where this permission is applied.
   */
  subject: string
  /**
   * An object that contains additional restrictions.
   * @example ```{"foo":"bar"}```
   */
  restrictions?: Record<string, any> | null

  organization?: Organization | null
  role?: Role | null
  versions?: Version[] | null
}

interface PermissionCreate extends ResourceCreate {
  /**
   * Determines if the permission have access to create rights.
   */
  can_create: boolean
  /**
   * Determines if the permission have access to read rights.
   */
  can_read: boolean
  /**
   * Determines if the permission have access to update rights.
   */
  can_update: boolean
  /**
   * Determines if the permission have access to destroy rights.
   */
  can_destroy: boolean
  /**
   * The resource where this permission is applied.
   */
  subject: string

  role: RoleRel
}

interface PermissionUpdate extends ResourceUpdate {
  /**
   * Determines if the permission have access to create rights.
   */
  can_create?: boolean | null
  /**
   * Determines if the permission have access to read rights.
   */
  can_read?: boolean | null
  /**
   * Determines if the permission have access to update rights.
   */
  can_update?: boolean | null
  /**
   * Determines if the permission have access to destroy rights.
   */
  can_destroy?: boolean | null
}

class Permissions extends ApiResource<Permission> {
  static readonly TYPE: PermissionType = 'permissions' as const

  async create(
    resource: PermissionCreate,
    params?: QueryParamsRetrieve<Permission>,
    options?: ResourcesConfig,
  ): Promise<Permission> {
    return this.resources.create<PermissionCreate, Permission>({ ...resource, type: Permissions.TYPE }, params, options)
  }

  async update(
    resource: PermissionUpdate,
    params?: QueryParamsRetrieve<Permission>,
    options?: ResourcesConfig,
  ): Promise<Permission> {
    return this.resources.update<PermissionUpdate, Permission>({ ...resource, type: Permissions.TYPE }, params, options)
  }

  async organization(
    permissionId: string | Permission,
    params?: QueryParamsRetrieve<Organization>,
    options?: ResourcesConfig,
  ): Promise<Organization> {
    const _permissionId = (permissionId as Permission).id || (permissionId as string)
    return this.resources.fetch<Organization>(
      { type: 'organizations' },
      `permissions/${_permissionId}/organization`,
      params,
      options,
    ) as unknown as Organization
  }

  async role(
    permissionId: string | Permission,
    params?: QueryParamsRetrieve<Role>,
    options?: ResourcesConfig,
  ): Promise<Role> {
    const _permissionId = (permissionId as Permission).id || (permissionId as string)
    return this.resources.fetch<Role>(
      { type: 'roles' },
      `permissions/${_permissionId}/role`,
      params,
      options,
    ) as unknown as Role
  }

  async versions(
    permissionId: string | Permission,
    params?: QueryParamsList<Version>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<Version>> {
    const _permissionId = (permissionId as Permission).id || (permissionId as string)
    return this.resources.fetch<Version>(
      { type: 'versions' },
      `permissions/${_permissionId}/versions`,
      params,
      options,
    ) as unknown as ListResponse<Version>
  }

  isPermission(resource: any): resource is Permission {
    return resource.type && resource.type === Permissions.TYPE
  }

  relationship(id: string | ResourceId | null): PermissionRel {
    return super.relationshipOneToOne<PermissionRel>(id)
  }

  relationshipToMany(...ids: string[]): PermissionRel[] {
    return super.relationshipOneToMany<PermissionRel>(...ids)
  }

  type(): PermissionType {
    return Permissions.TYPE
  }
}

const instance = new Permissions()
export default instance

export type { Permission, PermissionCreate, Permissions, PermissionType, PermissionUpdate }
