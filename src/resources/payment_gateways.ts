import { ApiResource, Resource, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { PaymentMethod } from './payment_methods'


type PaymentGatewayRel = ResourceId & { type: typeof PaymentGateways.TYPE }


interface PaymentGateway extends Resource {
	
	name?: string

	payment_methods?: PaymentMethod[]

}


class PaymentGateways extends ApiResource {

	static readonly TYPE: 'payment_gateways' = 'payment_gateways'
	// static readonly PATH = 'payment_gateways'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<PaymentGateway>> {
		return this.resources.list({ type: PaymentGateways.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PaymentGateway> {
		return this.resources.retrieve<PaymentGateway>({ type: PaymentGateways.TYPE, id }, params, options)
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isPaymentGateway(resource: any): resource is PaymentGateway {
		return resource.type && (resource.type === PaymentGateways.TYPE)
	}


	relationship(id: string | ResourceId): PaymentGatewayRel {
		return (typeof id === 'string') ? { id, type: PaymentGateways.TYPE } : { id: id.id, type: PaymentGateways.TYPE }
	}


	type(): string {
		return PaymentGateways.TYPE
	}

}


export default PaymentGateways

export { PaymentGateway }
