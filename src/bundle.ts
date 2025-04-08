import { CommerceLayerClient, CommerceLayerInitConfig } from './commercelayer'
import * as api from './api'
import { ApiResourceAdapter, type ResourceAdapter } from './resource'


class CommerceLayerBundle extends CommerceLayerClient {

  // ##__CL_RESOURCES_DEF_START__##
	// ##__CL_RESOURCES_DEF_TEMPLATE:: ##__TAB__#####__RESOURCE_TYPE__##?: api.##__RESOURCE_CLASS__##
	#addresses?: api.Addresses
	#adjustments?: api.Adjustments
	#adyen_gateways?: api.AdyenGateways
	#adyen_payments?: api.AdyenPayments
	#application?: api.Applications
	#attachments?: api.Attachments
	#authorizations?: api.Authorizations
	#avalara_accounts?: api.AvalaraAccounts
	#axerve_gateways?: api.AxerveGateways
	#axerve_payments?: api.AxervePayments
	#bing_geocoders?: api.BingGeocoders
	#braintree_gateways?: api.BraintreeGateways
	#braintree_payments?: api.BraintreePayments
	#bundles?: api.Bundles
	#buy_x_pay_y_promotions?: api.BuyXPayYPromotions
	#captures?: api.Captures
	#carrier_accounts?: api.CarrierAccounts
	#checkout_com_gateways?: api.CheckoutComGateways
	#checkout_com_payments?: api.CheckoutComPayments
	#cleanups?: api.Cleanups
	#coupon_codes_promotion_rules?: api.CouponCodesPromotionRules
	#coupon_recipients?: api.CouponRecipients
	#coupons?: api.Coupons
	#custom_promotion_rules?: api.CustomPromotionRules
	#customer_addresses?: api.CustomerAddresses
	#customer_groups?: api.CustomerGroups
	#customer_password_resets?: api.CustomerPasswordResets
	#customer_payment_sources?: api.CustomerPaymentSources
	#customer_subscriptions?: api.CustomerSubscriptions
	#customers?: api.Customers
	#delivery_lead_times?: api.DeliveryLeadTimes
	#discount_engine_items?: api.DiscountEngineItems
	#discount_engines?: api.DiscountEngines
	#easypost_pickups?: api.EasypostPickups
	#event_callbacks?: api.EventCallbacks
	#events?: api.Events
	#exports?: api.Exports
	#external_gateways?: api.ExternalGateways
	#external_payments?: api.ExternalPayments
	#external_promotions?: api.ExternalPromotions
	#external_tax_calculators?: api.ExternalTaxCalculators
	#fixed_amount_promotions?: api.FixedAmountPromotions
	#fixed_price_promotions?: api.FixedPricePromotions
	#flex_promotions?: api.FlexPromotions
	#free_gift_promotions?: api.FreeGiftPromotions
	#free_shipping_promotions?: api.FreeShippingPromotions
	#geocoders?: api.Geocoders
	#gift_card_recipients?: api.GiftCardRecipients
	#gift_cards?: api.GiftCards
	#google_geocoders?: api.GoogleGeocoders
	#imports?: api.Imports
	#in_stock_subscriptions?: api.InStockSubscriptions
	#inventory_models?: api.InventoryModels
	#inventory_return_locations?: api.InventoryReturnLocations
	#inventory_stock_locations?: api.InventoryStockLocations
	#klarna_gateways?: api.KlarnaGateways
	#klarna_payments?: api.KlarnaPayments
	#line_item_options?: api.LineItemOptions
	#line_items?: api.LineItems
	#links?: api.Links
	#manual_gateways?: api.ManualGateways
	#manual_tax_calculators?: api.ManualTaxCalculators
	#markets?: api.Markets
	#merchants?: api.Merchants
	#notifications?: api.Notifications
	#order_amount_promotion_rules?: api.OrderAmountPromotionRules
	#order_copies?: api.OrderCopies
	#order_factories?: api.OrderFactories
	#order_subscription_items?: api.OrderSubscriptionItems
	#order_subscriptions?: api.OrderSubscriptions
	#orders?: api.Orders
	#organization?: api.Organizations
	#packages?: api.Packages
	#parcel_line_items?: api.ParcelLineItems
	#parcels?: api.Parcels
	#payment_gateways?: api.PaymentGateways
	#payment_methods?: api.PaymentMethods
	#payment_options?: api.PaymentOptions
	#paypal_gateways?: api.PaypalGateways
	#paypal_payments?: api.PaypalPayments
	#percentage_discount_promotions?: api.PercentageDiscountPromotions
	#pickups?: api.Pickups
	#price_frequency_tiers?: api.PriceFrequencyTiers
	#price_list_schedulers?: api.PriceListSchedulers
	#price_lists?: api.PriceLists
	#price_tiers?: api.PriceTiers
	#price_volume_tiers?: api.PriceVolumeTiers
	#prices?: api.Prices
	#promotion_rules?: api.PromotionRules
	#promotions?: api.Promotions
	#recurring_order_copies?: api.RecurringOrderCopies
	#refunds?: api.Refunds
	#reserved_stocks?: api.ReservedStocks
	#resource_errors?: api.ResourceErrors
	#return_line_items?: api.ReturnLineItems
	#returns?: api.Returns
	#satispay_gateways?: api.SatispayGateways
	#satispay_payments?: api.SatispayPayments
	#shipments?: api.Shipments
	#shipping_categories?: api.ShippingCategories
	#shipping_method_tiers?: api.ShippingMethodTiers
	#shipping_methods?: api.ShippingMethods
	#shipping_weight_tiers?: api.ShippingWeightTiers
	#shipping_zones?: api.ShippingZones
	#sku_list_items?: api.SkuListItems
	#sku_list_promotion_rules?: api.SkuListPromotionRules
	#sku_lists?: api.SkuLists
	#sku_options?: api.SkuOptions
	#skus?: api.Skus
	#stock_items?: api.StockItems
	#stock_line_items?: api.StockLineItems
	#stock_locations?: api.StockLocations
	#stock_reservations?: api.StockReservations
	#stock_transfers?: api.StockTransfers
	#stores?: api.Stores
	#stripe_gateways?: api.StripeGateways
	#stripe_payments?: api.StripePayments
	#stripe_tax_accounts?: api.StripeTaxAccounts
	#subscription_models?: api.SubscriptionModels
	#tags?: api.Tags
	#talon_one_accounts?: api.TalonOneAccounts
	#tax_calculators?: api.TaxCalculators
	#tax_categories?: api.TaxCategories
	#tax_rules?: api.TaxRules
	#taxjar_accounts?: api.TaxjarAccounts
	#transactions?: api.Transactions
	#versions?: api.Versions
	#vertex_accounts?: api.VertexAccounts
	#voids?: api.Voids
	#webhooks?: api.Webhooks
	#wire_transfers?: api.WireTransfers
	// ##__CL_RESOURCES_DEF_STOP__##

  public constructor(config: CommerceLayerInitConfig) {

		super(config)

		// ##__CL_RESOURCES_INIT_START__##
		// ##__CL_RESOURCES_INIT_TEMPLATE:: ##__TAB__####__TAB__##this.##__RESOURCE_TYPE__## = new api.##__RESOURCE_CLASS__##(this.#adapter)
		// ##__CL_RESOURCES_INIT_STOP__##

	}

	// private get adapter(): ResourceAdapter { return ApiResourceAdapter.get() }

  // ##__CL_RESOURCES_LEAZY_LOADING_START__##
	// ##__CL_RESOURCES_LEAZY_LOADING_TEMPLATE:: ##__TAB__##get ##__RESOURCE_TYPE__##(): api.##__RESOURCE_CLASS__## { return this.###__RESOURCE_TYPE__## || (this.###__RESOURCE_TYPE__## = api.##__RESOURCE_TYPE__##) }
	get addresses(): api.Addresses { return this.#addresses || (this.#addresses = api.addresses) }
	get adjustments(): api.Adjustments { return this.#adjustments || (this.#adjustments = api.adjustments) }
	get adyen_gateways(): api.AdyenGateways { return this.#adyen_gateways || (this.#adyen_gateways = api.adyen_gateways) }
	get adyen_payments(): api.AdyenPayments { return this.#adyen_payments || (this.#adyen_payments = api.adyen_payments) }
	get application(): api.Applications { return this.#application || (this.#application = api.application) }
	get attachments(): api.Attachments { return this.#attachments || (this.#attachments = api.attachments) }
	get authorizations(): api.Authorizations { return this.#authorizations || (this.#authorizations = api.authorizations) }
	get avalara_accounts(): api.AvalaraAccounts { return this.#avalara_accounts || (this.#avalara_accounts = api.avalara_accounts) }
	get axerve_gateways(): api.AxerveGateways { return this.#axerve_gateways || (this.#axerve_gateways = api.axerve_gateways) }
	get axerve_payments(): api.AxervePayments { return this.#axerve_payments || (this.#axerve_payments = api.axerve_payments) }
	get bing_geocoders(): api.BingGeocoders { return this.#bing_geocoders || (this.#bing_geocoders = api.bing_geocoders) }
	get braintree_gateways(): api.BraintreeGateways { return this.#braintree_gateways || (this.#braintree_gateways = api.braintree_gateways) }
	get braintree_payments(): api.BraintreePayments { return this.#braintree_payments || (this.#braintree_payments = api.braintree_payments) }
	get bundles(): api.Bundles { return this.#bundles || (this.#bundles = api.bundles) }
	get buy_x_pay_y_promotions(): api.BuyXPayYPromotions { return this.#buy_x_pay_y_promotions || (this.#buy_x_pay_y_promotions = api.buy_x_pay_y_promotions) }
	get captures(): api.Captures { return this.#captures || (this.#captures = api.captures) }
	get carrier_accounts(): api.CarrierAccounts { return this.#carrier_accounts || (this.#carrier_accounts = api.carrier_accounts) }
	get checkout_com_gateways(): api.CheckoutComGateways { return this.#checkout_com_gateways || (this.#checkout_com_gateways = api.checkout_com_gateways) }
	get checkout_com_payments(): api.CheckoutComPayments { return this.#checkout_com_payments || (this.#checkout_com_payments = api.checkout_com_payments) }
	get cleanups(): api.Cleanups { return this.#cleanups || (this.#cleanups = api.cleanups) }
	get coupon_codes_promotion_rules(): api.CouponCodesPromotionRules { return this.#coupon_codes_promotion_rules || (this.#coupon_codes_promotion_rules = api.coupon_codes_promotion_rules) }
	get coupon_recipients(): api.CouponRecipients { return this.#coupon_recipients || (this.#coupon_recipients = api.coupon_recipients) }
	get coupons(): api.Coupons { return this.#coupons || (this.#coupons = api.coupons) }
	get custom_promotion_rules(): api.CustomPromotionRules { return this.#custom_promotion_rules || (this.#custom_promotion_rules = api.custom_promotion_rules) }
	get customer_addresses(): api.CustomerAddresses { return this.#customer_addresses || (this.#customer_addresses = api.customer_addresses) }
	get customer_groups(): api.CustomerGroups { return this.#customer_groups || (this.#customer_groups = api.customer_groups) }
	get customer_password_resets(): api.CustomerPasswordResets { return this.#customer_password_resets || (this.#customer_password_resets = api.customer_password_resets) }
	get customer_payment_sources(): api.CustomerPaymentSources { return this.#customer_payment_sources || (this.#customer_payment_sources = api.customer_payment_sources) }
	get customer_subscriptions(): api.CustomerSubscriptions { return this.#customer_subscriptions || (this.#customer_subscriptions = api.customer_subscriptions) }
	get customers(): api.Customers { return this.#customers || (this.#customers = api.customers) }
	get delivery_lead_times(): api.DeliveryLeadTimes { return this.#delivery_lead_times || (this.#delivery_lead_times = api.delivery_lead_times) }
	get discount_engine_items(): api.DiscountEngineItems { return this.#discount_engine_items || (this.#discount_engine_items = api.discount_engine_items) }
	get discount_engines(): api.DiscountEngines { return this.#discount_engines || (this.#discount_engines = api.discount_engines) }
	get easypost_pickups(): api.EasypostPickups { return this.#easypost_pickups || (this.#easypost_pickups = api.easypost_pickups) }
	get event_callbacks(): api.EventCallbacks { return this.#event_callbacks || (this.#event_callbacks = api.event_callbacks) }
	get events(): api.Events { return this.#events || (this.#events = api.events) }
	get exports(): api.Exports { return this.#exports || (this.#exports = api.exports) }
	get external_gateways(): api.ExternalGateways { return this.#external_gateways || (this.#external_gateways = api.external_gateways) }
	get external_payments(): api.ExternalPayments { return this.#external_payments || (this.#external_payments = api.external_payments) }
	get external_promotions(): api.ExternalPromotions { return this.#external_promotions || (this.#external_promotions = api.external_promotions) }
	get external_tax_calculators(): api.ExternalTaxCalculators { return this.#external_tax_calculators || (this.#external_tax_calculators = api.external_tax_calculators) }
	get fixed_amount_promotions(): api.FixedAmountPromotions { return this.#fixed_amount_promotions || (this.#fixed_amount_promotions = api.fixed_amount_promotions) }
	get fixed_price_promotions(): api.FixedPricePromotions { return this.#fixed_price_promotions || (this.#fixed_price_promotions = api.fixed_price_promotions) }
	get flex_promotions(): api.FlexPromotions { return this.#flex_promotions || (this.#flex_promotions = api.flex_promotions) }
	get free_gift_promotions(): api.FreeGiftPromotions { return this.#free_gift_promotions || (this.#free_gift_promotions = api.free_gift_promotions) }
	get free_shipping_promotions(): api.FreeShippingPromotions { return this.#free_shipping_promotions || (this.#free_shipping_promotions = api.free_shipping_promotions) }
	get geocoders(): api.Geocoders { return this.#geocoders || (this.#geocoders = api.geocoders) }
	get gift_card_recipients(): api.GiftCardRecipients { return this.#gift_card_recipients || (this.#gift_card_recipients = api.gift_card_recipients) }
	get gift_cards(): api.GiftCards { return this.#gift_cards || (this.#gift_cards = api.gift_cards) }
	get google_geocoders(): api.GoogleGeocoders { return this.#google_geocoders || (this.#google_geocoders = api.google_geocoders) }
	get imports(): api.Imports { return this.#imports || (this.#imports = api.imports) }
	get in_stock_subscriptions(): api.InStockSubscriptions { return this.#in_stock_subscriptions || (this.#in_stock_subscriptions = api.in_stock_subscriptions) }
	get inventory_models(): api.InventoryModels { return this.#inventory_models || (this.#inventory_models = api.inventory_models) }
	get inventory_return_locations(): api.InventoryReturnLocations { return this.#inventory_return_locations || (this.#inventory_return_locations = api.inventory_return_locations) }
	get inventory_stock_locations(): api.InventoryStockLocations { return this.#inventory_stock_locations || (this.#inventory_stock_locations = api.inventory_stock_locations) }
	get klarna_gateways(): api.KlarnaGateways { return this.#klarna_gateways || (this.#klarna_gateways = api.klarna_gateways) }
	get klarna_payments(): api.KlarnaPayments { return this.#klarna_payments || (this.#klarna_payments = api.klarna_payments) }
	get line_item_options(): api.LineItemOptions { return this.#line_item_options || (this.#line_item_options = api.line_item_options) }
	get line_items(): api.LineItems { return this.#line_items || (this.#line_items = api.line_items) }
	get links(): api.Links { return this.#links || (this.#links = api.links) }
	get manual_gateways(): api.ManualGateways { return this.#manual_gateways || (this.#manual_gateways = api.manual_gateways) }
	get manual_tax_calculators(): api.ManualTaxCalculators { return this.#manual_tax_calculators || (this.#manual_tax_calculators = api.manual_tax_calculators) }
	get markets(): api.Markets { return this.#markets || (this.#markets = api.markets) }
	get merchants(): api.Merchants { return this.#merchants || (this.#merchants = api.merchants) }
	get notifications(): api.Notifications { return this.#notifications || (this.#notifications = api.notifications) }
	get order_amount_promotion_rules(): api.OrderAmountPromotionRules { return this.#order_amount_promotion_rules || (this.#order_amount_promotion_rules = api.order_amount_promotion_rules) }
	get order_copies(): api.OrderCopies { return this.#order_copies || (this.#order_copies = api.order_copies) }
	get order_factories(): api.OrderFactories { return this.#order_factories || (this.#order_factories = api.order_factories) }
	get order_subscription_items(): api.OrderSubscriptionItems { return this.#order_subscription_items || (this.#order_subscription_items = api.order_subscription_items) }
	get order_subscriptions(): api.OrderSubscriptions { return this.#order_subscriptions || (this.#order_subscriptions = api.order_subscriptions) }
	get orders(): api.Orders { return this.#orders || (this.#orders = api.orders) }
	get organization(): api.Organizations { return this.#organization || (this.#organization = api.organization) }
	get packages(): api.Packages { return this.#packages || (this.#packages = api.packages) }
	get parcel_line_items(): api.ParcelLineItems { return this.#parcel_line_items || (this.#parcel_line_items = api.parcel_line_items) }
	get parcels(): api.Parcels { return this.#parcels || (this.#parcels = api.parcels) }
	get payment_gateways(): api.PaymentGateways { return this.#payment_gateways || (this.#payment_gateways = api.payment_gateways) }
	get payment_methods(): api.PaymentMethods { return this.#payment_methods || (this.#payment_methods = api.payment_methods) }
	get payment_options(): api.PaymentOptions { return this.#payment_options || (this.#payment_options = api.payment_options) }
	get paypal_gateways(): api.PaypalGateways { return this.#paypal_gateways || (this.#paypal_gateways = api.paypal_gateways) }
	get paypal_payments(): api.PaypalPayments { return this.#paypal_payments || (this.#paypal_payments = api.paypal_payments) }
	get percentage_discount_promotions(): api.PercentageDiscountPromotions { return this.#percentage_discount_promotions || (this.#percentage_discount_promotions = api.percentage_discount_promotions) }
	get pickups(): api.Pickups { return this.#pickups || (this.#pickups = api.pickups) }
	get price_frequency_tiers(): api.PriceFrequencyTiers { return this.#price_frequency_tiers || (this.#price_frequency_tiers = api.price_frequency_tiers) }
	get price_list_schedulers(): api.PriceListSchedulers { return this.#price_list_schedulers || (this.#price_list_schedulers = api.price_list_schedulers) }
	get price_lists(): api.PriceLists { return this.#price_lists || (this.#price_lists = api.price_lists) }
	get price_tiers(): api.PriceTiers { return this.#price_tiers || (this.#price_tiers = api.price_tiers) }
	get price_volume_tiers(): api.PriceVolumeTiers { return this.#price_volume_tiers || (this.#price_volume_tiers = api.price_volume_tiers) }
	get prices(): api.Prices { return this.#prices || (this.#prices = api.prices) }
	get promotion_rules(): api.PromotionRules { return this.#promotion_rules || (this.#promotion_rules = api.promotion_rules) }
	get promotions(): api.Promotions { return this.#promotions || (this.#promotions = api.promotions) }
	get recurring_order_copies(): api.RecurringOrderCopies { return this.#recurring_order_copies || (this.#recurring_order_copies = api.recurring_order_copies) }
	get refunds(): api.Refunds { return this.#refunds || (this.#refunds = api.refunds) }
	get reserved_stocks(): api.ReservedStocks { return this.#reserved_stocks || (this.#reserved_stocks = api.reserved_stocks) }
	get resource_errors(): api.ResourceErrors { return this.#resource_errors || (this.#resource_errors = api.resource_errors) }
	get return_line_items(): api.ReturnLineItems { return this.#return_line_items || (this.#return_line_items = api.return_line_items) }
	get returns(): api.Returns { return this.#returns || (this.#returns = api.returns) }
	get satispay_gateways(): api.SatispayGateways { return this.#satispay_gateways || (this.#satispay_gateways = api.satispay_gateways) }
	get satispay_payments(): api.SatispayPayments { return this.#satispay_payments || (this.#satispay_payments = api.satispay_payments) }
	get shipments(): api.Shipments { return this.#shipments || (this.#shipments = api.shipments) }
	get shipping_categories(): api.ShippingCategories { return this.#shipping_categories || (this.#shipping_categories = api.shipping_categories) }
	get shipping_method_tiers(): api.ShippingMethodTiers { return this.#shipping_method_tiers || (this.#shipping_method_tiers = api.shipping_method_tiers) }
	get shipping_methods(): api.ShippingMethods { return this.#shipping_methods || (this.#shipping_methods = api.shipping_methods) }
	get shipping_weight_tiers(): api.ShippingWeightTiers { return this.#shipping_weight_tiers || (this.#shipping_weight_tiers = api.shipping_weight_tiers) }
	get shipping_zones(): api.ShippingZones { return this.#shipping_zones || (this.#shipping_zones = api.shipping_zones) }
	get sku_list_items(): api.SkuListItems { return this.#sku_list_items || (this.#sku_list_items = api.sku_list_items) }
	get sku_list_promotion_rules(): api.SkuListPromotionRules { return this.#sku_list_promotion_rules || (this.#sku_list_promotion_rules = api.sku_list_promotion_rules) }
	get sku_lists(): api.SkuLists { return this.#sku_lists || (this.#sku_lists = api.sku_lists) }
	get sku_options(): api.SkuOptions { return this.#sku_options || (this.#sku_options = api.sku_options) }
	get skus(): api.Skus { return this.#skus || (this.#skus = api.skus) }
	get stock_items(): api.StockItems { return this.#stock_items || (this.#stock_items = api.stock_items) }
	get stock_line_items(): api.StockLineItems { return this.#stock_line_items || (this.#stock_line_items = api.stock_line_items) }
	get stock_locations(): api.StockLocations { return this.#stock_locations || (this.#stock_locations = api.stock_locations) }
	get stock_reservations(): api.StockReservations { return this.#stock_reservations || (this.#stock_reservations = api.stock_reservations) }
	get stock_transfers(): api.StockTransfers { return this.#stock_transfers || (this.#stock_transfers = api.stock_transfers) }
	get stores(): api.Stores { return this.#stores || (this.#stores = api.stores) }
	get stripe_gateways(): api.StripeGateways { return this.#stripe_gateways || (this.#stripe_gateways = api.stripe_gateways) }
	get stripe_payments(): api.StripePayments { return this.#stripe_payments || (this.#stripe_payments = api.stripe_payments) }
	get stripe_tax_accounts(): api.StripeTaxAccounts { return this.#stripe_tax_accounts || (this.#stripe_tax_accounts = api.stripe_tax_accounts) }
	get subscription_models(): api.SubscriptionModels { return this.#subscription_models || (this.#subscription_models = api.subscription_models) }
	get tags(): api.Tags { return this.#tags || (this.#tags = api.tags) }
	get talon_one_accounts(): api.TalonOneAccounts { return this.#talon_one_accounts || (this.#talon_one_accounts = api.talon_one_accounts) }
	get tax_calculators(): api.TaxCalculators { return this.#tax_calculators || (this.#tax_calculators = api.tax_calculators) }
	get tax_categories(): api.TaxCategories { return this.#tax_categories || (this.#tax_categories = api.tax_categories) }
	get tax_rules(): api.TaxRules { return this.#tax_rules || (this.#tax_rules = api.tax_rules) }
	get taxjar_accounts(): api.TaxjarAccounts { return this.#taxjar_accounts || (this.#taxjar_accounts = api.taxjar_accounts) }
	get transactions(): api.Transactions { return this.#transactions || (this.#transactions = api.transactions) }
	get versions(): api.Versions { return this.#versions || (this.#versions = api.versions) }
	get vertex_accounts(): api.VertexAccounts { return this.#vertex_accounts || (this.#vertex_accounts = api.vertex_accounts) }
	get voids(): api.Voids { return this.#voids || (this.#voids = api.voids) }
	get webhooks(): api.Webhooks { return this.#webhooks || (this.#webhooks = api.webhooks) }
	get wire_transfers(): api.WireTransfers { return this.#wire_transfers || (this.#wire_transfers = api.wire_transfers) }
	// ##__CL_RESOURCES_LEAZY_LOADING_STOP__##

}



function CommerceLayer(config: CommerceLayerInitConfig): CommerceLayerBundle {
	return new CommerceLayerBundle(config)
}


export { CommerceLayer, type CommerceLayerBundle }
