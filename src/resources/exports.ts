import type { Nullable } from '../types'
import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Event } from './events'


type ExportType = 'exports'
type ExportRel = ResourceRel & { type: ExportType }


export type ExportSort = Pick<Export, 'id' | 'resource_type' | 'format' | 'status' | 'started_at' | 'completed_at' | 'interrupted_at' | 'records_count' | 'attachment_url'> & ResourceSort
// export type ExportFilter = Pick<Export, 'id' | 'resource_type' | 'format' | 'status' | 'started_at' | 'completed_at' | 'interrupted_at' | 'records_count' | 'attachment_url'> & ResourceFilter


interface Export extends Resource {
	
	readonly type: ExportType

	resource_type: string
	format?: Nullable<string>
	status: 'pending' | 'in_progress' | 'completed'
	includes?: Nullable<string[]>
	filters?: Nullable<Record<string, any>>
	dry_data?: Nullable<boolean>
	started_at?: Nullable<string>
	completed_at?: Nullable<string>
	interrupted_at?: Nullable<string>
	records_count?: Nullable<number>
	attachment_url?: Nullable<string>

	events?: Nullable<Event[]>

}


interface ExportCreate extends ResourceCreate {
	
	resource_type: string
	format?: Nullable<string>
	includes?: Nullable<string[]>
	filters?: Nullable<Record<string, any>>
	dry_data?: Nullable<boolean>
	
}


class Exports extends ApiResource<Export> {

	static readonly TYPE: ExportType = 'exports' as const

	async create(resource: ExportCreate, params?: QueryParamsRetrieve<Export>, options?: ResourcesConfig): Promise<Export> {
		return this.resources.create<ExportCreate, Export>({ ...resource, type: Exports.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: Exports.TYPE } : id, options)
	}

	async events(exportId: string | Export, params?: QueryParamsList<Event>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _exportId = (exportId as Export).id || exportId as string
		return this.resources.fetch<Event>({ type: 'events' }, `exports/${_exportId}/events`, params, options) as unknown as ListResponse<Event>
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
