import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Event } from './events'


type ImportType = 'imports'
type ImportRel = ResourceRel & { type: ImportType }


export type ImportSort = Pick<Import, 'id' | 'attachment_url' | 'completed_at' | 'errors_count' | 'format' | 'inputs_size' | 'interrupted_at' | 'parent_resource_id' | 'processed_count' | 'resource_type' | 'started_at' | 'status' | 'warnings_count'> & ResourceSort
// export type ImportFilter = Pick<Import, 'id' | 'attachment_url' | 'completed_at' | 'errors_count' | 'format' | 'inputs_size' | 'interrupted_at' | 'parent_resource_id' | 'processed_count' | 'resource_type' | 'started_at' | 'status' | 'warnings_count'> & ResourceFilter


interface Import extends Resource {
	
	readonly type: ImportType

	/** 
	 * The URL the the raw inputs file, which will be generated at import start.
	 * @example ```"http://cl_imports.s3.amazonaws.com/"```
	 */
	attachment_url?: string | null
	/** 
	 * Time at which the import was completed.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	completed_at?: string | null
	/** 
	 * Indicates the number of import errors, if any.
	 * @example ```"30"```
	 */
	errors_count?: number | null
	/** 
	 * Contains the import errors, if any.
	 * @example ```"[object Object]"```
	 */
	errors_log?: Record<string, any> | null
	/** 
	 * The format of the import inputs one of 'json' (default) or 'csv'.
	 * @example ```"json"```
	 */
	format?: string | null
	/** 
	 * Array of objects representing the resources that are being imported.
	 * @example ```"[object Object],[object Object]"```
	 */
	inputs: Array<Record<string, any>>
	/** 
	 * Indicates the size of the objects to be imported.
	 * @example ```"300"```
	 */
	inputs_size?: number | null
	/** 
	 * Time at which the import was interrupted.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	interrupted_at?: string | null
	/** 
	 * The ID of the parent resource to be associated with imported data.
	 * @example ```"1234"```
	 */
	parent_resource_id?: string | null
	/** 
	 * Indicates the number of records that have been processed (created or updated).
	 * @example ```"270"```
	 */
	processed_count?: number | null
	/** 
	 * The type of resource being imported.
	 * @example ```"skus"```
	 */
	resource_type: string
	/** 
	 * Time at which the import was started.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	started_at?: string | null
	/** 
	 * The import job status. One of 'pending' (default), 'in_progress', 'interrupted', or 'completed'.
	 * @example ```"in_progress"```
	 */
	status: 'pending' | 'in_progress' | 'interrupted' | 'completed'
	/** 
	 * Indicates the number of import warnings, if any.
	 * @example ```"1"```
	 */
	warnings_count?: number | null
	/** 
	 * Contains the import warnings, if any.
	 * @example ```"[object Object]"```
	 */
	warnings_log?: Record<string, any> | null

	events?: Event[] | null

}


interface ImportCreate extends ResourceCreate {
	
	/** 
	 * The format of the import inputs one of 'json' (default) or 'csv'.
	 * @example ```"json"```
	 */
	format?: string | null
	/** 
	 * Array of objects representing the resources that are being imported.
	 * @example ```"[object Object],[object Object]"```
	 */
	inputs: Array<Record<string, any>>
	/** 
	 * The ID of the parent resource to be associated with imported data.
	 * @example ```"1234"```
	 */
	parent_resource_id?: string | null
	/** 
	 * The type of resource being imported.
	 * @example ```"skus"```
	 */
	resource_type: string
	
}


class Imports extends ApiResource<Import> {

	static readonly TYPE: ImportType = 'imports' as const

	async create(resource: ImportCreate, params?: QueryParamsRetrieve<Import>, options?: ResourcesConfig): Promise<Import> {
		return this.resources.create<ImportCreate, Import>({ ...resource, type: Imports.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: Imports.TYPE } : id, options)
	}

	async events(importId: string | Import, params?: QueryParamsList<Event>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _importId = (importId as Import).id || importId as string
		return this.resources.fetch<Event>({ type: 'events' }, `imports/${_importId}/events`, params, options) as unknown as ListResponse<Event>
	}


	isImport(resource: any): resource is Import {
		return resource.type && (resource.type === Imports.TYPE)
	}


	relationship(id: string | ResourceId | null): ImportRel {
		return super.relationshipOneToOne<ImportRel>(id)
	}

	relationshipToMany(...ids: string[]): ImportRel[] {
		return super.relationshipOneToMany<ImportRel>(...ids)
	}


	type(): ImportType {
		return Imports.TYPE
	}

}


export default Imports

export type { Import, ImportCreate, ImportType }
