import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { Market } from './markets'
import type { Customer } from './customers'
import type { Address } from './addresses'
import type { PaymentMethod } from './payment_methods'
import type { CustomerPaymentSource } from './customer_payment_sources'
import type { Sku } from './skus'
import type { Bundle } from './bundles'
import type { AdyenPayment } from './adyen_payments'
import type { AxervePayment } from './axerve_payments'
import type { BraintreePayment } from './braintree_payments'
import type { CheckoutComPayment } from './checkout_com_payments'
import type { ExternalPayment } from './external_payments'
import type { KlarnaPayment } from './klarna_payments'
import type { PaypalPayment } from './paypal_payments'
import type { SatispayPayment } from './satispay_payments'
import type { StripePayment } from './stripe_payments'
import type { WireTransfer } from './wire_transfers'
import type { LineItem } from './line_items'
import type { LineItemOption } from './line_item_options'
import type { StockReservation } from './stock_reservations'
import type { StockLineItem } from './stock_line_items'
import type { StockTransfer } from './stock_transfers'
import type { Shipment } from './shipments'
import type { PaymentOption } from './payment_options'
import type { Authorization } from './authorizations'
import type { Capture } from './captures'
import type { Void } from './voids'
import type { Refund } from './refunds'
import type { Return } from './returns'
import type { OrderSubscription } from './order_subscriptions'
import type { OrderFactory } from './order_factories'
import type { OrderCopy } from './order_copies'
import type { RecurringOrderCopy } from './recurring_order_copies'
import type { Attachment } from './attachments'
import type { Event } from './events'
import type { Tag } from './tags'
import type { Version } from './versions'


type OrderRel = ResourceRel & { type: typeof Orders.TYPE }
type MarketRel = ResourceRel & { type: 'markets' }
type CustomerRel = ResourceRel & { type: 'customers' }
type AddressRel = ResourceRel & { type: 'addresses' }
type PaymentMethodRel = ResourceRel & { type: 'payment_methods' }
type AdyenPaymentRel = ResourceRel & { type: 'adyen_payments' }
type AxervePaymentRel = ResourceRel & { type: 'axerve_payments' }
type BraintreePaymentRel = ResourceRel & { type: 'braintree_payments' }
type CheckoutComPaymentRel = ResourceRel & { type: 'checkout_com_payments' }
type ExternalPaymentRel = ResourceRel & { type: 'external_payments' }
type KlarnaPaymentRel = ResourceRel & { type: 'klarna_payments' }
type PaypalPaymentRel = ResourceRel & { type: 'paypal_payments' }
type SatispayPaymentRel = ResourceRel & { type: 'satispay_payments' }
type StripePaymentRel = ResourceRel & { type: 'stripe_payments' }
type WireTransferRel = ResourceRel & { type: 'wire_transfers' }
type TagRel = ResourceRel & { type: 'tags' }


interface Order extends Resource {
	
	number?: string
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
	payment_method_taxable?: boolean
	adjustment_taxable?: boolean
	gift_card_taxable?: boolean
	requires_billing_info?: boolean
	country_code?: string
	shipping_country_code_lock?: string
	coupon_code?: string
	gift_card_code?: string
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
	place_total_amount_cents?: number
	place_total_amount_float?: number
	formatted_place_total_amount?: string
	skus_count?: number
	line_item_options_count?: number
	shipments_count?: number
	tax_calculations_count?: number
	validations_count?: number
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
	subscription_created_at?: string

	market?: Market
	customer?: Customer
	shipping_address?: Address
	billing_address?: Address
	available_payment_methods?: PaymentMethod[]
	available_customer_payment_sources?: CustomerPaymentSource[]
	available_free_skus?: Sku[]
	available_free_bundles?: Bundle[]
	payment_method?: PaymentMethod
	payment_source?: AdyenPayment | AxervePayment | BraintreePayment | CheckoutComPayment | ExternalPayment | KlarnaPayment | PaypalPayment | SatispayPayment | StripePayment | WireTransfer
	line_items?: LineItem[]
	line_item_options?: LineItemOption[]
	stock_reservations?: StockReservation[]
	stock_line_items?: StockLineItem[]
	stock_transfers?: StockTransfer[]
	shipments?: Shipment[]
	payment_options?: PaymentOption[]
	transactions?: Array<Authorization | Capture | Void | Refund>
	authorizations?: Authorization[]
	captures?: Capture[]
	voids?: Void[]
	refunds?: Refund[]
	returns?: Return[]
	order_subscription?: OrderSubscription
	order_subscriptions?: OrderSubscription[]
	order_factories?: OrderFactory[]
	order_copies?: OrderCopy[]
	recurring_order_copies?: RecurringOrderCopy[]
	attachments?: Attachment[]
	events?: Event[]
	tags?: Tag[]
	versions?: Version[]

}


interface OrderCreate extends ResourceCreate {
	
	number?: string
	autorefresh?: boolean
	guest?: boolean
	customer_email?: string
	customer_password?: string
	language_code?: string
	freight_taxable?: boolean
	payment_method_taxable?: boolean
	adjustment_taxable?: boolean
	gift_card_taxable?: boolean
	shipping_country_code_lock?: string
	coupon_code?: string
	gift_card_code?: string
	cart_url?: string
	return_url?: string
	terms_url?: string
	privacy_url?: string

	market?: MarketRel
	customer?: CustomerRel
	shipping_address?: AddressRel
	billing_address?: AddressRel
	payment_method?: PaymentMethodRel
	payment_source?: AdyenPaymentRel | AxervePaymentRel | BraintreePaymentRel | CheckoutComPaymentRel | ExternalPaymentRel | KlarnaPaymentRel | PaypalPaymentRel | SatispayPaymentRel | StripePaymentRel | WireTransferRel
	tags?: TagRel[]

}


interface OrderUpdate extends ResourceUpdate {
	
	number?: string
	autorefresh?: boolean
	guest?: boolean
	customer_email?: string
	customer_password?: string
	language_code?: string
	freight_taxable?: boolean
	payment_method_taxable?: boolean
	adjustment_taxable?: boolean
	gift_card_taxable?: boolean
	shipping_country_code_lock?: string
	coupon_code?: string
	gift_card_code?: string
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
	_nullify_payment_source?: boolean
	_billing_address_clone_id?: string
	_shipping_address_clone_id?: string
	_customer_payment_source_id?: string
	_shipping_address_same_as_billing?: boolean
	_billing_address_same_as_shipping?: boolean
	_commit_invoice?: boolean
	_refund_invoice?: boolean
	_save_payment_source_to_customer_wallet?: boolean
	_save_shipping_address_to_customer_address_book?: boolean
	_save_billing_address_to_customer_address_book?: boolean
	_refresh?: boolean
	_validate?: boolean
	_create_subscriptions?: boolean
	_start_editing?: boolean
	_stop_editing?: boolean

	market?: MarketRel
	customer?: CustomerRel
	shipping_address?: AddressRel
	billing_address?: AddressRel
	payment_method?: PaymentMethodRel
	payment_source?: AdyenPaymentRel | AxervePaymentRel | BraintreePaymentRel | CheckoutComPaymentRel | ExternalPaymentRel | KlarnaPaymentRel | PaypalPaymentRel | SatispayPaymentRel | StripePaymentRel | WireTransferRel
	tags?: TagRel[]

}


class Orders extends ApiResource {

	static readonly TYPE: 'orders' = 'orders' as const
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

	async line_item_options(orderId: string | Order, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<LineItemOption>> {
		const _orderId = (orderId as Order).id || orderId as string
		return this.resources.fetch<LineItemOption>({ type: 'line_item_options' }, `orders/${_orderId}/line_item_options`, params, options) as unknown as ListResponse<LineItemOption>
	}

	async stock_reservations(orderId: string | Order, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<StockReservation>> {
		const _orderId = (orderId as Order).id || orderId as string
		return this.resources.fetch<StockReservation>({ type: 'stock_reservations' }, `orders/${_orderId}/stock_reservations`, params, options) as unknown as ListResponse<StockReservation>
	}

	async stock_line_items(orderId: string | Order, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<StockLineItem>> {
		const _orderId = (orderId as Order).id || orderId as string
		return this.resources.fetch<StockLineItem>({ type: 'stock_line_items' }, `orders/${_orderId}/stock_line_items`, params, options) as unknown as ListResponse<StockLineItem>
	}

	async stock_transfers(orderId: string | Order, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<StockTransfer>> {
		const _orderId = (orderId as Order).id || orderId as string
		return this.resources.fetch<StockTransfer>({ type: 'stock_transfers' }, `orders/${_orderId}/stock_transfers`, params, options) as unknown as ListResponse<StockTransfer>
	}

	async shipments(orderId: string | Order, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Shipment>> {
		const _orderId = (orderId as Order).id || orderId as string
		return this.resources.fetch<Shipment>({ type: 'shipments' }, `orders/${_orderId}/shipments`, params, options) as unknown as ListResponse<Shipment>
	}

	async payment_options(orderId: string | Order, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<PaymentOption>> {
		const _orderId = (orderId as Order).id || orderId as string
		return this.resources.fetch<PaymentOption>({ type: 'payment_options' }, `orders/${_orderId}/payment_options`, params, options) as unknown as ListResponse<PaymentOption>
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

	async order_subscription(orderId: string | Order, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<OrderSubscription> {
		const _orderId = (orderId as Order).id || orderId as string
		return this.resources.fetch<OrderSubscription>({ type: 'order_subscriptions' }, `orders/${_orderId}/order_subscription`, params, options) as unknown as OrderSubscription
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

	async versions(orderId: string | Order, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _orderId = (orderId as Order).id || orderId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `orders/${_orderId}/versions`, params, options) as unknown as ListResponse<Version>
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
