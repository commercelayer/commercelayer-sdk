import { ApiResource } from '../resource'
import type { Resource, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsList } from '../query'

import type { EventStore } from './event_stores'


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
	 * @example ```{"status":["draft","placed"]}```
	 */
	changes?: Record<string, any> | null
	/** 
	 * Information about who triggered the change.
	 * @example ```{"application":{"id":"DNOPYiZYpn","kind":"sales_channel","public":true},"owner":{"id":"yQQrBhLBmQ","type":"Customer"}}```
	 */
	who?: Record<string, any> | null

	event_stores?: EventStore[] | null

}


class Versions extends ApiResource<Version> {

	static readonly TYPE: VersionType = 'versions' as const

	async event_stores(versionId: string | Version, params?: QueryParamsList<EventStore>, options?: ResourcesConfig): Promise<ListResponse<EventStore>> {
		const _versionId = (versionId as Version).id || versionId as string
		return this.resources.fetch<EventStore>({ type: 'event_stores' }, `versions/${_versionId}/event_stores`, params, options) as unknown as ListResponse<EventStore>
	}


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
