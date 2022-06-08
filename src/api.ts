
// ##__API_RESOURCES_START__##
// ##__API_RESOURCES_TEMPLATE:: export { default as ##__RESOURCE_CLASS__## } from './resources/##__RESOURCE_TYPE__##'
/**
 * ©2022 Commerce Layer Inc.
 * OpenAPI schema, version 2.9.4
 **/
export { default as Addresses } from './resources/addresses'
export { default as Adjustments } from './resources/adjustments'
export { default as AdyenGateways } from './resources/adyen_gateways'
export { default as AdyenPayments } from './resources/adyen_payments'
export { default as Applications } from './resources/application'
export { default as Attachments } from './resources/attachments'
export { default as Authorizations } from './resources/authorizations'
export { default as AvalaraAccounts } from './resources/avalara_accounts'
export { default as BillingInfoValidationRules } from './resources/billing_info_validation_rules'
export { default as BingGeocoders } from './resources/bing_geocoders'
export { default as BraintreeGateways } from './resources/braintree_gateways'
export { default as BraintreePayments } from './resources/braintree_payments'
export { default as Bundles } from './resources/bundles'
export { default as Captures } from './resources/captures'
export { default as CarrierAccounts } from './resources/carrier_accounts'
export { default as CheckoutComGateways } from './resources/checkout_com_gateways'
export { default as CheckoutComPayments } from './resources/checkout_com_payments'
export { default as CouponCodesPromotionRules } from './resources/coupon_codes_promotion_rules'
export { default as CouponRecipients } from './resources/coupon_recipients'
export { default as Coupons } from './resources/coupons'
export { default as CustomerAddresses } from './resources/customer_addresses'
export { default as CustomerGroups } from './resources/customer_groups'
export { default as CustomerPasswordResets } from './resources/customer_password_resets'
export { default as CustomerPaymentSources } from './resources/customer_payment_sources'
export { default as CustomerSubscriptions } from './resources/customer_subscriptions'
export { default as Customers } from './resources/customers'
export { default as DeliveryLeadTimes } from './resources/delivery_lead_times'
export { default as EventCallbacks } from './resources/event_callbacks'
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
export { default as OrderSubscriptions } from './resources/order_subscriptions'
export { default as OrderValidationRules } from './resources/order_validation_rules'
export { default as Orders } from './resources/orders'
export { default as Organizations } from './resources/organization'
export { default as Packages } from './resources/packages'
export { default as ParcelLineItems } from './resources/parcel_line_items'
export { default as Parcels } from './resources/parcels'
export { default as PaymentGateways } from './resources/payment_gateways'
export { default as PaymentMethods } from './resources/payment_methods'
export { default as PaypalGateways } from './resources/paypal_gateways'
export { default as PaypalPayments } from './resources/paypal_payments'
export { default as PercentageDiscountPromotions } from './resources/percentage_discount_promotions'
export { default as PriceLists } from './resources/price_lists'
export { default as Prices } from './resources/prices'
export { default as PromotionRules } from './resources/promotion_rules'
export { default as Promotions } from './resources/promotions'
export { default as Refunds } from './resources/refunds'
export { default as ReturnLineItems } from './resources/return_line_items'
export { default as Returns } from './resources/returns'
export { default as Shipments } from './resources/shipments'
export { default as ShippingCategories } from './resources/shipping_categories'
export { default as ShippingMethods } from './resources/shipping_methods'
export { default as ShippingZones } from './resources/shipping_zones'
export { default as SkuListItems } from './resources/sku_list_items'
export { default as SkuListPromotionRules } from './resources/sku_list_promotion_rules'
export { default as SkuLists } from './resources/sku_lists'
export { default as SkuOptions } from './resources/sku_options'
export { default as Skus } from './resources/skus'
export { default as StockItems } from './resources/stock_items'
export { default as StockLineItems } from './resources/stock_line_items'
export { default as StockLocations } from './resources/stock_locations'
export { default as StockTransfers } from './resources/stock_transfers'
export { default as StripeGateways } from './resources/stripe_gateways'
export { default as StripePayments } from './resources/stripe_payments'
export { default as TaxCalculators } from './resources/tax_calculators'
export { default as TaxCategories } from './resources/tax_categories'
export { default as TaxRules } from './resources/tax_rules'
export { default as TaxjarAccounts } from './resources/taxjar_accounts'
export { default as Transactions } from './resources/transactions'
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
|	'billing_info_validation_rules'
|	'bing_geocoders'
|	'braintree_gateways'
|	'braintree_payments'
|	'bundles'
|	'captures'
|	'carrier_accounts'
|	'checkout_com_gateways'
|	'checkout_com_payments'
|	'coupon_codes_promotion_rules'
|	'coupon_recipients'
|	'coupons'
|	'customer_addresses'
|	'customer_groups'
|	'customer_password_resets'
|	'customer_payment_sources'
|	'customer_subscriptions'
|	'customers'
|	'delivery_lead_times'
|	'event_callbacks'
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
|	'order_subscriptions'
|	'order_validation_rules'
|	'orders'
|	'organization'
|	'packages'
|	'parcel_line_items'
|	'parcels'
|	'payment_gateways'
|	'payment_methods'
|	'paypal_gateways'
|	'paypal_payments'
|	'percentage_discount_promotions'
|	'price_lists'
|	'prices'
|	'promotion_rules'
|	'promotions'
|	'refunds'
|	'return_line_items'
|	'returns'
|	'shipments'
|	'shipping_categories'
|	'shipping_methods'
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
	'billing_info_validation_rules',
	'bing_geocoders',
	'braintree_gateways',
	'braintree_payments',
	'bundles',
	'captures',
	'carrier_accounts',
	'checkout_com_gateways',
	'checkout_com_payments',
	'coupon_codes_promotion_rules',
	'coupon_recipients',
	'coupons',
	'customer_addresses',
	'customer_groups',
	'customer_password_resets',
	'customer_payment_sources',
	'customer_subscriptions',
	'customers',
	'delivery_lead_times',
	'event_callbacks',
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
	'order_subscriptions',
	'order_validation_rules',
	'orders',
	'organization',
	'packages',
	'parcel_line_items',
	'parcels',
	'payment_gateways',
	'payment_methods',
	'paypal_gateways',
	'paypal_payments',
	'percentage_discount_promotions',
	'price_lists',
	'prices',
	'promotion_rules',
	'promotions',
	'refunds',
	'return_line_items',
	'returns',
	'shipments',
	'shipping_categories',
	'shipping_methods',
	'shipping_zones',
	'sku_list_items',
	'sku_list_promotion_rules',
	'sku_lists',
	'sku_options',
	'skus',
	'stock_items',
	'stock_line_items',
	'stock_locations',
	'stock_transfers',
	'stripe_gateways',
	'stripe_payments',
	'tax_calculators',
	'tax_categories',
	'tax_rules',
	'taxjar_accounts',
	'transactions',
	'voids',
	'webhooks',
	'wire_transfers'
// ##__API_RESOURCE_LIST_STOP__##
] as const


/*
type ResourceInfo = {
	name: string;
	type: string;
	api: string;
}


export const resourceMap: { [res: string]: ResourceInfo } = {
	// ##__API_RESOURCE_MAP_START__##
	addresses: { name: 'address', type: 'addresses', api: 'addresses' },
	adjustments: { name: 'adjustment', type: 'adjustments', api: 'adjustments' },
	adyen_gateways: { name: 'adyen_gateway', type: 'adyen_gateways', api: 'adyen_gateways' },
	adyen_payments: { name: 'adyen_payment', type: 'adyen_payments', api: 'adyen_payments' },
	application: { name: 'application', type: 'application', api: 'application' },
	attachments: { name: 'attachment', type: 'attachments', api: 'attachments' },
	authorizations: { name: 'authorization', type: 'authorizations', api: 'authorizations' },
	avalara_accounts: { name: 'avalara_account', type: 'avalara_accounts', api: 'avalara_accounts' },
	billing_info_validation_rules: { name: 'billing_info_validation_rule', type: 'billing_info_validation_rules', api: 'billing_info_validation_rules' },
	bing_geocoders: { name: 'bing_geocoder', type: 'bing_geocoders', api: 'bing_geocoders' },
	braintree_gateways: { name: 'braintree_gateway', type: 'braintree_gateways', api: 'braintree_gateways' },
	braintree_payments: { name: 'braintree_payment', type: 'braintree_payments', api: 'braintree_payments' },
	bundles: { name: 'bundle', type: 'bundles', api: 'bundles' },
	captures: { name: 'capture', type: 'captures', api: 'captures' },
	carrier_accounts: { name: 'carrier_account', type: 'carrier_accounts', api: 'carrier_accounts' },
	checkout_com_gateways: { name: 'checkout_com_gateway', type: 'checkout_com_gateways', api: 'checkout_com_gateways' },
	checkout_com_payments: { name: 'checkout_com_payment', type: 'checkout_com_payments', api: 'checkout_com_payments' },
	coupon_codes_promotion_rules: { name: 'coupon_codes_promotion_rule', type: 'coupon_codes_promotion_rules', api: 'coupon_codes_promotion_rules' },
	coupons: { name: 'coupon', type: 'coupons', api: 'coupons' },
	customer_addresses: { name: 'customer_address', type: 'customer_addresses', api: 'customer_addresses' },
	customer_groups: { name: 'customer_group', type: 'customer_groups', api: 'customer_groups' },
	customer_password_resets: { name: 'customer_password_reset', type: 'customer_password_resets', api: 'customer_password_resets' },
	customer_payment_sources: { name: 'customer_payment_source', type: 'customer_payment_sources', api: 'customer_payment_sources' },
	customer_subscriptions: { name: 'customer_subscription', type: 'customer_subscriptions', api: 'customer_subscriptions' },
	customers: { name: 'customer', type: 'customers', api: 'customers' },
	delivery_lead_times: { name: 'delivery_lead_time', type: 'delivery_lead_times', api: 'delivery_lead_times' },
	external_gateways: { name: 'external_gateway', type: 'external_gateways', api: 'external_gateways' },
	external_payments: { name: 'external_payment', type: 'external_payments', api: 'external_payments' },
	external_promotions: { name: 'external_promotion', type: 'external_promotions', api: 'external_promotions' },
	external_tax_calculators: { name: 'external_tax_calculator', type: 'external_tax_calculators', api: 'external_tax_calculators' },
	fixed_amount_promotions: { name: 'fixed_amount_promotion', type: 'fixed_amount_promotions', api: 'fixed_amount_promotions' },
	free_shipping_promotions: { name: 'free_shipping_promotion', type: 'free_shipping_promotions', api: 'free_shipping_promotions' },
	geocoders: { name: 'geocoder', type: 'geocoders', api: 'geocoders' },
	gift_card_recipients: { name: 'gift_card_recipient', type: 'gift_card_recipients', api: 'gift_card_recipients' },
	gift_cards: { name: 'gift_card', type: 'gift_cards', api: 'gift_cards' },
	google_geocoders: { name: 'google_geocoder', type: 'google_geocoders', api: 'google_geocoders' },
	imports: { name: 'import', type: 'imports', api: 'imports' },
	in_stock_subscriptions: { name: 'in_stock_subscription', type: 'in_stock_subscriptions', api: 'in_stock_subscriptions' },
	inventory_models: { name: 'inventory_model', type: 'inventory_models', api: 'inventory_models' },
	inventory_return_locations: { name: 'inventory_return_location', type: 'inventory_return_locations', api: 'inventory_return_locations' },
	inventory_stock_locations: { name: 'inventory_stock_location', type: 'inventory_stock_locations', api: 'inventory_stock_locations' },
	line_item_options: { name: 'line_item_option', type: 'line_item_options', api: 'line_item_options' },
	line_items: { name: 'line_item', type: 'line_items', api: 'line_items' },
	manual_gateways: { name: 'manual_gateway', type: 'manual_gateways', api: 'manual_gateways' },
	manual_tax_calculators: { name: 'manual_tax_calculator', type: 'manual_tax_calculators', api: 'manual_tax_calculators' },
	markets: { name: 'market', type: 'markets', api: 'markets' },
	merchants: { name: 'merchant', type: 'merchants', api: 'merchants' },
	order_amount_promotion_rules: { name: 'order_amount_promotion_rule', type: 'order_amount_promotion_rules', api: 'order_amount_promotion_rules' },
	order_copies: { name: 'order_copy', type: 'order_copies', api: 'order_copies' },
	order_subscriptions: { name: 'order_subscription', type: 'order_subscriptions', api: 'order_subscriptions' },
	orders: { name: 'order', type: 'orders', api: 'orders' },
	organization: { name: 'organization', type: 'organization', api: 'organization' },
	packages: { name: 'package', type: 'packages', api: 'packages' },
	parcel_line_items: { name: 'parcel_line_item', type: 'parcel_line_items', api: 'parcel_line_items' },
	parcels: { name: 'parcel', type: 'parcels', api: 'parcels' },
	payment_gateways: { name: 'payment_gateway', type: 'payment_gateways', api: 'payment_gateways' },
	payment_methods: { name: 'payment_method', type: 'payment_methods', api: 'payment_methods' },
	paypal_gateways: { name: 'paypal_gateway', type: 'paypal_gateways', api: 'paypal_gateways' },
	paypal_payments: { name: 'paypal_payment', type: 'paypal_payments', api: 'paypal_payments' },
	percentage_discount_promotions: { name: 'percentage_discount_promotion', type: 'percentage_discount_promotions', api: 'percentage_discount_promotions' },
	price_lists: { name: 'price_list', type: 'price_lists', api: 'price_lists' },
	prices: { name: 'price', type: 'prices', api: 'prices' },
	promotion_rules: { name: 'promotion_rule', type: 'promotion_rules', api: 'promotion_rules' },
	promotions: { name: 'promotion', type: 'promotions', api: 'promotions' },
	refunds: { name: 'refund', type: 'refunds', api: 'refunds' },
	return_line_items: { name: 'return_line_item', type: 'return_line_items', api: 'return_line_items' },
	returns: { name: 'return', type: 'returns', api: 'returns' },
	shipments: { name: 'shipment', type: 'shipments', api: 'shipments' },
	shipping_categories: { name: 'shipping_category', type: 'shipping_categories', api: 'shipping_categories' },
	shipping_methods: { name: 'shipping_method', type: 'shipping_methods', api: 'shipping_methods' },
	shipping_zones: { name: 'shipping_zone', type: 'shipping_zones', api: 'shipping_zones' },
	sku_list_items: { name: 'sku_list_item', type: 'sku_list_items', api: 'sku_list_items' },
	sku_list_promotion_rules: { name: 'sku_list_promotion_rule', type: 'sku_list_promotion_rules', api: 'sku_list_promotion_rules' },
	sku_lists: { name: 'sku_list', type: 'sku_lists', api: 'sku_lists' },
	sku_options: { name: 'sku_option', type: 'sku_options', api: 'sku_options' },
	skus: { name: 'sku', type: 'skus', api: 'skus' },
	stock_items: { name: 'stock_item', type: 'stock_items', api: 'stock_items' },
	stock_line_items: { name: 'stock_line_item', type: 'stock_line_items', api: 'stock_line_items' },
	stock_locations: { name: 'stock_location', type: 'stock_locations', api: 'stock_locations' },
	stock_transfers: { name: 'stock_transfer', type: 'stock_transfers', api: 'stock_transfers' },
	stripe_gateways: { name: 'stripe_gateway', type: 'stripe_gateways', api: 'stripe_gateways' },
	stripe_payments: { name: 'stripe_payment', type: 'stripe_payments', api: 'stripe_payments' },
	tax_calculators: { name: 'tax_calculator', type: 'tax_calculators', api: 'tax_calculators' },
	tax_categories: { name: 'tax_category', type: 'tax_categories', api: 'tax_categories' },
	tax_rules: { name: 'tax_rule', type: 'tax_rules', api: 'tax_rules' },
	taxjar_accounts: { name: 'taxjar_account', type: 'taxjar_accounts', api: 'taxjar_accounts' },
	transactions: { name: 'transaction', type: 'transactions', api: 'transactions' },
	voids: { name: 'void', type: 'voids', api: 'voids' },
	webhooks: { name: 'webhook', type: 'webhooks', api: 'webhooks' },
	wire_transfers: { name: 'wire_transfer', type: 'wire_transfers', api: 'wire_transfers' }
	// ##__API_RESOURCE_MAP_STOP__##
} as const
*/