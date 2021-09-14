/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.7.0
 * Generation date: 14-09-2021
 **/

import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { Price } from './prices'
import { Attachment } from './attachments'


type PriceListRel = ResourceId & { type: typeof PriceLists.TYPE }


interface PriceList extends Resource {
	
	name?: string
	currency_code?: string
	tax_included?: boolean

	prices?: Price[]
	attachments?: Attachment[]

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

	static readonly TYPE: 'price_lists' = 'price_lists'
	// static readonly PATH = 'price_lists'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<PriceList>> {
		return this.resources.list({ type: PriceLists.TYPE }, params, options)
	}

	async create(resource: PriceListCreate, options?: ResourcesConfig): Promise<PriceList> {
		return this.resources.create(Object.assign(resource, { type: PriceLists.TYPE }) , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PriceList> {
		return this.resources.retrieve<PriceList>({ type: PriceLists.TYPE, id }, params, options)
	}

	async update(resource: PriceListUpdate, options?: ResourcesConfig): Promise<PriceList> {
		return this.resources.update({ ...resource, type: PriceLists.TYPE }, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: PriceLists.TYPE, id }, options)
	}
	


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isPriceList(resource: any): resource is PriceList {
		return resource.type && (resource.type === PriceLists.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(PriceLists.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(PriceLists.TYPE)
	}
	*/

	relationship(id: string | ResourceId): PriceListRel {
		return (typeof id === 'string') ? { id, type: PriceLists.TYPE } : {id: id.id, type: PriceLists.TYPE }
	}

}


export default PriceLists

export { PriceList, PriceListCreate, PriceListUpdate }
