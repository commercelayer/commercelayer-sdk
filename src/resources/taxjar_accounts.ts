import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { TaxCategory } from './tax_categories'
import type { Market } from './markets'
import type { Attachment } from './attachments'


type TaxjarAccountRel = ResourceRel & { type: typeof TaxjarAccounts.TYPE }
type TaxCategoryRel = ResourceRel & { type: 'tax_categories' }


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

	static readonly TYPE: 'taxjar_accounts' = 'taxjar_accounts' as const
	// static readonly PATH = 'taxjar_accounts'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<TaxjarAccount>> {
		return this.resources.list<TaxjarAccount>({ type: TaxjarAccounts.TYPE }, params, options)
	}

	async create(resource: TaxjarAccountCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<TaxjarAccount> {
		return this.resources.create<TaxjarAccountCreate, TaxjarAccount>({ ...resource, type: TaxjarAccounts.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<TaxjarAccount> {
		return this.resources.retrieve<TaxjarAccount>({ type: TaxjarAccounts.TYPE, id }, params, options)
	}

	async update(resource: TaxjarAccountUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<TaxjarAccount> {
		return this.resources.update<TaxjarAccountUpdate, TaxjarAccount>({ ...resource, type: TaxjarAccounts.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: TaxjarAccounts.TYPE, id }, options)
	}

	async tax_categories(taxjarAccountId: string | TaxjarAccount, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<TaxCategory>> {
		const _taxjarAccountId = (taxjarAccountId as TaxjarAccount).id || taxjarAccountId
		return this.resources.fetch<TaxCategory>({ type: 'tax_categories' }, `taxjar_accounts/${_taxjarAccountId}/tax_categories`, params, options) as unknown as ListResponse<TaxCategory>
	}

	async markets(taxjarAccountId: string | TaxjarAccount, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Market>> {
		const _taxjarAccountId = (taxjarAccountId as TaxjarAccount).id || taxjarAccountId
		return this.resources.fetch<Market>({ type: 'markets' }, `taxjar_accounts/${_taxjarAccountId}/markets`, params, options) as unknown as ListResponse<Market>
	}

	async attachments(taxjarAccountId: string | TaxjarAccount, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _taxjarAccountId = (taxjarAccountId as TaxjarAccount).id || taxjarAccountId
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `taxjar_accounts/${_taxjarAccountId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isTaxjarAccount(resource: any): resource is TaxjarAccount {
		return resource.type && (resource.type === TaxjarAccounts.TYPE)
	}


	relationship(id: string | ResourceId | null): TaxjarAccountRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: TaxjarAccounts.TYPE } : { id: id.id, type: TaxjarAccounts.TYPE }
	}


	type(): string {
		return TaxjarAccounts.TYPE
	}

}


export default TaxjarAccounts

export { TaxjarAccount, TaxjarAccountCreate, TaxjarAccountUpdate }
