import type { Nullable } from '../types'
import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Event } from './events'
import type { Version } from './versions'


type CleanupType = 'cleanups'
type CleanupRel = ResourceRel & { type: CleanupType }


export type CleanupSort = Pick<Cleanup, 'id' | 'resource_type' | 'status' | 'started_at' | 'completed_at' | 'interrupted_at' | 'records_count' | 'errors_count' | 'processed_count'> & ResourceSort
// export type CleanupFilter = Pick<Cleanup, 'id' | 'resource_type' | 'status' | 'started_at' | 'completed_at' | 'interrupted_at' | 'records_count' | 'errors_count' | 'processed_count'> & ResourceFilter


interface Cleanup extends Resource {
	
	readonly type: CleanupType

	resource_type: string
	status: 'pending' | 'in_progress' | 'interrupted' | 'completed'
	started_at?: Nullable<string>
	completed_at?: Nullable<string>
	interrupted_at?: Nullable<string>
	filters?: Nullable<Record<string, any>>
	records_count?: Nullable<number>
	errors_count?: Nullable<number>
	processed_count?: Nullable<number>
	errors_log?: Nullable<Record<string, any>>

	events?: Nullable<Event[]>
	versions?: Nullable<Version[]>

}


interface CleanupCreate extends ResourceCreate {
	
	resource_type: string
	filters?: Nullable<Record<string, any>>
	
}


class Cleanups extends ApiResource<Cleanup> {

	static readonly TYPE: CleanupType = 'cleanups' as const

	async create(resource: CleanupCreate, params?: QueryParamsRetrieve<Cleanup>, options?: ResourcesConfig): Promise<Cleanup> {
		return this.resources.create<CleanupCreate, Cleanup>({ ...resource, type: Cleanups.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: Cleanups.TYPE } : id, options)
	}

	async events(cleanupId: string | Cleanup, params?: QueryParamsList<Event>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _cleanupId = (cleanupId as Cleanup).id || cleanupId as string
		return this.resources.fetch<Event>({ type: 'events' }, `cleanups/${_cleanupId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async versions(cleanupId: string | Cleanup, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _cleanupId = (cleanupId as Cleanup).id || cleanupId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `cleanups/${_cleanupId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	isCleanup(resource: any): resource is Cleanup {
		return resource.type && (resource.type === Cleanups.TYPE)
	}


	relationship(id: string | ResourceId | null): CleanupRel {
		return super.relationshipOneToOne<CleanupRel>(id)
	}

	relationshipToMany(...ids: string[]): CleanupRel[] {
		return super.relationshipOneToMany<CleanupRel>(...ids)
	}


	type(): CleanupType {
		return Cleanups.TYPE
	}

}


export default Cleanups

export type { Cleanup, CleanupCreate, CleanupType }
