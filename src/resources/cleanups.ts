import { ApiResource, Resource, ResourceCreate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Event } from './events'


type CleanupType = 'cleanups'
type CleanupRel = ResourceRel & { type: CleanupType }


interface Cleanup extends Resource {
	
	readonly type: CleanupType

	resource_type: string
	status?: 'pending' | 'in_progress' | 'interrupted' | 'completed'
	started_at?: string
	completed_at?: string
	interrupted_at?: string
	filters?: object
	records_count?: number
	errors_count?: number
	processed_count?: number
	errors_log?: object

	events?: Event[]

}


interface CleanupCreate extends ResourceCreate {
	
	resource_type: string
	filters?: object
	
}


class Cleanups extends ApiResource<Cleanup> {

	static readonly TYPE: CleanupType = 'cleanups' as const
	// static readonly PATH = 'cleanups'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Cleanup>> {
		return this.resources.list<Cleanup>({ type: Cleanups.TYPE }, params, options)
	}

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
