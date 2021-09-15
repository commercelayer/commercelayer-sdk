/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.7.0
 * Generation date: 14-09-2021
 **/

import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { Sku } from './skus'
import { SkuListItem } from './sku_list_items'
import { Bundle } from './bundles'


type SkuListRel = ResourceId & { type: typeof SkuLists.TYPE }


interface SkuList extends Resource {
	
	name?: string
	slug?: string
	description?: string
	image_url?: string
	manual?: boolean
	sku_code_regex?: string

	skus?: Sku[]
	sku_list_items?: SkuListItem[]
	bundles?: Bundle[]

}


interface SkuListCreate extends ResourceCreate {
	
	name: string
	description?: string
	image_url?: string
	manual?: boolean
	sku_code_regex?: string
	
}


interface SkuListUpdate extends ResourceUpdate {
	
	name?: string
	description?: string
	image_url?: string
	manual?: boolean
	sku_code_regex?: string
	
}


class SkuLists extends ApiResource {

	static readonly TYPE: 'sku_lists' = 'sku_lists'
	// static readonly PATH = 'sku_lists'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<SkuList>> {
		return this.resources.list({ type: SkuLists.TYPE }, params, options)
	}

	async create(resource: SkuListCreate, options?: ResourcesConfig): Promise<SkuList> {
		return this.resources.create(Object.assign(resource, { type: SkuLists.TYPE }) , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuList> {
		return this.resources.retrieve<SkuList>({ type: SkuLists.TYPE, id }, params, options)
	}

	async update(resource: SkuListUpdate, options?: ResourcesConfig): Promise<SkuList> {
		return this.resources.update({ ...resource, type: SkuLists.TYPE }, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: SkuLists.TYPE, id }, options)
	}
	


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isSkuList(resource: any): resource is SkuList {
		return resource.type && (resource.type === SkuLists.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(SkuLists.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(SkuLists.TYPE)
	}
	*/

	relationship(id: string | ResourceId): SkuListRel {
		return (typeof id === 'string') ? { id, type: SkuLists.TYPE } : {id: id.id, type: SkuLists.TYPE }
	}

}


export default SkuLists

export { SkuList, SkuListCreate, SkuListUpdate }
