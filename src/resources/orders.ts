import type { Nullable } from '../types'
import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
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
import type { ResourceError } from './resource_errors'
import type { Event } from './events'
import type { Tag, TagType } from './tags'
import type { Version } from './versions'


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


export type OrderSort = Pick<Order, 'id' | 'number' | 'place_async' | 'status' | 'payment_status' | 'fulfillment_status' | 'guest' | 'language_code' | 'currency_code' | 'tax_included' | 'tax_rate' | 'country_code' | 'coupon_code' | 'gift_card_code' | 'subtotal_amount_cents' | 'shipping_amount_cents' | 'payment_method_amount_cents' | 'discount_amount_cents' | 'adjustment_amount_cents' | 'gift_card_amount_cents' | 'total_tax_amount_cents' | 'subtotal_tax_amount_cents' | 'total_amount_cents' | 'fees_amount_cents' | 'duty_amount_cents' | 'placed_at' | 'approved_at' | 'cancelled_at' | 'payment_updated_at' | 'fulfillment_updated_at' | 'refreshed_at' | 'archived_at' | 'expires_at' | 'subscription_created_at' | 'circuit_state' | 'circuit_failure_count'> & ResourceSort
// export type OrderFilter = Pick<Order, 'id' | 'number' | 'place_async' | 'status' | 'payment_status' | 'fulfillment_status' | 'guest' | 'customer_email' | 'language_code' | 'currency_code' | 'tax_included' | 'tax_rate' | 'country_code' | 'coupon_code' | 'gift_card_code' | 'subtotal_amount_cents' | 'shipping_amount_cents' | 'payment_method_amount_cents' | 'discount_amount_cents' | 'adjustment_amount_cents' | 'gift_card_amount_cents' | 'total_tax_amount_cents' | 'subtotal_tax_amount_cents' | 'total_amount_cents' | 'fees_amount_cents' | 'duty_amount_cents' | 'token' | 'placed_at' | 'approved_at' | 'cancelled_at' | 'payment_updated_at' | 'fulfillment_updated_at' | 'refreshed_at' | 'archived_at' | 'expires_at' | 'subscription_created_at' | 'circuit_state' | 'circuit_failure_count'> & ResourceFilter


interface Order extends Resource {
	
	readonly type: OrderType

	number?: Nullable<string>
	autorefresh?: Nullable<boolean>
	place_async?: Nullable<boolean>
	status: 'draft' | 'pending' | 'placing' | 'placed' | 'editing' | 'approved' | 'cancelled'
	payment_status: 'unpaid' | 'authorized' | 'partially_authorized' | 'paid' | 'partially_paid' | 'voided' | 'partially_voided' | 'refunded' | 'partially_refunded' | 'free'
	fulfillment_status: 'unfulfilled' | 'in_progress' | 'fulfilled' | 'not_required'
	guest?: Nullable<boolean>
	editable?: Nullable<boolean>
	customer_email?: Nullable<string>
	language_code?: Nullable<string>
	currency_code?: Nullable<string>
	tax_included?: Nullable<boolean>
	tax_rate?: Nullable<number>
	freight_taxable?: Nullable<boolean>
	payment_method_taxable?: Nullable<boolean>
	adjustment_taxable?: Nullable<boolean>
	gift_card_taxable?: Nullable<boolean>
	requires_billing_info?: Nullable<boolean>
	country_code?: Nullable<string>
	shipping_country_code_lock?: Nullable<string>
	coupon_code?: Nullable<string>
	gift_card_code?: Nullable<string>
	subtotal_amount_cents?: Nullable<number>
	subtotal_amount_float?: Nullable<number>
	formatted_subtotal_amount?: Nullable<string>
	shipping_amount_cents?: Nullable<number>
	shipping_amount_float?: Nullable<number>
	formatted_shipping_amount?: Nullable<string>
	payment_method_amount_cents?: Nullable<number>
	payment_method_amount_float?: Nullable<number>
	formatted_payment_method_amount?: Nullable<string>
	discount_amount_cents?: Nullable<number>
	discount_amount_float?: Nullable<number>
	formatted_discount_amount?: Nullable<string>
	adjustment_amount_cents?: Nullable<number>
	adjustment_amount_float?: Nullable<number>
	formatted_adjustment_amount?: Nullable<string>
	gift_card_amount_cents?: Nullable<number>
	gift_card_amount_float?: Nullable<number>
	formatted_gift_card_amount?: Nullable<string>
	total_tax_amount_cents?: Nullable<number>
	total_tax_amount_float?: Nullable<number>
	formatted_total_tax_amount?: Nullable<string>
	subtotal_tax_amount_cents?: Nullable<number>
	subtotal_tax_amount_float?: Nullable<number>
	formatted_subtotal_tax_amount?: Nullable<string>
	shipping_tax_amount_cents?: Nullable<number>
	shipping_tax_amount_float?: Nullable<number>
	formatted_shipping_tax_amount?: Nullable<string>
	payment_method_tax_amount_cents?: Nullable<number>
	payment_method_tax_amount_float?: Nullable<number>
	formatted_payment_method_tax_amount?: Nullable<string>
	adjustment_tax_amount_cents?: Nullable<number>
	adjustment_tax_amount_float?: Nullable<number>
	formatted_adjustment_tax_amount?: Nullable<string>
	total_amount_cents?: Nullable<number>
	total_amount_float?: Nullable<number>
	formatted_total_amount?: Nullable<string>
	total_taxable_amount_cents?: Nullable<number>
	total_taxable_amount_float?: Nullable<number>
	formatted_total_taxable_amount?: Nullable<string>
	subtotal_taxable_amount_cents?: Nullable<number>
	subtotal_taxable_amount_float?: Nullable<number>
	formatted_subtotal_taxable_amount?: Nullable<string>
	shipping_taxable_amount_cents?: Nullable<number>
	shipping_taxable_amount_float?: Nullable<number>
	formatted_shipping_taxable_amount?: Nullable<string>
	payment_method_taxable_amount_cents?: Nullable<number>
	payment_method_taxable_amount_float?: Nullable<number>
	formatted_payment_method_taxable_amount?: Nullable<string>
	adjustment_taxable_amount_cents?: Nullable<number>
	adjustment_taxable_amount_float?: Nullable<number>
	formatted_adjustment_taxable_amount?: Nullable<string>
	total_amount_with_taxes_cents?: Nullable<number>
	total_amount_with_taxes_float?: Nullable<number>
	formatted_total_amount_with_taxes?: Nullable<string>
	fees_amount_cents?: Nullable<number>
	fees_amount_float?: Nullable<number>
	formatted_fees_amount?: Nullable<string>
	duty_amount_cents?: Nullable<number>
	duty_amount_float?: Nullable<number>
	formatted_duty_amount?: Nullable<string>
	place_total_amount_cents?: Nullable<number>
	place_total_amount_float?: Nullable<number>
	formatted_place_total_amount?: Nullable<string>
	skus_count?: Nullable<number>
	line_item_options_count?: Nullable<number>
	shipments_count?: Nullable<number>
	tax_calculations_count?: Nullable<number>
	validations_count?: Nullable<number>
	errors_count?: Nullable<number>
	payment_source_details?: Nullable<Record<string, any>>
	token?: Nullable<string>
	cart_url?: Nullable<string>
	return_url?: Nullable<string>
	terms_url?: Nullable<string>
	privacy_url?: Nullable<string>
	checkout_url?: Nullable<string>
	placed_at?: Nullable<string>
	approved_at?: Nullable<string>
	cancelled_at?: Nullable<string>
	payment_updated_at?: Nullable<string>
	fulfillment_updated_at?: Nullable<string>
	refreshed_at?: Nullable<string>
	archived_at?: Nullable<string>
	expires_at?: Nullable<string>
	subscription_created_at?: Nullable<string>
	circuit_state?: Nullable<string>
	circuit_failure_count?: Nullable<number>

	market?: Nullable<Market>
	customer?: Nullable<Customer>
	shipping_address?: Nullable<Address>
	billing_address?: Nullable<Address>
	available_payment_methods?: Nullable<PaymentMethod[]>
	available_customer_payment_sources?: Nullable<CustomerPaymentSource[]>
	available_free_skus?: Nullable<Sku[]>
	available_free_bundles?: Nullable<Bundle[]>
	payment_method?: Nullable<PaymentMethod>
	payment_source?: Nullable<AdyenPayment | AxervePayment | BraintreePayment | CheckoutComPayment | ExternalPayment | KlarnaPayment | PaypalPayment | SatispayPayment | StripePayment | WireTransfer>
	line_items?: Nullable<LineItem[]>
	line_item_options?: Nullable<LineItemOption[]>
	stock_reservations?: Nullable<StockReservation[]>
	stock_line_items?: Nullable<StockLineItem[]>
	stock_transfers?: Nullable<StockTransfer[]>
	shipments?: Nullable<Shipment[]>
	payment_options?: Nullable<PaymentOption[]>
	transactions?: Nullable<Array<Authorization | Capture | Void | Refund>>
	authorizations?: Nullable<Authorization[]>
	captures?: Nullable<Capture[]>
	voids?: Nullable<Void[]>
	refunds?: Nullable<Refund[]>
	returns?: Nullable<Return[]>
	order_subscription?: Nullable<OrderSubscription>
	order_subscriptions?: Nullable<OrderSubscription[]>
	order_factories?: Nullable<OrderFactory[]>
	order_copies?: Nullable<OrderCopy[]>
	recurring_order_copies?: Nullable<RecurringOrderCopy[]>
	attachments?: Nullable<Attachment[]>
	resource_errors?: Nullable<ResourceError[]>
	events?: Nullable<Event[]>
	tags?: Nullable<Tag[]>
	versions?: Nullable<Version[]>

}


interface OrderCreate extends ResourceCreate {
	
	number?: Nullable<string>
	autorefresh?: Nullable<boolean>
	place_async?: Nullable<boolean>
	guest?: Nullable<boolean>
	customer_email?: Nullable<string>
	customer_password?: Nullable<string>
	language_code?: Nullable<string>
	freight_taxable?: Nullable<boolean>
	payment_method_taxable?: Nullable<boolean>
	adjustment_taxable?: Nullable<boolean>
	gift_card_taxable?: Nullable<boolean>
	shipping_country_code_lock?: Nullable<string>
	coupon_code?: Nullable<string>
	gift_card_code?: Nullable<string>
	cart_url?: Nullable<string>
	return_url?: Nullable<string>
	terms_url?: Nullable<string>
	privacy_url?: Nullable<string>

	market?: Nullable<MarketRel>
	customer?: Nullable<CustomerRel>
	shipping_address?: Nullable<AddressRel>
	billing_address?: Nullable<AddressRel>
	payment_method?: Nullable<PaymentMethodRel>
	payment_source?: Nullable<AdyenPaymentRel | AxervePaymentRel | BraintreePaymentRel | CheckoutComPaymentRel | ExternalPaymentRel | KlarnaPaymentRel | PaypalPaymentRel | SatispayPaymentRel | StripePaymentRel | WireTransferRel>
	tags?: Nullable<TagRel[]>

}


interface OrderUpdate extends ResourceUpdate {
	
	number?: Nullable<string>
	autorefresh?: Nullable<boolean>
	place_async?: Nullable<boolean>
	guest?: Nullable<boolean>
	customer_email?: Nullable<string>
	customer_password?: Nullable<string>
	language_code?: Nullable<string>
	freight_taxable?: Nullable<boolean>
	payment_method_taxable?: Nullable<boolean>
	adjustment_taxable?: Nullable<boolean>
	gift_card_taxable?: Nullable<boolean>
	shipping_country_code_lock?: Nullable<string>
	coupon_code?: Nullable<string>
	gift_card_code?: Nullable<string>
	cart_url?: Nullable<string>
	return_url?: Nullable<string>
	terms_url?: Nullable<string>
	privacy_url?: Nullable<string>
	_archive?: Nullable<boolean>
	_unarchive?: Nullable<boolean>
	_pending?: Nullable<boolean>
	_place?: Nullable<boolean>
	_cancel?: Nullable<boolean>
	_approve?: Nullable<boolean>
	_approve_and_capture?: Nullable<boolean>
	_authorize?: Nullable<boolean>
	_authorization_amount_cents?: Nullable<number>
	_capture?: Nullable<boolean>
	_refund?: Nullable<boolean>
	_update_taxes?: Nullable<boolean>
	_nullify_payment_source?: Nullable<boolean>
	_billing_address_clone_id?: Nullable<string>
	_shipping_address_clone_id?: Nullable<string>
	_customer_payment_source_id?: Nullable<string>
	_shipping_address_same_as_billing?: Nullable<boolean>
	_billing_address_same_as_shipping?: Nullable<boolean>
	_commit_invoice?: Nullable<boolean>
	_refund_invoice?: Nullable<boolean>
	_save_payment_source_to_customer_wallet?: Nullable<boolean>
	_save_shipping_address_to_customer_address_book?: Nullable<boolean>
	_save_billing_address_to_customer_address_book?: Nullable<boolean>
	_refresh?: Nullable<boolean>
	_validate?: Nullable<boolean>
	_create_subscriptions?: Nullable<boolean>
	_start_editing?: Nullable<boolean>
	_stop_editing?: Nullable<boolean>
	_reset_circuit?: Nullable<boolean>

	market?: Nullable<MarketRel>
	customer?: Nullable<CustomerRel>
	shipping_address?: Nullable<AddressRel>
	billing_address?: Nullable<AddressRel>
	payment_method?: Nullable<PaymentMethodRel>
	payment_source?: Nullable<AdyenPaymentRel | AxervePaymentRel | BraintreePaymentRel | CheckoutComPaymentRel | ExternalPaymentRel | KlarnaPaymentRel | PaypalPaymentRel | SatispayPaymentRel | StripePaymentRel | WireTransferRel>
	tags?: Nullable<TagRel[]>

}


class Orders extends ApiResource<Order> {

	static readonly TYPE: OrderType = 'orders' as const

	async create(resource: OrderCreate, params?: QueryParamsRetrieve<Order>, options?: ResourcesConfig): Promise<Order> {
		return this.resources.create<OrderCreate, Order>({ ...resource, type: Orders.TYPE }, params, options)
	}

	async update(resource: OrderUpdate, params?: QueryParamsRetrieve<Order>, options?: ResourcesConfig): Promise<Order> {
		return this.resources.update<OrderUpdate, Order>({ ...resource, type: Orders.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: Orders.TYPE } : id, options)
	}

	async market(orderId: string | Order, params?: QueryParamsRetrieve<Market>, options?: ResourcesConfig): Promise<Market> {
		const _orderId = (orderId as Order).id || orderId as string
		return this.resources.fetch<Market>({ type: 'markets' }, `orders/${_orderId}/market`, params, options) as unknown as Market
	}

	async customer(orderId: string | Order, params?: QueryParamsRetrieve<Customer>, options?: ResourcesConfig): Promise<Customer> {
		const _orderId = (orderId as Order).id || orderId as string
		return this.resources.fetch<Customer>({ type: 'customers' }, `orders/${_orderId}/customer`, params, options) as unknown as Customer
	}

	async shipping_address(orderId: string | Order, params?: QueryParamsRetrieve<Address>, options?: ResourcesConfig): Promise<Address> {
		const _orderId = (orderId as Order).id || orderId as string
		return this.resources.fetch<Address>({ type: 'addresses' }, `orders/${_orderId}/shipping_address`, params, options) as unknown as Address
	}

	async billing_address(orderId: string | Order, params?: QueryParamsRetrieve<Address>, options?: ResourcesConfig): Promise<Address> {
		const _orderId = (orderId as Order).id || orderId as string
		return this.resources.fetch<Address>({ type: 'addresses' }, `orders/${_orderId}/billing_address`, params, options) as unknown as Address
	}

	async available_payment_methods(orderId: string | Order, params?: QueryParamsList<PaymentMethod>, options?: ResourcesConfig): Promise<ListResponse<PaymentMethod>> {
		const _orderId = (orderId as Order).id || orderId as string
		return this.resources.fetch<PaymentMethod>({ type: 'payment_methods' }, `orders/${_orderId}/available_payment_methods`, params, options) as unknown as ListResponse<PaymentMethod>
	}

	async available_customer_payment_sources(orderId: string | Order, params?: QueryParamsList<CustomerPaymentSource>, options?: ResourcesConfig): Promise<ListResponse<CustomerPaymentSource>> {
		const _orderId = (orderId as Order).id || orderId as string
		return this.resources.fetch<CustomerPaymentSource>({ type: 'customer_payment_sources' }, `orders/${_orderId}/available_customer_payment_sources`, params, options) as unknown as ListResponse<CustomerPaymentSource>
	}

	async available_free_skus(orderId: string | Order, params?: QueryParamsList<Sku>, options?: ResourcesConfig): Promise<ListResponse<Sku>> {
		const _orderId = (orderId as Order).id || orderId as string
		return this.resources.fetch<Sku>({ type: 'skus' }, `orders/${_orderId}/available_free_skus`, params, options) as unknown as ListResponse<Sku>
	}

	async available_free_bundles(orderId: string | Order, params?: QueryParamsList<Bundle>, options?: ResourcesConfig): Promise<ListResponse<Bundle>> {
		const _orderId = (orderId as Order).id || orderId as string
		return this.resources.fetch<Bundle>({ type: 'bundles' }, `orders/${_orderId}/available_free_bundles`, params, options) as unknown as ListResponse<Bundle>
	}

	async payment_method(orderId: string | Order, params?: QueryParamsRetrieve<PaymentMethod>, options?: ResourcesConfig): Promise<PaymentMethod> {
		const _orderId = (orderId as Order).id || orderId as string
		return this.resources.fetch<PaymentMethod>({ type: 'payment_methods' }, `orders/${_orderId}/payment_method`, params, options) as unknown as PaymentMethod
	}

	async line_items(orderId: string | Order, params?: QueryParamsList<LineItem>, options?: ResourcesConfig): Promise<ListResponse<LineItem>> {
		const _orderId = (orderId as Order).id || orderId as string
		return this.resources.fetch<LineItem>({ type: 'line_items' }, `orders/${_orderId}/line_items`, params, options) as unknown as ListResponse<LineItem>
	}

	async line_item_options(orderId: string | Order, params?: QueryParamsList<LineItemOption>, options?: ResourcesConfig): Promise<ListResponse<LineItemOption>> {
		const _orderId = (orderId as Order).id || orderId as string
		return this.resources.fetch<LineItemOption>({ type: 'line_item_options' }, `orders/${_orderId}/line_item_options`, params, options) as unknown as ListResponse<LineItemOption>
	}

	async stock_reservations(orderId: string | Order, params?: QueryParamsList<StockReservation>, options?: ResourcesConfig): Promise<ListResponse<StockReservation>> {
		const _orderId = (orderId as Order).id || orderId as string
		return this.resources.fetch<StockReservation>({ type: 'stock_reservations' }, `orders/${_orderId}/stock_reservations`, params, options) as unknown as ListResponse<StockReservation>
	}

	async stock_line_items(orderId: string | Order, params?: QueryParamsList<StockLineItem>, options?: ResourcesConfig): Promise<ListResponse<StockLineItem>> {
		const _orderId = (orderId as Order).id || orderId as string
		return this.resources.fetch<StockLineItem>({ type: 'stock_line_items' }, `orders/${_orderId}/stock_line_items`, params, options) as unknown as ListResponse<StockLineItem>
	}

	async stock_transfers(orderId: string | Order, params?: QueryParamsList<StockTransfer>, options?: ResourcesConfig): Promise<ListResponse<StockTransfer>> {
		const _orderId = (orderId as Order).id || orderId as string
		return this.resources.fetch<StockTransfer>({ type: 'stock_transfers' }, `orders/${_orderId}/stock_transfers`, params, options) as unknown as ListResponse<StockTransfer>
	}

	async shipments(orderId: string | Order, params?: QueryParamsList<Shipment>, options?: ResourcesConfig): Promise<ListResponse<Shipment>> {
		const _orderId = (orderId as Order).id || orderId as string
		return this.resources.fetch<Shipment>({ type: 'shipments' }, `orders/${_orderId}/shipments`, params, options) as unknown as ListResponse<Shipment>
	}

	async payment_options(orderId: string | Order, params?: QueryParamsList<PaymentOption>, options?: ResourcesConfig): Promise<ListResponse<PaymentOption>> {
		const _orderId = (orderId as Order).id || orderId as string
		return this.resources.fetch<PaymentOption>({ type: 'payment_options' }, `orders/${_orderId}/payment_options`, params, options) as unknown as ListResponse<PaymentOption>
	}

	async authorizations(orderId: string | Order, params?: QueryParamsList<Authorization>, options?: ResourcesConfig): Promise<ListResponse<Authorization>> {
		const _orderId = (orderId as Order).id || orderId as string
		return this.resources.fetch<Authorization>({ type: 'authorizations' }, `orders/${_orderId}/authorizations`, params, options) as unknown as ListResponse<Authorization>
	}

	async captures(orderId: string | Order, params?: QueryParamsList<Capture>, options?: ResourcesConfig): Promise<ListResponse<Capture>> {
		const _orderId = (orderId as Order).id || orderId as string
		return this.resources.fetch<Capture>({ type: 'captures' }, `orders/${_orderId}/captures`, params, options) as unknown as ListResponse<Capture>
	}

	async voids(orderId: string | Order, params?: QueryParamsList<Void>, options?: ResourcesConfig): Promise<ListResponse<Void>> {
		const _orderId = (orderId as Order).id || orderId as string
		return this.resources.fetch<Void>({ type: 'voids' }, `orders/${_orderId}/voids`, params, options) as unknown as ListResponse<Void>
	}

	async refunds(orderId: string | Order, params?: QueryParamsList<Refund>, options?: ResourcesConfig): Promise<ListResponse<Refund>> {
		const _orderId = (orderId as Order).id || orderId as string
		return this.resources.fetch<Refund>({ type: 'refunds' }, `orders/${_orderId}/refunds`, params, options) as unknown as ListResponse<Refund>
	}

	async returns(orderId: string | Order, params?: QueryParamsList<Return>, options?: ResourcesConfig): Promise<ListResponse<Return>> {
		const _orderId = (orderId as Order).id || orderId as string
		return this.resources.fetch<Return>({ type: 'returns' }, `orders/${_orderId}/returns`, params, options) as unknown as ListResponse<Return>
	}

	async order_subscription(orderId: string | Order, params?: QueryParamsRetrieve<OrderSubscription>, options?: ResourcesConfig): Promise<OrderSubscription> {
		const _orderId = (orderId as Order).id || orderId as string
		return this.resources.fetch<OrderSubscription>({ type: 'order_subscriptions' }, `orders/${_orderId}/order_subscription`, params, options) as unknown as OrderSubscription
	}

	async order_subscriptions(orderId: string | Order, params?: QueryParamsList<OrderSubscription>, options?: ResourcesConfig): Promise<ListResponse<OrderSubscription>> {
		const _orderId = (orderId as Order).id || orderId as string
		return this.resources.fetch<OrderSubscription>({ type: 'order_subscriptions' }, `orders/${_orderId}/order_subscriptions`, params, options) as unknown as ListResponse<OrderSubscription>
	}

	async order_factories(orderId: string | Order, params?: QueryParamsList<OrderFactory>, options?: ResourcesConfig): Promise<ListResponse<OrderFactory>> {
		const _orderId = (orderId as Order).id || orderId as string
		return this.resources.fetch<OrderFactory>({ type: 'order_factories' }, `orders/${_orderId}/order_factories`, params, options) as unknown as ListResponse<OrderFactory>
	}

	async order_copies(orderId: string | Order, params?: QueryParamsList<OrderCopy>, options?: ResourcesConfig): Promise<ListResponse<OrderCopy>> {
		const _orderId = (orderId as Order).id || orderId as string
		return this.resources.fetch<OrderCopy>({ type: 'order_copies' }, `orders/${_orderId}/order_copies`, params, options) as unknown as ListResponse<OrderCopy>
	}

	async recurring_order_copies(orderId: string | Order, params?: QueryParamsList<RecurringOrderCopy>, options?: ResourcesConfig): Promise<ListResponse<RecurringOrderCopy>> {
		const _orderId = (orderId as Order).id || orderId as string
		return this.resources.fetch<RecurringOrderCopy>({ type: 'recurring_order_copies' }, `orders/${_orderId}/recurring_order_copies`, params, options) as unknown as ListResponse<RecurringOrderCopy>
	}

	async attachments(orderId: string | Order, params?: QueryParamsList<Attachment>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _orderId = (orderId as Order).id || orderId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `orders/${_orderId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async resource_errors(orderId: string | Order, params?: QueryParamsList<ResourceError>, options?: ResourcesConfig): Promise<ListResponse<ResourceError>> {
		const _orderId = (orderId as Order).id || orderId as string
		return this.resources.fetch<ResourceError>({ type: 'resource_errors' }, `orders/${_orderId}/resource_errors`, params, options) as unknown as ListResponse<ResourceError>
	}

	async events(orderId: string | Order, params?: QueryParamsList<Event>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _orderId = (orderId as Order).id || orderId as string
		return this.resources.fetch<Event>({ type: 'events' }, `orders/${_orderId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async tags(orderId: string | Order, params?: QueryParamsList<Tag>, options?: ResourcesConfig): Promise<ListResponse<Tag>> {
		const _orderId = (orderId as Order).id || orderId as string
		return this.resources.fetch<Tag>({ type: 'tags' }, `orders/${_orderId}/tags`, params, options) as unknown as ListResponse<Tag>
	}

	async versions(orderId: string | Order, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _orderId = (orderId as Order).id || orderId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `orders/${_orderId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async _archive(id: string | Order, params?: QueryParamsRetrieve<Order>, options?: ResourcesConfig): Promise<Order> {
		return this.resources.update<OrderUpdate, Order>({ id: (typeof id === 'string')? id: id.id, type: Orders.TYPE, _archive: true }, params, options)
	}

	async _unarchive(id: string | Order, params?: QueryParamsRetrieve<Order>, options?: ResourcesConfig): Promise<Order> {
		return this.resources.update<OrderUpdate, Order>({ id: (typeof id === 'string')? id: id.id, type: Orders.TYPE, _unarchive: true }, params, options)
	}

	async _pending(id: string | Order, params?: QueryParamsRetrieve<Order>, options?: ResourcesConfig): Promise<Order> {
		return this.resources.update<OrderUpdate, Order>({ id: (typeof id === 'string')? id: id.id, type: Orders.TYPE, _pending: true }, params, options)
	}

	async _place(id: string | Order, params?: QueryParamsRetrieve<Order>, options?: ResourcesConfig): Promise<Order> {
		return this.resources.update<OrderUpdate, Order>({ id: (typeof id === 'string')? id: id.id, type: Orders.TYPE, _place: true }, params, options)
	}

	async _cancel(id: string | Order, params?: QueryParamsRetrieve<Order>, options?: ResourcesConfig): Promise<Order> {
		return this.resources.update<OrderUpdate, Order>({ id: (typeof id === 'string')? id: id.id, type: Orders.TYPE, _cancel: true }, params, options)
	}

	async _approve(id: string | Order, params?: QueryParamsRetrieve<Order>, options?: ResourcesConfig): Promise<Order> {
		return this.resources.update<OrderUpdate, Order>({ id: (typeof id === 'string')? id: id.id, type: Orders.TYPE, _approve: true }, params, options)
	}

	async _approve_and_capture(id: string | Order, params?: QueryParamsRetrieve<Order>, options?: ResourcesConfig): Promise<Order> {
		return this.resources.update<OrderUpdate, Order>({ id: (typeof id === 'string')? id: id.id, type: Orders.TYPE, _approve_and_capture: true }, params, options)
	}

	async _authorize(id: string | Order, params?: QueryParamsRetrieve<Order>, options?: ResourcesConfig): Promise<Order> {
		return this.resources.update<OrderUpdate, Order>({ id: (typeof id === 'string')? id: id.id, type: Orders.TYPE, _authorize: true }, params, options)
	}

	async _authorization_amount_cents(id: string | Order, triggerValue: number, params?: QueryParamsRetrieve<Order>, options?: ResourcesConfig): Promise<Order> {
		return this.resources.update<OrderUpdate, Order>({ id: (typeof id === 'string')? id: id.id, type: Orders.TYPE, _authorization_amount_cents: triggerValue }, params, options)
	}

	async _capture(id: string | Order, params?: QueryParamsRetrieve<Order>, options?: ResourcesConfig): Promise<Order> {
		return this.resources.update<OrderUpdate, Order>({ id: (typeof id === 'string')? id: id.id, type: Orders.TYPE, _capture: true }, params, options)
	}

	async _refund(id: string | Order, params?: QueryParamsRetrieve<Order>, options?: ResourcesConfig): Promise<Order> {
		return this.resources.update<OrderUpdate, Order>({ id: (typeof id === 'string')? id: id.id, type: Orders.TYPE, _refund: true }, params, options)
	}

	async _update_taxes(id: string | Order, params?: QueryParamsRetrieve<Order>, options?: ResourcesConfig): Promise<Order> {
		return this.resources.update<OrderUpdate, Order>({ id: (typeof id === 'string')? id: id.id, type: Orders.TYPE, _update_taxes: true }, params, options)
	}

	async _nullify_payment_source(id: string | Order, params?: QueryParamsRetrieve<Order>, options?: ResourcesConfig): Promise<Order> {
		return this.resources.update<OrderUpdate, Order>({ id: (typeof id === 'string')? id: id.id, type: Orders.TYPE, _nullify_payment_source: true }, params, options)
	}

	async _billing_address_clone_id(id: string | Order, triggerValue: string, params?: QueryParamsRetrieve<Order>, options?: ResourcesConfig): Promise<Order> {
		return this.resources.update<OrderUpdate, Order>({ id: (typeof id === 'string')? id: id.id, type: Orders.TYPE, _billing_address_clone_id: triggerValue }, params, options)
	}

	async _shipping_address_clone_id(id: string | Order, triggerValue: string, params?: QueryParamsRetrieve<Order>, options?: ResourcesConfig): Promise<Order> {
		return this.resources.update<OrderUpdate, Order>({ id: (typeof id === 'string')? id: id.id, type: Orders.TYPE, _shipping_address_clone_id: triggerValue }, params, options)
	}

	async _customer_payment_source_id(id: string | Order, triggerValue: string, params?: QueryParamsRetrieve<Order>, options?: ResourcesConfig): Promise<Order> {
		return this.resources.update<OrderUpdate, Order>({ id: (typeof id === 'string')? id: id.id, type: Orders.TYPE, _customer_payment_source_id: triggerValue }, params, options)
	}

	async _shipping_address_same_as_billing(id: string | Order, params?: QueryParamsRetrieve<Order>, options?: ResourcesConfig): Promise<Order> {
		return this.resources.update<OrderUpdate, Order>({ id: (typeof id === 'string')? id: id.id, type: Orders.TYPE, _shipping_address_same_as_billing: true }, params, options)
	}

	async _billing_address_same_as_shipping(id: string | Order, params?: QueryParamsRetrieve<Order>, options?: ResourcesConfig): Promise<Order> {
		return this.resources.update<OrderUpdate, Order>({ id: (typeof id === 'string')? id: id.id, type: Orders.TYPE, _billing_address_same_as_shipping: true }, params, options)
	}

	async _commit_invoice(id: string | Order, params?: QueryParamsRetrieve<Order>, options?: ResourcesConfig): Promise<Order> {
		return this.resources.update<OrderUpdate, Order>({ id: (typeof id === 'string')? id: id.id, type: Orders.TYPE, _commit_invoice: true }, params, options)
	}

	async _refund_invoice(id: string | Order, params?: QueryParamsRetrieve<Order>, options?: ResourcesConfig): Promise<Order> {
		return this.resources.update<OrderUpdate, Order>({ id: (typeof id === 'string')? id: id.id, type: Orders.TYPE, _refund_invoice: true }, params, options)
	}

	async _save_payment_source_to_customer_wallet(id: string | Order, params?: QueryParamsRetrieve<Order>, options?: ResourcesConfig): Promise<Order> {
		return this.resources.update<OrderUpdate, Order>({ id: (typeof id === 'string')? id: id.id, type: Orders.TYPE, _save_payment_source_to_customer_wallet: true }, params, options)
	}

	async _save_shipping_address_to_customer_address_book(id: string | Order, params?: QueryParamsRetrieve<Order>, options?: ResourcesConfig): Promise<Order> {
		return this.resources.update<OrderUpdate, Order>({ id: (typeof id === 'string')? id: id.id, type: Orders.TYPE, _save_shipping_address_to_customer_address_book: true }, params, options)
	}

	async _save_billing_address_to_customer_address_book(id: string | Order, params?: QueryParamsRetrieve<Order>, options?: ResourcesConfig): Promise<Order> {
		return this.resources.update<OrderUpdate, Order>({ id: (typeof id === 'string')? id: id.id, type: Orders.TYPE, _save_billing_address_to_customer_address_book: true }, params, options)
	}

	async _refresh(id: string | Order, params?: QueryParamsRetrieve<Order>, options?: ResourcesConfig): Promise<Order> {
		return this.resources.update<OrderUpdate, Order>({ id: (typeof id === 'string')? id: id.id, type: Orders.TYPE, _refresh: true }, params, options)
	}

	async _validate(id: string | Order, params?: QueryParamsRetrieve<Order>, options?: ResourcesConfig): Promise<Order> {
		return this.resources.update<OrderUpdate, Order>({ id: (typeof id === 'string')? id: id.id, type: Orders.TYPE, _validate: true }, params, options)
	}

	async _create_subscriptions(id: string | Order, params?: QueryParamsRetrieve<Order>, options?: ResourcesConfig): Promise<Order> {
		return this.resources.update<OrderUpdate, Order>({ id: (typeof id === 'string')? id: id.id, type: Orders.TYPE, _create_subscriptions: true }, params, options)
	}

	async _start_editing(id: string | Order, params?: QueryParamsRetrieve<Order>, options?: ResourcesConfig): Promise<Order> {
		return this.resources.update<OrderUpdate, Order>({ id: (typeof id === 'string')? id: id.id, type: Orders.TYPE, _start_editing: true }, params, options)
	}

	async _stop_editing(id: string | Order, params?: QueryParamsRetrieve<Order>, options?: ResourcesConfig): Promise<Order> {
		return this.resources.update<OrderUpdate, Order>({ id: (typeof id === 'string')? id: id.id, type: Orders.TYPE, _stop_editing: true }, params, options)
	}

	async _reset_circuit(id: string | Order, params?: QueryParamsRetrieve<Order>, options?: ResourcesConfig): Promise<Order> {
		return this.resources.update<OrderUpdate, Order>({ id: (typeof id === 'string')? id: id.id, type: Orders.TYPE, _reset_circuit: true }, params, options)
	}


	isOrder(resource: any): resource is Order {
		return resource.type && (resource.type === Orders.TYPE)
	}


	relationship(id: string | ResourceId | null): OrderRel {
		return super.relationshipOneToOne<OrderRel>(id)
	}

	relationshipToMany(...ids: string[]): OrderRel[] {
		return super.relationshipOneToMany<OrderRel>(...ids)
	}


	type(): OrderType {
		return Orders.TYPE
	}

}


export default Orders

export type { Order, OrderCreate, OrderUpdate, OrderType }
