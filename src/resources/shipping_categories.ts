import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSortable, ResourceFilterable } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Sku, SkuSortable } from './skus'
import type { Attachment, AttachmentSortable } from './attachments'
import type { Version, VersionSortable } from './versions'


type ShippingCategoryType = 'shipping_categories'
type ShippingCategoryRel = ResourceRel & { type: ShippingCategoryType }


export type ShippingCategorySortable = Pick<ShippingCategory, 'id' | 'name' | 'code'> & ResourceSortable
export type ShippingCategoryFilterable = Pick<ShippingCategory, 'id' | 'name' | 'code'> & ResourceFilterable


interface ShippingCategory extends Resource {
	
	readonly type: ShippingCategoryType

	name: string
	code?: string | null

	skus?: Sku[] | null
	attachments?: Attachment[] | null
	versions?: Version[] | null

}


interface ShippingCategoryCreate extends ResourceCreate {
	
	name: string
	code?: string | null
	
}


interface ShippingCategoryUpdate extends ResourceUpdate {
	
	name?: string | null
	code?: string | null
	
}


class ShippingCategories extends ApiResource<ShippingCategory, ShippingCategorySortable> {

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

	async skus(shippingCategoryId: string | ShippingCategory, params?: QueryParamsList<SkuSortable>, options?: ResourcesConfig): Promise<ListResponse<Sku>> {
		const _shippingCategoryId = (shippingCategoryId as ShippingCategory).id || shippingCategoryId as string
		return this.resources.fetch<Sku, SkuSortable>({ type: 'skus' }, `shipping_categories/${_shippingCategoryId}/skus`, params, options) as unknown as ListResponse<Sku>
	}

	async attachments(shippingCategoryId: string | ShippingCategory, params?: QueryParamsList<AttachmentSortable>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _shippingCategoryId = (shippingCategoryId as ShippingCategory).id || shippingCategoryId as string
		return this.resources.fetch<Attachment, AttachmentSortable>({ type: 'attachments' }, `shipping_categories/${_shippingCategoryId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async versions(shippingCategoryId: string | ShippingCategory, params?: QueryParamsList<VersionSortable>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _shippingCategoryId = (shippingCategoryId as ShippingCategory).id || shippingCategoryId as string
		return this.resources.fetch<Version, VersionSortable>({ type: 'versions' }, `shipping_categories/${_shippingCategoryId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	isShippingCategory(resource: any): resource is ShippingCategory {
		return resource.type && (resource.type === ShippingCategories.TYPE)
	}


	relationship(id: string | ResourceId | null): ShippingCategoryRel {
		return super.relationshipOneToOne<ShippingCategoryRel>(id)
	}

	relationshipToMany(...ids: string[]): ShippingCategoryRel[] {
		return super.relationshipOneToMany<ShippingCategoryRel>(...ids)
	}


	type(): ShippingCategoryType {
		return ShippingCategories.TYPE
	}

}


export default ShippingCategories

export type { ShippingCategory, ShippingCategoryCreate, ShippingCategoryUpdate, ShippingCategoryType }

/*
export const ShippingCategoriesClient = (init: ResourceAdapter | ResourcesInitConfig): ShippingCategories => {
	return new ShippingCategories((init instanceof ResourcesInitConfig)? ApiResourceAdapter(init) : init )
}
*/
