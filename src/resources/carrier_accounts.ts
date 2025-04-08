import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Market, MarketType } from './markets'
import type { Attachment } from './attachments'
import type { Version } from './versions'


type CarrierAccountType = 'carrier_accounts'
type CarrierAccountRel = ResourceRel & { type: CarrierAccountType }
type MarketRel = ResourceRel & { type: MarketType }


export type CarrierAccountSort = Pick<CarrierAccount, 'id' | 'name'> & ResourceSort
// export type CarrierAccountFilter = Pick<CarrierAccount, 'id' | 'name' | 'easypost_type'> & ResourceFilter


interface CarrierAccount extends Resource {
	
	readonly type: CarrierAccountType

	/** 
	 * The carrier account internal name.
	 * @example ```"Accurate"```
	 */
	name: string
	/** 
	 * The Easypost service carrier type.
	 * @example ```"AccurateAccount"```
	 */
	easypost_type: string
	/** 
	 * The Easypost internal reference ID.
	 * @example ```"xxxx-yyyy-zzzz"```
	 */
	easypost_id?: string | null
	/** 
	 * The Easypost carrier accounts credentials fields.
	 * @example ```{"username":"xxxx","password":"secret"}```
	 */
	credentials: Record<string, any>

	market?: Market | null
	attachments?: Attachment[] | null
	versions?: Version[] | null

}


interface CarrierAccountCreate extends ResourceCreate {
	
	/** 
	 * The carrier account internal name.
	 * @example ```"Accurate"```
	 */
	name: string
	/** 
	 * The Easypost service carrier type.
	 * @example ```"AccurateAccount"```
	 */
	easypost_type: string
	/** 
	 * The Easypost carrier accounts credentials fields.
	 * @example ```{"username":"xxxx","password":"secret"}```
	 */
	credentials: Record<string, any>

	market?: MarketRel | null

}


interface CarrierAccountUpdate extends ResourceUpdate {
	
	/** 
	 * The carrier account internal name.
	 * @example ```"Accurate"```
	 */
	name?: string | null
	/** 
	 * The Easypost service carrier type.
	 * @example ```"AccurateAccount"```
	 */
	easypost_type?: string | null
	/** 
	 * The Easypost carrier accounts credentials fields.
	 * @example ```{"username":"xxxx","password":"secret"}```
	 */
	credentials?: Record<string, any> | null

	market?: MarketRel | null

}


class CarrierAccounts extends ApiResource<CarrierAccount> {

	static readonly TYPE: CarrierAccountType = 'carrier_accounts' as const

	async create(resource: CarrierAccountCreate, params?: QueryParamsRetrieve<CarrierAccount>, options?: ResourcesConfig): Promise<CarrierAccount> {
		return this.resources.create<CarrierAccountCreate, CarrierAccount>({ ...resource, type: CarrierAccounts.TYPE }, params, options)
	}

	async update(resource: CarrierAccountUpdate, params?: QueryParamsRetrieve<CarrierAccount>, options?: ResourcesConfig): Promise<CarrierAccount> {
		return this.resources.update<CarrierAccountUpdate, CarrierAccount>({ ...resource, type: CarrierAccounts.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: CarrierAccounts.TYPE } : id, options)
	}

	async market(carrierAccountId: string | CarrierAccount, params?: QueryParamsRetrieve<Market>, options?: ResourcesConfig): Promise<Market> {
		const _carrierAccountId = (carrierAccountId as CarrierAccount).id || carrierAccountId as string
		return this.resources.fetch<Market>({ type: 'markets' }, `carrier_accounts/${_carrierAccountId}/market`, params, options) as unknown as Market
	}

	async attachments(carrierAccountId: string | CarrierAccount, params?: QueryParamsList<Attachment>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _carrierAccountId = (carrierAccountId as CarrierAccount).id || carrierAccountId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `carrier_accounts/${_carrierAccountId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async versions(carrierAccountId: string | CarrierAccount, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _carrierAccountId = (carrierAccountId as CarrierAccount).id || carrierAccountId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `carrier_accounts/${_carrierAccountId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	isCarrierAccount(resource: any): resource is CarrierAccount {
		return resource.type && (resource.type === CarrierAccounts.TYPE)
	}


	relationship(id: string | ResourceId | null): CarrierAccountRel {
		return super.relationshipOneToOne<CarrierAccountRel>(id)
	}

	relationshipToMany(...ids: string[]): CarrierAccountRel[] {
		return super.relationshipOneToMany<CarrierAccountRel>(...ids)
	}


	type(): CarrierAccountType {
		return CarrierAccounts.TYPE
	}

}


const instance = new CarrierAccounts()
export default instance

export type { CarrierAccounts, CarrierAccount, CarrierAccountCreate, CarrierAccountUpdate, CarrierAccountType }
