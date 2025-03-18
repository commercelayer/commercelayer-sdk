import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Market } from './markets'
import type { Attachment } from './attachments'
import type { Event } from './events'
import type { Version } from './versions'
import type { TaxCategory, TaxCategoryType } from './tax_categories'


type StripeTaxAccountType = 'stripe_tax_accounts'
type StripeTaxAccountRel = ResourceRel & { type: StripeTaxAccountType }
type TaxCategoryRel = ResourceRel & { type: TaxCategoryType }


export type StripeTaxAccountSort = Pick<StripeTaxAccount, 'id' | 'name'> & ResourceSort
// export type StripeTaxAccountFilter = Pick<StripeTaxAccount, 'id' | 'name'> & ResourceFilter


interface StripeTaxAccount extends Resource {
	
	readonly type: StripeTaxAccountType

	/** 
	 * The tax calculator's internal name.
	 * @example ```"Personal tax calculator"```
	 */
	name: string
	/** 
	 * Indicates if the transaction will be recorded and visible on the Stripe website.
	 * @example ```true```
	 */
	commit_invoice?: boolean | null

	markets?: Market[] | null
	attachments?: Attachment[] | null
	events?: Event[] | null
	versions?: Version[] | null
	tax_categories?: TaxCategory[] | null

}


interface StripeTaxAccountCreate extends ResourceCreate {
	
	/** 
	 * The tax calculator's internal name.
	 * @example ```"Personal tax calculator"```
	 */
	name: string
	/** 
	 * The Stripe account API key.
	 * @example ```"STRIPE_API_KEY"```
	 */
	api_key: string
	/** 
	 * Indicates if the transaction will be recorded and visible on the Stripe website.
	 * @example ```true```
	 */
	commit_invoice?: boolean | null

	tax_categories?: TaxCategoryRel[] | null

}


interface StripeTaxAccountUpdate extends ResourceUpdate {
	
	/** 
	 * The tax calculator's internal name.
	 * @example ```"Personal tax calculator"```
	 */
	name?: string | null
	/** 
	 * The Stripe account API key.
	 * @example ```"STRIPE_API_KEY"```
	 */
	api_key?: string | null
	/** 
	 * Indicates if the transaction will be recorded and visible on the Stripe website.
	 * @example ```true```
	 */
	commit_invoice?: boolean | null

	tax_categories?: TaxCategoryRel[] | null

}


class StripeTaxAccounts extends ApiResource<StripeTaxAccount> {

	static readonly TYPE: StripeTaxAccountType = 'stripe_tax_accounts' as const

	async create(resource: StripeTaxAccountCreate, params?: QueryParamsRetrieve<StripeTaxAccount>, options?: ResourcesConfig): Promise<StripeTaxAccount> {
		return this.resources.create<StripeTaxAccountCreate, StripeTaxAccount>({ ...resource, type: StripeTaxAccounts.TYPE }, params, options)
	}

	async update(resource: StripeTaxAccountUpdate, params?: QueryParamsRetrieve<StripeTaxAccount>, options?: ResourcesConfig): Promise<StripeTaxAccount> {
		return this.resources.update<StripeTaxAccountUpdate, StripeTaxAccount>({ ...resource, type: StripeTaxAccounts.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: StripeTaxAccounts.TYPE } : id, options)
	}

	async markets(stripeTaxAccountId: string | StripeTaxAccount, params?: QueryParamsList<Market>, options?: ResourcesConfig): Promise<ListResponse<Market>> {
		const _stripeTaxAccountId = (stripeTaxAccountId as StripeTaxAccount).id || stripeTaxAccountId as string
		return this.resources.fetch<Market>({ type: 'markets' }, `stripe_tax_accounts/${_stripeTaxAccountId}/markets`, params, options) as unknown as ListResponse<Market>
	}

	async attachments(stripeTaxAccountId: string | StripeTaxAccount, params?: QueryParamsList<Attachment>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _stripeTaxAccountId = (stripeTaxAccountId as StripeTaxAccount).id || stripeTaxAccountId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `stripe_tax_accounts/${_stripeTaxAccountId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async events(stripeTaxAccountId: string | StripeTaxAccount, params?: QueryParamsList<Event>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _stripeTaxAccountId = (stripeTaxAccountId as StripeTaxAccount).id || stripeTaxAccountId as string
		return this.resources.fetch<Event>({ type: 'events' }, `stripe_tax_accounts/${_stripeTaxAccountId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async versions(stripeTaxAccountId: string | StripeTaxAccount, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _stripeTaxAccountId = (stripeTaxAccountId as StripeTaxAccount).id || stripeTaxAccountId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `stripe_tax_accounts/${_stripeTaxAccountId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async tax_categories(stripeTaxAccountId: string | StripeTaxAccount, params?: QueryParamsList<TaxCategory>, options?: ResourcesConfig): Promise<ListResponse<TaxCategory>> {
		const _stripeTaxAccountId = (stripeTaxAccountId as StripeTaxAccount).id || stripeTaxAccountId as string
		return this.resources.fetch<TaxCategory>({ type: 'tax_categories' }, `stripe_tax_accounts/${_stripeTaxAccountId}/tax_categories`, params, options) as unknown as ListResponse<TaxCategory>
	}


	isStripeTaxAccount(resource: any): resource is StripeTaxAccount {
		return resource.type && (resource.type === StripeTaxAccounts.TYPE)
	}


	relationship(id: string | ResourceId | null): StripeTaxAccountRel {
		return super.relationshipOneToOne<StripeTaxAccountRel>(id)
	}

	relationshipToMany(...ids: string[]): StripeTaxAccountRel[] {
		return super.relationshipOneToMany<StripeTaxAccountRel>(...ids)
	}


	type(): StripeTaxAccountType {
		return StripeTaxAccounts.TYPE
	}

}


const instance = new StripeTaxAccounts()
export default instance

export type { StripeTaxAccount, StripeTaxAccountCreate, StripeTaxAccountUpdate, StripeTaxAccountType }
