import { ApiResource, Resource, ResourceCreate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { Event } from './events'


type ExportRel = ResourceRel & { type: typeof Exports.TYPE }


interface Export extends Resource {
	
	resource_type?: string
	format?: string
	status?: string
	includes?: string[]
	filters?: object
	dry_data?: boolean
	started_at?: string
	completed_at?: string
	interrupted_at?: string
	records_count?: number
	attachment_url?: string

	events?: Event[]

}


interface ExportCreate extends ResourceCreate {
	
	resource_type: string
	format?: string
	includes?: string[]
	filters?: object
	dry_data?: boolean
	
}


class Exports extends ApiResource {

	static readonly TYPE: 'exports' = 'exports' as const
	// static readonly PATH = 'exports'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Export>> {
		return this.resources.list<Export>({ type: Exports.TYPE }, params, options)
	}

	async create(resource: ExportCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Export> {
		return this.resources.create<ExportCreate, Export>({ ...resource, type: Exports.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Export> {
		return this.resources.retrieve<Export>({ type: Exports.TYPE, id }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: Exports.TYPE, id }, options)
	}

	async events(exportId: string | Export, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _exportId = (exportId as Export).id || exportId
		return this.resources.fetch<Event>({ type: 'events' }, `exports/${_exportId}/events`, params, options) as unknown as ListResponse<Event>
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isExport(resource: any): resource is Export {
		return resource.type && (resource.type === Exports.TYPE)
	}


	relationship(id: string | ResourceId | null): ExportRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: Exports.TYPE } : { id: id.id, type: Exports.TYPE }
	}


	type(): string {
		return Exports.TYPE
	}

}


export default Exports

export { Export, ExportCreate }
