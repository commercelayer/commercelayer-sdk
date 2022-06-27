import { ApiResource, Resource, ResourceCreate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import { QueryParamsList, QueryParamsRetrieve } from '../query'

import { Event } from './events'


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
	destroyed_count?: number
	processed_count?: number
	errors_log?: object
	warnings_log?: object
	cleanup_records?: boolean

	events?: Event[]

}


interface ImportCreate extends ResourceCreate {
	
	resource_type: string
	parent_resource_id?: string
	inputs: object[]
	cleanup_records?: boolean
	
}


class Imports extends ApiResource {

	static readonly TYPE: 'imports' = 'imports'
	// static readonly PATH = 'imports'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Import>> {
		return this.resources.list({ type: Imports.TYPE }, params, options)
	}

	async create(resource: ImportCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Import> {
		return this.resources.create({ ...resource, type: Imports.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Import> {
		return this.resources.retrieve<Import>({ type: Imports.TYPE, id }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: Imports.TYPE, id }, options)
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
