/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.7.0
 * Generation date: 14-09-2021
 **/

import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { Sku } from './skus'
import { Attachment } from './attachments'


type ShippingCategoryRel = ResourceId & { type: typeof ShippingCategories.TYPE }


interface ShippingCategory extends Resource {
	
	name?: string

	skus?: Sku[]
	attachments?: Attachment[]

}


interface ShippingCategoryCreate extends ResourceCreate {
	
	name: string
	
}


interface ShippingCategoryUpdate extends ResourceUpdate {
	
	name?: string
	
}


class ShippingCategories extends ApiResource {

	static readonly TYPE: 'shipping_categories' = 'shipping_categories'
	// static readonly PATH = 'shipping_categories'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<ShippingCategory>> {
		return this.resources.list({ type: ShippingCategories.TYPE }, params, options)
	}

	async create(resource: ShippingCategoryCreate, options?: ResourcesConfig): Promise<ShippingCategory> {
		return this.resources.create(Object.assign(resource, { type: ShippingCategories.TYPE }) , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ShippingCategory> {
		return this.resources.retrieve<ShippingCategory>({ type: ShippingCategories.TYPE, id }, params, options)
	}

	async update(resource: ShippingCategoryUpdate, options?: ResourcesConfig): Promise<ShippingCategory> {
		return this.resources.update({ ...resource, type: ShippingCategories.TYPE }, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: ShippingCategories.TYPE, id }, options)
	}
	


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isShippingCategory(resource: any): resource is ShippingCategory {
		return resource.type && (resource.type === ShippingCategories.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(ShippingCategories.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(ShippingCategories.TYPE)
	}
	*/

	relationship(id: string | ResourceId): ShippingCategoryRel {
		return (typeof id === 'string') ? { id, type: ShippingCategories.TYPE } : {id: id.id, type: ShippingCategories.TYPE }
	}

}


export default ShippingCategories

export { ShippingCategory, ShippingCategoryCreate, ShippingCategoryUpdate }
