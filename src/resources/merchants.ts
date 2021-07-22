/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.3.0
 * Generation date: 21-07-2021
 **/

import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, DocWithData, ResourceId } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { Address } from './addresses'
import { Attachment } from './attachments'


type AddressRel = ResourceId & { type: 'addresses' }


interface Merchant extends Resource {
	
	name?: string

	address?: Address
	attachments?: Attachment[]

}


interface MerchantCreate extends ResourceCreate {
	
	name: string

	address?: AddressRel

}


interface MerchantUpdate extends ResourceUpdate {
	
	name?: string

	address?: AddressRel

}


class Merchants extends ApiResource {

	static readonly TYPE: 'merchants' = 'merchants'
	// static readonly PATH = 'merchants'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<Merchant[] | DocWithData<Merchant>> {
		return this.resources.list({ type: Merchants.TYPE }, params, options)
	}

	async create(resource: MerchantCreate, options?: ResourcesConfig): Promise<Merchant | DocWithData<Merchant>> {
		return this.resources.create(Object.assign(resource, { type: Merchants.TYPE }) , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Merchant | DocWithData<Merchant>> {
		return this.resources.retrieve<Merchant>({ type: Merchants.TYPE, id }, params, options)
	}

	async update(resource: MerchantUpdate, options?: ResourcesConfig): Promise<Merchant | DocWithData<Merchant>> {
		return this.resources.update({ ...resource, type: Merchants.TYPE }, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		this.resources.delete({ type: Merchants.TYPE, id }, options)
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isMerchant(resource: any): resource is Merchant {
		return resource.type && (resource.type === Merchants.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(Merchants.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(Merchants.TYPE)
	}
	*/

	relationship(id: string): ResourceId & { type: typeof Merchants.TYPE } {
		return { id, type: Merchants.TYPE }
	}

}


export default Merchants

export { Merchant, MerchantCreate, MerchantUpdate }
