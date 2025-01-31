import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Market } from './markets'
import type { Attachment } from './attachments'
import type { Event } from './events'
import type { Version } from './versions'
import type { TaxCategory, TaxCategoryType } from './tax_categories'


type TaxjarAccountType = 'taxjar_accounts'
type TaxjarAccountRel = ResourceRel & { type: TaxjarAccountType }
type TaxCategoryRel = ResourceRel & { type: TaxCategoryType }


export type TaxjarAccountSort = Pick<TaxjarAccount, 'id' | 'name'> & ResourceSort
// export type TaxjarAccountFilter = Pick<TaxjarAccount, 'id' | 'name'> & ResourceFilter


interface TaxjarAccount extends Resource {
	
	readonly type: TaxjarAccountType

	/** 
	 * The tax calculator's internal name.
	 * @example ```"Personal tax calculator"```
	 */
	name: string

	markets?: Market[] | null
	attachments?: Attachment[] | null
	events?: Event[] | null
	versions?: Version[] | null
	tax_categories?: TaxCategory[] | null

}


interface TaxjarAccountCreate extends ResourceCreate {
	
	/** 
	 * The tax calculator's internal name.
	 * @example ```"Personal tax calculator"```
	 */
	name: string
	/** 
	 * The TaxJar account API key.
	 * @example ```"TAXJAR_API_KEY"```
	 */
	api_key: string

	tax_categories?: TaxCategoryRel[] | null

}


interface TaxjarAccountUpdate extends ResourceUpdate {
	
	/** 
	 * The tax calculator's internal name.
	 * @example ```"Personal tax calculator"```
	 */
	name?: string | null
	/** 
	 * The TaxJar account API key.
	 * @example ```"TAXJAR_API_KEY"```
	 */
	api_key?: string | null

	tax_categories?: TaxCategoryRel[] | null

}


class TaxjarAccounts extends ApiResource<TaxjarAccount> {

	static readonly TYPE: TaxjarAccountType = 'taxjar_accounts' as const

	async create(resource: TaxjarAccountCreate, params?: QueryParamsRetrieve<TaxjarAccount>, options?: ResourcesConfig): Promise<TaxjarAccount> {
		return this.resources.create<TaxjarAccountCreate, TaxjarAccount>({ ...resource, type: TaxjarAccounts.TYPE }, params, options)
	}

	async update(resource: TaxjarAccountUpdate, params?: QueryParamsRetrieve<TaxjarAccount>, options?: ResourcesConfig): Promise<TaxjarAccount> {
		return this.resources.update<TaxjarAccountUpdate, TaxjarAccount>({ ...resource, type: TaxjarAccounts.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: TaxjarAccounts.TYPE } : id, options)
	}

	async markets(taxjarAccountId: string | TaxjarAccount, params?: QueryParamsList<Market>, options?: ResourcesConfig): Promise<ListResponse<Market>> {
		const _taxjarAccountId = (taxjarAccountId as TaxjarAccount).id || taxjarAccountId as string
		return this.resources.fetch<Market>({ type: 'markets' }, `taxjar_accounts/${_taxjarAccountId}/markets`, params, options) as unknown as ListResponse<Market>
	}

	async attachments(taxjarAccountId: string | TaxjarAccount, params?: QueryParamsList<Attachment>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _taxjarAccountId = (taxjarAccountId as TaxjarAccount).id || taxjarAccountId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `taxjar_accounts/${_taxjarAccountId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async events(taxjarAccountId: string | TaxjarAccount, params?: QueryParamsList<Event>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _taxjarAccountId = (taxjarAccountId as TaxjarAccount).id || taxjarAccountId as string
		return this.resources.fetch<Event>({ type: 'events' }, `taxjar_accounts/${_taxjarAccountId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async versions(taxjarAccountId: string | TaxjarAccount, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _taxjarAccountId = (taxjarAccountId as TaxjarAccount).id || taxjarAccountId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `taxjar_accounts/${_taxjarAccountId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async tax_categories(taxjarAccountId: string | TaxjarAccount, params?: QueryParamsList<TaxCategory>, options?: ResourcesConfig): Promise<ListResponse<TaxCategory>> {
		const _taxjarAccountId = (taxjarAccountId as TaxjarAccount).id || taxjarAccountId as string
		return this.resources.fetch<TaxCategory>({ type: 'tax_categories' }, `taxjar_accounts/${_taxjarAccountId}/tax_categories`, params, options) as unknown as ListResponse<TaxCategory>
	}


	isTaxjarAccount(resource: any): resource is TaxjarAccount {
		return resource.type && (resource.type === TaxjarAccounts.TYPE)
	}


	relationship(id: string | ResourceId | null): TaxjarAccountRel {
		return super.relationshipOneToOne<TaxjarAccountRel>(id)
	}

	relationshipToMany(...ids: string[]): TaxjarAccountRel[] {
		return super.relationshipOneToMany<TaxjarAccountRel>(...ids)
	}


	type(): TaxjarAccountType {
		return TaxjarAccounts.TYPE
	}

}


export default TaxjarAccounts

export type { TaxjarAccount, TaxjarAccountCreate, TaxjarAccountUpdate, TaxjarAccountType }
