import { ApiResource, Resource, ResourceCreate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { Event } from './events'


type ImportRel = ResourceRel & { type: typeof Imports.TYPE }


interface Import extends Resource {
	
	resource_type?: string
	parent_resource_id?: string
	status?: string
	started_at?: string
	completed_at?: string
	interrupted_at?: string
	inputs?: object[]
	inputs_size?: number
	errors_count?: number
	warnings_count?: number
	processed_count?: number
	errors_log?: object
	warnings_log?: object
	attachment_url?: string

	events?: Event[]

}


interface ImportCreate extends ResourceCreate {
	
	resource_type: string
	format?: string
	parent_resource_id?: string
	inputs: object[]
	
}


class Imports extends ApiResource {

	static readonly TYPE: 'imports' = 'imports' as const
	// static readonly PATH = 'imports'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Import>> {
		return this.resources.list<Import>({ type: Imports.TYPE }, params, options)
	}

	async create(resource: ImportCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Import> {
		return this.resources.create<ImportCreate, Import>({ ...resource, type: Imports.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Import> {
		return this.resources.retrieve<Import>({ type: Imports.TYPE, id }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: Imports.TYPE, id }, options)
	}

	async events(importId: string | Import, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _importId = (importId as Import).id || importId as string
		return this.resources.fetch<Event>({ type: 'events' }, `imports/${_importId}/events`, params, options) as unknown as ListResponse<Event>
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isImport(resource: any): resource is Import {
		return resource.type && (resource.type === Imports.TYPE)
	}


	relationship(id: string | ResourceId | null): ImportRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: Imports.TYPE } : { id: id.id, type: Imports.TYPE }
	}


	type(): string {
		return Imports.TYPE
	}

}


export default Imports

export { Import, ImportCreate }
