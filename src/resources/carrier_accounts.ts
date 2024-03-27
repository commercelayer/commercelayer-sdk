import { ApiResource } from '../resource'
import type { Resource, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSortable, ResourceFilterable } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Market, MarketSortable } from './markets'
import type { Attachment, AttachmentSortable } from './attachments'
import type { Version, VersionSortable } from './versions'


type CarrierAccountType = 'carrier_accounts'
type CarrierAccountRel = ResourceRel & { type: CarrierAccountType }


export type CarrierAccountSortable = Pick<CarrierAccount, 'id'> & ResourceSortable
export type CarrierAccountFilterable = Pick<CarrierAccount, 'id' | 'name' | 'easypost_type'> & ResourceFilterable


interface CarrierAccount extends Resource {
	
	readonly type: CarrierAccountType

	name?: string | null
	easypost_type?: string | null
	easypost_id?: string | null

	market?: Market | null
	attachments?: Attachment[] | null
	versions?: Version[] | null

}


class CarrierAccounts extends ApiResource<CarrierAccount, CarrierAccountSortable> {

	static readonly TYPE: CarrierAccountType = 'carrier_accounts' as const

	async market(carrierAccountId: string | CarrierAccount, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Market> {
		const _carrierAccountId = (carrierAccountId as CarrierAccount).id || carrierAccountId as string
		return this.resources.fetch<Market, MarketSortable>({ type: 'markets' }, `carrier_accounts/${_carrierAccountId}/market`, params, options) as unknown as Market
	}

	async attachments(carrierAccountId: string | CarrierAccount, params?: QueryParamsList<AttachmentSortable>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _carrierAccountId = (carrierAccountId as CarrierAccount).id || carrierAccountId as string
		return this.resources.fetch<Attachment, AttachmentSortable>({ type: 'attachments' }, `carrier_accounts/${_carrierAccountId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async versions(carrierAccountId: string | CarrierAccount, params?: QueryParamsList<VersionSortable>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _carrierAccountId = (carrierAccountId as CarrierAccount).id || carrierAccountId as string
		return this.resources.fetch<Version, VersionSortable>({ type: 'versions' }, `carrier_accounts/${_carrierAccountId}/versions`, params, options) as unknown as ListResponse<Version>
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

/*
export const CarrierAccountsClient = (init: ResourceAdapter | ResourcesInitConfig): CarrierAccounts => {
	return new CarrierAccounts((init instanceof ResourcesInitConfig)? ApiResourceAdapter(init) : init )
}
*/
