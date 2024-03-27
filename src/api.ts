import type { Resource, ResourceRel } from './resource'
import type { TagType } from './resources/tags'
import type { VersionType } from './resources/versions'
import type * as models from './model'

// ##__API_RESOURCES_START__##
// ##__API_RESOURCES_TEMPLATE:: export { default as ##__RESOURCE_CLASS__## } from './resources/##__RESOURCE_TYPE__##'
/**
 * ©2024 Commerce Layer Inc.
 **/
export { default as Addresses } from './resources/addresses'
export { default as Adjustments } from './resources/adjustments'
export { default as AdyenGateways } from './resources/adyen_gateways'
export { default as AdyenPayments } from './resources/adyen_payments'
export { default as Applications } from './resources/application'
export { default as Attachments } from './resources/attachments'
export { default as Authorizations } from './resources/authorizations'
export { default as AvalaraAccounts } from './resources/avalara_accounts'
export { default as AxerveGateways } from './resources/axerve_gateways'
export { default as AxervePayments } from './resources/axerve_payments'
export { default as BillingInfoValidationRules } from './resources/billing_info_validation_rules'
export { default as BingGeocoders } from './resources/bing_geocoders'
export { default as BraintreeGateways } from './resources/braintree_gateways'
export { default as BraintreePayments } from './resources/braintree_payments'
export { default as Bundles } from './resources/bundles'
export { default as BuyXPayYPromotions } from './resources/buy_x_pay_y_promotions'
export { default as Captures } from './resources/captures'
export { default as CarrierAccounts } from './resources/carrier_accounts'
export { default as CheckoutComGateways } from './resources/checkout_com_gateways'
export { default as CheckoutComPayments } from './resources/checkout_com_payments'
export { default as Cleanups } from './resources/cleanups'
export { default as CouponCodesPromotionRules } from './resources/coupon_codes_promotion_rules'
export { default as CouponRecipients } from './resources/coupon_recipients'
export { default as Coupons } from './resources/coupons'
export { default as CustomPromotionRules } from './resources/custom_promotion_rules'
export { default as CustomerAddresses } from './resources/customer_addresses'
export { default as CustomerGroups } from './resources/customer_groups'
export { default as CustomerPasswordResets } from './resources/customer_password_resets'
export { default as CustomerPaymentSources } from './resources/customer_payment_sources'
export { default as CustomerSubscriptions } from './resources/customer_subscriptions'
export { default as Customers } from './resources/customers'
export { default as DeliveryLeadTimes } from './resources/delivery_lead_times'
export { default as EventCallbacks } from './resources/event_callbacks'
export { default as Events } from './resources/events'
export { default as Exports } from './resources/exports'
export { default as ExternalGateways } from './resources/external_gateways'
export { default as ExternalPayments } from './resources/external_payments'
export { default as ExternalPromotions } from './resources/external_promotions'
export { default as ExternalTaxCalculators } from './resources/external_tax_calculators'
export { default as FixedAmountPromotions } from './resources/fixed_amount_promotions'
export { default as FixedPricePromotions } from './resources/fixed_price_promotions'
export { default as FreeGiftPromotions } from './resources/free_gift_promotions'
export { default as FreeShippingPromotions } from './resources/free_shipping_promotions'
export { default as Geocoders } from './resources/geocoders'
export { default as GiftCardRecipients } from './resources/gift_card_recipients'
export { default as GiftCards } from './resources/gift_cards'
export { default as GoogleGeocoders } from './resources/google_geocoders'
export { default as Imports } from './resources/imports'
export { default as InStockSubscriptions } from './resources/in_stock_subscriptions'
export { default as InventoryModels } from './resources/inventory_models'
export { default as InventoryReturnLocations } from './resources/inventory_return_locations'
export { default as InventoryStockLocations } from './resources/inventory_stock_locations'
export { default as KlarnaGateways } from './resources/klarna_gateways'
export { default as KlarnaPayments } from './resources/klarna_payments'
export { default as LineItemOptions } from './resources/line_item_options'
export { default as LineItems } from './resources/line_items'
export { default as ManualGateways } from './resources/manual_gateways'
export { default as ManualTaxCalculators } from './resources/manual_tax_calculators'
export { default as Markets } from './resources/markets'
export { default as Merchants } from './resources/merchants'
export { default as OrderAmountPromotionRules } from './resources/order_amount_promotion_rules'
export { default as OrderCopies } from './resources/order_copies'
export { default as OrderFactories } from './resources/order_factories'
export { default as OrderSubscriptionItems } from './resources/order_subscription_items'
export { default as OrderSubscriptions } from './resources/order_subscriptions'
export { default as OrderValidationRules } from './resources/order_validation_rules'
export { default as Orders } from './resources/orders'
export { default as Organizations } from './resources/organization'
export { default as Packages } from './resources/packages'
export { default as ParcelLineItems } from './resources/parcel_line_items'
export { default as Parcels } from './resources/parcels'
export { default as PaymentGateways } from './resources/payment_gateways'
export { default as PaymentMethods } from './resources/payment_methods'
export { default as PaymentOptions } from './resources/payment_options'
export { default as PaypalGateways } from './resources/paypal_gateways'
export { default as PaypalPayments } from './resources/paypal_payments'
export { default as PercentageDiscountPromotions } from './resources/percentage_discount_promotions'
export { default as PriceFrequencyTiers } from './resources/price_frequency_tiers'
export { default as PriceLists } from './resources/price_lists'
export { default as PriceTiers } from './resources/price_tiers'
export { default as PriceVolumeTiers } from './resources/price_volume_tiers'
export { default as Prices } from './resources/prices'
export { default as PromotionRules } from './resources/promotion_rules'
export { default as Promotions } from './resources/promotions'
export { default as RecurringOrderCopies } from './resources/recurring_order_copies'
export { default as Refunds } from './resources/refunds'
export { default as ReservedStocks } from './resources/reserved_stocks'
export { default as ResourceErrors } from './resources/resource_errors'
export { default as ReturnLineItems } from './resources/return_line_items'
export { default as Returns } from './resources/returns'
export { default as SatispayGateways } from './resources/satispay_gateways'
export { default as SatispayPayments } from './resources/satispay_payments'
export { default as Shipments } from './resources/shipments'
export { default as ShippingCategories } from './resources/shipping_categories'
export { default as ShippingMethodTiers } from './resources/shipping_method_tiers'
export { default as ShippingMethods } from './resources/shipping_methods'
export { default as ShippingWeightTiers } from './resources/shipping_weight_tiers'
export { default as ShippingZones } from './resources/shipping_zones'
export { default as SkuListItems } from './resources/sku_list_items'
export { default as SkuListPromotionRules } from './resources/sku_list_promotion_rules'
export { default as SkuLists } from './resources/sku_lists'
export { default as SkuOptions } from './resources/sku_options'
export { default as Skus } from './resources/skus'
export { default as StockItems } from './resources/stock_items'
export { default as StockLineItems } from './resources/stock_line_items'
export { default as StockLocations } from './resources/stock_locations'
export { default as StockReservations } from './resources/stock_reservations'
export { default as StockTransfers } from './resources/stock_transfers'
export { default as StripeGateways } from './resources/stripe_gateways'
export { default as StripePayments } from './resources/stripe_payments'
export { default as SubscriptionModels } from './resources/subscription_models'
export { default as Tags } from './resources/tags'
export { default as TaxCalculators } from './resources/tax_calculators'
export { default as TaxCategories } from './resources/tax_categories'
export { default as TaxRules } from './resources/tax_rules'
export { default as TaxjarAccounts } from './resources/taxjar_accounts'
export { default as Transactions } from './resources/transactions'
export { default as Versions } from './resources/versions'
export { default as Voids } from './resources/voids'
export { default as Webhooks } from './resources/webhooks'
export { default as WireTransfers } from './resources/wire_transfers'
// ##__API_RESOURCES_STOP__##


export type ResourceTypeLock =
	// ##__API_RESOURCE_TYPES_START__##
	'addresses'
|	'adjustments'
|	'adyen_gateways'
|	'adyen_payments'
|	'application'
|	'attachments'
|	'authorizations'
|	'avalara_accounts'
|	'axerve_gateways'
|	'axerve_payments'
|	'billing_info_validation_rules'
|	'bing_geocoders'
|	'braintree_gateways'
|	'braintree_payments'
|	'bundles'
|	'buy_x_pay_y_promotions'
|	'captures'
|	'carrier_accounts'
|	'checkout_com_gateways'
|	'checkout_com_payments'
|	'cleanups'
|	'coupon_codes_promotion_rules'
|	'coupon_recipients'
|	'coupons'
|	'custom_promotion_rules'
|	'customer_addresses'
|	'customer_groups'
|	'customer_password_resets'
|	'customer_payment_sources'
|	'customer_subscriptions'
|	'customers'
|	'delivery_lead_times'
|	'event_callbacks'
|	'events'
|	'exports'
|	'external_gateways'
|	'external_payments'
|	'external_promotions'
|	'external_tax_calculators'
|	'fixed_amount_promotions'
|	'fixed_price_promotions'
|	'free_gift_promotions'
|	'free_shipping_promotions'
|	'geocoders'
|	'gift_card_recipients'
|	'gift_cards'
|	'google_geocoders'
|	'imports'
|	'in_stock_subscriptions'
|	'inventory_models'
|	'inventory_return_locations'
|	'inventory_stock_locations'
|	'klarna_gateways'
|	'klarna_payments'
|	'line_item_options'
|	'line_items'
|	'manual_gateways'
|	'manual_tax_calculators'
|	'markets'
|	'merchants'
|	'order_amount_promotion_rules'
|	'order_copies'
|	'order_factories'
|	'order_subscription_items'
|	'order_subscriptions'
|	'order_validation_rules'
|	'orders'
|	'organization'
|	'packages'
|	'parcel_line_items'
|	'parcels'
|	'payment_gateways'
|	'payment_methods'
|	'payment_options'
|	'paypal_gateways'
|	'paypal_payments'
|	'percentage_discount_promotions'
|	'price_frequency_tiers'
|	'price_lists'
|	'price_tiers'
|	'price_volume_tiers'
|	'prices'
|	'promotion_rules'
|	'promotions'
|	'recurring_order_copies'
|	'refunds'
|	'reserved_stocks'
|	'resource_errors'
|	'return_line_items'
|	'returns'
|	'satispay_gateways'
|	'satispay_payments'
|	'shipments'
|	'shipping_categories'
|	'shipping_method_tiers'
|	'shipping_methods'
|	'shipping_weight_tiers'
|	'shipping_zones'
|	'sku_list_items'
|	'sku_list_promotion_rules'
|	'sku_lists'
|	'sku_options'
|	'skus'
|	'stock_items'
|	'stock_line_items'
|	'stock_locations'
|	'stock_reservations'
|	'stock_transfers'
|	'stripe_gateways'
|	'stripe_payments'
|	'subscription_models'
|	'tags'
|	'tax_calculators'
|	'tax_categories'
|	'tax_rules'
|	'taxjar_accounts'
|	'transactions'
|	'versions'
|	'voids'
|	'webhooks'
|	'wire_transfers'
// ##__API_RESOURCE_TYPES_STOP__##


export const resourceList = [
	// ##__API_RESOURCE_LIST_START__##
	'addresses',
	'adjustments',
	'adyen_gateways',
	'adyen_payments',
	'application',
	'attachments',
	'authorizations',
	'avalara_accounts',
	'axerve_gateways',
	'axerve_payments',
	'billing_info_validation_rules',
	'bing_geocoders',
	'braintree_gateways',
	'braintree_payments',
	'bundles',
	'buy_x_pay_y_promotions',
	'captures',
	'carrier_accounts',
	'checkout_com_gateways',
	'checkout_com_payments',
	'cleanups',
	'coupon_codes_promotion_rules',
	'coupon_recipients',
	'coupons',
	'custom_promotion_rules',
	'customer_addresses',
	'customer_groups',
	'customer_password_resets',
	'customer_payment_sources',
	'customer_subscriptions',
	'customers',
	'delivery_lead_times',
	'event_callbacks',
	'events',
	'exports',
	'external_gateways',
	'external_payments',
	'external_promotions',
	'external_tax_calculators',
	'fixed_amount_promotions',
	'fixed_price_promotions',
	'free_gift_promotions',
	'free_shipping_promotions',
	'geocoders',
	'gift_card_recipients',
	'gift_cards',
	'google_geocoders',
	'imports',
	'in_stock_subscriptions',
	'inventory_models',
	'inventory_return_locations',
	'inventory_stock_locations',
	'klarna_gateways',
	'klarna_payments',
	'line_item_options',
	'line_items',
	'manual_gateways',
	'manual_tax_calculators',
	'markets',
	'merchants',
	'order_amount_promotion_rules',
	'order_copies',
	'order_factories',
	'order_subscription_items',
	'order_subscriptions',
	'order_validation_rules',
	'orders',
	'organization',
	'packages',
	'parcel_line_items',
	'parcels',
	'payment_gateways',
	'payment_methods',
	'payment_options',
	'paypal_gateways',
	'paypal_payments',
	'percentage_discount_promotions',
	'price_frequency_tiers',
	'price_lists',
	'price_tiers',
	'price_volume_tiers',
	'prices',
	'promotion_rules',
	'promotions',
	'recurring_order_copies',
	'refunds',
	'reserved_stocks',
	'resource_errors',
	'return_line_items',
	'returns',
	'satispay_gateways',
	'satispay_payments',
	'shipments',
	'shipping_categories',
	'shipping_method_tiers',
	'shipping_methods',
	'shipping_weight_tiers',
	'shipping_zones',
	'sku_list_items',
	'sku_list_promotion_rules',
	'sku_lists',
	'sku_options',
	'skus',
	'stock_items',
	'stock_line_items',
	'stock_locations',
	'stock_reservations',
	'stock_transfers',
	'stripe_gateways',
	'stripe_payments',
	'subscription_models',
	'tags',
	'tax_calculators',
	'tax_categories',
	'tax_rules',
	'taxjar_accounts',
	'transactions',
	'versions',
	'voids',
	'webhooks',
	'wire_transfers'
	// ##__API_RESOURCE_LIST_STOP__##
] as const


export const singletonList = [
	// ##__API_RESOURCE_SINGLETON_START__##
	'application',
	'organization'
	// ##__API_RESOURCE_SINGLETON_STOP__##
] as const


/*
type ResourceInfo = {
	name: string;
	type: string;
	api: string;
}


export const resourceMap: { [res: string]: ResourceInfo } = {
	// ##__API_RESOURCE_MAP_START__##
	// ##__API_RESOURCE_MAP_STOP__##
} as const
*/


// Retrievable resources
export type RetrievableResourceType = ResourceTypeLock

export type RetrievableResource = Resource & {
	type: RetrievableResourceType
}


// Listable resources
export type ListableResourceType = Exclude<ResourceTypeLock,
	// ##__API_RESOURCE_NOT_LISTABLE_START__##
	'application'
|	'organization'
// ##__API_RESOURCE_NOT_LISTABLE_STOP__##
>

export type ListableResource = Resource & {
	type: ListableResourceType
}


// Creatable resources
export type CreatableResourceType =
	// ##__API_RESOURCE_CREATABLE_START__##
	'addresses'
|	'adjustments'
|	'adyen_gateways'
|	'adyen_payments'
|	'attachments'
|	'avalara_accounts'
|	'axerve_gateways'
|	'axerve_payments'
|	'billing_info_validation_rules'
|	'bing_geocoders'
|	'braintree_gateways'
|	'braintree_payments'
|	'bundles'
|	'buy_x_pay_y_promotions'
|	'checkout_com_gateways'
|	'checkout_com_payments'
|	'cleanups'
|	'coupon_codes_promotion_rules'
|	'coupon_recipients'
|	'coupons'
|	'custom_promotion_rules'
|	'customer_addresses'
|	'customer_groups'
|	'customer_password_resets'
|	'customer_payment_sources'
|	'customer_subscriptions'
|	'customers'
|	'delivery_lead_times'
|	'exports'
|	'external_gateways'
|	'external_payments'
|	'external_promotions'
|	'external_tax_calculators'
|	'fixed_amount_promotions'
|	'fixed_price_promotions'
|	'free_gift_promotions'
|	'free_shipping_promotions'
|	'gift_card_recipients'
|	'gift_cards'
|	'google_geocoders'
|	'imports'
|	'in_stock_subscriptions'
|	'inventory_models'
|	'inventory_return_locations'
|	'inventory_stock_locations'
|	'klarna_gateways'
|	'klarna_payments'
|	'line_item_options'
|	'line_items'
|	'manual_gateways'
|	'manual_tax_calculators'
|	'markets'
|	'merchants'
|	'order_amount_promotion_rules'
|	'order_copies'
|	'order_subscription_items'
|	'order_subscriptions'
|	'orders'
|	'packages'
|	'parcel_line_items'
|	'parcels'
|	'payment_methods'
|	'payment_options'
|	'paypal_gateways'
|	'paypal_payments'
|	'percentage_discount_promotions'
|	'price_frequency_tiers'
|	'price_lists'
|	'price_volume_tiers'
|	'prices'
|	'recurring_order_copies'
|	'return_line_items'
|	'returns'
|	'satispay_gateways'
|	'satispay_payments'
|	'shipments'
|	'shipping_categories'
|	'shipping_methods'
|	'shipping_weight_tiers'
|	'shipping_zones'
|	'sku_list_items'
|	'sku_list_promotion_rules'
|	'sku_lists'
|	'sku_options'
|	'skus'
|	'stock_items'
|	'stock_line_items'
|	'stock_locations'
|	'stock_reservations'
|	'stock_transfers'
|	'stripe_gateways'
|	'stripe_payments'
|	'subscription_models'
|	'tags'
|	'tax_categories'
|	'tax_rules'
|	'taxjar_accounts'
|	'webhooks'
|	'wire_transfers'
// ##__API_RESOURCE_CREATABLE_STOP__##

export type CreatableResource = Resource & {
	type: CreatableResourceType
}


// Updatable resources
export type UpdatableResourceType =
	// ##__API_RESOURCE_UPDATABLE_START__##
	'addresses'
|	'adjustments'
|	'adyen_gateways'
|	'adyen_payments'
|	'attachments'
|	'authorizations'
|	'avalara_accounts'
|	'axerve_gateways'
|	'axerve_payments'
|	'billing_info_validation_rules'
|	'bing_geocoders'
|	'braintree_gateways'
|	'braintree_payments'
|	'bundles'
|	'buy_x_pay_y_promotions'
|	'captures'
|	'checkout_com_gateways'
|	'checkout_com_payments'
|	'coupon_codes_promotion_rules'
|	'coupon_recipients'
|	'coupons'
|	'custom_promotion_rules'
|	'customer_addresses'
|	'customer_groups'
|	'customer_password_resets'
|	'customer_payment_sources'
|	'customer_subscriptions'
|	'customers'
|	'delivery_lead_times'
|	'external_gateways'
|	'external_payments'
|	'external_promotions'
|	'external_tax_calculators'
|	'fixed_amount_promotions'
|	'fixed_price_promotions'
|	'free_gift_promotions'
|	'free_shipping_promotions'
|	'gift_card_recipients'
|	'gift_cards'
|	'google_geocoders'
|	'in_stock_subscriptions'
|	'inventory_models'
|	'inventory_return_locations'
|	'inventory_stock_locations'
|	'klarna_gateways'
|	'klarna_payments'
|	'line_item_options'
|	'line_items'
|	'manual_gateways'
|	'manual_tax_calculators'
|	'markets'
|	'merchants'
|	'order_amount_promotion_rules'
|	'order_copies'
|	'order_subscription_items'
|	'order_subscriptions'
|	'orders'
|	'packages'
|	'parcel_line_items'
|	'parcels'
|	'payment_methods'
|	'payment_options'
|	'paypal_gateways'
|	'paypal_payments'
|	'percentage_discount_promotions'
|	'price_frequency_tiers'
|	'price_lists'
|	'price_volume_tiers'
|	'prices'
|	'recurring_order_copies'
|	'return_line_items'
|	'returns'
|	'satispay_gateways'
|	'satispay_payments'
|	'shipments'
|	'shipping_categories'
|	'shipping_methods'
|	'shipping_weight_tiers'
|	'shipping_zones'
|	'sku_list_items'
|	'sku_list_promotion_rules'
|	'sku_lists'
|	'sku_options'
|	'skus'
|	'stock_items'
|	'stock_line_items'
|	'stock_locations'
|	'stock_reservations'
|	'stock_transfers'
|	'stripe_gateways'
|	'stripe_payments'
|	'subscription_models'
|	'tags'
|	'tax_categories'
|	'tax_rules'
|	'taxjar_accounts'
|	'webhooks'
|	'wire_transfers'
// ##__API_RESOURCE_UPDATABLE_STOP__##

export type UpdatableResource = Resource & {
	type: UpdatableResourceType
}


// Deletable resources
export type DeletableResourceType =
	// ##__API_RESOURCE_DELETABLE_START__##
	'addresses'
|	'adjustments'
|	'adyen_gateways'
|	'adyen_payments'
|	'attachments'
|	'avalara_accounts'
|	'axerve_gateways'
|	'axerve_payments'
|	'billing_info_validation_rules'
|	'bing_geocoders'
|	'braintree_gateways'
|	'braintree_payments'
|	'bundles'
|	'buy_x_pay_y_promotions'
|	'checkout_com_gateways'
|	'checkout_com_payments'
|	'cleanups'
|	'coupon_codes_promotion_rules'
|	'coupon_recipients'
|	'coupons'
|	'custom_promotion_rules'
|	'customer_addresses'
|	'customer_groups'
|	'customer_password_resets'
|	'customer_payment_sources'
|	'customer_subscriptions'
|	'customers'
|	'delivery_lead_times'
|	'exports'
|	'external_gateways'
|	'external_payments'
|	'external_promotions'
|	'external_tax_calculators'
|	'fixed_amount_promotions'
|	'fixed_price_promotions'
|	'free_gift_promotions'
|	'free_shipping_promotions'
|	'gift_card_recipients'
|	'gift_cards'
|	'google_geocoders'
|	'imports'
|	'in_stock_subscriptions'
|	'inventory_models'
|	'inventory_return_locations'
|	'inventory_stock_locations'
|	'klarna_gateways'
|	'klarna_payments'
|	'line_item_options'
|	'line_items'
|	'manual_gateways'
|	'manual_tax_calculators'
|	'markets'
|	'merchants'
|	'order_amount_promotion_rules'
|	'order_copies'
|	'order_subscription_items'
|	'order_subscriptions'
|	'orders'
|	'packages'
|	'parcel_line_items'
|	'parcels'
|	'payment_methods'
|	'payment_options'
|	'paypal_gateways'
|	'paypal_payments'
|	'percentage_discount_promotions'
|	'price_frequency_tiers'
|	'price_lists'
|	'price_volume_tiers'
|	'prices'
|	'recurring_order_copies'
|	'return_line_items'
|	'returns'
|	'satispay_gateways'
|	'satispay_payments'
|	'shipments'
|	'shipping_categories'
|	'shipping_methods'
|	'shipping_weight_tiers'
|	'shipping_zones'
|	'sku_list_items'
|	'sku_list_promotion_rules'
|	'sku_lists'
|	'sku_options'
|	'skus'
|	'stock_items'
|	'stock_line_items'
|	'stock_locations'
|	'stock_reservations'
|	'stock_transfers'
|	'stripe_gateways'
|	'stripe_payments'
|	'subscription_models'
|	'tags'
|	'tax_categories'
|	'tax_rules'
|	'taxjar_accounts'
|	'webhooks'
|	'wire_transfers'
// ##__API_RESOURCE_DELETABLE_STOP__##

export type DeletableResource = Resource & {
	type: DeletableResourceType
}


// Taggable resources
export type TaggableResourceType =
	// ##__API_RESOURCE_TAGGABLE_START__##
	'addresses'
|	'bundles'
|	'buy_x_pay_y_promotions'
|	'coupons'
|	'customers'
|	'external_promotions'
|	'fixed_amount_promotions'
|	'fixed_price_promotions'
|	'free_gift_promotions'
|	'free_shipping_promotions'
|	'gift_cards'
|	'line_item_options'
|	'line_items'
|	'orders'
|	'percentage_discount_promotions'
|	'promotions'
|	'returns'
|	'shipments'
|	'sku_options'
|	'skus'
// ##__API_RESOURCE_TAGGABLE_STOP__##

export type TaggableResource = Resource & {
	type: TaggableResourceType,
	tags?: Array<ResourceRel & { type: TagType }> | null
}


// Versionable resources
export type VersionableResourceType =
	// ##__API_RESOURCE_VERSIONABLE_START__##
	'addresses'
|	'adjustments'
|	'adyen_gateways'
|	'adyen_payments'
|	'authorizations'
|	'avalara_accounts'
|	'axerve_gateways'
|	'axerve_payments'
|	'billing_info_validation_rules'
|	'braintree_gateways'
|	'braintree_payments'
|	'bundles'
|	'buy_x_pay_y_promotions'
|	'captures'
|	'carrier_accounts'
|	'checkout_com_gateways'
|	'checkout_com_payments'
|	'cleanups'
|	'coupon_codes_promotion_rules'
|	'coupon_recipients'
|	'coupons'
|	'custom_promotion_rules'
|	'customer_addresses'
|	'customer_groups'
|	'customer_payment_sources'
|	'customer_subscriptions'
|	'delivery_lead_times'
|	'external_gateways'
|	'external_payments'
|	'external_promotions'
|	'external_tax_calculators'
|	'fixed_amount_promotions'
|	'fixed_price_promotions'
|	'free_gift_promotions'
|	'free_shipping_promotions'
|	'gift_card_recipients'
|	'gift_cards'
|	'in_stock_subscriptions'
|	'inventory_models'
|	'inventory_return_locations'
|	'inventory_stock_locations'
|	'klarna_gateways'
|	'klarna_payments'
|	'manual_gateways'
|	'manual_tax_calculators'
|	'markets'
|	'merchants'
|	'order_amount_promotion_rules'
|	'order_subscriptions'
|	'order_validation_rules'
|	'orders'
|	'packages'
|	'parcel_line_items'
|	'parcels'
|	'payment_gateways'
|	'payment_methods'
|	'paypal_gateways'
|	'paypal_payments'
|	'percentage_discount_promotions'
|	'price_frequency_tiers'
|	'price_lists'
|	'price_tiers'
|	'price_volume_tiers'
|	'prices'
|	'promotion_rules'
|	'promotions'
|	'refunds'
|	'returns'
|	'satispay_gateways'
|	'satispay_payments'
|	'shipments'
|	'shipping_categories'
|	'shipping_method_tiers'
|	'shipping_methods'
|	'shipping_weight_tiers'
|	'shipping_zones'
|	'sku_list_items'
|	'sku_list_promotion_rules'
|	'sku_lists'
|	'sku_options'
|	'skus'
|	'stock_items'
|	'stock_line_items'
|	'stock_locations'
|	'stock_transfers'
|	'stripe_gateways'
|	'stripe_payments'
|	'tax_calculators'
|	'tax_categories'
|	'tax_rules'
|	'taxjar_accounts'
|	'transactions'
|	'voids'
|	'webhooks'
|	'wire_transfers'
// ##__API_RESOURCE_VERSIONABLE_STOP__##

export type VersionableResource = Resource & {
	type: VersionableResourceType,
	versions?: Array<ResourceRel & { type: VersionType }> | null
}



export type ResourceFields = {
	// ##__API_RESOURCE_FIELDS_START__##
	addresses: models.Address,
	adjustments: models.Adjustment,
	adyen_gateways: models.AdyenGateway,
	adyen_payments: models.AdyenPayment,
	application: models.Application,
	attachments: models.Attachment,
	authorizations: models.Authorization,
	avalara_accounts: models.AvalaraAccount,
	axerve_gateways: models.AxerveGateway,
	axerve_payments: models.AxervePayment,
	billing_info_validation_rules: models.BillingInfoValidationRule,
	bing_geocoders: models.BingGeocoder,
	braintree_gateways: models.BraintreeGateway,
	braintree_payments: models.BraintreePayment,
	bundles: models.Bundle,
	buy_x_pay_y_promotions: models.BuyXPayYPromotion,
	captures: models.Capture,
	carrier_accounts: models.CarrierAccount,
	checkout_com_gateways: models.CheckoutComGateway,
	checkout_com_payments: models.CheckoutComPayment,
	cleanups: models.Cleanup,
	coupon_codes_promotion_rules: models.CouponCodesPromotionRule,
	coupon_recipients: models.CouponRecipient,
	coupons: models.Coupon,
	custom_promotion_rules: models.CustomPromotionRule,
	customer_addresses: models.CustomerAddress,
	customer_groups: models.CustomerGroup,
	customer_password_resets: models.CustomerPasswordReset,
	customer_payment_sources: models.CustomerPaymentSource,
	customer_subscriptions: models.CustomerSubscription,
	customers: models.Customer,
	delivery_lead_times: models.DeliveryLeadTime,
	event_callbacks: models.EventCallback,
	events: models.Event,
	exports: models.Export,
	external_gateways: models.ExternalGateway,
	external_payments: models.ExternalPayment,
	external_promotions: models.ExternalPromotion,
	external_tax_calculators: models.ExternalTaxCalculator,
	fixed_amount_promotions: models.FixedAmountPromotion,
	fixed_price_promotions: models.FixedPricePromotion,
	free_gift_promotions: models.FreeGiftPromotion,
	free_shipping_promotions: models.FreeShippingPromotion,
	geocoders: models.Geocoder,
	gift_card_recipients: models.GiftCardRecipient,
	gift_cards: models.GiftCard,
	google_geocoders: models.GoogleGeocoder,
	imports: models.Import,
	in_stock_subscriptions: models.InStockSubscription,
	inventory_models: models.InventoryModel,
	inventory_return_locations: models.InventoryReturnLocation,
	inventory_stock_locations: models.InventoryStockLocation,
	klarna_gateways: models.KlarnaGateway,
	klarna_payments: models.KlarnaPayment,
	line_item_options: models.LineItemOption,
	line_items: models.LineItem,
	manual_gateways: models.ManualGateway,
	manual_tax_calculators: models.ManualTaxCalculator,
	markets: models.Market,
	merchants: models.Merchant,
	order_amount_promotion_rules: models.OrderAmountPromotionRule,
	order_copies: models.OrderCopy,
	order_factories: models.OrderFactory,
	order_subscription_items: models.OrderSubscriptionItem,
	order_subscriptions: models.OrderSubscription,
	order_validation_rules: models.OrderValidationRule,
	orders: models.Order,
	organization: models.Organization,
	packages: models.Package,
	parcel_line_items: models.ParcelLineItem,
	parcels: models.Parcel,
	payment_gateways: models.PaymentGateway,
	payment_methods: models.PaymentMethod,
	payment_options: models.PaymentOption,
	paypal_gateways: models.PaypalGateway,
	paypal_payments: models.PaypalPayment,
	percentage_discount_promotions: models.PercentageDiscountPromotion,
	price_frequency_tiers: models.PriceFrequencyTier,
	price_lists: models.PriceList,
	price_tiers: models.PriceTier,
	price_volume_tiers: models.PriceVolumeTier,
	prices: models.Price,
	promotion_rules: models.PromotionRule,
	promotions: models.Promotion,
	recurring_order_copies: models.RecurringOrderCopy,
	refunds: models.Refund,
	reserved_stocks: models.ReservedStock,
	resource_errors: models.ResourceError,
	return_line_items: models.ReturnLineItem,
	returns: models.Return,
	satispay_gateways: models.SatispayGateway,
	satispay_payments: models.SatispayPayment,
	shipments: models.Shipment,
	shipping_categories: models.ShippingCategory,
	shipping_method_tiers: models.ShippingMethodTier,
	shipping_methods: models.ShippingMethod,
	shipping_weight_tiers: models.ShippingWeightTier,
	shipping_zones: models.ShippingZone,
	sku_list_items: models.SkuListItem,
	sku_list_promotion_rules: models.SkuListPromotionRule,
	sku_lists: models.SkuList,
	sku_options: models.SkuOption,
	skus: models.Sku,
	stock_items: models.StockItem,
	stock_line_items: models.StockLineItem,
	stock_locations: models.StockLocation,
	stock_reservations: models.StockReservation,
	stock_transfers: models.StockTransfer,
	stripe_gateways: models.StripeGateway,
	stripe_payments: models.StripePayment,
	subscription_models: models.SubscriptionModel,
	tags: models.Tag,
	tax_calculators: models.TaxCalculator,
	tax_categories: models.TaxCategory,
	tax_rules: models.TaxRule,
	taxjar_accounts: models.TaxjarAccount,
	transactions: models.Transaction,
	versions: models.Version,
	voids: models.Void,
	webhooks: models.Webhook,
	wire_transfers: models.WireTransfer
	// ##__API_RESOURCE_FIELDS_STOP__##
}


export type ResourceSortableFields = {
	// ##__API_RESOURCE_SORTABLE_FIELDS_START__##
	addresses: models.AddressSortable,
	adjustments: models.AdjustmentSortable,
	adyen_gateways: models.AdyenGatewaySortable,
	adyen_payments: models.AdyenPaymentSortable,
	application: models.ApplicationSortable,
	attachments: models.AttachmentSortable,
	authorizations: models.AuthorizationSortable,
	avalara_accounts: models.AvalaraAccountSortable,
	axerve_gateways: models.AxerveGatewaySortable,
	axerve_payments: models.AxervePaymentSortable,
	billing_info_validation_rules: models.BillingInfoValidationRuleSortable,
	bing_geocoders: models.BingGeocoderSortable,
	braintree_gateways: models.BraintreeGatewaySortable,
	braintree_payments: models.BraintreePaymentSortable,
	bundles: models.BundleSortable,
	buy_x_pay_y_promotions: models.BuyXPayYPromotionSortable,
	captures: models.CaptureSortable,
	carrier_accounts: models.CarrierAccountSortable,
	checkout_com_gateways: models.CheckoutComGatewaySortable,
	checkout_com_payments: models.CheckoutComPaymentSortable,
	cleanups: models.CleanupSortable,
	coupon_codes_promotion_rules: models.CouponCodesPromotionRuleSortable,
	coupon_recipients: models.CouponRecipientSortable,
	coupons: models.CouponSortable,
	custom_promotion_rules: models.CustomPromotionRuleSortable,
	customer_addresses: models.CustomerAddressSortable,
	customer_groups: models.CustomerGroupSortable,
	customer_password_resets: models.CustomerPasswordResetSortable,
	customer_payment_sources: models.CustomerPaymentSourceSortable,
	customer_subscriptions: models.CustomerSubscriptionSortable,
	customers: models.CustomerSortable,
	delivery_lead_times: models.DeliveryLeadTimeSortable,
	event_callbacks: models.EventCallbackSortable,
	events: models.EventSortable,
	exports: models.ExportSortable,
	external_gateways: models.ExternalGatewaySortable,
	external_payments: models.ExternalPaymentSortable,
	external_promotions: models.ExternalPromotionSortable,
	external_tax_calculators: models.ExternalTaxCalculatorSortable,
	fixed_amount_promotions: models.FixedAmountPromotionSortable,
	fixed_price_promotions: models.FixedPricePromotionSortable,
	free_gift_promotions: models.FreeGiftPromotionSortable,
	free_shipping_promotions: models.FreeShippingPromotionSortable,
	geocoders: models.GeocoderSortable,
	gift_card_recipients: models.GiftCardRecipientSortable,
	gift_cards: models.GiftCardSortable,
	google_geocoders: models.GoogleGeocoderSortable,
	imports: models.ImportSortable,
	in_stock_subscriptions: models.InStockSubscriptionSortable,
	inventory_models: models.InventoryModelSortable,
	inventory_return_locations: models.InventoryReturnLocationSortable,
	inventory_stock_locations: models.InventoryStockLocationSortable,
	klarna_gateways: models.KlarnaGatewaySortable,
	klarna_payments: models.KlarnaPaymentSortable,
	line_item_options: models.LineItemOptionSortable,
	line_items: models.LineItemSortable,
	manual_gateways: models.ManualGatewaySortable,
	manual_tax_calculators: models.ManualTaxCalculatorSortable,
	markets: models.MarketSortable,
	merchants: models.MerchantSortable,
	order_amount_promotion_rules: models.OrderAmountPromotionRuleSortable,
	order_copies: models.OrderCopySortable,
	order_factories: models.OrderFactorySortable,
	order_subscription_items: models.OrderSubscriptionItemSortable,
	order_subscriptions: models.OrderSubscriptionSortable,
	order_validation_rules: models.OrderValidationRuleSortable,
	orders: models.OrderSortable,
	organization: models.OrganizationSortable,
	packages: models.PackageSortable,
	parcel_line_items: models.ParcelLineItemSortable,
	parcels: models.ParcelSortable,
	payment_gateways: models.PaymentGatewaySortable,
	payment_methods: models.PaymentMethodSortable,
	payment_options: models.PaymentOptionSortable,
	paypal_gateways: models.PaypalGatewaySortable,
	paypal_payments: models.PaypalPaymentSortable,
	percentage_discount_promotions: models.PercentageDiscountPromotionSortable,
	price_frequency_tiers: models.PriceFrequencyTierSortable,
	price_lists: models.PriceListSortable,
	price_tiers: models.PriceTierSortable,
	price_volume_tiers: models.PriceVolumeTierSortable,
	prices: models.PriceSortable,
	promotion_rules: models.PromotionRuleSortable,
	promotions: models.PromotionSortable,
	recurring_order_copies: models.RecurringOrderCopySortable,
	refunds: models.RefundSortable,
	reserved_stocks: models.ReservedStockSortable,
	resource_errors: models.ResourceErrorSortable,
	return_line_items: models.ReturnLineItemSortable,
	returns: models.ReturnSortable,
	satispay_gateways: models.SatispayGatewaySortable,
	satispay_payments: models.SatispayPaymentSortable,
	shipments: models.ShipmentSortable,
	shipping_categories: models.ShippingCategorySortable,
	shipping_method_tiers: models.ShippingMethodTierSortable,
	shipping_methods: models.ShippingMethodSortable,
	shipping_weight_tiers: models.ShippingWeightTierSortable,
	shipping_zones: models.ShippingZoneSortable,
	sku_list_items: models.SkuListItemSortable,
	sku_list_promotion_rules: models.SkuListPromotionRuleSortable,
	sku_lists: models.SkuListSortable,
	sku_options: models.SkuOptionSortable,
	skus: models.SkuSortable,
	stock_items: models.StockItemSortable,
	stock_line_items: models.StockLineItemSortable,
	stock_locations: models.StockLocationSortable,
	stock_reservations: models.StockReservationSortable,
	stock_transfers: models.StockTransferSortable,
	stripe_gateways: models.StripeGatewaySortable,
	stripe_payments: models.StripePaymentSortable,
	subscription_models: models.SubscriptionModelSortable,
	tags: models.TagSortable,
	tax_calculators: models.TaxCalculatorSortable,
	tax_categories: models.TaxCategorySortable,
	tax_rules: models.TaxRuleSortable,
	taxjar_accounts: models.TaxjarAccountSortable,
	transactions: models.TransactionSortable,
	versions: models.VersionSortable,
	voids: models.VoidSortable,
	webhooks: models.WebhookSortable,
	wire_transfers: models.WireTransferSortable
	// ##__API_RESOURCE_SORTABLE_FIELDS_STOP__##
}
