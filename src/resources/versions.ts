import { ApiResource } from '../resource'
import type { Resource, ResourceId, ResourceRel, ResourceSort, /* ResourceFilter */ } from '../resource'




type VersionType = 'versions'
type VersionRel = ResourceRel & { type: VersionType }


export type VersionSort = Pick<Version, 'id'> & ResourceSort
// export type VersionFilter = Pick<Version, 'id' | 'resource_type' | 'resource_id'> & ResourceFilter


interface Version extends Resource {
	
	readonly type: VersionType

	/** 
	 * The type of the versioned resource.
	 * @example ```"orders"```
	 */
	resource_type?: string | null
	/** 
	 * The versioned resource id.
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
	 * @example ```"[object Object]"```
	 */
	changes?: Record<string, any> | null
	/** 
	 * Information about who triggered the change..
	 * @example ```"[object Object]"```
	 */
	who?: Record<string, any> | null
	
}


class Versions extends ApiResource<Version> {

	static readonly TYPE: VersionType = 'versions' as const

	


	isVersion(resource: any): resource is Version {
		return resource.type && (resource.type === Versions.TYPE)
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


export default Versions

export type { Version, VersionType }
