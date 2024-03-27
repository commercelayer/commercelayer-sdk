import { ApiResource } from '../resource'
import type { Resource, ResourceId, ResourceRel, ResourceSortable, ResourceFilterable } from '../resource'




type VersionType = 'versions'
type VersionRel = ResourceRel & { type: VersionType }


export type VersionSortable = Pick<Version, 'id'> & ResourceSortable
export type VersionFilterable = Pick<Version, 'id' | 'resource_type' | 'resource_id'> & ResourceFilterable


interface Version extends Resource {
	
	readonly type: VersionType

	resource_type?: string | null
	resource_id?: string | null
	event?: string | null
	changes?: Record<string, any> | null
	who?: Record<string, any> | null
	
}


class Versions extends ApiResource<Version, VersionSortable> {

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

/*
export const VersionsClient = (init: ResourceAdapter | ResourcesInitConfig): Versions => {
	return new Versions((init instanceof ResourcesInitConfig)? ApiResourceAdapter(init) : init )
}
*/
