/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.7.0
 * Generation date: 14-09-2021
 **/

import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { TaxCategory } from './tax_categories'
import { Market } from './markets'
import { Attachment } from './attachments'


type TaxjarAccountRel = ResourceId & { type: typeof TaxjarAccounts.TYPE }
type TaxCategoryRel = ResourceId & { type: 'tax_categories' }


interface TaxjarAccount extends Resource {
	
	name?: string

	tax_categories?: TaxCategory[]
	markets?: Market[]
	attachments?: Attachment[]

}


interface TaxjarAccountCreate extends ResourceCreate {
	
	name: string
	api_key: string

	tax_categories?: TaxCategoryRel[]

}


interface TaxjarAccountUpdate extends ResourceUpdate {
	
	name?: string
	api_key?: string

	tax_categories?: TaxCategoryRel[]

}


class TaxjarAccounts extends ApiResource {

	static readonly TYPE: 'taxjar_accounts' = 'taxjar_accounts'
	// static readonly PATH = 'taxjar_accounts'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<TaxjarAccount>> {
		return this.resources.list({ type: TaxjarAccounts.TYPE }, params, options)
	}

	async create(resource: TaxjarAccountCreate, options?: ResourcesConfig): Promise<TaxjarAccount> {
		return this.resources.create(Object.assign(resource, { type: TaxjarAccounts.TYPE }) , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<TaxjarAccount> {
		return this.resources.retrieve<TaxjarAccount>({ type: TaxjarAccounts.TYPE, id }, params, options)
	}

	async update(resource: TaxjarAccountUpdate, options?: ResourcesConfig): Promise<TaxjarAccount> {
		return this.resources.update({ ...resource, type: TaxjarAccounts.TYPE }, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: TaxjarAccounts.TYPE, id }, options)
	}
	


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isTaxjarAccount(resource: any): resource is TaxjarAccount {
		return resource.type && (resource.type === TaxjarAccounts.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(TaxjarAccounts.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(TaxjarAccounts.TYPE)
	}
	*/

	relationship(id: string | ResourceId): TaxjarAccountRel {
		return (typeof id === 'string') ? { id, type: TaxjarAccounts.TYPE } : {id: id.id, type: TaxjarAccounts.TYPE }
	}

}


export default TaxjarAccounts

export { TaxjarAccount, TaxjarAccountCreate, TaxjarAccountUpdate }
