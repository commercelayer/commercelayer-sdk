import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSortable, ResourceFilterable } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Event, EventSortable } from './events'


type ExportType = 'exports'
type ExportRel = ResourceRel & { type: ExportType }


export type ExportSortable = Pick<Export, 'id' | 'resource_type' | 'format' | 'status' | 'started_at' | 'completed_at' | 'interrupted_at' | 'records_count' | 'attachment_url'> & ResourceSortable
export type ExportFilterable = Pick<Export, 'id' | 'resource_type' | 'format' | 'status' | 'started_at' | 'completed_at' | 'interrupted_at' | 'records_count' | 'attachment_url'> & ResourceFilterable


interface Export extends Resource {
	
	readonly type: ExportType

	resource_type: string
	format?: string | null
	status: 'pending' | 'in_progress' | 'completed'
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


class Exports extends ApiResource<Export, ExportSortable> {

	static readonly TYPE: ExportType = 'exports' as const

	async create(resource: ExportCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Export> {
		return this.resources.create<ExportCreate, Export>({ ...resource, type: Exports.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: Exports.TYPE } : id, options)
	}

	async events(exportId: string | Export, params?: QueryParamsList<EventSortable>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _exportId = (exportId as Export).id || exportId as string
		return this.resources.fetch<Event, EventSortable>({ type: 'events' }, `exports/${_exportId}/events`, params, options) as unknown as ListResponse<Event>
	}


	isExport(resource: any): resource is Export {
		return resource.type && (resource.type === Exports.TYPE)
	}


	relationship(id: string | ResourceId | null): ExportRel {
		return super.relationshipOneToOne<ExportRel>(id)
	}

	relationshipToMany(...ids: string[]): ExportRel[] {
		return super.relationshipOneToMany<ExportRel>(...ids)
	}


	type(): ExportType {
		return Exports.TYPE
	}

}


export default Exports

export type { Export, ExportCreate, ExportType }

/*
export const ExportsClient = (init: ResourceAdapter | ResourcesInitConfig): Exports => {
	return new Exports((init instanceof ResourcesInitConfig)? ApiResourceAdapter(init) : init )
}
*/
