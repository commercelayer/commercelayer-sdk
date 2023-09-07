import { ApiResource, Resource, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { Market } from './markets'
import type { Attachment } from './attachments'
import type { Version } from './versions'


type CarrierAccountRel = ResourceRel & { type: typeof CarrierAccounts.TYPE }


interface CarrierAccount extends Resource {
	
	name?: string
	easypost_type?: string
	easypost_id?: string

	market?: Market
	attachments?: Attachment[]
	versions?: Version[]

}


class CarrierAccounts extends ApiResource {

	static readonly TYPE: 'carrier_accounts' = 'carrier_accounts' as const
	// static readonly PATH = 'carrier_accounts'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<CarrierAccount>> {
		return this.resources.list<CarrierAccount>({ type: CarrierAccounts.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CarrierAccount> {
		return this.resources.retrieve<CarrierAccount>({ type: CarrierAccounts.TYPE, id }, params, options)
	}

	async market(carrierAccountId: string | CarrierAccount, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Market> {
		const _carrierAccountId = (carrierAccountId as CarrierAccount).id || carrierAccountId as string
		return this.resources.fetch<Market>({ type: 'markets' }, `carrier_accounts/${_carrierAccountId}/market`, params, options) as unknown as Market
	}

	async attachments(carrierAccountId: string | CarrierAccount, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _carrierAccountId = (carrierAccountId as CarrierAccount).id || carrierAccountId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `carrier_accounts/${_carrierAccountId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async versions(carrierAccountId: string | CarrierAccount, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _carrierAccountId = (carrierAccountId as CarrierAccount).id || carrierAccountId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `carrier_accounts/${_carrierAccountId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isCarrierAccount(resource: any): resource is CarrierAccount {
		return resource.type && (resource.type === CarrierAccounts.TYPE)
	}


	relationship(id: string | ResourceId | null): CarrierAccountRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: CarrierAccounts.TYPE } : { id: id.id, type: CarrierAccounts.TYPE }
	}


	type(): string {
		return CarrierAccounts.TYPE
	}

}


export default CarrierAccounts

export { CarrierAccount }
