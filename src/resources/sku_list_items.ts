/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.7.0
 * Generation date: 14-09-2021
 **/

import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { SkuList } from './sku_lists'
import { Sku } from './skus'


type SkuListItemRel = ResourceId & { type: typeof SkuListItems.TYPE }
type SkuListRel = ResourceId & { type: 'sku_lists' }
type SkuRel = ResourceId & { type: 'skus' }


interface SkuListItem extends Resource {
	
	position?: number
	quantity?: number

	sku_list?: SkuList
	sku?: Sku

}


interface SkuListItemCreate extends ResourceCreate {
	
	position: number
	quantity: number

	sku_list?: SkuListRel
	sku?: SkuRel

}


interface SkuListItemUpdate extends ResourceUpdate {
	
	position?: number
	quantity?: number
	
}


class SkuListItems extends ApiResource {

	static readonly TYPE: 'sku_list_items' = 'sku_list_items'
	// static readonly PATH = 'sku_list_items'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<SkuListItem>> {
		return this.resources.list({ type: SkuListItems.TYPE }, params, options)
	}

	async create(resource: SkuListItemCreate, options?: ResourcesConfig): Promise<SkuListItem> {
		return this.resources.create(Object.assign(resource, { type: SkuListItems.TYPE }) , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuListItem> {
		return this.resources.retrieve<SkuListItem>({ type: SkuListItems.TYPE, id }, params, options)
	}

	async update(resource: SkuListItemUpdate, options?: ResourcesConfig): Promise<SkuListItem> {
		return this.resources.update({ ...resource, type: SkuListItems.TYPE }, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: SkuListItems.TYPE, id }, options)
	}
	


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isSkuListItem(resource: any): resource is SkuListItem {
		return resource.type && (resource.type === SkuListItems.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(SkuListItems.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(SkuListItems.TYPE)
	}
	*/

	relationship(id: string | ResourceId): SkuListItemRel {
		return (typeof id === 'string') ? { id, type: SkuListItems.TYPE } : {id: id.id, type: SkuListItems.TYPE }
	}

}


export default SkuListItems

export { SkuListItem, SkuListItemCreate, SkuListItemUpdate }
