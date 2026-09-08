// ResourceRel is only referenced by TaggableResource, so it must be imported
// inside the conditional or it is unused on targets without a tags resource.
import type { Resource, ResourceRel } from '@runtime/resource'
import type * as models from './model'
import type { TagType } from './resources/tags'

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
  'coupons',
  'coupon_codes_promotion_rules',
  'coupon_recipients',
  'custom_promotion_rules',
  'customers',
  'customer_addresses',
  'customer_groups',
  'customer_password_resets',
  'customer_payment_sources',
  'customer_subscriptions',
  'delivery_lead_times',
  'discount_engines',
  'discount_engine_items',
  'easypost_pickups',
  'events',
  'event_callbacks',
  'event_stores',
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
  'gift_cards',
  'gift_card_recipients',
  'google_geocoders',
  'imports',
  'in_stock_subscriptions',
  'inventory_models',
  'inventory_return_locations',
  'inventory_stock_locations',
  'klarna_gateways',
  'klarna_payments',
  'line_items',
  'line_item_options',
  'links',
  'manual_gateways',
  'manual_tax_calculators',
  'markets',
  'merchants',
  'notifications',
  'orders',
  'order_amount_promotion_rules',
  'order_copies',
  'order_factories',
  'order_subscriptions',
  'order_subscription_items',
  'order_validation_rules',
  'organizations',
  'packages',
  'parcels',
  'parcel_line_items',
  'payment_gateways',
  'payment_methods',
  'payment_options',
  'paypal_gateways',
  'paypal_payments',
  'percentage_discount_promotions',
  'pickups',
  'prices',
  'price_frequency_tiers',
  'price_lists',
  'price_list_schedulers',
  'price_tiers',
  'price_volume_tiers',
  'promotions',
  'promotion_rules',
  'recurring_order_copies',
  'refunds',
  'reserved_stocks',
  'resource_errors',
  'returns',
  'return_line_items',
  'satispay_gateways',
  'satispay_payments',
  'shipments',
  'shipment_line_items',
  'shipping_categories',
  'shipping_methods',
  'shipping_method_tiers',
  'shipping_weight_tiers',
  'shipping_zones',
  'skus',
  'sku_lists',
  'sku_list_items',
  'sku_list_promotion_rules',
  'sku_options',
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
  'vertex_accounts',
  'voids',
  'webhooks',
  'wire_transfers',
  // ##__API_RESOURCE_LIST_STOP__##
] as const

export type ResourceTypeLock = (typeof apiResources)[number]
export const resourceList: readonly ResourceTypeLock[] = apiResources

// Singleton resources
export const singletonList = [
  // ##__API_RESOURCE_SINGLETON_START__##
  'applications',
  'organizations',
  // ##__API_RESOURCE_SINGLETON_STOP__##
] as const

// Retrievable resources
export type RetrievableResourceType = ResourceTypeLock

export type RetrievableResource = Resource & {
  type: RetrievableResourceType
}

// Listable resources
export type ListableResourceType = Exclude<
  ResourceTypeLock,
  // ##__API_RESOURCE_NOT_LISTABLE_START__##
  'applications' | 'event_stores' | 'organizations'
  // ##__API_RESOURCE_NOT_LISTABLE_STOP__##
>

export type ListableResource = Resource & {
  type: ListableResourceType
}

// Creatable resources
export const creatableResources = [
  // ##__API_RESOURCE_CREATABLE_START__##
  'addresses',
  'adjustments',
  'adyen_gateways',
  'adyen_payments',
  'attachments',
  'avalara_accounts',
  'axerve_gateways',
  'axerve_payments',
  'billing_info_validation_rules',
  'bing_geocoders',
  'braintree_gateways',
  'braintree_payments',
  'bundles',
  'buy_x_pay_y_promotions',
  'carrier_accounts',
  'checkout_com_gateways',
  'checkout_com_payments',
  'cleanups',
  'coupons',
  'coupon_codes_promotion_rules',
  'coupon_recipients',
  'custom_promotion_rules',
  'customers',
  'customer_addresses',
  'customer_groups',
  'customer_password_resets',
  'customer_payment_sources',
  'customer_subscriptions',
  'delivery_lead_times',
  'easypost_pickups',
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
  'gift_cards',
  'gift_card_recipients',
  'google_geocoders',
  'imports',
  'in_stock_subscriptions',
  'inventory_models',
  'inventory_return_locations',
  'inventory_stock_locations',
  'klarna_gateways',
  'klarna_payments',
  'line_items',
  'line_item_options',
  'links',
  'manual_gateways',
  'manual_tax_calculators',
  'markets',
  'merchants',
  'notifications',
  'orders',
  'order_amount_promotion_rules',
  'order_copies',
  'order_subscriptions',
  'order_subscription_items',
  'packages',
  'parcels',
  'parcel_line_items',
  'payment_methods',
  'payment_options',
  'paypal_gateways',
  'paypal_payments',
  'percentage_discount_promotions',
  'prices',
  'price_frequency_tiers',
  'price_lists',
  'price_list_schedulers',
  'price_volume_tiers',
  'recurring_order_copies',
  'returns',
  'return_line_items',
  'satispay_gateways',
  'satispay_payments',
  'shipments',
  'shipping_categories',
  'shipping_methods',
  'shipping_weight_tiers',
  'shipping_zones',
  'skus',
  'sku_lists',
  'sku_list_items',
  'sku_list_promotion_rules',
  'sku_options',
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
  'tax_categories',
  'tax_rules',
  'taxjar_accounts',
  'vertex_accounts',
  'webhooks',
  'wire_transfers',
  // ##__API_RESOURCE_CREATABLE_STOP__##
] as const

export type CreatableResourceType = (typeof creatableResources)[number]
export type CreatableResource = Resource & {
  type: CreatableResourceType
}

// Updatable resources
export const updatableResources = [
  // ##__API_RESOURCE_UPDATABLE_START__##
  'addresses',
  'adjustments',
  'adyen_gateways',
  'adyen_payments',
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
  'coupons',
  'coupon_codes_promotion_rules',
  'coupon_recipients',
  'custom_promotion_rules',
  'customers',
  'customer_addresses',
  'customer_groups',
  'customer_password_resets',
  'customer_payment_sources',
  'customer_subscriptions',
  'delivery_lead_times',
  'easypost_pickups',
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
  'gift_cards',
  'gift_card_recipients',
  'google_geocoders',
  'imports',
  'in_stock_subscriptions',
  'inventory_models',
  'inventory_return_locations',
  'inventory_stock_locations',
  'klarna_gateways',
  'klarna_payments',
  'line_items',
  'line_item_options',
  'links',
  'manual_gateways',
  'manual_tax_calculators',
  'markets',
  'merchants',
  'notifications',
  'orders',
  'order_amount_promotion_rules',
  'order_copies',
  'order_subscriptions',
  'order_subscription_items',
  'packages',
  'parcels',
  'parcel_line_items',
  'payment_methods',
  'payment_options',
  'paypal_gateways',
  'paypal_payments',
  'percentage_discount_promotions',
  'prices',
  'price_frequency_tiers',
  'price_lists',
  'price_list_schedulers',
  'price_volume_tiers',
  'recurring_order_copies',
  'refunds',
  'returns',
  'return_line_items',
  'satispay_gateways',
  'satispay_payments',
  'shipments',
  'shipping_categories',
  'shipping_methods',
  'shipping_weight_tiers',
  'shipping_zones',
  'skus',
  'sku_lists',
  'sku_list_items',
  'sku_list_promotion_rules',
  'sku_options',
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
  'tax_categories',
  'tax_rules',
  'taxjar_accounts',
  'vertex_accounts',
  'voids',
  'webhooks',
  'wire_transfers',
  // ##__API_RESOURCE_UPDATABLE_STOP__##
] as const

export type UpdatableResourceType = (typeof updatableResources)[number]
export type UpdatableResource = Resource & {
  type: UpdatableResourceType
}

// Deletable resources
export const deletableResources = [
  // ##__API_RESOURCE_DELETABLE_START__##
  'addresses',
  'adjustments',
  'adyen_gateways',
  'adyen_payments',
  'attachments',
  'avalara_accounts',
  'axerve_gateways',
  'axerve_payments',
  'billing_info_validation_rules',
  'bing_geocoders',
  'braintree_gateways',
  'braintree_payments',
  'bundles',
  'buy_x_pay_y_promotions',
  'carrier_accounts',
  'checkout_com_gateways',
  'checkout_com_payments',
  'cleanups',
  'coupons',
  'coupon_codes_promotion_rules',
  'coupon_recipients',
  'custom_promotion_rules',
  'customers',
  'customer_addresses',
  'customer_groups',
  'customer_password_resets',
  'customer_payment_sources',
  'customer_subscriptions',
  'delivery_lead_times',
  'easypost_pickups',
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
  'gift_cards',
  'gift_card_recipients',
  'google_geocoders',
  'imports',
  'in_stock_subscriptions',
  'inventory_models',
  'inventory_return_locations',
  'inventory_stock_locations',
  'klarna_gateways',
  'klarna_payments',
  'line_items',
  'line_item_options',
  'links',
  'manual_gateways',
  'manual_tax_calculators',
  'markets',
  'merchants',
  'notifications',
  'orders',
  'order_amount_promotion_rules',
  'order_copies',
  'order_subscriptions',
  'order_subscription_items',
  'packages',
  'parcels',
  'parcel_line_items',
  'payment_methods',
  'payment_options',
  'paypal_gateways',
  'paypal_payments',
  'percentage_discount_promotions',
  'prices',
  'price_frequency_tiers',
  'price_lists',
  'price_list_schedulers',
  'price_volume_tiers',
  'recurring_order_copies',
  'returns',
  'return_line_items',
  'satispay_gateways',
  'satispay_payments',
  'shipments',
  'shipping_categories',
  'shipping_methods',
  'shipping_weight_tiers',
  'shipping_zones',
  'skus',
  'sku_lists',
  'sku_list_items',
  'sku_list_promotion_rules',
  'sku_options',
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
  'tax_categories',
  'tax_rules',
  'taxjar_accounts',
  'vertex_accounts',
  'webhooks',
  'wire_transfers',
  // ##__API_RESOURCE_DELETABLE_STOP__##
] as const

export type DeletableResourceType = (typeof deletableResources)[number]
export type DeletableResource = Resource & {
  type: DeletableResourceType
}

// Taggable resources
export const taggableResources = [
  // ##__API_RESOURCE_TAGGABLE_START__##
  'addresses',
  'bundles',
  'buy_x_pay_y_promotions',
  'coupons',
  'customers',
  'external_promotions',
  'fixed_amount_promotions',
  'fixed_price_promotions',
  'flex_promotions',
  'free_gift_promotions',
  'free_shipping_promotions',
  'gift_cards',
  'line_items',
  'line_item_options',
  'orders',
  'order_subscriptions',
  'percentage_discount_promotions',
  'promotions',
  'returns',
  'shipments',
  'shipping_methods',
  'skus',
  'sku_options',
  // ##__API_RESOURCE_TAGGABLE_STOP__##
] as const

export type TaggableResourceType = (typeof taggableResources)[number]
export type TaggableResource = Resource & {
  type: TaggableResourceType
  tags?: Array<ResourceRel & { type: TagType }> | null
}

// Utility functions
export function getResources(sort?: boolean): readonly ResourceTypeLock[] {
  return sort ? [...resourceList].sort() : resourceList
}

export function getSingletons(sort?: boolean): readonly string[] {
  return sort ? [...singletonList].sort() : singletonList
}

export function isSingleton(resource: ResourceTypeLock): boolean {
  return (singletonList as readonly ResourceTypeLock[]).includes(resource)
}

export function isCreatable(resource: ResourceTypeLock): boolean {
  return (creatableResources as readonly ResourceTypeLock[]).includes(resource)
}

export function isUpdatable(resource: ResourceTypeLock): boolean {
  return (updatableResources as readonly ResourceTypeLock[]).includes(resource)
}

export function isDeletable(resource: ResourceTypeLock): boolean {
  return (deletableResources as readonly ResourceTypeLock[]).includes(resource)
}

export function isTaggable(resource: ResourceTypeLock): boolean {
  return (taggableResources as readonly ResourceTypeLock[]).includes(resource)
}

// Helper types
export type ResourceFields = {
  // ##__API_RESOURCE_FIELDS_START__##
  addresses: models.Address
  adjustments: models.Adjustment
  adyen_gateways: models.AdyenGateway
  adyen_payments: models.AdyenPayment
  applications: models.Application
  attachments: models.Attachment
  authorizations: models.Authorization
  avalara_accounts: models.AvalaraAccount
  axerve_gateways: models.AxerveGateway
  axerve_payments: models.AxervePayment
  billing_info_validation_rules: models.BillingInfoValidationRule
  bing_geocoders: models.BingGeocoder
  braintree_gateways: models.BraintreeGateway
  braintree_payments: models.BraintreePayment
  bundles: models.Bundle
  buy_x_pay_y_promotions: models.BuyXPayYPromotion
  captures: models.Capture
  carrier_accounts: models.CarrierAccount
  checkout_com_gateways: models.CheckoutComGateway
  checkout_com_payments: models.CheckoutComPayment
  cleanups: models.Cleanup
  coupons: models.Coupon
  coupon_codes_promotion_rules: models.CouponCodesPromotionRule
  coupon_recipients: models.CouponRecipient
  custom_promotion_rules: models.CustomPromotionRule
  customers: models.Customer
  customer_addresses: models.CustomerAddress
  customer_groups: models.CustomerGroup
  customer_password_resets: models.CustomerPasswordReset
  customer_payment_sources: models.CustomerPaymentSource
  customer_subscriptions: models.CustomerSubscription
  delivery_lead_times: models.DeliveryLeadTime
  discount_engines: models.DiscountEngine
  discount_engine_items: models.DiscountEngineItem
  easypost_pickups: models.EasypostPickup
  events: models.Event
  event_callbacks: models.EventCallback
  event_stores: models.EventStore
  exports: models.Export
  external_gateways: models.ExternalGateway
  external_payments: models.ExternalPayment
  external_promotions: models.ExternalPromotion
  external_tax_calculators: models.ExternalTaxCalculator
  fixed_amount_promotions: models.FixedAmountPromotion
  fixed_price_promotions: models.FixedPricePromotion
  flex_promotions: models.FlexPromotion
  free_gift_promotions: models.FreeGiftPromotion
  free_shipping_promotions: models.FreeShippingPromotion
  geocoders: models.Geocoder
  gift_cards: models.GiftCard
  gift_card_recipients: models.GiftCardRecipient
  google_geocoders: models.GoogleGeocoder
  imports: models.Import
  in_stock_subscriptions: models.InStockSubscription
  inventory_models: models.InventoryModel
  inventory_return_locations: models.InventoryReturnLocation
  inventory_stock_locations: models.InventoryStockLocation
  klarna_gateways: models.KlarnaGateway
  klarna_payments: models.KlarnaPayment
  line_items: models.LineItem
  line_item_options: models.LineItemOption
  links: models.Link
  manual_gateways: models.ManualGateway
  manual_tax_calculators: models.ManualTaxCalculator
  markets: models.Market
  merchants: models.Merchant
  notifications: models.Notification
  orders: models.Order
  order_amount_promotion_rules: models.OrderAmountPromotionRule
  order_copies: models.OrderCopy
  order_factories: models.OrderFactory
  order_subscriptions: models.OrderSubscription
  order_subscription_items: models.OrderSubscriptionItem
  order_validation_rules: models.OrderValidationRule
  organizations: models.Organization
  packages: models.Package
  parcels: models.Parcel
  parcel_line_items: models.ParcelLineItem
  payment_gateways: models.PaymentGateway
  payment_methods: models.PaymentMethod
  payment_options: models.PaymentOption
  paypal_gateways: models.PaypalGateway
  paypal_payments: models.PaypalPayment
  percentage_discount_promotions: models.PercentageDiscountPromotion
  pickups: models.Pickup
  prices: models.Price
  price_frequency_tiers: models.PriceFrequencyTier
  price_lists: models.PriceList
  price_list_schedulers: models.PriceListScheduler
  price_tiers: models.PriceTier
  price_volume_tiers: models.PriceVolumeTier
  promotions: models.Promotion
  promotion_rules: models.PromotionRule
  recurring_order_copies: models.RecurringOrderCopy
  refunds: models.Refund
  reserved_stocks: models.ReservedStock
  resource_errors: models.ResourceError
  returns: models.Return
  return_line_items: models.ReturnLineItem
  satispay_gateways: models.SatispayGateway
  satispay_payments: models.SatispayPayment
  shipments: models.Shipment
  shipment_line_items: models.ShipmentLineItem
  shipping_categories: models.ShippingCategory
  shipping_methods: models.ShippingMethod
  shipping_method_tiers: models.ShippingMethodTier
  shipping_weight_tiers: models.ShippingWeightTier
  shipping_zones: models.ShippingZone
  skus: models.Sku
  sku_lists: models.SkuList
  sku_list_items: models.SkuListItem
  sku_list_promotion_rules: models.SkuListPromotionRule
  sku_options: models.SkuOption
  stock_items: models.StockItem
  stock_line_items: models.StockLineItem
  stock_locations: models.StockLocation
  stock_reservations: models.StockReservation
  stock_transfers: models.StockTransfer
  stores: models.Store
  stripe_gateways: models.StripeGateway
  stripe_payments: models.StripePayment
  stripe_tax_accounts: models.StripeTaxAccount
  subscription_models: models.SubscriptionModel
  tags: models.Tag
  talon_one_accounts: models.TalonOneAccount
  tax_calculators: models.TaxCalculator
  tax_categories: models.TaxCategory
  tax_rules: models.TaxRule
  taxjar_accounts: models.TaxjarAccount
  transactions: models.Transaction
  vertex_accounts: models.VertexAccount
  voids: models.Void
  webhooks: models.Webhook
  wire_transfers: models.WireTransfer
  // ##__API_RESOURCE_FIELDS_STOP__##
}

export type ResourceSortFields = {
  // ##__API_RESOURCE_SORTABLE_FIELDS_START__##
  addresses: models.AddressSort
  adjustments: models.AdjustmentSort
  adyen_gateways: models.AdyenGatewaySort
  adyen_payments: models.AdyenPaymentSort
  applications: models.ApplicationSort
  attachments: models.AttachmentSort
  authorizations: models.AuthorizationSort
  avalara_accounts: models.AvalaraAccountSort
  axerve_gateways: models.AxerveGatewaySort
  axerve_payments: models.AxervePaymentSort
  billing_info_validation_rules: models.BillingInfoValidationRuleSort
  bing_geocoders: models.BingGeocoderSort
  braintree_gateways: models.BraintreeGatewaySort
  braintree_payments: models.BraintreePaymentSort
  bundles: models.BundleSort
  buy_x_pay_y_promotions: models.BuyXPayYPromotionSort
  captures: models.CaptureSort
  carrier_accounts: models.CarrierAccountSort
  checkout_com_gateways: models.CheckoutComGatewaySort
  checkout_com_payments: models.CheckoutComPaymentSort
  cleanups: models.CleanupSort
  coupons: models.CouponSort
  coupon_codes_promotion_rules: models.CouponCodesPromotionRuleSort
  coupon_recipients: models.CouponRecipientSort
  custom_promotion_rules: models.CustomPromotionRuleSort
  customers: models.CustomerSort
  customer_addresses: models.CustomerAddressSort
  customer_groups: models.CustomerGroupSort
  customer_password_resets: models.CustomerPasswordResetSort
  customer_payment_sources: models.CustomerPaymentSourceSort
  customer_subscriptions: models.CustomerSubscriptionSort
  delivery_lead_times: models.DeliveryLeadTimeSort
  discount_engines: models.DiscountEngineSort
  discount_engine_items: models.DiscountEngineItemSort
  easypost_pickups: models.EasypostPickupSort
  events: models.EventSort
  event_callbacks: models.EventCallbackSort
  event_stores: models.EventStoreSort
  exports: models.ExportSort
  external_gateways: models.ExternalGatewaySort
  external_payments: models.ExternalPaymentSort
  external_promotions: models.ExternalPromotionSort
  external_tax_calculators: models.ExternalTaxCalculatorSort
  fixed_amount_promotions: models.FixedAmountPromotionSort
  fixed_price_promotions: models.FixedPricePromotionSort
  flex_promotions: models.FlexPromotionSort
  free_gift_promotions: models.FreeGiftPromotionSort
  free_shipping_promotions: models.FreeShippingPromotionSort
  geocoders: models.GeocoderSort
  gift_cards: models.GiftCardSort
  gift_card_recipients: models.GiftCardRecipientSort
  google_geocoders: models.GoogleGeocoderSort
  imports: models.ImportSort
  in_stock_subscriptions: models.InStockSubscriptionSort
  inventory_models: models.InventoryModelSort
  inventory_return_locations: models.InventoryReturnLocationSort
  inventory_stock_locations: models.InventoryStockLocationSort
  klarna_gateways: models.KlarnaGatewaySort
  klarna_payments: models.KlarnaPaymentSort
  line_items: models.LineItemSort
  line_item_options: models.LineItemOptionSort
  links: models.LinkSort
  manual_gateways: models.ManualGatewaySort
  manual_tax_calculators: models.ManualTaxCalculatorSort
  markets: models.MarketSort
  merchants: models.MerchantSort
  notifications: models.NotificationSort
  orders: models.OrderSort
  order_amount_promotion_rules: models.OrderAmountPromotionRuleSort
  order_copies: models.OrderCopySort
  order_factories: models.OrderFactorySort
  order_subscriptions: models.OrderSubscriptionSort
  order_subscription_items: models.OrderSubscriptionItemSort
  order_validation_rules: models.OrderValidationRuleSort
  organizations: models.OrganizationSort
  packages: models.PackageSort
  parcels: models.ParcelSort
  parcel_line_items: models.ParcelLineItemSort
  payment_gateways: models.PaymentGatewaySort
  payment_methods: models.PaymentMethodSort
  payment_options: models.PaymentOptionSort
  paypal_gateways: models.PaypalGatewaySort
  paypal_payments: models.PaypalPaymentSort
  percentage_discount_promotions: models.PercentageDiscountPromotionSort
  pickups: models.PickupSort
  prices: models.PriceSort
  price_frequency_tiers: models.PriceFrequencyTierSort
  price_lists: models.PriceListSort
  price_list_schedulers: models.PriceListSchedulerSort
  price_tiers: models.PriceTierSort
  price_volume_tiers: models.PriceVolumeTierSort
  promotions: models.PromotionSort
  promotion_rules: models.PromotionRuleSort
  recurring_order_copies: models.RecurringOrderCopySort
  refunds: models.RefundSort
  reserved_stocks: models.ReservedStockSort
  resource_errors: models.ResourceErrorSort
  returns: models.ReturnSort
  return_line_items: models.ReturnLineItemSort
  satispay_gateways: models.SatispayGatewaySort
  satispay_payments: models.SatispayPaymentSort
  shipments: models.ShipmentSort
  shipment_line_items: models.ShipmentLineItemSort
  shipping_categories: models.ShippingCategorySort
  shipping_methods: models.ShippingMethodSort
  shipping_method_tiers: models.ShippingMethodTierSort
  shipping_weight_tiers: models.ShippingWeightTierSort
  shipping_zones: models.ShippingZoneSort
  skus: models.SkuSort
  sku_lists: models.SkuListSort
  sku_list_items: models.SkuListItemSort
  sku_list_promotion_rules: models.SkuListPromotionRuleSort
  sku_options: models.SkuOptionSort
  stock_items: models.StockItemSort
  stock_line_items: models.StockLineItemSort
  stock_locations: models.StockLocationSort
  stock_reservations: models.StockReservationSort
  stock_transfers: models.StockTransferSort
  stores: models.StoreSort
  stripe_gateways: models.StripeGatewaySort
  stripe_payments: models.StripePaymentSort
  stripe_tax_accounts: models.StripeTaxAccountSort
  subscription_models: models.SubscriptionModelSort
  tags: models.TagSort
  talon_one_accounts: models.TalonOneAccountSort
  tax_calculators: models.TaxCalculatorSort
  tax_categories: models.TaxCategorySort
  tax_rules: models.TaxRuleSort
  taxjar_accounts: models.TaxjarAccountSort
  transactions: models.TransactionSort
  vertex_accounts: models.VertexAccountSort
  voids: models.VoidSort
  webhooks: models.WebhookSort
  wire_transfers: models.WireTransferSort
  // ##__API_RESOURCE_SORTABLE_FIELDS_STOP__##
}
