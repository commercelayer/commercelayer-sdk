import type { Resource, ResourceId, ResourceRel, ResourceSort /* ResourceFilter */ } from '@runtime/resource'
import { ApiResource } from '@runtime/resource'

type VersionType = 'versions'
type VersionRel = ResourceRel & { type: VersionType }

export type VersionSort = Pick<Version, 'id'> & ResourceSort
// export type VersionFilter = Pick<Version, 'id' | 'resource_type' | 'resource_id'> & ResourceFilter

/**
 * The Version object is returned as part of the response body of each successful list or retrieve API call to the /api/versions endpoint.
 *
 * @link https://docs.commercelayer.io/provisioning-api-reference/versions/object
 */
interface Version extends Resource {
  readonly type: VersionType

  /**
   * The type of the versioned resource.
   * @example ```"roles"```
   */
  resource_type?: string | null
  /**
   * The versioned resource ID.
   * @example ```"PzdJhdLdYV"```
   */
  resource_id?: string | null
  /**
   * The event which generates the version.
   * @example ```"update"```
   */
  event?: string | null
  /**
   * The object changes payload.
   * @example ```{"name":["previous","new"]}```
   */
  changes?: Record<string, any> | null
  /**
   * Information about who triggered the change, only showed when it's from a JWT token.
   * @example ```{"application":{"id":"DNOPYiZYpn","kind":"integration","public":true}}```
   */
  who?: Record<string, any> | null
}

class Versions extends ApiResource<Version> {
  static readonly TYPE: VersionType = 'versions' as const

  isVersion(resource: any): resource is Version {
    return resource.type && resource.type === Versions.TYPE
  }

  relationship(id: string | ResourceId | null): VersionRel {
    return super.relationshipOneToOne<VersionRel>(id)
  }

  relationshipToMany(...ids: string[]): VersionRel[] {
    return super.relationshipOneToMany<VersionRel>(...ids)
  }

  type(): VersionType {
    return Versions.TYPE
  }
}

const instance = new Versions()
export default instance

export type { Version, Versions, VersionType }
