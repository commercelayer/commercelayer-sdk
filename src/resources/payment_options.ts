import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { Order } from './orders'
import type { Attachment } from './attachments'


type PaymentOptionRel = ResourceRel & { type: typeof PaymentOptions.TYPE }
type OrderRel = ResourceRel & { type: 'orders' }


interface PaymentOption extends Resource {
	
	name?: string
	payment_source_type?: string
	data?: object

	order?: Order
	attachments?: Attachment[]

}


interface PaymentOptionCreate extends ResourceCreate {
	
	name?: string
	payment_source_type: string
	data: object

	order: OrderRel

}


interface PaymentOptionUpdate extends ResourceUpdate {
	
	name?: string
	data?: object

	order?: OrderRel

}


class PaymentOptions extends ApiResource {

	static readonly TYPE: 'payment_options' = 'payment_options' as const
	// static readonly PATH = 'payment_options'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<PaymentOption>> {
		return this.resources.list<PaymentOption>({ type: PaymentOptions.TYPE }, params, options)
	}

	async create(resource: PaymentOptionCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PaymentOption> {
		return this.resources.create<PaymentOptionCreate, PaymentOption>({ ...resource, type: PaymentOptions.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PaymentOption> {
		return this.resources.retrieve<PaymentOption>({ type: PaymentOptions.TYPE, id }, params, options)
	}

	async update(resource: PaymentOptionUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PaymentOption> {
		return this.resources.update<PaymentOptionUpdate, PaymentOption>({ ...resource, type: PaymentOptions.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: PaymentOptions.TYPE, id }, options)
	}

	async order(paymentOptionId: string | PaymentOption, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Order> {
		const _paymentOptionId = (paymentOptionId as PaymentOption).id || paymentOptionId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `payment_options/${_paymentOptionId}/order`, params, options) as unknown as Order
	}

	async attachments(paymentOptionId: string | PaymentOption, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _paymentOptionId = (paymentOptionId as PaymentOption).id || paymentOptionId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `payment_options/${_paymentOptionId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isPaymentOption(resource: any): resource is PaymentOption {
		return resource.type && (resource.type === PaymentOptions.TYPE)
	}


	relationship(id: string | ResourceId | null): PaymentOptionRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: PaymentOptions.TYPE } : { id: id.id, type: PaymentOptions.TYPE }
	}


	type(): string {
		return PaymentOptions.TYPE
	}

}


export default PaymentOptions

export { PaymentOption, PaymentOptionCreate, PaymentOptionUpdate }
