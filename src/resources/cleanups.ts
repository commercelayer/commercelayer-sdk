import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Event } from './events'
import type { Version } from './versions'


type CleanupType = 'cleanups'
type CleanupRel = ResourceRel & { type: CleanupType }


export type CleanupSort = Pick<Cleanup, 'id' | 'resource_type' | 'status' | 'started_at' | 'completed_at' | 'interrupted_at' | 'records_count' | 'errors_count' | 'processed_count'> & ResourceSort
// export type CleanupFilter = Pick<Cleanup, 'id' | 'resource_type' | 'status' | 'started_at' | 'completed_at' | 'interrupted_at' | 'records_count' | 'errors_count' | 'processed_count'> & ResourceFilter


interface Cleanup extends Resource {
	
	readonly type: CleanupType

	/** 
	 * The type of resource being cleaned.
	 * @example ```"skus"```
	 */
	resource_type: string
	/** 
	 * The cleanup job status. One of 'pending' (default), 'in_progress', 'interrupted', or 'completed'.
	 * @example ```"in_progress"```
	 */
	status: 'pending' | 'in_progress' | 'interrupted' | 'completed'
	/** 
	 * Time at which the cleanup was started.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	started_at?: string | null
	/** 
	 * Time at which the cleanup was completed.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	completed_at?: string | null
	/** 
	 * Time at which the cleanup was interrupted.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	interrupted_at?: string | null
	/** 
	 * The filters used to select the records to be cleaned.
	 * @example ```"[object Object]"```
	 */
	filters?: Record<string, any> | null
	/** 
	 * Indicates the number of records to be cleaned.
	 * @example ```"300"```
	 */
	records_count?: number | null
	/** 
	 * Indicates the number of cleanup errors, if any.
	 * @example ```"30"```
	 */
	errors_count?: number | null
	/** 
	 * Indicates the number of records that have been cleaned.
	 * @example ```"270"```
	 */
	processed_count?: number | null
	/** 
	 * Contains the cleanup errors, if any.
	 * @example ```"[object Object]"```
	 */
	errors_log?: Record<string, any> | null

	events?: Event[] | null
	versions?: Version[] | null

}


interface CleanupCreate extends ResourceCreate {
	
	/** 
	 * The type of resource being cleaned.
	 * @example ```"skus"```
	 */
	resource_type: string
	/** 
	 * The filters used to select the records to be cleaned.
	 * @example ```"[object Object]"```
	 */
	filters?: Record<string, any> | null
	
}


type CleanupUpdate = ResourceUpdate


class Cleanups extends ApiResource<Cleanup> {

	static readonly TYPE: CleanupType = 'cleanups' as const

	async create(resource: CleanupCreate, params?: QueryParamsRetrieve<Cleanup>, options?: ResourcesConfig): Promise<Cleanup> {
		return this.resources.create<CleanupCreate, Cleanup>({ ...resource, type: Cleanups.TYPE }, params, options)
	}

	async update(resource: CleanupUpdate, params?: QueryParamsRetrieve<Cleanup>, options?: ResourcesConfig): Promise<Cleanup> {
		return this.resources.update<CleanupUpdate, Cleanup>({ ...resource, type: Cleanups.TYPE }, params, options)
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

export type { Cleanup, CleanupCreate, CleanupUpdate, CleanupType }
