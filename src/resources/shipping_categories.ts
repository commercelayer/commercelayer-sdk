import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Sku } from './skus'
import type { Attachment } from './attachments'


type ShippingCategoryType = 'shipping_categories'
type ShippingCategoryRel = ResourceRel & { type: ShippingCategoryType }


interface ShippingCategory extends Resource {
	
	readonly type: ShippingCategoryType

	name: string

	skus?: Sku[]
	attachments?: Attachment[]

}


interface ShippingCategoryCreate extends ResourceCreate {
	
	name: string
	
}


interface ShippingCategoryUpdate extends ResourceUpdate {
	
	name: string
	
}


class ShippingCategories extends ApiResource<ShippingCategory> {

	static readonly TYPE: ShippingCategoryType = 'shipping_categories' as const

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<ShippingCategory>> {
		return this.resources.list<ShippingCategory>({ type: ShippingCategories.TYPE }, params, options)
	}

	async create(resource: ShippingCategoryCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ShippingCategory> {
		return this.resources.create<ShippingCategoryCreate, ShippingCategory>({ ...resource, type: ShippingCategories.TYPE }, params, options)
	}

	async update(resource: ShippingCategoryUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ShippingCategory> {
		return this.resources.update<ShippingCategoryUpdate, ShippingCategory>({ ...resource, type: ShippingCategories.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: ShippingCategories.TYPE } : id, options)
	}

	async skus(shippingCategoryId: string | ShippingCategory, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Sku>> {
		const _shippingCategoryId = (shippingCategoryId as ShippingCategory).id || shippingCategoryId as string
		return this.resources.fetch<Sku>({ type: 'skus' }, `shipping_categories/${_shippingCategoryId}/skus`, params, options) as unknown as ListResponse<Sku>
	}

	async attachments(shippingCategoryId: string | ShippingCategory, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _shippingCategoryId = (shippingCategoryId as ShippingCategory).id || shippingCategoryId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `shipping_categories/${_shippingCategoryId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}


	isShippingCategory(resource: any): resource is ShippingCategory {
		return resource.type && (resource.type === ShippingCategories.TYPE)
	}


	relationship(id: string | ResourceId | null): ShippingCategoryRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: ShippingCategories.TYPE } : { id: id.id, type: ShippingCategories.TYPE }
	}


	type(): ShippingCategoryType {
		return ShippingCategories.TYPE
	}

}


export default ShippingCategories

export type { ShippingCategory, ShippingCategoryCreate, ShippingCategoryUpdate, ShippingCategoryType }
