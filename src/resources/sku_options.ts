/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.7.0
 * Generation date: 14-09-2021
 **/

import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { Market } from './markets'
import { Attachment } from './attachments'


type SkuOptionRel = ResourceId & { type: typeof SkuOptions.TYPE }
type MarketRel = ResourceId & { type: 'markets' }


interface SkuOption extends Resource {
	
	name?: string
	description?: string
	price_amount_cents?: number
	price_amount_float?: number
	formatted_price_amount?: string
	delay_hours?: number
	delay_days?: number
	sku_code_regex?: string

	market?: Market
	attachments?: Attachment[]

}


interface SkuOptionCreate extends ResourceCreate {
	
	name: string
	description?: string
	price_amount_cents?: number
	delay_hours?: number
	sku_code_regex?: string

	market?: MarketRel

}


interface SkuOptionUpdate extends ResourceUpdate {
	
	name?: string
	description?: string
	price_amount_cents?: number
	delay_hours?: number
	sku_code_regex?: string

	market?: MarketRel

}


class SkuOptions extends ApiResource {

	static readonly TYPE: 'sku_options' = 'sku_options'
	// static readonly PATH = 'sku_options'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<SkuOption>> {
		return this.resources.list({ type: SkuOptions.TYPE }, params, options)
	}

	async create(resource: SkuOptionCreate, options?: ResourcesConfig): Promise<SkuOption> {
		return this.resources.create(Object.assign(resource, { type: SkuOptions.TYPE }) , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuOption> {
		return this.resources.retrieve<SkuOption>({ type: SkuOptions.TYPE, id }, params, options)
	}

	async update(resource: SkuOptionUpdate, options?: ResourcesConfig): Promise<SkuOption> {
		return this.resources.update({ ...resource, type: SkuOptions.TYPE }, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: SkuOptions.TYPE, id }, options)
	}
	


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isSkuOption(resource: any): resource is SkuOption {
		return resource.type && (resource.type === SkuOptions.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(SkuOptions.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(SkuOptions.TYPE)
	}
	*/

	relationship(id: string | ResourceId): SkuOptionRel {
		return (typeof id === 'string') ? { id, type: SkuOptions.TYPE } : {id: id.id, type: SkuOptions.TYPE }
	}

}


export default SkuOptions

export { SkuOption, SkuOptionCreate, SkuOptionUpdate }
