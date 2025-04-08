import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Market } from './markets'
import type { DiscountEngineItem } from './discount_engine_items'
import type { Attachment } from './attachments'
import type { Version } from './versions'


type TalonOneAccountType = 'talon_one_accounts'
type TalonOneAccountRel = ResourceRel & { type: TalonOneAccountType }


export type TalonOneAccountSort = Pick<TalonOneAccount, 'id' | 'name'> & ResourceSort
// export type TalonOneAccountFilter = Pick<TalonOneAccount, 'id' | 'name'> & ResourceFilter


interface TalonOneAccount extends Resource {
	
	readonly type: TalonOneAccountType

	/** 
	 * The discount engine's internal name.
	 * @example ```"Personal discount engine"```
	 */
	name: string
	/** 
	 * Indicates if the discount engine manages both promotions and gift cards application at once.
	 */
	manage_gift_cards?: boolean | null
	/** 
	 * The API endpoint as computed by specified baseurl.
	 * @example ```"https://my_baseurl.talon.one/v2"```
	 */
	api_endpoint?: string | null

	markets?: Market[] | null
	discount_engine_items?: DiscountEngineItem[] | null
	attachments?: Attachment[] | null
	versions?: Version[] | null

}


interface TalonOneAccountCreate extends ResourceCreate {
	
	/** 
	 * The discount engine's internal name.
	 * @example ```"Personal discount engine"```
	 */
	name: string
	/** 
	 * The Talon.One account API key.
	 * @example ```"TALON_ONE_API_KEY"```
	 */
	api_key: string
	/** 
	 * The Talon.One API baseurl (excluding the talon.one suffix).
	 * @example ```"yourbaseurl"```
	 */
	baseurl: string
	
}


interface TalonOneAccountUpdate extends ResourceUpdate {
	
	/** 
	 * The discount engine's internal name.
	 * @example ```"Personal discount engine"```
	 */
	name?: string | null
	/** 
	 * The Talon.One account API key.
	 * @example ```"TALON_ONE_API_KEY"```
	 */
	api_key?: string | null
	/** 
	 * The Talon.One API baseurl (excluding the talon.one suffix).
	 * @example ```"yourbaseurl"```
	 */
	baseurl?: string | null
	
}


class TalonOneAccounts extends ApiResource<TalonOneAccount> {

	static readonly TYPE: TalonOneAccountType = 'talon_one_accounts' as const

	async create(resource: TalonOneAccountCreate, params?: QueryParamsRetrieve<TalonOneAccount>, options?: ResourcesConfig): Promise<TalonOneAccount> {
		return this.resources.create<TalonOneAccountCreate, TalonOneAccount>({ ...resource, type: TalonOneAccounts.TYPE }, params, options)
	}

	async update(resource: TalonOneAccountUpdate, params?: QueryParamsRetrieve<TalonOneAccount>, options?: ResourcesConfig): Promise<TalonOneAccount> {
		return this.resources.update<TalonOneAccountUpdate, TalonOneAccount>({ ...resource, type: TalonOneAccounts.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: TalonOneAccounts.TYPE } : id, options)
	}

	async markets(talonOneAccountId: string | TalonOneAccount, params?: QueryParamsList<Market>, options?: ResourcesConfig): Promise<ListResponse<Market>> {
		const _talonOneAccountId = (talonOneAccountId as TalonOneAccount).id || talonOneAccountId as string
		return this.resources.fetch<Market>({ type: 'markets' }, `talon_one_accounts/${_talonOneAccountId}/markets`, params, options) as unknown as ListResponse<Market>
	}

	async discount_engine_items(talonOneAccountId: string | TalonOneAccount, params?: QueryParamsList<DiscountEngineItem>, options?: ResourcesConfig): Promise<ListResponse<DiscountEngineItem>> {
		const _talonOneAccountId = (talonOneAccountId as TalonOneAccount).id || talonOneAccountId as string
		return this.resources.fetch<DiscountEngineItem>({ type: 'discount_engine_items' }, `talon_one_accounts/${_talonOneAccountId}/discount_engine_items`, params, options) as unknown as ListResponse<DiscountEngineItem>
	}

	async attachments(talonOneAccountId: string | TalonOneAccount, params?: QueryParamsList<Attachment>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _talonOneAccountId = (talonOneAccountId as TalonOneAccount).id || talonOneAccountId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `talon_one_accounts/${_talonOneAccountId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async versions(talonOneAccountId: string | TalonOneAccount, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _talonOneAccountId = (talonOneAccountId as TalonOneAccount).id || talonOneAccountId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `talon_one_accounts/${_talonOneAccountId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	isTalonOneAccount(resource: any): resource is TalonOneAccount {
		return resource.type && (resource.type === TalonOneAccounts.TYPE)
	}


	relationship(id: string | ResourceId | null): TalonOneAccountRel {
		return super.relationshipOneToOne<TalonOneAccountRel>(id)
	}

	relationshipToMany(...ids: string[]): TalonOneAccountRel[] {
		return super.relationshipOneToMany<TalonOneAccountRel>(...ids)
	}


	type(): TalonOneAccountType {
		return TalonOneAccounts.TYPE
	}

}


const instance = new TalonOneAccounts()
export default instance

export type { TalonOneAccounts, TalonOneAccount, TalonOneAccountCreate, TalonOneAccountUpdate, TalonOneAccountType }
