import { ApiResource, Resource, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import { QueryParamsList, QueryParamsRetrieve } from '../query'

import { Market } from './markets'
import { Attachment } from './attachments'


type CarrierAccountRel = ResourceRel & { type: typeof CarrierAccounts.TYPE }


interface CarrierAccount extends Resource {
	
	name?: string
	easypost_type?: string
	easypost_id?: string

	market?: Market
	attachments?: Attachment[]

}


class CarrierAccounts extends ApiResource {

	static readonly TYPE: 'carrier_accounts' = 'carrier_accounts'
	// static readonly PATH = 'carrier_accounts'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<CarrierAccount>> {
		return this.resources.list({ type: CarrierAccounts.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CarrierAccount> {
		return this.resources.retrieve<CarrierAccount>({ type: CarrierAccounts.TYPE, id }, params, options)
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
