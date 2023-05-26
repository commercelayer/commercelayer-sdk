import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Market, MarketType } from './markets'
import type { Customer, CustomerType } from './customers'
import type { Address, AddressType } from './addresses'
import type { PaymentMethod, PaymentMethodType } from './payment_methods'
import type { CustomerPaymentSource } from './customer_payment_sources'
import type { Sku } from './skus'
import type { Bundle } from './bundles'
import type { AdyenPayment, AdyenPaymentType } from './adyen_payments'
import type { AxervePayment, AxervePaymentType } from './axerve_payments'
import type { BraintreePayment, BraintreePaymentType } from './braintree_payments'
import type { CheckoutComPayment, CheckoutComPaymentType } from './checkout_com_payments'
import type { ExternalPayment, ExternalPaymentType } from './external_payments'
import type { KlarnaPayment, KlarnaPaymentType } from './klarna_payments'
import type { PaypalPayment, PaypalPaymentType } from './paypal_payments'
import type { SatispayPayment, SatispayPaymentType } from './satispay_payments'
import type { StripePayment, StripePaymentType } from './stripe_payments'
import type { WireTransfer, WireTransferType } from './wire_transfers'
import type { LineItem } from './line_items'
import type { Shipment } from './shipments'
import type { Authorization } from './authorizations'
import type { Void } from './voids'
import type { Capture } from './captures'
import type { Refund } from './refunds'
import type { Return } from './returns'
import type { OrderSubscription } from './order_subscriptions'
import type { OrderFactory } from './order_factories'
import type { OrderCopy } from './order_copies'
import type { RecurringOrderCopy } from './recurring_order_copies'
import type { Attachment } from './attachments'
import type { Event } from './events'
import type { Tag, TagType } from './tags'


type OrderType = 'orders'
type OrderRel = ResourceRel & { type: OrderType }
type MarketRel = ResourceRel & { type: MarketType }
type CustomerRel = ResourceRel & { type: CustomerType }
type AddressRel = ResourceRel & { type: AddressType }
type PaymentMethodRel = ResourceRel & { type: PaymentMethodType }
type AdyenPaymentRel = ResourceRel & { type: AdyenPaymentType }
type AxervePaymentRel = ResourceRel & { type: AxervePaymentType }
type BraintreePaymentRel = ResourceRel & { type: BraintreePaymentType }
type CheckoutComPaymentRel = ResourceRel & { type: CheckoutComPaymentType }
type ExternalPaymentRel = ResourceRel & { type: ExternalPaymentType }
type KlarnaPaymentRel = ResourceRel & { type: KlarnaPaymentType }
type PaypalPaymentRel = ResourceRel & { type: PaypalPaymentType }
type SatispayPaymentRel = ResourceRel & { type: SatispayPaymentType }
type StripePaymentRel = ResourceRel & { type: StripePaymentType }
type WireTransferRel = ResourceRel & { type: WireTransferType }
type TagRel = ResourceRel & { type: TagType }


interface Order extends Resource {
	
	readonly type: OrderType

	number?: number | null
	autorefresh?: boolean | null
	status: 'draft' | 'pending' | 'placed' | 'approved' | 'cancelled'
	payment_status: 'unpaid' | 'authorized' | 'partially_authorized' | 'paid' | 'partially_paid' | 'voided' | 'partially_voided' | 'refunded' | 'partially_refunded' | 'free'
	fulfillment_status: 'unfulfilled' | 'in_progress' | 'fulfilled' | 'not_required'
	guest?: boolean | null
	editable?: boolean | null
	customer_email?: string | null
	language_code?: string | null
	currency_code?: string | null
	tax_included?: boolean | null
	tax_rate?: number | null
	freight_taxable?: boolean | null
	requires_billing_info?: boolean | null
	country_code?: string | null
	shipping_country_code_lock?: string | null
	coupon_code?: string | null
	gift_card_code?: string | null
	gift_card_or_coupon_code?: string | null
	subtotal_amount_cents?: number | null
	subtotal_amount_float?: number | null
	formatted_subtotal_amount?: string | null
	shipping_amount_cents?: number | null
	shipping_amount_float?: number | null
	formatted_shipping_amount?: string | null
	payment_method_amount_cents?: number | null
	payment_method_amount_float?: number | null
	formatted_payment_method_amount?: string | null
	discount_amount_cents?: number | null
	discount_amount_float?: number | null
	formatted_discount_amount?: string | null
	adjustment_amount_cents?: number | null
	adjustment_amount_float?: number | null
	formatted_adjustment_amount?: string | null
	gift_card_amount_cents?: number | null
	gift_card_amount_float?: number | null
	formatted_gift_card_amount?: string | null
	total_tax_amount_cents?: number | null
	total_tax_amount_float?: number | null
	formatted_total_tax_amount?: string | null
	subtotal_tax_amount_cents?: number | null
	subtotal_tax_amount_float?: number | null
	formatted_subtotal_tax_amount?: string | null
	shipping_tax_amount_cents?: number | null
	shipping_tax_amount_float?: number | null
	formatted_shipping_tax_amount?: string | null
	payment_method_tax_amount_cents?: number | null
	payment_method_tax_amount_float?: number | null
	formatted_payment_method_tax_amount?: string | null
	adjustment_tax_amount_cents?: number | null
	adjustment_tax_amount_float?: number | null
	formatted_adjustment_tax_amount?: string | null
	total_amount_cents?: number | null
	total_amount_float?: number | null
	formatted_total_amount?: string | null
	total_taxable_amount_cents?: number | null
	total_taxable_amount_float?: number | null
	formatted_total_taxable_amount?: string | null
	subtotal_taxable_amount_cents?: number | null
	subtotal_taxable_amount_float?: number | null
	formatted_subtotal_taxable_amount?: string | null
	shipping_taxable_amount_cents?: number | null
	shipping_taxable_amount_float?: number | null
	formatted_shipping_taxable_amount?: string | null
	payment_method_taxable_amount_cents?: number | null
	payment_method_taxable_amount_float?: number | null
	formatted_payment_method_taxable_amount?: string | null
	adjustment_taxable_amount_cents?: number | null
	adjustment_taxable_amount_float?: number | null
	formatted_adjustment_taxable_amount?: string | null
	total_amount_with_taxes_cents?: number | null
	total_amount_with_taxes_float?: number | null
	formatted_total_amount_with_taxes?: string | null
	fees_amount_cents?: number | null
	fees_amount_float?: number | null
	formatted_fees_amount?: string | null
	duty_amount_cents?: number | null
	duty_amount_float?: number | null
	formatted_duty_amount?: string | null
	skus_count?: number | null
	line_item_options_count?: number | null
	shipments_count?: number | null
	tax_calculations_count?: number | null
	validations_count?: number | null
	payment_source_details?: Record<string, any> | null
	token?: string | null
	cart_url?: string | null
	return_url?: string | null
	terms_url?: string | null
	privacy_url?: string | null
	checkout_url?: string | null
	placed_at?: string | null
	approved_at?: string | null
	cancelled_at?: string | null
	payment_updated_at?: string | null
	fulfillment_updated_at?: string | null
	refreshed_at?: string | null
	archived_at?: string | null
	expires_at?: string | null
	subscription_created_at?: string | null

	market?: Market | null
	customer?: Customer | null
	shipping_address?: Address | null
	billing_address?: Address | null
	available_payment_methods?: PaymentMethod[] | null
	available_customer_payment_sources?: CustomerPaymentSource[] | null
	available_free_skus?: Sku[] | null
	available_free_bundles?: Bundle[] | null
	payment_method?: PaymentMethod | null
	payment_source?: AdyenPayment | AxervePayment | BraintreePayment | CheckoutComPayment | ExternalPayment | KlarnaPayment | PaypalPayment | SatispayPayment | StripePayment | WireTransfer | null
	line_items?: LineItem[] | null
	shipments?: Shipment[] | null
	transactions?: Array<Authorization | Void | Capture | Refund> | null
	authorizations?: Authorization[] | null
	captures?: Capture[] | null
	voids?: Void[] | null
	refunds?: Refund[] | null
	returns?: Return[] | null
	order_subscriptions?: OrderSubscription[] | null
	order_factories?: OrderFactory[] | null
	order_copies?: OrderCopy[] | null
	recurring_order_copies?: RecurringOrderCopy[] | null
	attachments?: Attachment[] | null
	events?: Event[] | null
	tags?: Tag[] | null

}


interface OrderCreate extends ResourceCreate {
	
	autorefresh?: boolean | null
	guest?: boolean | null
	customer_email?: string | null
	customer_password?: string | null
	language_code?: string | null
	shipping_country_code_lock?: string | null
	coupon_code?: string | null
	gift_card_code?: string | null
	gift_card_or_coupon_code?: string | null
	cart_url?: string | null
	return_url?: string | null
	terms_url?: string | null
	privacy_url?: string | null

	market?: MarketRel | null
	customer?: CustomerRel | null
	shipping_address?: AddressRel | null
	billing_address?: AddressRel | null
	payment_method?: PaymentMethodRel | null
	payment_source?: AdyenPaymentRel | AxervePaymentRel | BraintreePaymentRel | CheckoutComPaymentRel | ExternalPaymentRel | KlarnaPaymentRel | PaypalPaymentRel | SatispayPaymentRel | StripePaymentRel | WireTransferRel | null
	tags?: TagRel[] | null

}


interface OrderUpdate extends ResourceUpdate {
	
	autorefresh?: boolean | null
	guest?: boolean | null
	customer_email?: string | null
	customer_password?: string | null
	language_code?: string | null
	shipping_country_code_lock?: string | null
	coupon_code?: string | null
	gift_card_code?: string | null
	gift_card_or_coupon_code?: string | null
	cart_url?: string | null
	return_url?: string | null
	terms_url?: string | null
	privacy_url?: string | null
	_archive?: boolean | null
	_unarchive?: boolean | null
	_place?: boolean | null
	_cancel?: boolean | null
	_approve?: boolean | null
	_approve_and_capture?: boolean | null
	_authorize?: boolean | null
	_authorization_amount_cents?: number | null
	_capture?: boolean | null
	_refund?: boolean | null
	_update_taxes?: boolean | null
	_nullify_payment_source?: boolean | null
	_billing_address_clone_id?: string | null
	_shipping_address_clone_id?: string | null
	_customer_payment_source_id?: string | null
	_shipping_address_same_as_billing?: boolean | null
	_billing_address_same_as_shipping?: boolean | null
	_commit_invoice?: boolean | null
	_refund_invoice?: boolean | null
	_save_payment_source_to_customer_wallet?: boolean | null
	_save_shipping_address_to_customer_address_book?: boolean | null
	_save_billing_address_to_customer_address_book?: boolean | null
	_refresh?: boolean | null
	_validate?: boolean | null
	_create_subscriptions?: boolean | null

	market?: MarketRel | null
	customer?: CustomerRel | null
	shipping_address?: AddressRel | null
	billing_address?: AddressRel | null
	payment_method?: PaymentMethodRel | null
	payment_source?: AdyenPaymentRel | AxervePaymentRel | BraintreePaymentRel | CheckoutComPaymentRel | ExternalPaymentRel | KlarnaPaymentRel | PaypalPaymentRel | SatispayPaymentRel | StripePaymentRel | WireTransferRel | null
	tags?: TagRel[] | null

}


class Orders extends ApiResource<Order> {

	static readonly TYPE: OrderType = 'orders' as const

	async create(resource: OrderCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Order> {
		return this.resources.create<OrderCreate, Order>({ ...resource, type: Orders.TYPE }, params, options)
	}

	async update(resource: OrderUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Order> {
		return this.resources.update<OrderUpdate, Order>({ ...resource, type: Orders.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: Orders.TYPE } : id, options)
	}

	async market(orderId: string | Order, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Market> {
		const _orderId = (orderId as Order).id || orderId as string
		return this.resources.fetch<Market>({ type: 'markets' }, `orders/${_orderId}/market`, params, options) as unknown as Market
	}

	async customer(orderId: string | Order, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Customer> {
		const _orderId = (orderId as Order).id || orderId as string
		return this.resources.fetch<Customer>({ type: 'customers' }, `orders/${_orderId}/customer`, params, options) as unknown as Customer
	}

	async shipping_address(orderId: string | Order, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Address> {
		const _orderId = (orderId as Order).id || orderId as string
		return this.resources.fetch<Address>({ type: 'addresses' }, `orders/${_orderId}/shipping_address`, params, options) as unknown as Address
	}

	async billing_address(orderId: string | Order, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Address> {
		const _orderId = (orderId as Order).id || orderId as string
		return this.resources.fetch<Address>({ type: 'addresses' }, `orders/${_orderId}/billing_address`, params, options) as unknown as Address
	}

	async available_payment_methods(orderId: string | Order, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<PaymentMethod>> {
		const _orderId = (orderId as Order).id || orderId as string
		return this.resources.fetch<PaymentMethod>({ type: 'payment_methods' }, `orders/${_orderId}/available_payment_methods`, params, options) as unknown as ListResponse<PaymentMethod>
	}

	async available_customer_payment_sources(orderId: string | Order, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<CustomerPaymentSource>> {
		const _orderId = (orderId as Order).id || orderId as string
		return this.resources.fetch<CustomerPaymentSource>({ type: 'customer_payment_sources' }, `orders/${_orderId}/available_customer_payment_sources`, params, options) as unknown as ListResponse<CustomerPaymentSource>
	}

	async available_free_skus(orderId: string | Order, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Sku>> {
		const _orderId = (orderId as Order).id || orderId as string
		return this.resources.fetch<Sku>({ type: 'skus' }, `orders/${_orderId}/available_free_skus`, params, options) as unknown as ListResponse<Sku>
	}

	async available_free_bundles(orderId: string | Order, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Bundle>> {
		const _orderId = (orderId as Order).id || orderId as string
		return this.resources.fetch<Bundle>({ type: 'bundles' }, `orders/${_orderId}/available_free_bundles`, params, options) as unknown as ListResponse<Bundle>
	}

	async payment_method(orderId: string | Order, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PaymentMethod> {
		const _orderId = (orderId as Order).id || orderId as string
		return this.resources.fetch<PaymentMethod>({ type: 'payment_methods' }, `orders/${_orderId}/payment_method`, params, options) as unknown as PaymentMethod
	}

	async line_items(orderId: string | Order, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<LineItem>> {
		const _orderId = (orderId as Order).id || orderId as string
		return this.resources.fetch<LineItem>({ type: 'line_items' }, `orders/${_orderId}/line_items`, params, options) as unknown as ListResponse<LineItem>
	}

	async shipments(orderId: string | Order, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Shipment>> {
		const _orderId = (orderId as Order).id || orderId as string
		return this.resources.fetch<Shipment>({ type: 'shipments' }, `orders/${_orderId}/shipments`, params, options) as unknown as ListResponse<Shipment>
	}

	async authorizations(orderId: string | Order, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Authorization>> {
		const _orderId = (orderId as Order).id || orderId as string
		return this.resources.fetch<Authorization>({ type: 'authorizations' }, `orders/${_orderId}/authorizations`, params, options) as unknown as ListResponse<Authorization>
	}

	async captures(orderId: string | Order, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Capture>> {
		const _orderId = (orderId as Order).id || orderId as string
		return this.resources.fetch<Capture>({ type: 'captures' }, `orders/${_orderId}/captures`, params, options) as unknown as ListResponse<Capture>
	}

	async voids(orderId: string | Order, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Void>> {
		const _orderId = (orderId as Order).id || orderId as string
		return this.resources.fetch<Void>({ type: 'voids' }, `orders/${_orderId}/voids`, params, options) as unknown as ListResponse<Void>
	}

	async refunds(orderId: string | Order, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Refund>> {
		const _orderId = (orderId as Order).id || orderId as string
		return this.resources.fetch<Refund>({ type: 'refunds' }, `orders/${_orderId}/refunds`, params, options) as unknown as ListResponse<Refund>
	}

	async returns(orderId: string | Order, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Return>> {
		const _orderId = (orderId as Order).id || orderId as string
		return this.resources.fetch<Return>({ type: 'returns' }, `orders/${_orderId}/returns`, params, options) as unknown as ListResponse<Return>
	}

	async order_subscriptions(orderId: string | Order, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<OrderSubscription>> {
		const _orderId = (orderId as Order).id || orderId as string
		return this.resources.fetch<OrderSubscription>({ type: 'order_subscriptions' }, `orders/${_orderId}/order_subscriptions`, params, options) as unknown as ListResponse<OrderSubscription>
	}

	async order_factories(orderId: string | Order, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<OrderFactory>> {
		const _orderId = (orderId as Order).id || orderId as string
		return this.resources.fetch<OrderFactory>({ type: 'order_factories' }, `orders/${_orderId}/order_factories`, params, options) as unknown as ListResponse<OrderFactory>
	}

	async order_copies(orderId: string | Order, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<OrderCopy>> {
		const _orderId = (orderId as Order).id || orderId as string
		return this.resources.fetch<OrderCopy>({ type: 'order_copies' }, `orders/${_orderId}/order_copies`, params, options) as unknown as ListResponse<OrderCopy>
	}

	async recurring_order_copies(orderId: string | Order, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<RecurringOrderCopy>> {
		const _orderId = (orderId as Order).id || orderId as string
		return this.resources.fetch<RecurringOrderCopy>({ type: 'recurring_order_copies' }, `orders/${_orderId}/recurring_order_copies`, params, options) as unknown as ListResponse<RecurringOrderCopy>
	}

	async attachments(orderId: string | Order, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _orderId = (orderId as Order).id || orderId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `orders/${_orderId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async events(orderId: string | Order, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _orderId = (orderId as Order).id || orderId as string
		return this.resources.fetch<Event>({ type: 'events' }, `orders/${_orderId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async tags(orderId: string | Order, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Tag>> {
		const _orderId = (orderId as Order).id || orderId as string
		return this.resources.fetch<Tag>({ type: 'tags' }, `orders/${_orderId}/tags`, params, options) as unknown as ListResponse<Tag>
	}


	isOrder(resource: any): resource is Order {
		return resource.type && (resource.type === Orders.TYPE)
	}


	relationship(id: string | ResourceId | null): OrderRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: Orders.TYPE } : { id: id.id, type: Orders.TYPE }
	}


	type(): OrderType {
		return Orders.TYPE
	}

}


export default Orders

export type { Order, OrderCreate, OrderUpdate, OrderType }
