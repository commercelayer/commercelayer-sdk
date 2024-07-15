import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Event } from './events'


type ExportType = 'exports'
type ExportRel = ResourceRel & { type: ExportType }


interface Export extends Resource {
	
	readonly type: ExportType

	resource_type: string
	format?: string | null
	status: 'pending' | 'in_progress' | 'interrupted' | 'completed'
	includes?: string[] | null
	filters?: Record<string, any> | null
	dry_data?: boolean | null
	started_at?: string | null
	completed_at?: string | null
	interrupted_at?: string | null
	records_count?: number | null
	attachment_url?: string | null

	events?: Event[] | null

}


interface ExportCreate extends ResourceCreate {
	
	resource_type: string
	format?: string | null
	includes?: string[] | null
	filters?: Record<string, any> | null
	dry_data?: boolean | null
	
}


class Exports extends ApiResource<Export> {

	static readonly TYPE: ExportType = 'exports' as const

	async create(resource: ExportCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Export> {
		return this.resources.create<ExportCreate, Export>({ ...resource, type: Exports.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: Exports.TYPE } : id, options)
	}

	async events(exportId: string | Export, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _exportId = (exportId as Export).id || exportId as string
		return this.resources.fetch<Event>({ type: 'events' }, `exports/${_exportId}/events`, params, options) as unknown as ListResponse<Event>
	}


	isExport(resource: any): resource is Export {
		return resource.type && (resource.type === Exports.TYPE)
	}


	relationship(id: string | ResourceId | null): ExportRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: Exports.TYPE } : { id: id.id, type: Exports.TYPE }
	}


	type(): ExportType {
		return Exports.TYPE
	}

}


export default Exports

export type { Export, ExportCreate, ExportType }
