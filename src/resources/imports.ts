import type { Nullable } from '../types'
import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Event } from './events'


type ImportType = 'imports'
type ImportRel = ResourceRel & { type: ImportType }


export type ImportSort = Pick<Import, 'id' | 'resource_type' | 'format' | 'parent_resource_id' | 'status' | 'started_at' | 'completed_at' | 'interrupted_at' | 'inputs_size' | 'errors_count' | 'warnings_count' | 'processed_count' | 'attachment_url'> & ResourceSort
// export type ImportFilter = Pick<Import, 'id' | 'resource_type' | 'format' | 'parent_resource_id' | 'status' | 'started_at' | 'completed_at' | 'interrupted_at' | 'inputs_size' | 'errors_count' | 'warnings_count' | 'processed_count' | 'attachment_url'> & ResourceFilter


interface Import extends Resource {
	
	readonly type: ImportType

	resource_type: string
	format?: Nullable<string>
	parent_resource_id?: Nullable<string>
	status: 'pending' | 'in_progress' | 'interrupted' | 'completed'
	started_at?: Nullable<string>
	completed_at?: Nullable<string>
	interrupted_at?: Nullable<string>
	inputs: Array<Record<string, any>>
	inputs_size?: Nullable<number>
	errors_count?: Nullable<number>
	warnings_count?: Nullable<number>
	processed_count?: Nullable<number>
	errors_log?: Nullable<Record<string, any>>
	warnings_log?: Nullable<Record<string, any>>
	attachment_url?: Nullable<string>

	events?: Nullable<Event[]>

}


interface ImportCreate extends ResourceCreate {
	
	resource_type: string
	format?: Nullable<string>
	parent_resource_id?: Nullable<string>
	inputs: Array<Record<string, any>>
	
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
