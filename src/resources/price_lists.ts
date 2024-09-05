import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Attachment } from './attachments'
import type { PriceListScheduler } from './price_list_schedulers'
import type { Price } from './prices'
import type { Version } from './versions'


type PriceListType = 'price_lists'
type PriceListRel = ResourceRel & { type: PriceListType }


export type PriceListSort = Pick<PriceList, 'id' | 'code' | 'currency_code' | 'name' | 'tax_included'> & ResourceSort
// export type PriceListFilter = Pick<PriceList, 'id' | 'code' | 'currency_code' | 'name' | 'rules' | 'tax_included'> & ResourceFilter


interface PriceList extends Resource {
	
	readonly type: PriceListType

	/** 
	 * A string that you can use to identify the price list (must be unique within the environment).
	 * @example ```"europe1"```
	 */
	code?: string | null
	/** 
	 * The international 3-letter currency code as defined by the ISO 4217 standard.
	 * @example ```"EUR"```
	 */
	currency_code: string
	/** 
	 * The price list's internal name.
	 * @example ```"EU Price list"```
	 */
	name: string
	/** 
	 * The rule outcomes.
	 * @example ```"[object Object]"```
	 */
	rule_outcomes?: Record<string, any> | null
	/** 
	 * The rules (using Rules Engine) to be applied.
	 * @example ```"[object Object]"```
	 */
	rules?: Record<string, any> | null
	/** 
	 * Indicates if the associated prices include taxes.
	 * @example ```"true"```
	 */
	tax_included?: boolean | null

	attachments?: Attachment[] | null
	price_list_schedulers?: PriceListScheduler[] | null
	prices?: Price[] | null
	versions?: Version[] | null

}


interface PriceListCreate extends ResourceCreate {
	
	/** 
	 * A string that you can use to identify the price list (must be unique within the environment).
	 * @example ```"europe1"```
	 */
	code?: string | null
	/** 
	 * The international 3-letter currency code as defined by the ISO 4217 standard.
	 * @example ```"EUR"```
	 */
	currency_code: string
	/** 
	 * The price list's internal name.
	 * @example ```"EU Price list"```
	 */
	name: string
	/** 
	 * The rules (using Rules Engine) to be applied.
	 * @example ```"[object Object]"```
	 */
	rules?: Record<string, any> | null
	/** 
	 * Indicates if the associated prices include taxes.
	 * @example ```"true"```
	 */
	tax_included?: boolean | null
	
}


interface PriceListUpdate extends ResourceUpdate {
	
	/** 
	 * A string that you can use to identify the price list (must be unique within the environment).
	 * @example ```"europe1"```
	 */
	code?: string | null
	/** 
	 * The international 3-letter currency code as defined by the ISO 4217 standard.
	 * @example ```"EUR"```
	 */
	currency_code?: string | null
	/** 
	 * The price list's internal name.
	 * @example ```"EU Price list"```
	 */
	name?: string | null
	/** 
	 * The rules (using Rules Engine) to be applied.
	 * @example ```"[object Object]"```
	 */
	rules?: Record<string, any> | null
	/** 
	 * Indicates if the associated prices include taxes.
	 * @example ```"true"```
	 */
	tax_included?: boolean | null
	
}


class PriceLists extends ApiResource<PriceList> {

	static readonly TYPE: PriceListType = 'price_lists' as const

	async create(resource: PriceListCreate, params?: QueryParamsRetrieve<PriceList>, options?: ResourcesConfig): Promise<PriceList> {
		return this.resources.create<PriceListCreate, PriceList>({ ...resource, type: PriceLists.TYPE }, params, options)
	}

	async update(resource: PriceListUpdate, params?: QueryParamsRetrieve<PriceList>, options?: ResourcesConfig): Promise<PriceList> {
		return this.resources.update<PriceListUpdate, PriceList>({ ...resource, type: PriceLists.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: PriceLists.TYPE } : id, options)
	}

	async attachments(priceListId: string | PriceList, params?: QueryParamsList<Attachment>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _priceListId = (priceListId as PriceList).id || priceListId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `price_lists/${_priceListId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async price_list_schedulers(priceListId: string | PriceList, params?: QueryParamsList<PriceListScheduler>, options?: ResourcesConfig): Promise<ListResponse<PriceListScheduler>> {
		const _priceListId = (priceListId as PriceList).id || priceListId as string
		return this.resources.fetch<PriceListScheduler>({ type: 'price_list_schedulers' }, `price_lists/${_priceListId}/price_list_schedulers`, params, options) as unknown as ListResponse<PriceListScheduler>
	}

	async prices(priceListId: string | PriceList, params?: QueryParamsList<Price>, options?: ResourcesConfig): Promise<ListResponse<Price>> {
		const _priceListId = (priceListId as PriceList).id || priceListId as string
		return this.resources.fetch<Price>({ type: 'prices' }, `price_lists/${_priceListId}/prices`, params, options) as unknown as ListResponse<Price>
	}

	async versions(priceListId: string | PriceList, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _priceListId = (priceListId as PriceList).id || priceListId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `price_lists/${_priceListId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	isPriceList(resource: any): resource is PriceList {
		return resource.type && (resource.type === PriceLists.TYPE)
	}


	relationship(id: string | ResourceId | null): PriceListRel {
		return super.relationshipOneToOne<PriceListRel>(id)
	}

	relationshipToMany(...ids: string[]): PriceListRel[] {
		return super.relationshipOneToMany<PriceListRel>(...ids)
	}


	type(): PriceListType {
		return PriceLists.TYPE
	}

}


export default PriceLists

export type { PriceList, PriceListCreate, PriceListUpdate, PriceListType }
