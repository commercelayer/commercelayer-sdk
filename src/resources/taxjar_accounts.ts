import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Market } from './markets'
import type { Attachment } from './attachments'
import type { TaxCategory, TaxCategoryType } from './tax_categories'


type TaxjarAccountType = 'taxjar_accounts'
type TaxjarAccountRel = ResourceRel & { type: TaxjarAccountType }
type TaxCategoryRel = ResourceRel & { type: TaxCategoryType }


interface TaxjarAccount extends Resource {
	
	readonly type: TaxjarAccountType

	name: string

	markets?: Market[]
	attachments?: Attachment[]
	tax_categories?: TaxCategory[]

}


interface TaxjarAccountCreate extends ResourceCreate {
	
	name: string
	api_key: string

	tax_categories?: TaxCategoryRel[]

}


interface TaxjarAccountUpdate extends ResourceUpdate {
	
	name: string
	api_key?: string

	tax_categories?: TaxCategoryRel[]

}


class TaxjarAccounts extends ApiResource<TaxjarAccount> {

	static readonly TYPE: TaxjarAccountType = 'taxjar_accounts' as const

	async create(resource: TaxjarAccountCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<TaxjarAccount> {
		return this.resources.create<TaxjarAccountCreate, TaxjarAccount>({ ...resource, type: TaxjarAccounts.TYPE }, params, options)
	}

	async update(resource: TaxjarAccountUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<TaxjarAccount> {
		return this.resources.update<TaxjarAccountUpdate, TaxjarAccount>({ ...resource, type: TaxjarAccounts.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: TaxjarAccounts.TYPE } : id, options)
	}

	async markets(taxjarAccountId: string | TaxjarAccount, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Market>> {
		const _taxjarAccountId = (taxjarAccountId as TaxjarAccount).id || taxjarAccountId as string
		return this.resources.fetch<Market>({ type: 'markets' }, `taxjar_accounts/${_taxjarAccountId}/markets`, params, options) as unknown as ListResponse<Market>
	}

	async attachments(taxjarAccountId: string | TaxjarAccount, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _taxjarAccountId = (taxjarAccountId as TaxjarAccount).id || taxjarAccountId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `taxjar_accounts/${_taxjarAccountId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async tax_categories(taxjarAccountId: string | TaxjarAccount, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<TaxCategory>> {
		const _taxjarAccountId = (taxjarAccountId as TaxjarAccount).id || taxjarAccountId as string
		return this.resources.fetch<TaxCategory>({ type: 'tax_categories' }, `taxjar_accounts/${_taxjarAccountId}/tax_categories`, params, options) as unknown as ListResponse<TaxCategory>
	}


	isTaxjarAccount(resource: any): resource is TaxjarAccount {
		return resource.type && (resource.type === TaxjarAccounts.TYPE)
	}


	relationship(id: string | ResourceId | null): TaxjarAccountRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: TaxjarAccounts.TYPE } : { id: id.id, type: TaxjarAccounts.TYPE }
	}


	type(): TaxjarAccountType {
		return TaxjarAccounts.TYPE
	}

}


export default TaxjarAccounts

export type { TaxjarAccount, TaxjarAccountCreate, TaxjarAccountUpdate, TaxjarAccountType }
