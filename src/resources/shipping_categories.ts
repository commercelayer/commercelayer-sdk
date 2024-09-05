import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Attachment } from './attachments'
import type { Sku } from './skus'
import type { Version } from './versions'


type ShippingCategoryType = 'shipping_categories'
type ShippingCategoryRel = ResourceRel & { type: ShippingCategoryType }


export type ShippingCategorySort = Pick<ShippingCategory, 'id' | 'code' | 'name'> & ResourceSort
// export type ShippingCategoryFilter = Pick<ShippingCategory, 'id' | 'code' | 'name'> & ResourceFilter


interface ShippingCategory extends Resource {
	
	readonly type: ShippingCategoryType

	/** 
	 * A string that you can use to identify the shipping category (must be unique within the environment).
	 * @example ```"europe1"```
	 */
	code?: string | null
	/** 
	 * The shipping category name.
	 * @example ```"Merchandise"```
	 */
	name: string

	attachments?: Attachment[] | null
	skus?: Sku[] | null
	versions?: Version[] | null

}


interface ShippingCategoryCreate extends ResourceCreate {
	
	/** 
	 * A string that you can use to identify the shipping category (must be unique within the environment).
	 * @example ```"europe1"```
	 */
	code?: string | null
	/** 
	 * The shipping category name.
	 * @example ```"Merchandise"```
	 */
	name: string
	
}


interface ShippingCategoryUpdate extends ResourceUpdate {
	
	/** 
	 * A string that you can use to identify the shipping category (must be unique within the environment).
	 * @example ```"europe1"```
	 */
	code?: string | null
	/** 
	 * The shipping category name.
	 * @example ```"Merchandise"```
	 */
	name?: string | null
	
}


class ShippingCategories extends ApiResource<ShippingCategory> {

	static readonly TYPE: ShippingCategoryType = 'shipping_categories' as const

	async create(resource: ShippingCategoryCreate, params?: QueryParamsRetrieve<ShippingCategory>, options?: ResourcesConfig): Promise<ShippingCategory> {
		return this.resources.create<ShippingCategoryCreate, ShippingCategory>({ ...resource, type: ShippingCategories.TYPE }, params, options)
	}

	async update(resource: ShippingCategoryUpdate, params?: QueryParamsRetrieve<ShippingCategory>, options?: ResourcesConfig): Promise<ShippingCategory> {
		return this.resources.update<ShippingCategoryUpdate, ShippingCategory>({ ...resource, type: ShippingCategories.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: ShippingCategories.TYPE } : id, options)
	}

	async attachments(shippingCategoryId: string | ShippingCategory, params?: QueryParamsList<Attachment>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _shippingCategoryId = (shippingCategoryId as ShippingCategory).id || shippingCategoryId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `shipping_categories/${_shippingCategoryId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async skus(shippingCategoryId: string | ShippingCategory, params?: QueryParamsList<Sku>, options?: ResourcesConfig): Promise<ListResponse<Sku>> {
		const _shippingCategoryId = (shippingCategoryId as ShippingCategory).id || shippingCategoryId as string
		return this.resources.fetch<Sku>({ type: 'skus' }, `shipping_categories/${_shippingCategoryId}/skus`, params, options) as unknown as ListResponse<Sku>
	}

	async versions(shippingCategoryId: string | ShippingCategory, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _shippingCategoryId = (shippingCategoryId as ShippingCategory).id || shippingCategoryId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `shipping_categories/${_shippingCategoryId}/versions`, params, options) as unknown as ListResponse<Version>
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
