import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Event } from './events'


type ImportType = 'imports'
type ImportRel = ResourceRel & { type: ImportType }


interface Import extends Resource {
	
	readonly type: ImportType

	resource_type: string
	parent_resource_id?: string | null
	status: 'pending' | 'in_progress' | 'interrupted' | 'completed'
	started_at?: string | null
	completed_at?: string | null
	interrupted_at?: string | null
	inputs: object[]
	inputs_size?: number | null
	errors_count?: number | null
	warnings_count?: number | null
	destroyed_count?: number | null
	processed_count?: number | null
	errors_log?: object | null
	warnings_log?: object | null
	cleanup_records?: boolean | null
	attachment_url?: string | null

	events?: Event[] | null

}


interface ImportCreate extends ResourceCreate {
	
	resource_type: string
	format?: string | null
	parent_resource_id?: string | null
	inputs: object[]
	cleanup_records?: boolean | null
	
}


class Imports extends ApiResource<Import> {

	static readonly TYPE: ImportType = 'imports' as const

	async create(resource: ImportCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Import> {
		return this.resources.create<ImportCreate, Import>({ ...resource, type: Imports.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: Imports.TYPE } : id, options)
	}

	async events(importId: string | Import, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _importId = (importId as Import).id || importId as string
		return this.resources.fetch<Event>({ type: 'events' }, `imports/${_importId}/events`, params, options) as unknown as ListResponse<Event>
	}


	isImport(resource: any): resource is Import {
		return resource.type && (resource.type === Imports.TYPE)
	}


	relationship(id: string | ResourceId | null): ImportRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: Imports.TYPE } : { id: id.id, type: Imports.TYPE }
	}


	type(): ImportType {
		return Imports.TYPE
	}

}


export default Imports

export type { Import, ImportCreate, ImportType }
