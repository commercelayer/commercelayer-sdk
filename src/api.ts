import type { Resource, ResourceRel } from './resource'
import type { TagType } from './resources/tags'
import type { VersionType } from './resources/versions'

// ##__API_RESOURCES_START__##
// ##__API_RESOURCES_TEMPLATE:: export { default as ##__RESOURCE_CLASS__##, type ##__RESOURCE_MODEL__##Sortable } from './resources/##__RESOURCE_TYPE__##'
/**
 * ©2024 Commerce Layer Inc.
 **/
export { default as Addresses, type AddressSortable } from './resources/addresses'
export { default as Adjustments, type AdjustmentSortable } from './resources/adjustments'
export { default as AdyenGateways, type AdyenGatewaySortable } from './resources/adyen_gateways'
export { default as AdyenPayments, type AdyenPaymentSortable } from './resources/adyen_payments'
export { default as Applications, type ApplicationSortable } from './resources/application'
export { default as Attachments, type AttachmentSortable } from './resources/attachments'
export { default as Authorizations, type AuthorizationSortable } from './resources/authorizations'
export { default as AvalaraAccounts, type AvalaraAccountSortable } from './resources/avalara_accounts'
export { default as AxerveGateways, type AxerveGatewaySortable } from './resources/axerve_gateways'
export { default as AxervePayments, type AxervePaymentSortable } from './resources/axerve_payments'
export { default as BillingInfoValidationRules, type BillingInfoValidationRuleSortable } from './resources/billing_info_validation_rules'
export { default as BingGeocoders, type BingGeocoderSortable } from './resources/bing_geocoders'
export { default as BraintreeGateways, type BraintreeGatewaySortable } from './resources/braintree_gateways'
export { default as BraintreePayments, type BraintreePaymentSortable } from './resources/braintree_payments'
export { default as Bundles, type BundleSortable } from './resources/bundles'
export { default as BuyXPayYPromotions, type BuyXPayYPromotionSortable } from './resources/buy_x_pay_y_promotions'
export { default as Captures, type CaptureSortable } from './resources/captures'
export { default as CarrierAccounts, type CarrierAccountSortable } from './resources/carrier_accounts'
export { default as CheckoutComGateways, type CheckoutComGatewaySortable } from './resources/checkout_com_gateways'
export { default as CheckoutComPayments, type CheckoutComPaymentSortable } from './resources/checkout_com_payments'
export { default as Cleanups, type CleanupSortable } from './resources/cleanups'
export { default as CouponCodesPromotionRules, type CouponCodesPromotionRuleSortable } from './resources/coupon_codes_promotion_rules'
export { default as CouponRecipients, type CouponRecipientSortable } from './resources/coupon_recipients'
export { default as Coupons, type CouponSortable } from './resources/coupons'
export { default as CustomPromotionRules, type CustomPromotionRuleSortable } from './resources/custom_promotion_rules'
export { default as CustomerAddresses, type CustomerAddressSortable } from './resources/customer_addresses'
export { default as CustomerGroups, type CustomerGroupSortable } from './resources/customer_groups'
export { default as CustomerPasswordResets, type CustomerPasswordResetSortable } from './resources/customer_password_resets'
export { default as CustomerPaymentSources, type CustomerPaymentSourceSortable } from './resources/customer_payment_sources'
export { default as CustomerSubscriptions, type CustomerSubscriptionSortable } from './resources/customer_subscriptions'
export { default as Customers, type CustomerSortable } from './resources/customers'
export { default as DeliveryLeadTimes, type DeliveryLeadTimeSortable } from './resources/delivery_lead_times'
export { default as EventCallbacks, type EventCallbackSortable } from './resources/event_callbacks'
export { default as Events, type EventSortable } from './resources/events'
export { default as Exports, type ExportSortable } from './resources/exports'
export { default as ExternalGateways, type ExternalGatewaySortable } from './resources/external_gateways'
export { default as ExternalPayments, type ExternalPaymentSortable } from './resources/external_payments'
export { default as ExternalPromotions, type ExternalPromotionSortable } from './resources/external_promotions'
export { default as ExternalTaxCalculators, type ExternalTaxCalculatorSortable } from './resources/external_tax_calculators'
export { default as FixedAmountPromotions, type FixedAmountPromotionSortable } from './resources/fixed_amount_promotions'
export { default as FixedPricePromotions, type FixedPricePromotionSortable } from './resources/fixed_price_promotions'
export { default as FreeGiftPromotions, type FreeGiftPromotionSortable } from './resources/free_gift_promotions'
export { default as FreeShippingPromotions, type FreeShippingPromotionSortable } from './resources/free_shipping_promotions'
export { default as Geocoders, type GeocoderSortable } from './resources/geocoders'
export { default as GiftCardRecipients, type GiftCardRecipientSortable } from './resources/gift_card_recipients'
export { default as GiftCards, type GiftCardSortable } from './resources/gift_cards'
export { default as GoogleGeocoders, type GoogleGeocoderSortable } from './resources/google_geocoders'
export { default as Imports, type ImportSortable } from './resources/imports'
export { default as InStockSubscriptions, type InStockSubscriptionSortable } from './resources/in_stock_subscriptions'
export { default as InventoryModels, type InventoryModelSortable } from './resources/inventory_models'
export { default as InventoryReturnLocations, type InventoryReturnLocationSortable } from './resources/inventory_return_locations'
export { default as InventoryStockLocations, type InventoryStockLocationSortable } from './resources/inventory_stock_locations'
export { default as KlarnaGateways, type KlarnaGatewaySortable } from './resources/klarna_gateways'
export { default as KlarnaPayments, type KlarnaPaymentSortable } from './resources/klarna_payments'
export { default as LineItemOptions, type LineItemOptionSortable } from './resources/line_item_options'
export { default as LineItems, type LineItemSortable } from './resources/line_items'
export { default as ManualGateways, type ManualGatewaySortable } from './resources/manual_gateways'
export { default as ManualTaxCalculators, type ManualTaxCalculatorSortable } from './resources/manual_tax_calculators'
export { default as Markets, type MarketSortable } from './resources/markets'
export { default as Merchants, type MerchantSortable } from './resources/merchants'
export { default as OrderAmountPromotionRules, type OrderAmountPromotionRuleSortable } from './resources/order_amount_promotion_rules'
export { default as OrderCopies, type OrderCopySortable } from './resources/order_copies'
export { default as OrderFactories, type OrderFactorySortable } from './resources/order_factories'
export { default as OrderSubscriptionItems, type OrderSubscriptionItemSortable } from './resources/order_subscription_items'
export { default as OrderSubscriptions, type OrderSubscriptionSortable } from './resources/order_subscriptions'
export { default as OrderValidationRules, type OrderValidationRuleSortable } from './resources/order_validation_rules'
export { default as Orders, type OrderSortable } from './resources/orders'
export { default as Organizations, type OrganizationSortable } from './resources/organization'
export { default as Packages, type PackageSortable } from './resources/packages'
export { default as ParcelLineItems, type ParcelLineItemSortable } from './resources/parcel_line_items'
export { default as Parcels, type ParcelSortable } from './resources/parcels'
export { default as PaymentGateways, type PaymentGatewaySortable } from './resources/payment_gateways'
export { default as PaymentMethods, type PaymentMethodSortable } from './resources/payment_methods'
export { default as PaymentOptions, type PaymentOptionSortable } from './resources/payment_options'
export { default as PaypalGateways, type PaypalGatewaySortable } from './resources/paypal_gateways'
export { default as PaypalPayments, type PaypalPaymentSortable } from './resources/paypal_payments'
export { default as PercentageDiscountPromotions, type PercentageDiscountPromotionSortable } from './resources/percentage_discount_promotions'
export { default as PriceFrequencyTiers, type PriceFrequencyTierSortable } from './resources/price_frequency_tiers'
export { default as PriceLists, type PriceListSortable } from './resources/price_lists'
export { default as PriceTiers, type PriceTierSortable } from './resources/price_tiers'
export { default as PriceVolumeTiers, type PriceVolumeTierSortable } from './resources/price_volume_tiers'
export { default as Prices, type PriceSortable } from './resources/prices'
export { default as PromotionRules, type PromotionRuleSortable } from './resources/promotion_rules'
export { default as Promotions, type PromotionSortable } from './resources/promotions'
export { default as RecurringOrderCopies, type RecurringOrderCopySortable } from './resources/recurring_order_copies'
export { default as Refunds, type RefundSortable } from './resources/refunds'
export { default as ReservedStocks, type ReservedStockSortable } from './resources/reserved_stocks'
export { default as ResourceErrors, type ResourceErrorSortable } from './resources/resource_errors'
export { default as ReturnLineItems, type ReturnLineItemSortable } from './resources/return_line_items'
export { default as Returns, type ReturnSortable } from './resources/returns'
export { default as SatispayGateways, type SatispayGatewaySortable } from './resources/satispay_gateways'
export { default as SatispayPayments, type SatispayPaymentSortable } from './resources/satispay_payments'
export { default as Shipments, type ShipmentSortable } from './resources/shipments'
export { default as ShippingCategories, type ShippingCategorySortable } from './resources/shipping_categories'
export { default as ShippingMethodTiers, type ShippingMethodTierSortable } from './resources/shipping_method_tiers'
export { default as ShippingMethods, type ShippingMethodSortable } from './resources/shipping_methods'
export { default as ShippingWeightTiers, type ShippingWeightTierSortable } from './resources/shipping_weight_tiers'
export { default as ShippingZones, type ShippingZoneSortable } from './resources/shipping_zones'
export { default as SkuListItems, type SkuListItemSortable } from './resources/sku_list_items'
export { default as SkuListPromotionRules, type SkuListPromotionRuleSortable } from './resources/sku_list_promotion_rules'
export { default as SkuLists, type SkuListSortable } from './resources/sku_lists'
export { default as SkuOptions, type SkuOptionSortable } from './resources/sku_options'
export { default as Skus, type SkuSortable } from './resources/skus'
export { default as StockItems, type StockItemSortable } from './resources/stock_items'
export { default as StockLineItems, type StockLineItemSortable } from './resources/stock_line_items'
export { default as StockLocations, type StockLocationSortable } from './resources/stock_locations'
export { default as StockReservations, type StockReservationSortable } from './resources/stock_reservations'
export { default as StockTransfers, type StockTransferSortable } from './resources/stock_transfers'
export { default as StripeGateways, type StripeGatewaySortable } from './resources/stripe_gateways'
export { default as StripePayments, type StripePaymentSortable } from './resources/stripe_payments'
export { default as SubscriptionModels, type SubscriptionModelSortable } from './resources/subscription_models'
export { default as Tags, type TagSortable } from './resources/tags'
export { default as TaxCalculators, type TaxCalculatorSortable } from './resources/tax_calculators'
export { default as TaxCategories, type TaxCategorySortable } from './resources/tax_categories'
export { default as TaxRules, type TaxRuleSortable } from './resources/tax_rules'
export { default as TaxjarAccounts, type TaxjarAccountSortable } from './resources/taxjar_accounts'
export { default as Transactions, type TransactionSortable } from './resources/transactions'
export { default as Versions, type VersionSortable } from './resources/versions'
export { default as Voids, type VoidSortable } from './resources/voids'
export { default as Webhooks, type WebhookSortable } from './resources/webhooks'
export { default as WireTransfers, type WireTransferSortable } from './resources/wire_transfers'
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
