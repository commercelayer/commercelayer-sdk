import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Event } from './events'


type ExportType = 'exports'
type ExportRel = ResourceRel & { type: ExportType }


export type ExportSort = Pick<Export, 'id' | 'resource_type' | 'format' | 'status' | 'started_at' | 'completed_at' | 'interrupted_at' | 'records_count' | 'attachment_url'> & ResourceSort
// export type ExportFilter = Pick<Export, 'id' | 'resource_type' | 'format' | 'status' | 'started_at' | 'completed_at' | 'interrupted_at' | 'records_count' | 'attachment_url' | 'errors_log'> & ResourceFilter


interface Export extends Resource {
	
	readonly type: ExportType

	/** 
	 * The type of resource being exported.
	 * @example ```"skus"```
	 */
	resource_type: string
	/** 
	 * The format of the export one of 'json' (default) or 'csv'.
	 * @example ```"json"```
	 */
	format?: string | null
	/** 
	 * The export job status. One of 'pending' (default), 'in_progress', 'interrupted', or 'completed'.
	 * @example ```"in_progress"```
	 */
	status: 'pending' | 'in_progress' | 'interrupted' | 'completed'
	/** 
	 * List of related resources that should be included in the export (redundant when 'fields' are specified).
	 * @example ```["prices.price_tiers"]```
	 */
	includes?: string[] | null
	/** 
	 * List of fields to export for the main and related resources (automatically included). Pass the asterisk '*' to include all exportable fields for the main and related resources.
	 * @example ```["code","name","prices.*","prices.price_tiers.price_amount_cents"]```
	 */
	fields?: string[] | null
	/** 
	 * The filters used to select the records to be exported.
	 * @example ```{"code_eq":"AAA"}```
	 */
	filters?: Record<string, any> | null
	/** 
	 * Send this attribute if you want to skip exporting redundant attributes (IDs, timestamps, blanks, etc.), useful when combining export and import to duplicate your dataset.
	 */
	dry_data?: boolean | null
	/** 
	 * Time at which the export was started.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	started_at?: string | null
	/** 
	 * Time at which the export was completed.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	completed_at?: string | null
	/** 
	 * Time at which the export was interrupted.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	interrupted_at?: string | null
	/** 
	 * Indicates the number of records to be exported.
	 * @example ```300```
	 */
	records_count?: number | null
	/** 
	 * The URL to the output file, which will be generated upon export completion.
	 * @example ```"http://cl_exports.s3.amazonaws.com/"```
	 */
	attachment_url?: string | null
	/** 
	 * Contains the exports errors, if any.
	 * @example ```{"RuntimeError":"query timeout"}```
	 */
	errors_log?: Record<string, any> | null

	events?: Event[] | null

}


interface ExportCreate extends ResourceCreate {
	
	/** 
	 * The type of resource being exported.
	 * @example ```"skus"```
	 */
	resource_type: string
	/** 
	 * The format of the export one of 'json' (default) or 'csv'.
	 * @example ```"json"```
	 */
	format?: string | null
	/** 
	 * List of related resources that should be included in the export (redundant when 'fields' are specified).
	 * @example ```["prices.price_tiers"]```
	 */
	includes?: string[] | null
	/** 
	 * List of fields to export for the main and related resources (automatically included). Pass the asterisk '*' to include all exportable fields for the main and related resources.
	 * @example ```["code","name","prices.*","prices.price_tiers.price_amount_cents"]```
	 */
	fields?: string[] | null
	/** 
	 * The filters used to select the records to be exported.
	 * @example ```{"code_eq":"AAA"}```
	 */
	filters?: Record<string, any> | null
	/** 
	 * Send this attribute if you want to skip exporting redundant attributes (IDs, timestamps, blanks, etc.), useful when combining export and import to duplicate your dataset.
	 */
	dry_data?: boolean | null
	
}


interface ExportUpdate extends ResourceUpdate {
	
	/** 
	 * Send this attribute if you want to mark status as 'interrupted'.
	 * @example ```true```
	 */
	_interrupt?: boolean | null
	
}


class Exports extends ApiResource<Export> {

	static readonly TYPE: ExportType = 'exports' as const

	async create(resource: ExportCreate, params?: QueryParamsRetrieve<Export>, options?: ResourcesConfig): Promise<Export> {
		return this.resources.create<ExportCreate, Export>({ ...resource, type: Exports.TYPE }, params, options)
	}

	async update(resource: ExportUpdate, params?: QueryParamsRetrieve<Export>, options?: ResourcesConfig): Promise<Export> {
		return this.resources.update<ExportUpdate, Export>({ ...resource, type: Exports.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: Exports.TYPE } : id, options)
	}

	async events(exportId: string | Export, params?: QueryParamsList<Event>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _exportId = (exportId as Export).id || exportId as string
		return this.resources.fetch<Event>({ type: 'events' }, `exports/${_exportId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async _interrupt(id: string | Export, params?: QueryParamsRetrieve<Export>, options?: ResourcesConfig): Promise<Export> {
		return this.resources.update<ExportUpdate, Export>({ id: (typeof id === 'string')? id: id.id, type: Exports.TYPE, _interrupt: true }, params, options)
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

export type { Export, ExportCreate, ExportUpdate, ExportType }
