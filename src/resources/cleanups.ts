import { ApiResource, Resource, ResourceCreate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { Event } from './events'
import type { Version } from './versions'


type CleanupRel = ResourceRel & { type: typeof Cleanups.TYPE }


interface Cleanup extends Resource {
	
	resource_type?: string
	status?: string
	started_at?: string
	completed_at?: string
	interrupted_at?: string
	filters?: object
	records_count?: number
	errors_count?: number
	processed_count?: number
	errors_log?: object

	events?: Event[]
	versions?: Version[]

}


interface CleanupCreate extends ResourceCreate {
	
	resource_type: string
	filters?: object
	
}


class Cleanups extends ApiResource {

	static readonly TYPE: 'cleanups' = 'cleanups' as const
	// static readonly PATH = 'cleanups'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Cleanup>> {
		return this.resources.list<Cleanup>({ type: Cleanups.TYPE }, params, options)
	}

	async create(resource: CleanupCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Cleanup> {
		return this.resources.create<CleanupCreate, Cleanup>({ ...resource, type: Cleanups.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Cleanup> {
		return this.resources.retrieve<Cleanup>({ type: Cleanups.TYPE, id }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: Cleanups.TYPE, id }, options)
	}

	async events(cleanupId: string | Cleanup, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _cleanupId = (cleanupId as Cleanup).id || cleanupId as string
		return this.resources.fetch<Event>({ type: 'events' }, `cleanups/${_cleanupId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async versions(cleanupId: string | Cleanup, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _cleanupId = (cleanupId as Cleanup).id || cleanupId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `cleanups/${_cleanupId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isCleanup(resource: any): resource is Cleanup {
		return resource.type && (resource.type === Cleanups.TYPE)
	}


	relationship(id: string | ResourceId | null): CleanupRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: Cleanups.TYPE } : { id: id.id, type: Cleanups.TYPE }
	}


	type(): string {
		return Cleanups.TYPE
	}

}


export default Cleanups

export { Cleanup, CleanupCreate }
