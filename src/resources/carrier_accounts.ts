import { ApiResource } from '../resource'
import type { Resource, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Market } from './markets'
import type { Attachment } from './attachments'
import type { Version } from './versions'


type CarrierAccountType = 'carrier_accounts'
type CarrierAccountRel = ResourceRel & { type: CarrierAccountType }


export type CarrierAccountSort = Pick<CarrierAccount, 'id'> & ResourceSort
// export type CarrierAccountFilter = Pick<CarrierAccount, 'id' | 'name' | 'easypost_type'> & ResourceFilter


interface CarrierAccount extends Resource {
	
	readonly type: CarrierAccountType

	/** 
	 * The carrier account internal name..
	 * @example ```"UPS"```
	 */
	name?: string | null
	/** 
	 * The Easypost service carrier type..
	 * @example ```"UPS"```
	 */
	easypost_type?: string | null
	/** 
	 * The Easypost internal reference ID..
	 * @example ```"xxxx-yyyy-zzzz"```
	 */
	easypost_id?: string | null

	market?: Market | null
	attachments?: Attachment[] | null
	versions?: Version[] | null

}


class CarrierAccounts extends ApiResource<CarrierAccount> {

	static readonly TYPE: CarrierAccountType = 'carrier_accounts' as const

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


export default CarrierAccounts

export type { CarrierAccount, CarrierAccountType }
