import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import { QueryParamsList, QueryParamsRetrieve } from '../query'

import { StockLocation } from './stock_locations'
import { Sku } from './skus'
import { Attachment } from './attachments'


type StockItemRel = ResourceRel & { type: typeof StockItems.TYPE }
type StockLocationRel = ResourceRel & { type: 'stock_locations' }
type SkuRel = ResourceRel & { type: 'skus' }


interface StockItem extends Resource {
	
	sku_code?: string
	quantity?: number

	stock_location?: StockLocation
	sku?: Sku
	attachments?: Attachment[]

}


interface StockItemCreate extends ResourceCreate {
	
	sku_code?: string
	quantity: number

	stock_location: StockLocationRel
	sku?: SkuRel

}


interface StockItemUpdate extends ResourceUpdate {
	
	sku_code?: string
	quantity?: number

	stock_location?: StockLocationRel
	sku?: SkuRel

}


class StockItems extends ApiResource {

	static readonly TYPE: 'stock_items' = 'stock_items'
	// static readonly PATH = 'stock_items'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<StockItem>> {
		return this.resources.list<StockItem>({ type: StockItems.TYPE }, params, options)
	}

	async create(resource: StockItemCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockItem> {
		return this.resources.create({ ...resource, type: StockItems.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockItem> {
		return this.resources.retrieve<StockItem>({ type: StockItems.TYPE, id }, params, options)
	}

	async update(resource: StockItemUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockItem> {
		return this.resources.update({ ...resource, type: StockItems.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: StockItems.TYPE, id }, options)
	}

	async stock_location(stockItemId: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockLocation> {
		return this.resources.fetch<StockLocation>({ type: 'stock_locations' }, `stock_items/${stockItemId}/stock_location`, params, options) as unknown as StockLocation
	}

	async sku(stockItemId: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Sku> {
		return this.resources.fetch<Sku>({ type: 'skus' }, `stock_items/${stockItemId}/sku`, params, options) as unknown as Sku
	}

	async attachments(stockItemId: string, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `stock_items/${stockItemId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isStockItem(resource: any): resource is StockItem {
		return resource.type && (resource.type === StockItems.TYPE)
	}


	relationship(id: string | ResourceId | null): StockItemRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: StockItems.TYPE } : { id: id.id, type: StockItems.TYPE }
	}


	type(): string {
		return StockItems.TYPE
	}

}


export default StockItems

export { StockItem, StockItemCreate, StockItemUpdate }
