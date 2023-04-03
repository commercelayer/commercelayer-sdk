import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Event } from './events'


type CleanupType = 'cleanups'
type CleanupRel = ResourceRel & { type: CleanupType }


interface Cleanup extends Resource {
	
	readonly type: CleanupType

	resource_type: string
	status: 'pending' | 'in_progress' | 'interrupted' | 'completed'
	started_at?: string | null
	completed_at?: string | null
	interrupted_at?: string | null
	filters?: object | null
	records_count?: number | null
	errors_count?: number | null
	processed_count?: number | null
	errors_log?: object | null

	events?: Event[] | null

}


interface CleanupCreate extends ResourceCreate {
	
	resource_type: string
	filters?: object | null
	
}


class Cleanups extends ApiResource<Cleanup> {

	static readonly TYPE: CleanupType = 'cleanups' as const

	async create(resource: CleanupCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Cleanup> {
		return this.resources.create<CleanupCreate, Cleanup>({ ...resource, type: Cleanups.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: Cleanups.TYPE } : id, options)
	}

	async events(cleanupId: string | Cleanup, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _cleanupId = (cleanupId as Cleanup).id || cleanupId as string
		return this.resources.fetch<Event>({ type: 'events' }, `cleanups/${_cleanupId}/events`, params, options) as unknown as ListResponse<Event>
	}


	isCleanup(resource: any): resource is Cleanup {
		return resource.type && (resource.type === Cleanups.TYPE)
	}


	relationship(id: string | ResourceId | null): CleanupRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: Cleanups.TYPE } : { id: id.id, type: Cleanups.TYPE }
	}


	type(): CleanupType {
		return Cleanups.TYPE
	}

}


export default Cleanups

export type { Cleanup, CleanupCreate, CleanupType }
