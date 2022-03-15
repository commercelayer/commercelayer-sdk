import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { Market } from './markets'
import type { Customer } from './customers'
import type { Address } from './addresses'
import type { PaymentMethod } from './payment_methods'
import type { CustomerPaymentSource } from './customer_payment_sources'
import type { AdyenPayment } from './adyen_payments'
import type { BraintreePayment } from './braintree_payments'
import type { CheckoutComPayment } from './checkout_com_payments'
import type { ExternalPayment } from './external_payments'
import type { KlarnaPayment } from './klarna_payments'
import type { PaypalPayment } from './paypal_payments'
import type { StripePayment } from './stripe_payments'
import type { WireTransfer } from './wire_transfers'
import type { LineItem } from './line_items'
import type { Shipment } from './shipments'
import type { Authorization } from './authorizations'
import type { Void } from './voids'
import type { Capture } from './captures'
import type { Refund } from './refunds'
import type { OrderSubscription } from './order_subscriptions'
import type { OrderCopy } from './order_copies'
import type { Attachment } from './attachments'


type OrderRel = ResourceRel & { type: typeof Orders.TYPE }
type MarketRel = ResourceRel & { type: 'markets' }
type CustomerRel = ResourceRel & { type: 'customers' }
type AddressRel = ResourceRel & { type: 'addresses' }
type PaymentMethodRel = ResourceRel & { type: 'payment_methods' }
type AdyenPaymentRel = ResourceRel & { type: 'adyen_payments' }
type BraintreePaymentRel = ResourceRel & { type: 'braintree_payments' }
type CheckoutComPaymentRel = ResourceRel & { type: 'checkout_com_payments' }
type ExternalPaymentRel = ResourceRel & { type: 'external_payments' }
type KlarnaPaymentRel = ResourceRel & { type: 'klarna_payments' }
type PaypalPaymentRel = ResourceRel & { type: 'paypal_payments' }
type StripePaymentRel = ResourceRel & { type: 'stripe_payments' }
type WireTransferRel = ResourceRel & { type: 'wire_transfers' }


interface Order extends Resource {
	
	number?: number
	autorefresh?: boolean
	status?: string
	payment_status?: string
	fulfillment_status?: string
	guest?: boolean
	editable?: boolean
	customer_email?: string
	language_code?: string
	currency_code?: string
	tax_included?: boolean
	tax_rate?: number
	freight_taxable?: boolean
	requires_billing_info?: boolean
	country_code?: string
	shipping_country_code_lock?: string
	coupon_code?: string
	gift_card_code?: string
	gift_card_or_coupon_code?: string
	subtotal_amount_cents?: number
	subtotal_amount_float?: number
	formatted_subtotal_amount?: string
	shipping_amount_cents?: number
	shipping_amount_float?: number
	formatted_shipping_amount?: string
	payment_method_amount_cents?: number
	payment_method_amount_float?: number
	formatted_payment_method_amount?: string
	discount_amount_cents?: number
	discount_amount_float?: number
	formatted_discount_amount?: string
	adjustment_amount_cents?: number
	adjustment_amount_float?: number
	formatted_adjustment_amount?: string
	gift_card_amount_cents?: number
	gift_card_amount_float?: number
	formatted_gift_card_amount?: string
	total_tax_amount_cents?: number
	total_tax_amount_float?: number
	formatted_total_tax_amount?: string
	subtotal_tax_amount_cents?: number
	subtotal_tax_amount_float?: number
	formatted_subtotal_tax_amount?: string
	shipping_tax_amount_cents?: number
	shipping_tax_amount_float?: number
	formatted_shipping_tax_amount?: string
	payment_method_tax_amount_cents?: number
	payment_method_tax_amount_float?: number
	formatted_payment_method_tax_amount?: string
	adjustment_tax_amount_cents?: number
	adjustment_tax_amount_float?: number
	formatted_adjustment_tax_amount?: string
	total_amount_cents?: number
	total_amount_float?: number
	formatted_total_amount?: string
	total_taxable_amount_cents?: number
	total_taxable_amount_float?: number
	formatted_total_taxable_amount?: string
	subtotal_taxable_amount_cents?: number
	subtotal_taxable_amount_float?: number
	formatted_subtotal_taxable_amount?: string
	shipping_taxable_amount_cents?: number
	shipping_taxable_amount_float?: number
	formatted_shipping_taxable_amount?: string
	payment_method_taxable_amount_cents?: number
	payment_method_taxable_amount_float?: number
	formatted_payment_method_taxable_amount?: string
	adjustment_taxable_amount_cents?: number
	adjustment_taxable_amount_float?: number
	formatted_adjustment_taxable_amount?: string
	total_amount_with_taxes_cents?: number
	total_amount_with_taxes_float?: number
	formatted_total_amount_with_taxes?: string
	fees_amount_cents?: number
	fees_amount_float?: number
	formatted_fees_amount?: string
	duty_amount_cents?: number
	duty_amount_float?: number
	formatted_duty_amount?: string
	skus_count?: number
	line_item_options_count?: number
	shipments_count?: number
	payment_source_details?: object
	token?: string
	cart_url?: string
	return_url?: string
	terms_url?: string
	privacy_url?: string
	checkout_url?: string
	placed_at?: string
	approved_at?: string
	cancelled_at?: string
	payment_updated_at?: string
	fulfillment_updated_at?: string
	refreshed_at?: string
	archived_at?: string
	expires_at?: string

	market?: Market
	customer?: Customer
	shipping_address?: Address
	billing_address?: Address
	available_payment_methods?: PaymentMethod[]
	available_customer_payment_sources?: CustomerPaymentSource[]
	payment_method?: PaymentMethod
	payment_source?: AdyenPayment | BraintreePayment | CheckoutComPayment | ExternalPayment | KlarnaPayment | PaypalPayment | StripePayment | WireTransfer
	line_items?: LineItem[]
	shipments?: Shipment[]
	transactions?: (Authorization | Void | Capture | Refund)[]
	authorizations?: Authorization[]
	captures?: Capture[]
	voids?: Void[]
	refunds?: Refund[]
	order_subscriptions?: OrderSubscription[]
	order_copies?: OrderCopy[]
	attachments?: Attachment[]

}


interface OrderCreate extends ResourceCreate {
	
	autorefresh?: boolean
	guest?: boolean
	customer_email?: string
	customer_password?: string
	language_code?: string
	shipping_country_code_lock?: string
	coupon_code?: string
	gift_card_code?: string
	gift_card_or_coupon_code?: string
	cart_url?: string
	return_url?: string
	terms_url?: string
	privacy_url?: string

	market?: MarketRel
	customer?: CustomerRel
	shipping_address?: AddressRel
	billing_address?: AddressRel
	payment_method?: PaymentMethodRel
	payment_source?: AdyenPaymentRel | BraintreePaymentRel | CheckoutComPaymentRel | ExternalPaymentRel | KlarnaPaymentRel | PaypalPaymentRel | StripePaymentRel | WireTransferRel

}


interface OrderUpdate extends ResourceUpdate {
	
	autorefresh?: boolean
	guest?: boolean
	customer_email?: string
	customer_password?: string
	language_code?: string
	shipping_country_code_lock?: string
	coupon_code?: string
	gift_card_code?: string
	gift_card_or_coupon_code?: string
	cart_url?: string
	return_url?: string
	terms_url?: string
	privacy_url?: string
	_archive?: boolean
	_unarchive?: boolean
	_place?: boolean
	_cancel?: boolean
	_approve?: boolean
	_approve_and_capture?: boolean
	_authorize?: boolean
	_authorization_amount_cents?: number
	_capture?: boolean
	_refund?: boolean
	_update_taxes?: boolean
	_billing_address_clone_id?: string
	_shipping_address_clone_id?: string
	_customer_payment_source_id?: string
	_shipping_address_same_as_billing?: boolean
	_billing_address_same_as_shipping?: boolean
	_save_payment_source_to_customer_wallet?: boolean
	_save_shipping_address_to_customer_address_book?: boolean
	_save_billing_address_to_customer_address_book?: boolean
	_refresh?: boolean

	market?: MarketRel
	customer?: CustomerRel
	shipping_address?: AddressRel
	billing_address?: AddressRel
	payment_method?: PaymentMethodRel
	payment_source?: AdyenPaymentRel | BraintreePaymentRel | CheckoutComPaymentRel | ExternalPaymentRel | KlarnaPaymentRel | PaypalPaymentRel | StripePaymentRel | WireTransferRel

}


class Orders extends ApiResource {

	static readonly TYPE: 'orders' = 'orders'
	// static readonly PATH = 'orders'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Order>> {
		return this.resources.list<Order>({ type: Orders.TYPE }, params, options)
	}

	async create(resource: OrderCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Order> {
		return this.resources.create<OrderCreate, Order>({ ...resource, type: Orders.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Order> {
		return this.resources.retrieve<Order>({ type: Orders.TYPE, id }, params, options)
	}

	async update(resource: OrderUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Order> {
		return this.resources.update<OrderUpdate, Order>({ ...resource, type: Orders.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: Orders.TYPE, id }, options)
	}

	async market(orderId: string | Order, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Market> {
		const _orderId = (orderId as Order).id || orderId
		return this.resources.fetch<Market>({ type: 'markets' }, `orders/${_orderId}/market`, params, options) as unknown as Market
	}

	async customer(orderId: string | Order, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Customer> {
		const _orderId = (orderId as Order).id || orderId
		return this.resources.fetch<Customer>({ type: 'customers' }, `orders/${_orderId}/customer`, params, options) as unknown as Customer
	}

	async shipping_address(orderId: string | Order, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Address> {
		const _orderId = (orderId as Order).id || orderId
		return this.resources.fetch<Address>({ type: 'addresses' }, `orders/${_orderId}/shipping_address`, params, options) as unknown as Address
	}

	async billing_address(orderId: string | Order, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Address> {
		const _orderId = (orderId as Order).id || orderId
		return this.resources.fetch<Address>({ type: 'addresses' }, `orders/${_orderId}/billing_address`, params, options) as unknown as Address
	}

	async available_payment_methods(orderId: string | Order, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<PaymentMethod>> {
		const _orderId = (orderId as Order).id || orderId
		return this.resources.fetch<PaymentMethod>({ type: 'payment_methods' }, `orders/${_orderId}/available_payment_methods`, params, options) as unknown as ListResponse<PaymentMethod>
	}

	async available_customer_payment_sources(orderId: string | Order, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<CustomerPaymentSource>> {
		const _orderId = (orderId as Order).id || orderId
		return this.resources.fetch<CustomerPaymentSource>({ type: 'customer_payment_sources' }, `orders/${_orderId}/available_customer_payment_sources`, params, options) as unknown as ListResponse<CustomerPaymentSource>
	}

	async payment_method(orderId: string | Order, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PaymentMethod> {
		const _orderId = (orderId as Order).id || orderId
		return this.resources.fetch<PaymentMethod>({ type: 'payment_methods' }, `orders/${_orderId}/payment_method`, params, options) as unknown as PaymentMethod
	}

	async line_items(orderId: string | Order, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<LineItem>> {
		const _orderId = (orderId as Order).id || orderId
		return this.resources.fetch<LineItem>({ type: 'line_items' }, `orders/${_orderId}/line_items`, params, options) as unknown as ListResponse<LineItem>
	}

	async shipments(orderId: string | Order, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Shipment>> {
		const _orderId = (orderId as Order).id || orderId
		return this.resources.fetch<Shipment>({ type: 'shipments' }, `orders/${_orderId}/shipments`, params, options) as unknown as ListResponse<Shipment>
	}

	async authorizations(orderId: string | Order, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Authorization>> {
		const _orderId = (orderId as Order).id || orderId
		return this.resources.fetch<Authorization>({ type: 'authorizations' }, `orders/${_orderId}/authorizations`, params, options) as unknown as ListResponse<Authorization>
	}

	async captures(orderId: string | Order, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Capture>> {
		const _orderId = (orderId as Order).id || orderId
		return this.resources.fetch<Capture>({ type: 'captures' }, `orders/${_orderId}/captures`, params, options) as unknown as ListResponse<Capture>
	}

	async voids(orderId: string | Order, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Void>> {
		const _orderId = (orderId as Order).id || orderId
		return this.resources.fetch<Void>({ type: 'voids' }, `orders/${_orderId}/voids`, params, options) as unknown as ListResponse<Void>
	}

	async refunds(orderId: string | Order, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Refund>> {
		const _orderId = (orderId as Order).id || orderId
		return this.resources.fetch<Refund>({ type: 'refunds' }, `orders/${_orderId}/refunds`, params, options) as unknown as ListResponse<Refund>
	}

	async order_subscriptions(orderId: string | Order, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<OrderSubscription>> {
		const _orderId = (orderId as Order).id || orderId
		return this.resources.fetch<OrderSubscription>({ type: 'order_subscriptions' }, `orders/${_orderId}/order_subscriptions`, params, options) as unknown as ListResponse<OrderSubscription>
	}

	async order_copies(orderId: string | Order, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<OrderCopy>> {
		const _orderId = (orderId as Order).id || orderId
		return this.resources.fetch<OrderCopy>({ type: 'order_copies' }, `orders/${_orderId}/order_copies`, params, options) as unknown as ListResponse<OrderCopy>
	}

	async attachments(orderId: string | Order, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _orderId = (orderId as Order).id || orderId
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `orders/${_orderId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isOrder(resource: any): resource is Order {
		return resource.type && (resource.type === Orders.TYPE)
	}


	relationship(id: string | ResourceId | null): OrderRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: Orders.TYPE } : { id: id.id, type: Orders.TYPE }
	}


	type(): string {
		return Orders.TYPE
	}

}


export default Orders

export { Order, OrderCreate, OrderUpdate }
