import { ApiResource, Resource, ResourceCreate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Event } from './events'


type ImportType = 'imports'
type ImportRel = ResourceRel & { type: ImportType }


interface Import extends Resource {
	
	readonly type: ImportType

	resource_type: string
	parent_resource_id?: string
	status?: 'pending' | 'in_progress' | 'interrupted' | 'completed'
	started_at?: string
	completed_at?: string
	interrupted_at?: string
	inputs: object[]
	inputs_size?: number
	errors_count?: number
	warnings_count?: number
	destroyed_count?: number
	processed_count?: number
	errors_log?: object
	warnings_log?: object
	cleanup_records?: boolean
	attachment_url?: string

	events?: Event[]

}


interface ImportCreate extends ResourceCreate {
	
	resource_type: string
	format?: string
	parent_resource_id?: string
	inputs: object[]
	cleanup_records?: boolean
	
}


class Imports extends ApiResource<Import> {

	static readonly TYPE: ImportType = 'imports' as const
	// static readonly PATH = 'imports'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Import>> {
		return this.resources.list<Import>({ type: Imports.TYPE }, params, options)
	}

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
