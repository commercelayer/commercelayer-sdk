/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.3.0
 * Generation date: 14-09-2021
 **/

import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { Market } from './markets'
import { Attachment } from './attachments'


type CarrierAccountRel = ResourceId & { type: typeof CarrierAccounts.TYPE }


interface CarrierAccount extends Resource {
	
	name?: string
	easypost_type?: string
	easypost_id?: string

	market?: Market
	attachments?: Attachment[]

}


type CarrierAccountCreate = ResourceCreate


type CarrierAccountUpdate = ResourceUpdate


class CarrierAccounts extends ApiResource {

	static readonly TYPE: 'carrier_accounts' = 'carrier_accounts'
	// static readonly PATH = 'carrier_accounts'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<CarrierAccount>> {
		return this.resources.list({ type: CarrierAccounts.TYPE }, params, options)
	}

	async create(resource: CarrierAccountCreate, options?: ResourcesConfig): Promise<CarrierAccount> {
		return this.resources.create(Object.assign(resource, { type: CarrierAccounts.TYPE }) , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CarrierAccount> {
		return this.resources.retrieve<CarrierAccount>({ type: CarrierAccounts.TYPE, id }, params, options)
	}

	async update(resource: CarrierAccountUpdate, options?: ResourcesConfig): Promise<CarrierAccount> {
		return this.resources.update({ ...resource, type: CarrierAccounts.TYPE }, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		this.resources.delete({ type: CarrierAccounts.TYPE, id }, options)
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isCarrierAccount(resource: any): resource is CarrierAccount {
		return resource.type && (resource.type === CarrierAccounts.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(CarrierAccounts.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(CarrierAccounts.TYPE)
	}
	*/

	relationship(id: string | ResourceId): CarrierAccountRel {
		return (typeof id === 'string') ? { id, type: CarrierAccounts.TYPE } : {id: id.id, type: CarrierAccounts.TYPE }
	}

}


export default CarrierAccounts

export { CarrierAccount, CarrierAccountCreate, CarrierAccountUpdate }
