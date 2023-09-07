import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { Price } from './prices'
import type { Attachment } from './attachments'
import type { Version } from './versions'


type PriceListRel = ResourceRel & { type: typeof PriceLists.TYPE }


interface PriceList extends Resource {
	
	name?: string
	currency_code?: string
	tax_included?: boolean

	prices?: Price[]
	attachments?: Attachment[]
	versions?: Version[]

}


interface PriceListCreate extends ResourceCreate {
	
	name: string
	currency_code: string
	tax_included?: boolean
	
}


interface PriceListUpdate extends ResourceUpdate {
	
	name?: string
	currency_code?: string
	tax_included?: boolean
	
}


class PriceLists extends ApiResource {

	static readonly TYPE: 'price_lists' = 'price_lists' as const
	// static readonly PATH = 'price_lists'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<PriceList>> {
		return this.resources.list<PriceList>({ type: PriceLists.TYPE }, params, options)
	}

	async create(resource: PriceListCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PriceList> {
		return this.resources.create<PriceListCreate, PriceList>({ ...resource, type: PriceLists.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PriceList> {
		return this.resources.retrieve<PriceList>({ type: PriceLists.TYPE, id }, params, options)
	}

	async update(resource: PriceListUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PriceList> {
		return this.resources.update<PriceListUpdate, PriceList>({ ...resource, type: PriceLists.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: PriceLists.TYPE, id }, options)
	}

	async prices(priceListId: string | PriceList, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Price>> {
		const _priceListId = (priceListId as PriceList).id || priceListId as string
		return this.resources.fetch<Price>({ type: 'prices' }, `price_lists/${_priceListId}/prices`, params, options) as unknown as ListResponse<Price>
	}

	async attachments(priceListId: string | PriceList, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _priceListId = (priceListId as PriceList).id || priceListId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `price_lists/${_priceListId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async versions(priceListId: string | PriceList, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _priceListId = (priceListId as PriceList).id || priceListId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `price_lists/${_priceListId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isPriceList(resource: any): resource is PriceList {
		return resource.type && (resource.type === PriceLists.TYPE)
	}


	relationship(id: string | ResourceId | null): PriceListRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: PriceLists.TYPE } : { id: id.id, type: PriceLists.TYPE }
	}


	type(): string {
		return PriceLists.TYPE
	}

}


export default PriceLists

export { PriceList, PriceListCreate, PriceListUpdate }
