import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { Market } from './markets'
import { PaymentGateway } from './payment_gateways'
import { Attachment } from './attachments'


type PaymentMethodRel = ResourceId & { type: typeof PaymentMethods.TYPE }
type MarketRel = ResourceId & { type: 'markets' }
type PaymentGatewayRel = ResourceId & { type: 'payment_gateways' }


interface PaymentMethod extends Resource {
	
	payment_source_type?: string
	name?: string
	moto?: boolean
	disabled_at?: string
	price_amount_cents?: number
	price_amount_float?: number
	formatted_price_amount?: string

	market?: Market
	payment_gateway?: PaymentGateway
	attachments?: Attachment[]

}


interface PaymentMethodCreate extends ResourceCreate {
	
	payment_source_type: string
	moto?: boolean
	price_amount_cents: number

	market: MarketRel
	payment_gateway: PaymentGatewayRel

}


interface PaymentMethodUpdate extends ResourceUpdate {
	
	payment_source_type?: string
	moto?: boolean
	price_amount_cents?: number

	market?: MarketRel
	payment_gateway?: PaymentGatewayRel

}


class PaymentMethods extends ApiResource {

	static readonly TYPE: 'payment_methods' = 'payment_methods'
	// static readonly PATH = 'payment_methods'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<PaymentMethod>> {
		return this.resources.list({ type: PaymentMethods.TYPE }, params, options)
	}

	async create(resource: PaymentMethodCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PaymentMethod> {
		return this.resources.create({ ...resource, type: PaymentMethods.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PaymentMethod> {
		return this.resources.retrieve<PaymentMethod>({ type: PaymentMethods.TYPE, id }, params, options)
	}

	async update(resource: PaymentMethodUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PaymentMethod> {
		return this.resources.update({ ...resource, type: PaymentMethods.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: PaymentMethods.TYPE, id }, options)
	}
	


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isPaymentMethod(resource: any): resource is PaymentMethod {
		return resource.type && (resource.type === PaymentMethods.TYPE)
	}


	relationship(id: string | ResourceId): PaymentMethodRel {
		return (typeof id === 'string') ? { id, type: PaymentMethods.TYPE } : { id: id.id, type: PaymentMethods.TYPE }
	}


	type(): string {
		return PaymentMethods.TYPE
	}

}


export default PaymentMethods

export { PaymentMethod, PaymentMethodCreate, PaymentMethodUpdate }
