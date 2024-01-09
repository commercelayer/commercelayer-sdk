import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { Sku } from './skus'
import type { Attachment } from './attachments'
import type { Version } from './versions'


type ShippingCategoryRel = ResourceRel & { type: typeof ShippingCategories.TYPE }


interface ShippingCategory extends Resource {
	
	name?: string
	code?: string

	skus?: Sku[]
	attachments?: Attachment[]
	versions?: Version[]

}


interface ShippingCategoryCreate extends ResourceCreate {
	
	name: string
	code?: string
	
}


interface ShippingCategoryUpdate extends ResourceUpdate {
	
	name?: string
	code?: string
	
}


class ShippingCategories extends ApiResource {

	static readonly TYPE: 'shipping_categories' = 'shipping_categories' as const
	// static readonly PATH = 'shipping_categories'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<ShippingCategory>> {
		return this.resources.list<ShippingCategory>({ type: ShippingCategories.TYPE }, params, options)
	}

	async create(resource: ShippingCategoryCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ShippingCategory> {
		return this.resources.create<ShippingCategoryCreate, ShippingCategory>({ ...resource, type: ShippingCategories.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ShippingCategory> {
		return this.resources.retrieve<ShippingCategory>({ type: ShippingCategories.TYPE, id }, params, options)
	}

	async update(resource: ShippingCategoryUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ShippingCategory> {
		return this.resources.update<ShippingCategoryUpdate, ShippingCategory>({ ...resource, type: ShippingCategories.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: ShippingCategories.TYPE, id }, options)
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


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isShippingCategory(resource: any): resource is ShippingCategory {
		return resource.type && (resource.type === ShippingCategories.TYPE)
	}


	relationship(id: string | ResourceId | null): ShippingCategoryRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: ShippingCategories.TYPE } : { id: id.id, type: ShippingCategories.TYPE }
	}


	type(): string {
		return ShippingCategories.TYPE
	}

}


export default ShippingCategories

export { ShippingCategory, ShippingCategoryCreate, ShippingCategoryUpdate }
