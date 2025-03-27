import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Market, MarketType } from './markets'
import type { Customer, CustomerType } from './customers'
import type { Address, AddressType } from './addresses'
import type { Store, StoreType } from './stores'
import type { ShippingMethod } from './shipping_methods'
import type { PaymentMethod, PaymentMethodType } from './payment_methods'
import type { CustomerPaymentSource } from './customer_payment_sources'
import type { Sku } from './skus'
import type { Bundle } from './bundles'
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
import type { Notification } from './notifications'
import type { Link } from './links'
import type { ResourceError } from './resource_errors'
import type { Event } from './events'
import type { Tag, TagType } from './tags'
import type { Version } from './versions'
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


type OrderType = 'orders'
type OrderRel = ResourceRel & { type: OrderType }
type MarketRel = ResourceRel & { type: MarketType }
type CustomerRel = ResourceRel & { type: CustomerType }
type AddressRel = ResourceRel & { type: AddressType }
type StoreRel = ResourceRel & { type: StoreType }
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


export type OrderSort = Pick<Order, 'id' | 'number' | 'affiliate_code' | 'place_async' | 'status' | 'payment_status' | 'fulfillment_status' | 'guest' | 'language_code' | 'currency_code' | 'tax_included' | 'tax_rate' | 'country_code' | 'coupon_code' | 'gift_card_code' | 'subtotal_amount_cents' | 'shipping_amount_cents' | 'payment_method_amount_cents' | 'discount_amount_cents' | 'adjustment_amount_cents' | 'gift_card_amount_cents' | 'total_tax_amount_cents' | 'subtotal_tax_amount_cents' | 'total_amount_cents' | 'fees_amount_cents' | 'duty_amount_cents' | 'placed_at' | 'approved_at' | 'cancelled_at' | 'payment_updated_at' | 'fulfillment_updated_at' | 'refreshed_at' | 'archived_at' | 'subscription_created_at' | 'circuit_state' | 'circuit_failure_count'> & ResourceSort
// export type OrderFilter = Pick<Order, 'id' | 'number' | 'affiliate_code' | 'place_async' | 'status' | 'payment_status' | 'fulfillment_status' | 'guest' | 'customer_email' | 'language_code' | 'currency_code' | 'tax_included' | 'tax_rate' | 'country_code' | 'coupon_code' | 'gift_card_code' | 'subtotal_amount_cents' | 'shipping_amount_cents' | 'payment_method_amount_cents' | 'discount_amount_cents' | 'adjustment_amount_cents' | 'gift_card_amount_cents' | 'total_tax_amount_cents' | 'subtotal_tax_amount_cents' | 'total_amount_cents' | 'fees_amount_cents' | 'duty_amount_cents' | 'payment_source_details' | 'token' | 'placed_at' | 'approved_at' | 'cancelled_at' | 'payment_updated_at' | 'fulfillment_updated_at' | 'refreshed_at' | 'archived_at' | 'subscription_created_at' | 'circuit_state' | 'circuit_failure_count'> & ResourceFilter


interface Order extends Resource {
	
	readonly type: OrderType

	/** 
	 * The order identifier. Can be specified if unique within the organization (for enterprise plans only), default to numeric ID otherwise. Cannot be passed by sales channels.
	 * @example ```"1234"```
	 */
	number?: string | null
	/** 
	 * The affiliate code, if any, to track commissions using any third party services.
	 * @example ```"xxxx-yyyy-zzzz"```
	 */
	affiliate_code?: string | null
	/** 
	 * Save this attribute as 'false' if you want prevent the order to be refreshed automatically at each change (much faster).
	 * @example ```true```
	 */
	autorefresh?: boolean | null
	/** 
	 * Save this attribute as 'true' if you want perform the place asynchronously. Payment errors, if any, will be collected afterwards.
	 * @example ```true```
	 */
	place_async?: boolean | null
	/** 
	 * The order status. One of 'draft' (default), 'pending', 'editing', 'placing', 'placed', 'approved', or 'cancelled'.
	 * @example ```"draft"```
	 */
	status: 'draft' | 'pending' | 'editing' | 'placing' | 'placed' | 'approved' | 'cancelled'
	/** 
	 * The order payment status. One of 'unpaid' (default), 'authorized', 'partially_authorized', 'paid', 'partially_paid', 'voided', 'partially_voided', 'refunded', 'partially_refunded', or 'free'.
	 * @example ```"unpaid"```
	 */
	payment_status: 'unpaid' | 'authorized' | 'partially_authorized' | 'paid' | 'partially_paid' | 'voided' | 'partially_voided' | 'refunded' | 'partially_refunded' | 'free'
	/** 
	 * The order fulfillment status. One of 'unfulfilled' (default), 'in_progress', 'fulfilled', or 'not_required'.
	 * @example ```"unfulfilled"```
	 */
	fulfillment_status: 'unfulfilled' | 'in_progress' | 'fulfilled' | 'not_required'
	/** 
	 * Indicates if the order has been placed as guest.
	 * @example ```true```
	 */
	guest?: boolean | null
	/** 
	 * Indicates if the order can be edited.
	 * @example ```true```
	 */
	editable?: boolean | null
	/** 
	 * The email address of the associated customer. When creating or updating an order, this is a shortcut to find or create the associated customer by email.
	 * @example ```"john@example.com"```
	 */
	customer_email?: string | null
	/** 
	 * The preferred language code (ISO 639-1) to be used when communicating with the customer. This can be useful when sending the order to 3rd party marketing tools and CRMs. If the language is supported, the hosted checkout will be localized accordingly.
	 * @example ```"it"```
	 */
	language_code?: string | null
	/** 
	 * The international 3-letter currency code as defined by the ISO 4217 standard, automatically inherited from the order's market.
	 * @example ```"EUR"```
	 */
	currency_code?: string | null
	/** 
	 * Indicates if taxes are included in the order amounts, automatically inherited from the order's price list.
	 * @example ```true```
	 */
	tax_included?: boolean | null
	/** 
	 * The tax rate for this order (if calculated).
	 * @example ```0.22```
	 */
	tax_rate?: number | null
	/** 
	 * Indicates if taxes are applied to shipping costs.
	 * @example ```true```
	 */
	freight_taxable?: boolean | null
	/** 
	 * Indicates if taxes are applied to payment methods costs.
	 * @example ```true```
	 */
	payment_method_taxable?: boolean | null
	/** 
	 * Indicates if taxes are applied to positive adjustments.
	 * @example ```true```
	 */
	adjustment_taxable?: boolean | null
	/** 
	 * Indicates if taxes are applied to purchased gift cards.
	 */
	gift_card_taxable?: boolean | null
	/** 
	 * Indicates if the billing address associated to this order requires billing info to be present.
	 */
	requires_billing_info?: boolean | null
	/** 
	 * The international 2-letter country code as defined by the ISO 3166-1 standard, automatically inherited from the order's shipping or billing addresses.
	 * @example ```"IT"```
	 */
	country_code?: string | null
	/** 
	 * The country code that you want the shipping address to be locked to. This can be useful to make sure the shipping address belongs to a given shipping country, e.g. the one selected in a country selector page. Not relevant if order contains only digital products.
	 * @example ```"IT"```
	 */
	shipping_country_code_lock?: string | null
	/** 
	 * The coupon code to be used for the order. If valid, it triggers a promotion adding a discount line item to the order.
	 * @example ```"SUMMERDISCOUNT"```
	 */
	coupon_code?: string | null
	/** 
	 * The gift card code (at least the first 8 characters) to be used for the order. If valid, it uses the gift card balance to pay for the order.
	 * @example ```"cc92c23e-967e-48b2-a323-59add603301f"```
	 */
	gift_card_code?: string | null
	/** 
	 * The sum of all the SKU line items total amounts, in cents.
	 * @example ```5000```
	 */
	subtotal_amount_cents?: number | null
	/** 
	 * The sum of all the SKU line items total amounts, float.
	 * @example ```50```
	 */
	subtotal_amount_float?: number | null
	/** 
	 * The sum of all the SKU line items total amounts, formatted.
	 * @example ```"€50,00"```
	 */
	formatted_subtotal_amount?: string | null
	/** 
	 * The sum of all the shipping costs, in cents.
	 * @example ```1200```
	 */
	shipping_amount_cents?: number | null
	/** 
	 * The sum of all the shipping costs, float.
	 * @example ```12```
	 */
	shipping_amount_float?: number | null
	/** 
	 * The sum of all the shipping costs, formatted.
	 * @example ```"€12,00"```
	 */
	formatted_shipping_amount?: string | null
	/** 
	 * The payment method costs, in cents.
	 */
	payment_method_amount_cents?: number | null
	/** 
	 * The payment method costs, float.
	 */
	payment_method_amount_float?: number | null
	/** 
	 * The payment method costs, formatted.
	 * @example ```"€0,00"```
	 */
	formatted_payment_method_amount?: string | null
	/** 
	 * The sum of all the discounts applied to the order, in cents (negative amount).
	 * @example ```-500```
	 */
	discount_amount_cents?: number | null
	/** 
	 * The sum of all the discounts applied to the order, float.
	 * @example ```-5```
	 */
	discount_amount_float?: number | null
	/** 
	 * The sum of all the discounts applied to the order, formatted.
	 * @example ```"-€5,00"```
	 */
	formatted_discount_amount?: string | null
	/** 
	 * The sum of all the adjustments applied to the order, in cents.
	 * @example ```1500```
	 */
	adjustment_amount_cents?: number | null
	/** 
	 * The sum of all the adjustments applied to the order, float.
	 * @example ```15```
	 */
	adjustment_amount_float?: number | null
	/** 
	 * The sum of all the adjustments applied to the order, formatted.
	 * @example ```"€15,00"```
	 */
	formatted_adjustment_amount?: string | null
	/** 
	 * The sum of all the gift_cards applied to the order, in cents.
	 * @example ```1500```
	 */
	gift_card_amount_cents?: number | null
	/** 
	 * The sum of all the gift_cards applied to the order, float.
	 * @example ```15```
	 */
	gift_card_amount_float?: number | null
	/** 
	 * The sum of all the gift_cards applied to the order, formatted.
	 * @example ```"€15,00"```
	 */
	formatted_gift_card_amount?: string | null
	/** 
	 * The sum of all the taxes applied to the order, in cents.
	 * @example ```1028```
	 */
	total_tax_amount_cents?: number | null
	/** 
	 * The sum of all the taxes applied to the order, float.
	 * @example ```10.28```
	 */
	total_tax_amount_float?: number | null
	/** 
	 * The sum of all the taxes applied to the order, formatted.
	 * @example ```"€10,28"```
	 */
	formatted_total_tax_amount?: string | null
	/** 
	 * The taxes applied to the order's subtotal, in cents.
	 * @example ```902```
	 */
	subtotal_tax_amount_cents?: number | null
	/** 
	 * The taxes applied to the order's subtotal, float.
	 * @example ```9.02```
	 */
	subtotal_tax_amount_float?: number | null
	/** 
	 * The taxes applied to the order's subtotal, formatted.
	 * @example ```"€9,02"```
	 */
	formatted_subtotal_tax_amount?: string | null
	/** 
	 * The taxes applied to the order's shipping costs, in cents.
	 * @example ```216```
	 */
	shipping_tax_amount_cents?: number | null
	/** 
	 * The taxes applied to the order's shipping costs, float.
	 * @example ```2.16```
	 */
	shipping_tax_amount_float?: number | null
	/** 
	 * The taxes applied to the order's shipping costs, formatted.
	 * @example ```"€2,16"```
	 */
	formatted_shipping_tax_amount?: string | null
	/** 
	 * The taxes applied to the order's payment method costs, in cents.
	 */
	payment_method_tax_amount_cents?: number | null
	/** 
	 * The taxes applied to the order's payment method costs, float.
	 */
	payment_method_tax_amount_float?: number | null
	/** 
	 * The taxes applied to the order's payment method costs, formatted.
	 * @example ```"€0,00"```
	 */
	formatted_payment_method_tax_amount?: string | null
	/** 
	 * The taxes applied to the order adjustments, in cents.
	 * @example ```900```
	 */
	adjustment_tax_amount_cents?: number | null
	/** 
	 * The taxes applied to the order adjustments, float.
	 * @example ```9```
	 */
	adjustment_tax_amount_float?: number | null
	/** 
	 * The taxes applied to the order adjustments, formatted.
	 * @example ```"€9,00"```
	 */
	formatted_adjustment_tax_amount?: string | null
	/** 
	 * The order's total amount, in cents.
	 * @example ```5700```
	 */
	total_amount_cents?: number | null
	/** 
	 * The order's total amount, float.
	 * @example ```57```
	 */
	total_amount_float?: number | null
	/** 
	 * The order's total amount, formatted.
	 * @example ```"€57,00"```
	 */
	formatted_total_amount?: string | null
	/** 
	 * The order's total taxable amount, in cents (without discounts).
	 * @example ```4672```
	 */
	total_taxable_amount_cents?: number | null
	/** 
	 * The order's total taxable amount, float.
	 * @example ```46.72```
	 */
	total_taxable_amount_float?: number | null
	/** 
	 * The order's total taxable amount, formatted.
	 * @example ```"€46,72"```
	 */
	formatted_total_taxable_amount?: string | null
	/** 
	 * The order's subtotal taxable amount, in cents (equal to subtotal_amount_cents when prices don't include taxes).
	 * @example ```4098```
	 */
	subtotal_taxable_amount_cents?: number | null
	/** 
	 * The order's subtotal taxable amount, float.
	 * @example ```40.98```
	 */
	subtotal_taxable_amount_float?: number | null
	/** 
	 * The order's subtotal taxable amount, formatted.
	 * @example ```"€40,98"```
	 */
	formatted_subtotal_taxable_amount?: string | null
	/** 
	 * The order's shipping taxable amount, in cents (equal to shipping_amount_cents when prices don't include taxes).
	 * @example ```984```
	 */
	shipping_taxable_amount_cents?: number | null
	/** 
	 * The order's shipping taxable amount, float.
	 * @example ```9.84```
	 */
	shipping_taxable_amount_float?: number | null
	/** 
	 * The order's shipping taxable amount, formatted.
	 * @example ```"€9,84"```
	 */
	formatted_shipping_taxable_amount?: string | null
	/** 
	 * The order's payment method taxable amount, in cents (equal to payment_method_amount_cents when prices don't include taxes).
	 */
	payment_method_taxable_amount_cents?: number | null
	/** 
	 * The order's payment method taxable amount, float.
	 */
	payment_method_taxable_amount_float?: number | null
	/** 
	 * The order's payment method taxable amount, formatted.
	 * @example ```"€0,00"```
	 */
	formatted_payment_method_taxable_amount?: string | null
	/** 
	 * The order's adjustment taxable amount, in cents (equal to discount_adjustment_cents when prices don't include taxes).
	 * @example ```120```
	 */
	adjustment_taxable_amount_cents?: number | null
	/** 
	 * The order's adjustment taxable amount, float.
	 * @example ```1.2```
	 */
	adjustment_taxable_amount_float?: number | null
	/** 
	 * The order's adjustment taxable amount, formatted.
	 * @example ```"€1,20"```
	 */
	formatted_adjustment_taxable_amount?: string | null
	/** 
	 * The order's total amount (when prices include taxes) or the order's total + taxes amount (when prices don't include taxes, e.g. US Markets or B2B).
	 * @example ```5700```
	 */
	total_amount_with_taxes_cents?: number | null
	/** 
	 * The order's total amount with taxes, float.
	 * @example ```57```
	 */
	total_amount_with_taxes_float?: number | null
	/** 
	 * The order's total amount with taxes, formatted.
	 * @example ```"€57,00"```
	 */
	formatted_total_amount_with_taxes?: string | null
	/** 
	 * The fees amount that is applied by Commerce Layer, in cents.
	 */
	fees_amount_cents?: number | null
	/** 
	 * The fees amount that is applied by Commerce Layer, float.
	 */
	fees_amount_float?: number | null
	/** 
	 * The fees amount that is applied by Commerce Layer, formatted.
	 * @example ```"€0,00"```
	 */
	formatted_fees_amount?: string | null
	/** 
	 * The duty amount that is calculated by external services, in cents.
	 */
	duty_amount_cents?: number | null
	/** 
	 * The duty amount that is calculated by external services, float.
	 */
	duty_amount_float?: number | null
	/** 
	 * The duty amount that is calculated by external services, formatted.
	 * @example ```"€0,00"```
	 */
	formatted_duty_amount?: string | null
	/** 
	 * The total amount at place time, in cents, which is used internally for editing.
	 */
	place_total_amount_cents?: number | null
	/** 
	 * The total amount at place time, float.
	 */
	place_total_amount_float?: number | null
	/** 
	 * The total amount at place time, formatted.
	 * @example ```"€0,00"```
	 */
	formatted_place_total_amount?: string | null
	/** 
	 * The total number of SKUs in the order's line items. This can be useful to display a preview of the customer shopping cart content.
	 * @example ```2```
	 */
	skus_count?: number | null
	/** 
	 * The total number of line item options. This can be useful to display a preview of the customer shopping cart content.
	 * @example ```1```
	 */
	line_item_options_count?: number | null
	/** 
	 * The total number of shipments. This can be useful to manage the shipping method(s) selection during checkout.
	 * @example ```1```
	 */
	shipments_count?: number | null
	/** 
	 * The total number of tax calculations. This can be useful to monitor external tax service usage.
	 * @example ```1```
	 */
	tax_calculations_count?: number | null
	/** 
	 * The total number of external validation performed. This can be useful to monitor if external validation has been triggered.
	 * @example ```1```
	 */
	validations_count?: number | null
	/** 
	 * The total number of resource errors.
	 * @example ```1```
	 */
	errors_count?: number | null
	/** 
	 * An object that contains the shareable details of the order's payment source.
	 * @example ```{"foo":"bar"}```
	 */
	payment_source_details?: Record<string, any> | null
	/** 
	 * A unique token that can be shared more securely instead of the order's id.
	 * @example ```"1c0994cc4e996e8c6ee56a2198f66f3c"```
	 */
	token?: string | null
	/** 
	 * The cart url on your site. If present, it will be used on our hosted checkout application.
	 * @example ```"https://yourdomain.com/cart"```
	 */
	cart_url?: string | null
	/** 
	 * The return url on your site. If present, it will be used on our hosted checkout application.
	 * @example ```"https://yourdomain.com/"```
	 */
	return_url?: string | null
	/** 
	 * The terms and conditions url on your site. If present, it will be used on our hosted checkout application.
	 * @example ```"https://yourdomain.com/terms"```
	 */
	terms_url?: string | null
	/** 
	 * The privacy policy url on your site. If present, it will be used on our hosted checkout application.
	 * @example ```"https://yourdomain.com/privacy"```
	 */
	privacy_url?: string | null
	/** 
	 * The checkout url that was automatically generated for the order. Send the customers to this url to let them checkout the order securely on our hosted checkout application.
	 * @example ```"https://yourdomain.commercelayer.io/checkout/1c0994cc4e996e8c6ee56a2198f66f3c"```
	 */
	checkout_url?: string | null
	/** 
	 * Time at which the order was placed.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	placed_at?: string | null
	/** 
	 * Time at which the order was approved.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	approved_at?: string | null
	/** 
	 * Time at which the order was cancelled.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	cancelled_at?: string | null
	/** 
	 * Time at which the order's payment status was last updated.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	payment_updated_at?: string | null
	/** 
	 * Time at which the order's fulfillment status was last updated.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	fulfillment_updated_at?: string | null
	/** 
	 * Last time at which an order was manually refreshed.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	refreshed_at?: string | null
	/** 
	 * Time at which the resource has been archived.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	archived_at?: string | null
	/** 
	 * Time at which the order has been marked to create a subscription from its recurring line items.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	subscription_created_at?: string | null
	/** 
	 * The circuit breaker state, by default it is 'closed'. It can become 'open' once the number of consecutive failures overlaps the specified threshold, in such case no further calls to the failing callback are made.
	 * @example ```"closed"```
	 */
	circuit_state?: string | null
	/** 
	 * The number of consecutive failures recorded by the circuit breaker associated to this resource, will be reset on first successful call to callback.
	 * @example ```5```
	 */
	circuit_failure_count?: number | null

	market?: Market | null
	customer?: Customer | null
	shipping_address?: Address | null
	billing_address?: Address | null
	store?: Store | null
	default_shipping_method?: ShippingMethod | null
	default_payment_method?: PaymentMethod | null
	available_payment_methods?: PaymentMethod[] | null
	available_customer_payment_sources?: CustomerPaymentSource[] | null
	available_free_skus?: Sku[] | null
	available_free_bundles?: Bundle[] | null
	payment_method?: PaymentMethod | null
	payment_source?: AdyenPayment | AxervePayment | BraintreePayment | CheckoutComPayment | ExternalPayment | KlarnaPayment | PaypalPayment | SatispayPayment | StripePayment | WireTransfer | null
	line_items?: LineItem[] | null
	line_item_options?: LineItemOption[] | null
	stock_reservations?: StockReservation[] | null
	stock_line_items?: StockLineItem[] | null
	stock_transfers?: StockTransfer[] | null
	shipments?: Shipment[] | null
	payment_options?: PaymentOption[] | null
	transactions?: Array<Authorization | Void | Capture | Refund> | null
	authorizations?: Authorization[] | null
	captures?: Capture[] | null
	voids?: Void[] | null
	refunds?: Refund[] | null
	returns?: Return[] | null
	order_subscription?: OrderSubscription | null
	order_subscriptions?: OrderSubscription[] | null
	order_factories?: OrderFactory[] | null
	order_copies?: OrderCopy[] | null
	recurring_order_copies?: RecurringOrderCopy[] | null
	attachments?: Attachment[] | null
	notifications?: Notification[] | null
	links?: Link[] | null
	resource_errors?: ResourceError[] | null
	events?: Event[] | null
	tags?: Tag[] | null
	versions?: Version[] | null

}


interface OrderCreate extends ResourceCreate {
	
	/** 
	 * The order identifier. Can be specified if unique within the organization (for enterprise plans only), default to numeric ID otherwise. Cannot be passed by sales channels.
	 * @example ```"1234"```
	 */
	number?: string | null
	/** 
	 * The affiliate code, if any, to track commissions using any third party services.
	 * @example ```"xxxx-yyyy-zzzz"```
	 */
	affiliate_code?: string | null
	/** 
	 * Save this attribute as 'false' if you want prevent the order to be refreshed automatically at each change (much faster).
	 * @example ```true```
	 */
	autorefresh?: boolean | null
	/** 
	 * Save this attribute as 'true' if you want perform the place asynchronously. Payment errors, if any, will be collected afterwards.
	 * @example ```true```
	 */
	place_async?: boolean | null
	/** 
	 * Indicates if the order has been placed as guest.
	 * @example ```true```
	 */
	guest?: boolean | null
	/** 
	 * The email address of the associated customer. When creating or updating an order, this is a shortcut to find or create the associated customer by email.
	 * @example ```"john@example.com"```
	 */
	customer_email?: string | null
	/** 
	 * The password of the associated customer. When creating or updating an order, this is a shortcut to sign up the associated customer.
	 * @example ```"secret"```
	 */
	customer_password?: string | null
	/** 
	 * The preferred language code (ISO 639-1) to be used when communicating with the customer. This can be useful when sending the order to 3rd party marketing tools and CRMs. If the language is supported, the hosted checkout will be localized accordingly.
	 * @example ```"it"```
	 */
	language_code?: string | null
	/** 
	 * Indicates if taxes are applied to shipping costs.
	 * @example ```true```
	 */
	freight_taxable?: boolean | null
	/** 
	 * Indicates if taxes are applied to payment methods costs.
	 * @example ```true```
	 */
	payment_method_taxable?: boolean | null
	/** 
	 * Indicates if taxes are applied to positive adjustments.
	 * @example ```true```
	 */
	adjustment_taxable?: boolean | null
	/** 
	 * Indicates if taxes are applied to purchased gift cards.
	 */
	gift_card_taxable?: boolean | null
	/** 
	 * The country code that you want the shipping address to be locked to. This can be useful to make sure the shipping address belongs to a given shipping country, e.g. the one selected in a country selector page. Not relevant if order contains only digital products.
	 * @example ```"IT"```
	 */
	shipping_country_code_lock?: string | null
	/** 
	 * The coupon code to be used for the order. If valid, it triggers a promotion adding a discount line item to the order.
	 * @example ```"SUMMERDISCOUNT"```
	 */
	coupon_code?: string | null
	/** 
	 * The gift card code (at least the first 8 characters) to be used for the order. If valid, it uses the gift card balance to pay for the order.
	 * @example ```"cc92c23e-967e-48b2-a323-59add603301f"```
	 */
	gift_card_code?: string | null
	/** 
	 * The cart url on your site. If present, it will be used on our hosted checkout application.
	 * @example ```"https://yourdomain.com/cart"```
	 */
	cart_url?: string | null
	/** 
	 * The return url on your site. If present, it will be used on our hosted checkout application.
	 * @example ```"https://yourdomain.com/"```
	 */
	return_url?: string | null
	/** 
	 * The terms and conditions url on your site. If present, it will be used on our hosted checkout application.
	 * @example ```"https://yourdomain.com/terms"```
	 */
	terms_url?: string | null
	/** 
	 * The privacy policy url on your site. If present, it will be used on our hosted checkout application.
	 * @example ```"https://yourdomain.com/privacy"```
	 */
	privacy_url?: string | null

	market?: MarketRel | null
	customer?: CustomerRel | null
	shipping_address?: AddressRel | null
	billing_address?: AddressRel | null
	store?: StoreRel | null
	payment_method?: PaymentMethodRel | null
	payment_source?: AdyenPaymentRel | AxervePaymentRel | BraintreePaymentRel | CheckoutComPaymentRel | ExternalPaymentRel | KlarnaPaymentRel | PaypalPaymentRel | SatispayPaymentRel | StripePaymentRel | WireTransferRel | null
	tags?: TagRel[] | null

}


interface OrderUpdate extends ResourceUpdate {
	
	/** 
	 * The order identifier. Can be specified if unique within the organization (for enterprise plans only), default to numeric ID otherwise. Cannot be passed by sales channels.
	 * @example ```"1234"```
	 */
	number?: string | null
	/** 
	 * The affiliate code, if any, to track commissions using any third party services.
	 * @example ```"xxxx-yyyy-zzzz"```
	 */
	affiliate_code?: string | null
	/** 
	 * Save this attribute as 'false' if you want prevent the order to be refreshed automatically at each change (much faster).
	 * @example ```true```
	 */
	autorefresh?: boolean | null
	/** 
	 * Save this attribute as 'true' if you want perform the place asynchronously. Payment errors, if any, will be collected afterwards.
	 * @example ```true```
	 */
	place_async?: boolean | null
	/** 
	 * Indicates if the order has been placed as guest.
	 * @example ```true```
	 */
	guest?: boolean | null
	/** 
	 * The email address of the associated customer. When creating or updating an order, this is a shortcut to find or create the associated customer by email.
	 * @example ```"john@example.com"```
	 */
	customer_email?: string | null
	/** 
	 * The password of the associated customer. When creating or updating an order, this is a shortcut to sign up the associated customer.
	 * @example ```"secret"```
	 */
	customer_password?: string | null
	/** 
	 * The preferred language code (ISO 639-1) to be used when communicating with the customer. This can be useful when sending the order to 3rd party marketing tools and CRMs. If the language is supported, the hosted checkout will be localized accordingly.
	 * @example ```"it"```
	 */
	language_code?: string | null
	/** 
	 * Indicates if taxes are applied to shipping costs.
	 * @example ```true```
	 */
	freight_taxable?: boolean | null
	/** 
	 * Indicates if taxes are applied to payment methods costs.
	 * @example ```true```
	 */
	payment_method_taxable?: boolean | null
	/** 
	 * Indicates if taxes are applied to positive adjustments.
	 * @example ```true```
	 */
	adjustment_taxable?: boolean | null
	/** 
	 * Indicates if taxes are applied to purchased gift cards.
	 */
	gift_card_taxable?: boolean | null
	/** 
	 * The country code that you want the shipping address to be locked to. This can be useful to make sure the shipping address belongs to a given shipping country, e.g. the one selected in a country selector page. Not relevant if order contains only digital products.
	 * @example ```"IT"```
	 */
	shipping_country_code_lock?: string | null
	/** 
	 * The coupon code to be used for the order. If valid, it triggers a promotion adding a discount line item to the order.
	 * @example ```"SUMMERDISCOUNT"```
	 */
	coupon_code?: string | null
	/** 
	 * The gift card code (at least the first 8 characters) to be used for the order. If valid, it uses the gift card balance to pay for the order.
	 * @example ```"cc92c23e-967e-48b2-a323-59add603301f"```
	 */
	gift_card_code?: string | null
	/** 
	 * The cart url on your site. If present, it will be used on our hosted checkout application.
	 * @example ```"https://yourdomain.com/cart"```
	 */
	cart_url?: string | null
	/** 
	 * The return url on your site. If present, it will be used on our hosted checkout application.
	 * @example ```"https://yourdomain.com/"```
	 */
	return_url?: string | null
	/** 
	 * The terms and conditions url on your site. If present, it will be used on our hosted checkout application.
	 * @example ```"https://yourdomain.com/terms"```
	 */
	terms_url?: string | null
	/** 
	 * The privacy policy url on your site. If present, it will be used on our hosted checkout application.
	 * @example ```"https://yourdomain.com/privacy"```
	 */
	privacy_url?: string | null
	/** 
	 * Send this attribute if you want to archive the order.
	 * @example ```true```
	 */
	_archive?: boolean | null
	/** 
	 * Send this attribute if you want to unarchive the order.
	 * @example ```true```
	 */
	_unarchive?: boolean | null
	/** 
	 * Send this attribute if you want to move a draft or placing order to pending. Cannot be passed by sales channels.
	 * @example ```true```
	 */
	_pending?: boolean | null
	/** 
	 * Send this attribute if you want to place the order.
	 * @example ```true```
	 */
	_place?: boolean | null
	/** 
	 * Send this attribute if you want to cancel a placed order. The order's authorization will be automatically voided.
	 * @example ```true```
	 */
	_cancel?: boolean | null
	/** 
	 * Send this attribute if you want to approve a placed order. Cannot be passed by sales channels.
	 * @example ```true```
	 */
	_approve?: boolean | null
	/** 
	 * Send this attribute if you want to approve and capture a placed order. Cannot be passed by sales channels.
	 * @example ```true```
	 */
	_approve_and_capture?: boolean | null
	/** 
	 * Send this attribute if you want to authorize the order's payment source.
	 * @example ```true```
	 */
	_authorize?: boolean | null
	/** 
	 * Send this attribute as a value in cents if you want to overwrite the amount to be authorized.
	 * @example ```500```
	 */
	_authorization_amount_cents?: number | null
	/** 
	 * Send this attribute if you want to capture an authorized order. Cannot be passed by sales channels.
	 * @example ```true```
	 */
	_capture?: boolean | null
	/** 
	 * Send this attribute if you want to refund a captured order. Cannot be passed by sales channels.
	 * @example ```true```
	 */
	_refund?: boolean | null
	/** 
	 * Send this attribute if you want to mark as fulfilled the order (shipments must be cancelled, shipped or delivered, alternatively order must be approved). Cannot be passed by sales channels.
	 * @example ```true```
	 */
	_fulfill?: boolean | null
	/** 
	 * Send this attribute if you want to force tax calculation for this order (a tax calculator must be associated to the order's market).
	 * @example ```true```
	 */
	_update_taxes?: boolean | null
	/** 
	 * Send this attribute if you want to nullify the payment source for this order.
	 */
	_nullify_payment_source?: boolean | null
	/** 
	 * Send this attribute if you want to set the payment source associated with the last succeeded authorization. At the end of the fix the order should be placed and authorized and ready to be approved. A tentative to fix the payment source is done before approval automatically. Cannot be passed by sales channels.
	 * @example ```true```
	 */
	_fix_payment_source?: boolean | null
	/** 
	 * The id of the address that you want to clone to create the order's billing address.
	 * @example ```"1234"```
	 */
	_billing_address_clone_id?: string | null
	/** 
	 * The id of the address that you want to clone to create the order's shipping address.
	 * @example ```"1234"```
	 */
	_shipping_address_clone_id?: string | null
	/** 
	 * The id of the customer payment source (i.e. credit card) that you want to use as the order's payment source.
	 * @example ```"1234"```
	 */
	_customer_payment_source_id?: string | null
	/** 
	 * Send this attribute if you want the shipping address to be cloned from the order's billing address.
	 * @example ```true```
	 */
	_shipping_address_same_as_billing?: boolean | null
	/** 
	 * Send this attribute if you want the billing address to be cloned from the order's shipping address.
	 * @example ```true```
	 */
	_billing_address_same_as_shipping?: boolean | null
	/** 
	 * Send this attribute if you want commit the sales tax invoice to the associated tax calculator (currently supported by Avalara).
	 * @example ```true```
	 */
	_commit_invoice?: boolean | null
	/** 
	 * Send this attribute if you want refund the sales tax invoice to the associated tax calculator (currently supported by Avalara).
	 * @example ```true```
	 */
	_refund_invoice?: boolean | null
	/** 
	 * Send this attribute if you want the order's payment source to be saved in the customer's wallet as a customer payment source.
	 * @example ```true```
	 */
	_save_payment_source_to_customer_wallet?: boolean | null
	/** 
	 * Send this attribute if you want the order's shipping address to be saved in the customer's address book as a customer address.
	 * @example ```true```
	 */
	_save_shipping_address_to_customer_address_book?: boolean | null
	/** 
	 * Send this attribute if you want the order's billing address to be saved in the customer's address book as a customer address.
	 * @example ```true```
	 */
	_save_billing_address_to_customer_address_book?: boolean | null
	/** 
	 * Send this attribute if you want to manually refresh the order.
	 * @example ```true```
	 */
	_refresh?: boolean | null
	/** 
	 * Send this attribute if you want to trigger the external validation for the order.
	 * @example ```true```
	 */
	_validate?: boolean | null
	/** 
	 * Send this attribute upon/after placing the order if you want to create order subscriptions from the line items that have a frequency.
	 * @example ```true```
	 */
	_create_subscriptions?: boolean | null
	/** 
	 * Send this attribute if you want to edit the order after it is placed. Remember you cannot exceed the original total amount. Cannot be passed by sales channels.
	 * @example ```true```
	 */
	_start_editing?: boolean | null
	/** 
	 * Send this attribute to stop the editing for the order and return back to placed status. Cannot be passed by sales channels.
	 * @example ```true```
	 */
	_stop_editing?: boolean | null
	/** 
	 * Send this attribute if you want to reset the circuit breaker associated to this resource to 'closed' state and zero failures count. Cannot be passed by sales channels.
	 * @example ```true```
	 */
	_reset_circuit?: boolean | null
	/** 
	 * Comma separated list of tags to be added. Duplicates, invalid and non existing ones are discarded. Cannot be passed by sales channels.
	 */
	_add_tags?: string | null
	/** 
	 * Comma separated list of tags to be removed. Duplicates, invalid and non existing ones are discarded. Cannot be passed by sales channels.
	 */
	_remove_tags?: string | null

	market?: MarketRel | null
	customer?: CustomerRel | null
	shipping_address?: AddressRel | null
	billing_address?: AddressRel | null
	store?: StoreRel | null
	payment_method?: PaymentMethodRel | null
	payment_source?: AdyenPaymentRel | AxervePaymentRel | BraintreePaymentRel | CheckoutComPaymentRel | ExternalPaymentRel | KlarnaPaymentRel | PaypalPaymentRel | SatispayPaymentRel | StripePaymentRel | WireTransferRel | null
	tags?: TagRel[] | null

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

	async store(orderId: string | Order, params?: QueryParamsRetrieve<Store>, options?: ResourcesConfig): Promise<Store> {
		const _orderId = (orderId as Order).id || orderId as string
		return this.resources.fetch<Store>({ type: 'stores' }, `orders/${_orderId}/store`, params, options) as unknown as Store
	}

	async default_shipping_method(orderId: string | Order, params?: QueryParamsRetrieve<ShippingMethod>, options?: ResourcesConfig): Promise<ShippingMethod> {
		const _orderId = (orderId as Order).id || orderId as string
		return this.resources.fetch<ShippingMethod>({ type: 'shipping_methods' }, `orders/${_orderId}/default_shipping_method`, params, options) as unknown as ShippingMethod
	}

	async default_payment_method(orderId: string | Order, params?: QueryParamsRetrieve<PaymentMethod>, options?: ResourcesConfig): Promise<PaymentMethod> {
		const _orderId = (orderId as Order).id || orderId as string
		return this.resources.fetch<PaymentMethod>({ type: 'payment_methods' }, `orders/${_orderId}/default_payment_method`, params, options) as unknown as PaymentMethod
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

	async notifications(orderId: string | Order, params?: QueryParamsList<Notification>, options?: ResourcesConfig): Promise<ListResponse<Notification>> {
		const _orderId = (orderId as Order).id || orderId as string
		return this.resources.fetch<Notification>({ type: 'notifications' }, `orders/${_orderId}/notifications`, params, options) as unknown as ListResponse<Notification>
	}

	async links(orderId: string | Order, params?: QueryParamsList<Link>, options?: ResourcesConfig): Promise<ListResponse<Link>> {
		const _orderId = (orderId as Order).id || orderId as string
		return this.resources.fetch<Link>({ type: 'links' }, `orders/${_orderId}/links`, params, options) as unknown as ListResponse<Link>
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

	async _fulfill(id: string | Order, params?: QueryParamsRetrieve<Order>, options?: ResourcesConfig): Promise<Order> {
		return this.resources.update<OrderUpdate, Order>({ id: (typeof id === 'string')? id: id.id, type: Orders.TYPE, _fulfill: true }, params, options)
	}

	async _update_taxes(id: string | Order, params?: QueryParamsRetrieve<Order>, options?: ResourcesConfig): Promise<Order> {
		return this.resources.update<OrderUpdate, Order>({ id: (typeof id === 'string')? id: id.id, type: Orders.TYPE, _update_taxes: true }, params, options)
	}

	async _nullify_payment_source(id: string | Order, params?: QueryParamsRetrieve<Order>, options?: ResourcesConfig): Promise<Order> {
		return this.resources.update<OrderUpdate, Order>({ id: (typeof id === 'string')? id: id.id, type: Orders.TYPE, _nullify_payment_source: true }, params, options)
	}

	async _fix_payment_source(id: string | Order, params?: QueryParamsRetrieve<Order>, options?: ResourcesConfig): Promise<Order> {
		return this.resources.update<OrderUpdate, Order>({ id: (typeof id === 'string')? id: id.id, type: Orders.TYPE, _fix_payment_source: true }, params, options)
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

	async _add_tags(id: string | Order, triggerValue: string, params?: QueryParamsRetrieve<Order>, options?: ResourcesConfig): Promise<Order> {
		return this.resources.update<OrderUpdate, Order>({ id: (typeof id === 'string')? id: id.id, type: Orders.TYPE, _add_tags: triggerValue }, params, options)
	}

	async _remove_tags(id: string | Order, triggerValue: string, params?: QueryParamsRetrieve<Order>, options?: ResourcesConfig): Promise<Order> {
		return this.resources.update<OrderUpdate, Order>({ id: (typeof id === 'string')? id: id.id, type: Orders.TYPE, _remove_tags: triggerValue }, params, options)
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


const instance = new Orders()
export default instance

export type { Order, OrderCreate, OrderUpdate, OrderType }
