import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Sku } from './skus'
import type { Attachment } from './attachments'
import type { Version } from './versions'


type ShippingCategoryType = 'shipping_categories'
type ShippingCategoryRel = ResourceRel & { type: ShippingCategoryType }


interface ShippingCategory extends Resource {
	
	readonly type: ShippingCategoryType

	name: string

	skus?: Sku[] | null
	attachments?: Attachment[] | null
	versions?: Version[] | null

}


interface ShippingCategoryCreate extends ResourceCreate {
	
	name: string
	
}


interface ShippingCategoryUpdate extends ResourceUpdate {
	
	name?: string | null
	
}


class ShippingCategories extends ApiResource<ShippingCategory> {

	static readonly TYPE: ShippingCategoryType = 'shipping_categories' as const

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

	async versions(shippingCategoryId: string | ShippingCategory, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _shippingCategoryId = (shippingCategoryId as ShippingCategory).id || shippingCategoryId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `shipping_categories/${_shippingCategoryId}/versions`, params, options) as unknown as ListResponse<Version>
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


	parse(payload: any): ShippingCategory | ShippingCategory[] {
		return super.parse(payload)
	}

}


export default ShippingCategories

export type { ShippingCategory, ShippingCategoryCreate, ShippingCategoryUpdate, ShippingCategoryType }
