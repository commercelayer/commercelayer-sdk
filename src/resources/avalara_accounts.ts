import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Market } from './markets'
import type { Attachment } from './attachments'
import type { Event } from './events'
import type { Version } from './versions'
import type { EventStore } from './event_stores'
import type { TaxCategory, TaxCategoryType } from './tax_categories'


type AvalaraAccountType = 'avalara_accounts'
type AvalaraAccountRel = ResourceRel & { type: AvalaraAccountType }
type TaxCategoryRel = ResourceRel & { type: TaxCategoryType }


export type AvalaraAccountSort = Pick<AvalaraAccount, 'id' | 'name'> & ResourceSort
// export type AvalaraAccountFilter = Pick<AvalaraAccount, 'id' | 'name'> & ResourceFilter


interface AvalaraAccount extends Resource {
	
	readonly type: AvalaraAccountType

	/** 
	 * The tax calculator's internal name.
	 * @example ```"Personal tax calculator"```
	 */
	name: string
	/** 
	 * The Avalara account username.
	 * @example ```"user@mydomain.com"```
	 */
	username: string
	/** 
	 * The Avalara company code.
	 * @example ```"MYCOMPANY"```
	 */
	company_code: string
	/** 
	 * Indicates if the transaction will be recorded and visible on the Avalara website.
	 * @example ```true```
	 */
	commit_invoice?: boolean | null
	/** 
	 * Indicates if the seller is responsible for paying/remitting the customs duty & import tax to the customs authorities.
	 * @example ```true```
	 */
	ddp?: boolean | null

	markets?: Market[] | null
	attachments?: Attachment[] | null
	events?: Event[] | null
	versions?: Version[] | null
	event_stores?: EventStore[] | null
	tax_categories?: TaxCategory[] | null

}


interface AvalaraAccountCreate extends ResourceCreate {
	
	/** 
	 * The tax calculator's internal name.
	 * @example ```"Personal tax calculator"```
	 */
	name: string
	/** 
	 * The Avalara account username.
	 * @example ```"user@mydomain.com"```
	 */
	username: string
	/** 
	 * The Avalara account password.
	 * @example ```"secret"```
	 */
	password: string
	/** 
	 * The Avalara company code.
	 * @example ```"MYCOMPANY"```
	 */
	company_code: string
	/** 
	 * Indicates if the transaction will be recorded and visible on the Avalara website.
	 * @example ```true```
	 */
	commit_invoice?: boolean | null
	/** 
	 * Indicates if the seller is responsible for paying/remitting the customs duty & import tax to the customs authorities.
	 * @example ```true```
	 */
	ddp?: boolean | null

	tax_categories?: TaxCategoryRel[] | null

}


interface AvalaraAccountUpdate extends ResourceUpdate {
	
	/** 
	 * The tax calculator's internal name.
	 * @example ```"Personal tax calculator"```
	 */
	name?: string | null
	/** 
	 * The Avalara account username.
	 * @example ```"user@mydomain.com"```
	 */
	username?: string | null
	/** 
	 * The Avalara account password.
	 * @example ```"secret"```
	 */
	password?: string | null
	/** 
	 * The Avalara company code.
	 * @example ```"MYCOMPANY"```
	 */
	company_code?: string | null
	/** 
	 * Indicates if the transaction will be recorded and visible on the Avalara website.
	 * @example ```true```
	 */
	commit_invoice?: boolean | null
	/** 
	 * Indicates if the seller is responsible for paying/remitting the customs duty & import tax to the customs authorities.
	 * @example ```true```
	 */
	ddp?: boolean | null

	tax_categories?: TaxCategoryRel[] | null

}


class AvalaraAccounts extends ApiResource<AvalaraAccount> {

	static readonly TYPE: AvalaraAccountType = 'avalara_accounts' as const

	async create(resource: AvalaraAccountCreate, params?: QueryParamsRetrieve<AvalaraAccount>, options?: ResourcesConfig): Promise<AvalaraAccount> {
		return this.resources.create<AvalaraAccountCreate, AvalaraAccount>({ ...resource, type: AvalaraAccounts.TYPE }, params, options)
	}

	async update(resource: AvalaraAccountUpdate, params?: QueryParamsRetrieve<AvalaraAccount>, options?: ResourcesConfig): Promise<AvalaraAccount> {
		return this.resources.update<AvalaraAccountUpdate, AvalaraAccount>({ ...resource, type: AvalaraAccounts.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: AvalaraAccounts.TYPE } : id, options)
	}

	async markets(avalaraAccountId: string | AvalaraAccount, params?: QueryParamsList<Market>, options?: ResourcesConfig): Promise<ListResponse<Market>> {
		const _avalaraAccountId = (avalaraAccountId as AvalaraAccount).id || avalaraAccountId as string
		return this.resources.fetch<Market>({ type: 'markets' }, `avalara_accounts/${_avalaraAccountId}/markets`, params, options) as unknown as ListResponse<Market>
	}

	async attachments(avalaraAccountId: string | AvalaraAccount, params?: QueryParamsList<Attachment>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _avalaraAccountId = (avalaraAccountId as AvalaraAccount).id || avalaraAccountId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `avalara_accounts/${_avalaraAccountId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async events(avalaraAccountId: string | AvalaraAccount, params?: QueryParamsList<Event>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _avalaraAccountId = (avalaraAccountId as AvalaraAccount).id || avalaraAccountId as string
		return this.resources.fetch<Event>({ type: 'events' }, `avalara_accounts/${_avalaraAccountId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async versions(avalaraAccountId: string | AvalaraAccount, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _avalaraAccountId = (avalaraAccountId as AvalaraAccount).id || avalaraAccountId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `avalara_accounts/${_avalaraAccountId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async event_stores(avalaraAccountId: string | AvalaraAccount, params?: QueryParamsList<EventStore>, options?: ResourcesConfig): Promise<ListResponse<EventStore>> {
		const _avalaraAccountId = (avalaraAccountId as AvalaraAccount).id || avalaraAccountId as string
		return this.resources.fetch<EventStore>({ type: 'event_stores' }, `avalara_accounts/${_avalaraAccountId}/event_stores`, params, options) as unknown as ListResponse<EventStore>
	}

	async tax_categories(avalaraAccountId: string | AvalaraAccount, params?: QueryParamsList<TaxCategory>, options?: ResourcesConfig): Promise<ListResponse<TaxCategory>> {
		const _avalaraAccountId = (avalaraAccountId as AvalaraAccount).id || avalaraAccountId as string
		return this.resources.fetch<TaxCategory>({ type: 'tax_categories' }, `avalara_accounts/${_avalaraAccountId}/tax_categories`, params, options) as unknown as ListResponse<TaxCategory>
	}


	isAvalaraAccount(resource: any): resource is AvalaraAccount {
		return resource.type && (resource.type === AvalaraAccounts.TYPE)
	}


	relationship(id: string | ResourceId | null): AvalaraAccountRel {
		return super.relationshipOneToOne<AvalaraAccountRel>(id)
	}

	relationshipToMany(...ids: string[]): AvalaraAccountRel[] {
		return super.relationshipOneToMany<AvalaraAccountRel>(...ids)
	}


	type(): AvalaraAccountType {
		return AvalaraAccounts.TYPE
	}

}


export default AvalaraAccounts

export type { AvalaraAccount, AvalaraAccountCreate, AvalaraAccountUpdate, AvalaraAccountType }
