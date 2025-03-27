import type { Resource, ResourceRel } from './resource'
import type { TagType } from './resources/tags'
import type { VersionType } from './resources/versions'
import type * as models from './model'

// ##__API_RESOURCES_START__##
// ##__API_RESOURCES_TEMPLATE:: export { default as ##__RESOURCE_INSTANCE__## } from './resources/##__RESOURCE_TYPE__##'
/**
 * ©2025 Commerce Layer Inc.
 **/
export { default as addresses } from './resources/addresses'
export { default as adjustments } from './resources/adjustments'
export { default as adyen_gateways } from './resources/adyen_gateways'
export { default as adyen_payments } from './resources/adyen_payments'
export { default as application } from './resources/applications'
export { default as attachments } from './resources/attachments'
export { default as authorizations } from './resources/authorizations'
export { default as avalara_accounts } from './resources/avalara_accounts'
export { default as axerve_gateways } from './resources/axerve_gateways'
export { default as axerve_payments } from './resources/axerve_payments'
export { default as bing_geocoders } from './resources/bing_geocoders'
export { default as braintree_gateways } from './resources/braintree_gateways'
export { default as braintree_payments } from './resources/braintree_payments'
export { default as bundles } from './resources/bundles'
export { default as buy_x_pay_y_promotions } from './resources/buy_x_pay_y_promotions'
export { default as captures } from './resources/captures'
export { default as carrier_accounts } from './resources/carrier_accounts'
export { default as checkout_com_gateways } from './resources/checkout_com_gateways'
export { default as checkout_com_payments } from './resources/checkout_com_payments'
export { default as cleanups } from './resources/cleanups'
export { default as coupon_codes_promotion_rules } from './resources/coupon_codes_promotion_rules'
export { default as coupon_recipients } from './resources/coupon_recipients'
export { default as coupons } from './resources/coupons'
export { default as custom_promotion_rules } from './resources/custom_promotion_rules'
export { default as customer_addresses } from './resources/customer_addresses'
export { default as customer_groups } from './resources/customer_groups'
export { default as customer_password_resets } from './resources/customer_password_resets'
export { default as customer_payment_sources } from './resources/customer_payment_sources'
export { default as customer_subscriptions } from './resources/customer_subscriptions'
export { default as customers } from './resources/customers'
export { default as delivery_lead_times } from './resources/delivery_lead_times'
export { default as discount_engine_items } from './resources/discount_engine_items'
export { default as discount_engines } from './resources/discount_engines'
export { default as easypost_pickups } from './resources/easypost_pickups'
export { default as event_callbacks } from './resources/event_callbacks'
export { default as events } from './resources/events'
export { default as exports } from './resources/exports'
export { default as external_gateways } from './resources/external_gateways'
export { default as external_payments } from './resources/external_payments'
export { default as external_promotions } from './resources/external_promotions'
export { default as external_tax_calculators } from './resources/external_tax_calculators'
export { default as fixed_amount_promotions } from './resources/fixed_amount_promotions'
export { default as fixed_price_promotions } from './resources/fixed_price_promotions'
export { default as flex_promotions } from './resources/flex_promotions'
export { default as free_gift_promotions } from './resources/free_gift_promotions'
export { default as free_shipping_promotions } from './resources/free_shipping_promotions'
export { default as geocoders } from './resources/geocoders'
export { default as gift_card_recipients } from './resources/gift_card_recipients'
export { default as gift_cards } from './resources/gift_cards'
export { default as google_geocoders } from './resources/google_geocoders'
export { default as imports } from './resources/imports'
export { default as in_stock_subscriptions } from './resources/in_stock_subscriptions'
export { default as inventory_models } from './resources/inventory_models'
export { default as inventory_return_locations } from './resources/inventory_return_locations'
export { default as inventory_stock_locations } from './resources/inventory_stock_locations'
export { default as klarna_gateways } from './resources/klarna_gateways'
export { default as klarna_payments } from './resources/klarna_payments'
export { default as line_item_options } from './resources/line_item_options'
export { default as line_items } from './resources/line_items'
export { default as links } from './resources/links'
export { default as manual_gateways } from './resources/manual_gateways'
export { default as manual_tax_calculators } from './resources/manual_tax_calculators'
export { default as markets } from './resources/markets'
export { default as merchants } from './resources/merchants'
export { default as notifications } from './resources/notifications'
export { default as order_amount_promotion_rules } from './resources/order_amount_promotion_rules'
export { default as order_copies } from './resources/order_copies'
export { default as order_factories } from './resources/order_factories'
export { default as order_subscription_items } from './resources/order_subscription_items'
export { default as order_subscriptions } from './resources/order_subscriptions'
export { default as orders } from './resources/orders'
export { default as organization } from './resources/organizations'
export { default as packages } from './resources/packages'
export { default as parcel_line_items } from './resources/parcel_line_items'
export { default as parcels } from './resources/parcels'
export { default as payment_gateways } from './resources/payment_gateways'
export { default as payment_methods } from './resources/payment_methods'
export { default as payment_options } from './resources/payment_options'
export { default as paypal_gateways } from './resources/paypal_gateways'
export { default as paypal_payments } from './resources/paypal_payments'
export { default as percentage_discount_promotions } from './resources/percentage_discount_promotions'
export { default as pickups } from './resources/pickups'
export { default as price_frequency_tiers } from './resources/price_frequency_tiers'
export { default as price_list_schedulers } from './resources/price_list_schedulers'
export { default as price_lists } from './resources/price_lists'
export { default as price_tiers } from './resources/price_tiers'
export { default as price_volume_tiers } from './resources/price_volume_tiers'
export { default as prices } from './resources/prices'
export { default as promotion_rules } from './resources/promotion_rules'
export { default as promotions } from './resources/promotions'
export { default as recurring_order_copies } from './resources/recurring_order_copies'
export { default as refunds } from './resources/refunds'
export { default as reserved_stocks } from './resources/reserved_stocks'
export { default as resource_errors } from './resources/resource_errors'
export { default as return_line_items } from './resources/return_line_items'
export { default as returns } from './resources/returns'
export { default as satispay_gateways } from './resources/satispay_gateways'
export { default as satispay_payments } from './resources/satispay_payments'
export { default as shipments } from './resources/shipments'
export { default as shipping_categories } from './resources/shipping_categories'
export { default as shipping_method_tiers } from './resources/shipping_method_tiers'
export { default as shipping_methods } from './resources/shipping_methods'
export { default as shipping_weight_tiers } from './resources/shipping_weight_tiers'
export { default as shipping_zones } from './resources/shipping_zones'
export { default as sku_list_items } from './resources/sku_list_items'
export { default as sku_list_promotion_rules } from './resources/sku_list_promotion_rules'
export { default as sku_lists } from './resources/sku_lists'
export { default as sku_options } from './resources/sku_options'
export { default as skus } from './resources/skus'
export { default as stock_items } from './resources/stock_items'
export { default as stock_line_items } from './resources/stock_line_items'
export { default as stock_locations } from './resources/stock_locations'
export { default as stock_reservations } from './resources/stock_reservations'
export { default as stock_transfers } from './resources/stock_transfers'
export { default as stores } from './resources/stores'
export { default as stripe_gateways } from './resources/stripe_gateways'
export { default as stripe_payments } from './resources/stripe_payments'
export { default as stripe_tax_accounts } from './resources/stripe_tax_accounts'
export { default as subscription_models } from './resources/subscription_models'
export { default as tags } from './resources/tags'
export { default as talon_one_accounts } from './resources/talon_one_accounts'
export { default as tax_calculators } from './resources/tax_calculators'
export { default as tax_categories } from './resources/tax_categories'
export { default as tax_rules } from './resources/tax_rules'
export { default as taxjar_accounts } from './resources/taxjar_accounts'
export { default as transactions } from './resources/transactions'
export { default as versions } from './resources/versions'
export { default as vertex_accounts } from './resources/vertex_accounts'
export { default as voids } from './resources/voids'
export { default as webhooks } from './resources/webhooks'
export { default as wire_transfers } from './resources/wire_transfers'
// ##__API_RESOURCES_STOP__##


/**
export type ResourceTypeLock =
	// ##__API_RESOURCE_TYPES_START__##
	'addresses'
|	'adjustments'
|	'adyen_gateways'
|	'adyen_payments'
|	'applications'
|	'attachments'
|	'authorizations'
|	'avalara_accounts'
|	'axerve_gateways'
|	'axerve_payments'
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
|	'discount_engine_items'
|	'discount_engines'
|	'easypost_pickups'
|	'event_callbacks'
|	'events'
|	'exports'
|	'external_gateways'
|	'external_payments'
|	'external_promotions'
|	'external_tax_calculators'
|	'fixed_amount_promotions'
|	'fixed_price_promotions'
|	'flex_promotions'
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
|	'links'
|	'manual_gateways'
|	'manual_tax_calculators'
|	'markets'
|	'merchants'
|	'notifications'
|	'order_amount_promotion_rules'
|	'order_copies'
|	'order_factories'
|	'order_subscription_items'
|	'order_subscriptions'
|	'orders'
|	'organizations'
|	'packages'
|	'parcel_line_items'
|	'parcels'
|	'payment_gateways'
|	'payment_methods'
|	'payment_options'
|	'paypal_gateways'
|	'paypal_payments'
|	'percentage_discount_promotions'
|	'pickups'
|	'price_frequency_tiers'
|	'price_list_schedulers'
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
|	'stores'
|	'stripe_gateways'
|	'stripe_payments'
|	'stripe_tax_accounts'
|	'subscription_models'
|	'tags'
|	'talon_one_accounts'
|	'tax_calculators'
|	'tax_categories'
|	'tax_rules'
|	'taxjar_accounts'
|	'transactions'
|	'versions'
|	'vertex_accounts'
|	'voids'
|	'webhooks'
|	'wire_transfers'
// ##__API_RESOURCE_TYPES_STOP__##
**/


const apiResources = [
	// ##__API_RESOURCE_LIST_START__##
	'addresses',
	'adjustments',
	'adyen_gateways',
	'adyen_payments',
	'applications',
	'attachments',
	'authorizations',
	'avalara_accounts',
	'axerve_gateways',
	'axerve_payments',
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
	'discount_engine_items',
	'discount_engines',
	'easypost_pickups',
	'event_callbacks',
	'events',
	'exports',
	'external_gateways',
	'external_payments',
	'external_promotions',
	'external_tax_calculators',
	'fixed_amount_promotions',
	'fixed_price_promotions',
	'flex_promotions',
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
	'links',
	'manual_gateways',
	'manual_tax_calculators',
	'markets',
	'merchants',
	'notifications',
	'order_amount_promotion_rules',
	'order_copies',
	'order_factories',
	'order_subscription_items',
	'order_subscriptions',
	'orders',
	'organizations',
	'packages',
	'parcel_line_items',
	'parcels',
	'payment_gateways',
	'payment_methods',
	'payment_options',
	'paypal_gateways',
	'paypal_payments',
	'percentage_discount_promotions',
	'pickups',
	'price_frequency_tiers',
	'price_list_schedulers',
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
	'stores',
	'stripe_gateways',
	'stripe_payments',
	'stripe_tax_accounts',
	'subscription_models',
	'tags',
	'talon_one_accounts',
	'tax_calculators',
	'tax_categories',
	'tax_rules',
	'taxjar_accounts',
	'transactions',
	'versions',
	'vertex_accounts',
	'voids',
	'webhooks',
	'wire_transfers'
	// ##__API_RESOURCE_LIST_STOP__##
] as const

export type ResourceTypeLock = typeof apiResources[number]
export const resourceList: Readonly<ResourceTypeLock[]> = apiResources


export const singletonList: ResourceTypeLock[] = [
	// ##__API_RESOURCE_SINGLETON_START__##
	'applications',
	'organizations'
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
	'applications'
|	'organizations'
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
|	'bing_geocoders'
|	'braintree_gateways'
|	'braintree_payments'
|	'bundles'
|	'buy_x_pay_y_promotions'
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
|	'easypost_pickups'
|	'exports'
|	'external_gateways'
|	'external_payments'
|	'external_promotions'
|	'external_tax_calculators'
|	'fixed_amount_promotions'
|	'fixed_price_promotions'
|	'flex_promotions'
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
|	'links'
|	'manual_gateways'
|	'manual_tax_calculators'
|	'markets'
|	'merchants'
|	'notifications'
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
|	'price_list_schedulers'
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
|	'stores'
|	'stripe_gateways'
|	'stripe_payments'
|	'stripe_tax_accounts'
|	'subscription_models'
|	'tags'
|	'talon_one_accounts'
|	'tax_categories'
|	'tax_rules'
|	'taxjar_accounts'
|	'vertex_accounts'
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
|	'easypost_pickups'
|	'events'
|	'exports'
|	'external_gateways'
|	'external_payments'
|	'external_promotions'
|	'external_tax_calculators'
|	'fixed_amount_promotions'
|	'fixed_price_promotions'
|	'flex_promotions'
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
|	'links'
|	'manual_gateways'
|	'manual_tax_calculators'
|	'markets'
|	'merchants'
|	'notifications'
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
|	'price_list_schedulers'
|	'price_lists'
|	'price_volume_tiers'
|	'prices'
|	'recurring_order_copies'
|	'refunds'
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
|	'stores'
|	'stripe_gateways'
|	'stripe_payments'
|	'stripe_tax_accounts'
|	'subscription_models'
|	'tags'
|	'talon_one_accounts'
|	'tax_categories'
|	'tax_rules'
|	'taxjar_accounts'
|	'vertex_accounts'
|	'voids'
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
|	'bing_geocoders'
|	'braintree_gateways'
|	'braintree_payments'
|	'bundles'
|	'buy_x_pay_y_promotions'
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
|	'easypost_pickups'
|	'exports'
|	'external_gateways'
|	'external_payments'
|	'external_promotions'
|	'external_tax_calculators'
|	'fixed_amount_promotions'
|	'fixed_price_promotions'
|	'flex_promotions'
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
|	'links'
|	'manual_gateways'
|	'manual_tax_calculators'
|	'markets'
|	'merchants'
|	'notifications'
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
|	'price_list_schedulers'
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
|	'stores'
|	'stripe_gateways'
|	'stripe_payments'
|	'stripe_tax_accounts'
|	'subscription_models'
|	'tags'
|	'talon_one_accounts'
|	'tax_categories'
|	'tax_rules'
|	'taxjar_accounts'
|	'vertex_accounts'
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
|	'flex_promotions'
|	'free_gift_promotions'
|	'free_shipping_promotions'
|	'gift_cards'
|	'line_item_options'
|	'line_items'
|	'order_subscriptions'
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
|	'discount_engines'
|	'exports'
|	'external_gateways'
|	'external_payments'
|	'external_promotions'
|	'external_tax_calculators'
|	'fixed_amount_promotions'
|	'fixed_price_promotions'
|	'flex_promotions'
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
|	'price_list_schedulers'
|	'price_lists'
|	'price_tiers'
|	'price_volume_tiers'
|	'prices'
|	'promotion_rules'
|	'promotions'
|	'refunds'
|	'reserved_stocks'
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
|	'stores'
|	'stripe_gateways'
|	'stripe_payments'
|	'stripe_tax_accounts'
|	'talon_one_accounts'
|	'tax_calculators'
|	'tax_categories'
|	'tax_rules'
|	'taxjar_accounts'
|	'transactions'
|	'vertex_accounts'
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
	applications: models.Application,
	attachments: models.Attachment,
	authorizations: models.Authorization,
	avalara_accounts: models.AvalaraAccount,
	axerve_gateways: models.AxerveGateway,
	axerve_payments: models.AxervePayment,
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
	discount_engine_items: models.DiscountEngineItem,
	discount_engines: models.DiscountEngine,
	easypost_pickups: models.EasypostPickup,
	event_callbacks: models.EventCallback,
	events: models.Event,
	exports: models.Export,
	external_gateways: models.ExternalGateway,
	external_payments: models.ExternalPayment,
	external_promotions: models.ExternalPromotion,
	external_tax_calculators: models.ExternalTaxCalculator,
	fixed_amount_promotions: models.FixedAmountPromotion,
	fixed_price_promotions: models.FixedPricePromotion,
	flex_promotions: models.FlexPromotion,
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
	links: models.Link,
	manual_gateways: models.ManualGateway,
	manual_tax_calculators: models.ManualTaxCalculator,
	markets: models.Market,
	merchants: models.Merchant,
	notifications: models.Notification,
	order_amount_promotion_rules: models.OrderAmountPromotionRule,
	order_copies: models.OrderCopy,
	order_factories: models.OrderFactory,
	order_subscription_items: models.OrderSubscriptionItem,
	order_subscriptions: models.OrderSubscription,
	orders: models.Order,
	organizations: models.Organization,
	packages: models.Package,
	parcel_line_items: models.ParcelLineItem,
	parcels: models.Parcel,
	payment_gateways: models.PaymentGateway,
	payment_methods: models.PaymentMethod,
	payment_options: models.PaymentOption,
	paypal_gateways: models.PaypalGateway,
	paypal_payments: models.PaypalPayment,
	percentage_discount_promotions: models.PercentageDiscountPromotion,
	pickups: models.Pickup,
	price_frequency_tiers: models.PriceFrequencyTier,
	price_list_schedulers: models.PriceListScheduler,
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
	stores: models.Store,
	stripe_gateways: models.StripeGateway,
	stripe_payments: models.StripePayment,
	stripe_tax_accounts: models.StripeTaxAccount,
	subscription_models: models.SubscriptionModel,
	tags: models.Tag,
	talon_one_accounts: models.TalonOneAccount,
	tax_calculators: models.TaxCalculator,
	tax_categories: models.TaxCategory,
	tax_rules: models.TaxRule,
	taxjar_accounts: models.TaxjarAccount,
	transactions: models.Transaction,
	versions: models.Version,
	vertex_accounts: models.VertexAccount,
	voids: models.Void,
	webhooks: models.Webhook,
	wire_transfers: models.WireTransfer
	// ##__API_RESOURCE_FIELDS_STOP__##
}


export type ResourceSortFields = {
	// ##__API_RESOURCE_SORTABLE_FIELDS_START__##
	addresses: models.AddressSort,
	adjustments: models.AdjustmentSort,
	adyen_gateways: models.AdyenGatewaySort,
	adyen_payments: models.AdyenPaymentSort,
	applications: models.ApplicationSort,
	attachments: models.AttachmentSort,
	authorizations: models.AuthorizationSort,
	avalara_accounts: models.AvalaraAccountSort,
	axerve_gateways: models.AxerveGatewaySort,
	axerve_payments: models.AxervePaymentSort,
	bing_geocoders: models.BingGeocoderSort,
	braintree_gateways: models.BraintreeGatewaySort,
	braintree_payments: models.BraintreePaymentSort,
	bundles: models.BundleSort,
	buy_x_pay_y_promotions: models.BuyXPayYPromotionSort,
	captures: models.CaptureSort,
	carrier_accounts: models.CarrierAccountSort,
	checkout_com_gateways: models.CheckoutComGatewaySort,
	checkout_com_payments: models.CheckoutComPaymentSort,
	cleanups: models.CleanupSort,
	coupon_codes_promotion_rules: models.CouponCodesPromotionRuleSort,
	coupon_recipients: models.CouponRecipientSort,
	coupons: models.CouponSort,
	custom_promotion_rules: models.CustomPromotionRuleSort,
	customer_addresses: models.CustomerAddressSort,
	customer_groups: models.CustomerGroupSort,
	customer_password_resets: models.CustomerPasswordResetSort,
	customer_payment_sources: models.CustomerPaymentSourceSort,
	customer_subscriptions: models.CustomerSubscriptionSort,
	customers: models.CustomerSort,
	delivery_lead_times: models.DeliveryLeadTimeSort,
	discount_engine_items: models.DiscountEngineItemSort,
	discount_engines: models.DiscountEngineSort,
	easypost_pickups: models.EasypostPickupSort,
	event_callbacks: models.EventCallbackSort,
	events: models.EventSort,
	exports: models.ExportSort,
	external_gateways: models.ExternalGatewaySort,
	external_payments: models.ExternalPaymentSort,
	external_promotions: models.ExternalPromotionSort,
	external_tax_calculators: models.ExternalTaxCalculatorSort,
	fixed_amount_promotions: models.FixedAmountPromotionSort,
	fixed_price_promotions: models.FixedPricePromotionSort,
	flex_promotions: models.FlexPromotionSort,
	free_gift_promotions: models.FreeGiftPromotionSort,
	free_shipping_promotions: models.FreeShippingPromotionSort,
	geocoders: models.GeocoderSort,
	gift_card_recipients: models.GiftCardRecipientSort,
	gift_cards: models.GiftCardSort,
	google_geocoders: models.GoogleGeocoderSort,
	imports: models.ImportSort,
	in_stock_subscriptions: models.InStockSubscriptionSort,
	inventory_models: models.InventoryModelSort,
	inventory_return_locations: models.InventoryReturnLocationSort,
	inventory_stock_locations: models.InventoryStockLocationSort,
	klarna_gateways: models.KlarnaGatewaySort,
	klarna_payments: models.KlarnaPaymentSort,
	line_item_options: models.LineItemOptionSort,
	line_items: models.LineItemSort,
	links: models.LinkSort,
	manual_gateways: models.ManualGatewaySort,
	manual_tax_calculators: models.ManualTaxCalculatorSort,
	markets: models.MarketSort,
	merchants: models.MerchantSort,
	notifications: models.NotificationSort,
	order_amount_promotion_rules: models.OrderAmountPromotionRuleSort,
	order_copies: models.OrderCopySort,
	order_factories: models.OrderFactorySort,
	order_subscription_items: models.OrderSubscriptionItemSort,
	order_subscriptions: models.OrderSubscriptionSort,
	orders: models.OrderSort,
	organizations: models.OrganizationSort,
	packages: models.PackageSort,
	parcel_line_items: models.ParcelLineItemSort,
	parcels: models.ParcelSort,
	payment_gateways: models.PaymentGatewaySort,
	payment_methods: models.PaymentMethodSort,
	payment_options: models.PaymentOptionSort,
	paypal_gateways: models.PaypalGatewaySort,
	paypal_payments: models.PaypalPaymentSort,
	percentage_discount_promotions: models.PercentageDiscountPromotionSort,
	pickups: models.PickupSort,
	price_frequency_tiers: models.PriceFrequencyTierSort,
	price_list_schedulers: models.PriceListSchedulerSort,
	price_lists: models.PriceListSort,
	price_tiers: models.PriceTierSort,
	price_volume_tiers: models.PriceVolumeTierSort,
	prices: models.PriceSort,
	promotion_rules: models.PromotionRuleSort,
	promotions: models.PromotionSort,
	recurring_order_copies: models.RecurringOrderCopySort,
	refunds: models.RefundSort,
	reserved_stocks: models.ReservedStockSort,
	resource_errors: models.ResourceErrorSort,
	return_line_items: models.ReturnLineItemSort,
	returns: models.ReturnSort,
	satispay_gateways: models.SatispayGatewaySort,
	satispay_payments: models.SatispayPaymentSort,
	shipments: models.ShipmentSort,
	shipping_categories: models.ShippingCategorySort,
	shipping_method_tiers: models.ShippingMethodTierSort,
	shipping_methods: models.ShippingMethodSort,
	shipping_weight_tiers: models.ShippingWeightTierSort,
	shipping_zones: models.ShippingZoneSort,
	sku_list_items: models.SkuListItemSort,
	sku_list_promotion_rules: models.SkuListPromotionRuleSort,
	sku_lists: models.SkuListSort,
	sku_options: models.SkuOptionSort,
	skus: models.SkuSort,
	stock_items: models.StockItemSort,
	stock_line_items: models.StockLineItemSort,
	stock_locations: models.StockLocationSort,
	stock_reservations: models.StockReservationSort,
	stock_transfers: models.StockTransferSort,
	stores: models.StoreSort,
	stripe_gateways: models.StripeGatewaySort,
	stripe_payments: models.StripePaymentSort,
	stripe_tax_accounts: models.StripeTaxAccountSort,
	subscription_models: models.SubscriptionModelSort,
	tags: models.TagSort,
	talon_one_accounts: models.TalonOneAccountSort,
	tax_calculators: models.TaxCalculatorSort,
	tax_categories: models.TaxCategorySort,
	tax_rules: models.TaxRuleSort,
	taxjar_accounts: models.TaxjarAccountSort,
	transactions: models.TransactionSort,
	versions: models.VersionSort,
	vertex_accounts: models.VertexAccountSort,
	voids: models.VoidSort,
	webhooks: models.WebhookSort,
	wire_transfers: models.WireTransferSort
	// ##__API_RESOURCE_SORTABLE_FIELDS_STOP__##
}
