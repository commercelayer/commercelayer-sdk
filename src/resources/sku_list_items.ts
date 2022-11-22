import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { SkuList } from './sku_lists'
import type { Sku } from './skus'


type SkuListItemRel = ResourceRel & { type: typeof SkuListItems.TYPE }
type SkuListRel = ResourceRel & { type: 'sku_lists' }
type SkuRel = ResourceRel & { type: 'skus' }


interface SkuListItem extends Resource {
	
	position?: number
	sku_code?: string
	quantity?: number

	sku_list?: SkuList
	sku?: Sku

}


interface SkuListItemCreate extends ResourceCreate {
	
	position?: number
	sku_code?: string
	quantity?: number

	sku_list: SkuListRel
	sku: SkuRel

}


interface SkuListItemUpdate extends ResourceUpdate {
	
	position?: number
	sku_code?: string
	quantity?: number
	
}


class SkuListItems extends ApiResource {

	static readonly TYPE: 'sku_list_items' = 'sku_list_items' as const
	// static readonly PATH = 'sku_list_items'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<SkuListItem>> {
		return this.resources.list<SkuListItem>({ type: SkuListItems.TYPE }, params, options)
	}

	async create(resource: SkuListItemCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuListItem> {
		return this.resources.create<SkuListItemCreate, SkuListItem>({ ...resource, type: SkuListItems.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuListItem> {
		return this.resources.retrieve<SkuListItem>({ type: SkuListItems.TYPE, id }, params, options)
	}

	async update(resource: SkuListItemUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuListItem> {
		return this.resources.update<SkuListItemUpdate, SkuListItem>({ ...resource, type: SkuListItems.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: SkuListItems.TYPE, id }, options)
	}

	async sku_list(skuListItemId: string | SkuListItem, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuList> {
		const _skuListItemId = (skuListItemId as SkuListItem).id || skuListItemId as string
		return this.resources.fetch<SkuList>({ type: 'sku_lists' }, `sku_list_items/${_skuListItemId}/sku_list`, params, options) as unknown as SkuList
	}

	async sku(skuListItemId: string | SkuListItem, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Sku> {
		const _skuListItemId = (skuListItemId as SkuListItem).id || skuListItemId as string
		return this.resources.fetch<Sku>({ type: 'skus' }, `sku_list_items/${_skuListItemId}/sku`, params, options) as unknown as Sku
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isSkuListItem(resource: any): resource is SkuListItem {
		return resource.type && (resource.type === SkuListItems.TYPE)
	}


	relationship(id: string | ResourceId | null): SkuListItemRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: SkuListItems.TYPE } : { id: id.id, type: SkuListItems.TYPE }
	}


	type(): string {
		return SkuListItems.TYPE
	}

}


export default SkuListItems

export { SkuListItem, SkuListItemCreate, SkuListItemUpdate }
