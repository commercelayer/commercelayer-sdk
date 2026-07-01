import * as api from './api'
import { CommerceLayerClient, type CommerceLayerInitConfig } from './commercelayer'
import Debug from './debug'
import type { ResourceAdapter } from './resource'

const debug = Debug('bundle')

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
  #billing_info_validation_rules?: api.BillingInfoValidationRules
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
  #coupons?: api.Coupons
  #coupon_codes_promotion_rules?: api.CouponCodesPromotionRules
  #coupon_recipients?: api.CouponRecipients
  #custom_promotion_rules?: api.CustomPromotionRules
  #customers?: api.Customers
  #customer_addresses?: api.CustomerAddresses
  #customer_groups?: api.CustomerGroups
  #customer_password_resets?: api.CustomerPasswordResets
  #customer_payment_sources?: api.CustomerPaymentSources
  #customer_subscriptions?: api.CustomerSubscriptions
  #delivery_lead_times?: api.DeliveryLeadTimes
  #discount_engines?: api.DiscountEngines
  #discount_engine_items?: api.DiscountEngineItems
  #easypost_pickups?: api.EasypostPickups
  #events?: api.Events
  #event_callbacks?: api.EventCallbacks
  #event_stores?: api.EventStores
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
  #gift_cards?: api.GiftCards
  #gift_card_recipients?: api.GiftCardRecipients
  #google_geocoders?: api.GoogleGeocoders
  #imports?: api.Imports
  #in_stock_subscriptions?: api.InStockSubscriptions
  #inventory_models?: api.InventoryModels
  #inventory_return_locations?: api.InventoryReturnLocations
  #inventory_stock_locations?: api.InventoryStockLocations
  #klarna_gateways?: api.KlarnaGateways
  #klarna_payments?: api.KlarnaPayments
  #line_items?: api.LineItems
  #line_item_options?: api.LineItemOptions
  #links?: api.Links
  #manual_gateways?: api.ManualGateways
  #manual_tax_calculators?: api.ManualTaxCalculators
  #markets?: api.Markets
  #merchants?: api.Merchants
  #notifications?: api.Notifications
  #orders?: api.Orders
  #order_amount_promotion_rules?: api.OrderAmountPromotionRules
  #order_copies?: api.OrderCopies
  #order_factories?: api.OrderFactories
  #order_subscriptions?: api.OrderSubscriptions
  #order_subscription_items?: api.OrderSubscriptionItems
  #order_validation_rules?: api.OrderValidationRules
  #organization?: api.Organizations
  #packages?: api.Packages
  #parcels?: api.Parcels
  #parcel_line_items?: api.ParcelLineItems
  #payment_gateways?: api.PaymentGateways
  #payment_methods?: api.PaymentMethods
  #payment_options?: api.PaymentOptions
  #paypal_gateways?: api.PaypalGateways
  #paypal_payments?: api.PaypalPayments
  #percentage_discount_promotions?: api.PercentageDiscountPromotions
  #pickups?: api.Pickups
  #prices?: api.Prices
  #price_frequency_tiers?: api.PriceFrequencyTiers
  #price_lists?: api.PriceLists
  #price_list_schedulers?: api.PriceListSchedulers
  #price_tiers?: api.PriceTiers
  #price_volume_tiers?: api.PriceVolumeTiers
  #promotions?: api.Promotions
  #promotion_rules?: api.PromotionRules
  #recurring_order_copies?: api.RecurringOrderCopies
  #refunds?: api.Refunds
  #reserved_stocks?: api.ReservedStocks
  #resource_errors?: api.ResourceErrors
  #returns?: api.Returns
  #return_line_items?: api.ReturnLineItems
  #satispay_gateways?: api.SatispayGateways
  #satispay_payments?: api.SatispayPayments
  #shipments?: api.Shipments
  #shipment_line_items?: api.ShipmentLineItems
  #shipping_categories?: api.ShippingCategories
  #shipping_methods?: api.ShippingMethods
  #shipping_method_tiers?: api.ShippingMethodTiers
  #shipping_weight_tiers?: api.ShippingWeightTiers
  #shipping_zones?: api.ShippingZones
  #skus?: api.Skus
  #sku_lists?: api.SkuLists
  #sku_list_items?: api.SkuListItems
  #sku_list_promotion_rules?: api.SkuListPromotionRules
  #sku_options?: api.SkuOptions
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
  #vertex_accounts?: api.VertexAccounts
  #voids?: api.Voids
  #webhooks?: api.Webhooks
  #wire_transfers?: api.WireTransfers
  // ##__CL_RESOURCES_DEF_STOP__##

  public constructor(config: CommerceLayerInitConfig) {
    super(config)
    debug('new commercelayer bundle instance %O', config)

    // ##__CL_RESOURCES_INIT_START__##
    // ##__CL_RESOURCES_INIT_TEMPLATE:: ##__TAB__####__TAB__##this.##__RESOURCE_TYPE__## = new api.##__RESOURCE_CLASS__##(this.#adapter)
    // ##__CL_RESOURCES_INIT_STOP__##
  }

  static get(config?: CommerceLayerInitConfig): CommerceLayerBundle {
    if (config) return (CommerceLayerBundle.cl = new CommerceLayerBundle(config))
    else if (!CommerceLayerBundle.cl) throw new Error('CommerceLayer bundle client not initialized')
    return CommerceLayerBundle.cl as CommerceLayerBundle
  }

  // Bundle clients are isolated: route this instance's requests, config and
  // interceptors through the adapter built for it, not the process-global
  // static one. The resource accessors below bind to this same adapter.
  protected override get adapter(): ResourceAdapter {
    return this.instanceAdapter
  }

  // ##__CL_RESOURCES_LEAZY_LOADING_START__##
  // ##__CL_RESOURCES_LEAZY_LOADING_TEMPLATE:: ##__TAB__##get ##__RESOURCE_TYPE__##(): api.##__RESOURCE_CLASS__## { return this.###__RESOURCE_TYPE__## || (this.###__RESOURCE_TYPE__## = api.##__RESOURCE_TYPE__##.withAdapter(this.adapter)) }
  get addresses(): api.Addresses {
    return this.#addresses || (this.#addresses = api.addresses.withAdapter(this.adapter))
  }
  get adjustments(): api.Adjustments {
    return this.#adjustments || (this.#adjustments = api.adjustments.withAdapter(this.adapter))
  }
  get adyen_gateways(): api.AdyenGateways {
    return this.#adyen_gateways || (this.#adyen_gateways = api.adyen_gateways.withAdapter(this.adapter))
  }
  get adyen_payments(): api.AdyenPayments {
    return this.#adyen_payments || (this.#adyen_payments = api.adyen_payments.withAdapter(this.adapter))
  }
  get application(): api.Applications {
    return this.#application || (this.#application = api.application.withAdapter(this.adapter))
  }
  get attachments(): api.Attachments {
    return this.#attachments || (this.#attachments = api.attachments.withAdapter(this.adapter))
  }
  get authorizations(): api.Authorizations {
    return this.#authorizations || (this.#authorizations = api.authorizations.withAdapter(this.adapter))
  }
  get avalara_accounts(): api.AvalaraAccounts {
    return this.#avalara_accounts || (this.#avalara_accounts = api.avalara_accounts.withAdapter(this.adapter))
  }
  get axerve_gateways(): api.AxerveGateways {
    return this.#axerve_gateways || (this.#axerve_gateways = api.axerve_gateways.withAdapter(this.adapter))
  }
  get axerve_payments(): api.AxervePayments {
    return this.#axerve_payments || (this.#axerve_payments = api.axerve_payments.withAdapter(this.adapter))
  }
  get billing_info_validation_rules(): api.BillingInfoValidationRules {
    return (
      this.#billing_info_validation_rules ||
      (this.#billing_info_validation_rules = api.billing_info_validation_rules.withAdapter(this.adapter))
    )
  }
  get bing_geocoders(): api.BingGeocoders {
    return this.#bing_geocoders || (this.#bing_geocoders = api.bing_geocoders.withAdapter(this.adapter))
  }
  get braintree_gateways(): api.BraintreeGateways {
    return this.#braintree_gateways || (this.#braintree_gateways = api.braintree_gateways.withAdapter(this.adapter))
  }
  get braintree_payments(): api.BraintreePayments {
    return this.#braintree_payments || (this.#braintree_payments = api.braintree_payments.withAdapter(this.adapter))
  }
  get bundles(): api.Bundles {
    return this.#bundles || (this.#bundles = api.bundles.withAdapter(this.adapter))
  }
  get buy_x_pay_y_promotions(): api.BuyXPayYPromotions {
    return (
      this.#buy_x_pay_y_promotions ||
      (this.#buy_x_pay_y_promotions = api.buy_x_pay_y_promotions.withAdapter(this.adapter))
    )
  }
  get captures(): api.Captures {
    return this.#captures || (this.#captures = api.captures.withAdapter(this.adapter))
  }
  get carrier_accounts(): api.CarrierAccounts {
    return this.#carrier_accounts || (this.#carrier_accounts = api.carrier_accounts.withAdapter(this.adapter))
  }
  get checkout_com_gateways(): api.CheckoutComGateways {
    return (
      this.#checkout_com_gateways || (this.#checkout_com_gateways = api.checkout_com_gateways.withAdapter(this.adapter))
    )
  }
  get checkout_com_payments(): api.CheckoutComPayments {
    return (
      this.#checkout_com_payments || (this.#checkout_com_payments = api.checkout_com_payments.withAdapter(this.adapter))
    )
  }
  get cleanups(): api.Cleanups {
    return this.#cleanups || (this.#cleanups = api.cleanups.withAdapter(this.adapter))
  }
  get coupons(): api.Coupons {
    return this.#coupons || (this.#coupons = api.coupons.withAdapter(this.adapter))
  }
  get coupon_codes_promotion_rules(): api.CouponCodesPromotionRules {
    return (
      this.#coupon_codes_promotion_rules ||
      (this.#coupon_codes_promotion_rules = api.coupon_codes_promotion_rules.withAdapter(this.adapter))
    )
  }
  get coupon_recipients(): api.CouponRecipients {
    return this.#coupon_recipients || (this.#coupon_recipients = api.coupon_recipients.withAdapter(this.adapter))
  }
  get custom_promotion_rules(): api.CustomPromotionRules {
    return (
      this.#custom_promotion_rules ||
      (this.#custom_promotion_rules = api.custom_promotion_rules.withAdapter(this.adapter))
    )
  }
  get customers(): api.Customers {
    return this.#customers || (this.#customers = api.customers.withAdapter(this.adapter))
  }
  get customer_addresses(): api.CustomerAddresses {
    return this.#customer_addresses || (this.#customer_addresses = api.customer_addresses.withAdapter(this.adapter))
  }
  get customer_groups(): api.CustomerGroups {
    return this.#customer_groups || (this.#customer_groups = api.customer_groups.withAdapter(this.adapter))
  }
  get customer_password_resets(): api.CustomerPasswordResets {
    return (
      this.#customer_password_resets ||
      (this.#customer_password_resets = api.customer_password_resets.withAdapter(this.adapter))
    )
  }
  get customer_payment_sources(): api.CustomerPaymentSources {
    return (
      this.#customer_payment_sources ||
      (this.#customer_payment_sources = api.customer_payment_sources.withAdapter(this.adapter))
    )
  }
  get customer_subscriptions(): api.CustomerSubscriptions {
    return (
      this.#customer_subscriptions ||
      (this.#customer_subscriptions = api.customer_subscriptions.withAdapter(this.adapter))
    )
  }
  get delivery_lead_times(): api.DeliveryLeadTimes {
    return this.#delivery_lead_times || (this.#delivery_lead_times = api.delivery_lead_times.withAdapter(this.adapter))
  }
  get discount_engines(): api.DiscountEngines {
    return this.#discount_engines || (this.#discount_engines = api.discount_engines.withAdapter(this.adapter))
  }
  get discount_engine_items(): api.DiscountEngineItems {
    return (
      this.#discount_engine_items || (this.#discount_engine_items = api.discount_engine_items.withAdapter(this.adapter))
    )
  }
  get easypost_pickups(): api.EasypostPickups {
    return this.#easypost_pickups || (this.#easypost_pickups = api.easypost_pickups.withAdapter(this.adapter))
  }
  get events(): api.Events {
    return this.#events || (this.#events = api.events.withAdapter(this.adapter))
  }
  get event_callbacks(): api.EventCallbacks {
    return this.#event_callbacks || (this.#event_callbacks = api.event_callbacks.withAdapter(this.adapter))
  }
  get event_stores(): api.EventStores {
    return this.#event_stores || (this.#event_stores = api.event_stores.withAdapter(this.adapter))
  }
  get exports(): api.Exports {
    return this.#exports || (this.#exports = api.exports.withAdapter(this.adapter))
  }
  get external_gateways(): api.ExternalGateways {
    return this.#external_gateways || (this.#external_gateways = api.external_gateways.withAdapter(this.adapter))
  }
  get external_payments(): api.ExternalPayments {
    return this.#external_payments || (this.#external_payments = api.external_payments.withAdapter(this.adapter))
  }
  get external_promotions(): api.ExternalPromotions {
    return this.#external_promotions || (this.#external_promotions = api.external_promotions.withAdapter(this.adapter))
  }
  get external_tax_calculators(): api.ExternalTaxCalculators {
    return (
      this.#external_tax_calculators ||
      (this.#external_tax_calculators = api.external_tax_calculators.withAdapter(this.adapter))
    )
  }
  get fixed_amount_promotions(): api.FixedAmountPromotions {
    return (
      this.#fixed_amount_promotions ||
      (this.#fixed_amount_promotions = api.fixed_amount_promotions.withAdapter(this.adapter))
    )
  }
  get fixed_price_promotions(): api.FixedPricePromotions {
    return (
      this.#fixed_price_promotions ||
      (this.#fixed_price_promotions = api.fixed_price_promotions.withAdapter(this.adapter))
    )
  }
  get flex_promotions(): api.FlexPromotions {
    return this.#flex_promotions || (this.#flex_promotions = api.flex_promotions.withAdapter(this.adapter))
  }
  get free_gift_promotions(): api.FreeGiftPromotions {
    return (
      this.#free_gift_promotions || (this.#free_gift_promotions = api.free_gift_promotions.withAdapter(this.adapter))
    )
  }
  get free_shipping_promotions(): api.FreeShippingPromotions {
    return (
      this.#free_shipping_promotions ||
      (this.#free_shipping_promotions = api.free_shipping_promotions.withAdapter(this.adapter))
    )
  }
  get geocoders(): api.Geocoders {
    return this.#geocoders || (this.#geocoders = api.geocoders.withAdapter(this.adapter))
  }
  get gift_cards(): api.GiftCards {
    return this.#gift_cards || (this.#gift_cards = api.gift_cards.withAdapter(this.adapter))
  }
  get gift_card_recipients(): api.GiftCardRecipients {
    return (
      this.#gift_card_recipients || (this.#gift_card_recipients = api.gift_card_recipients.withAdapter(this.adapter))
    )
  }
  get google_geocoders(): api.GoogleGeocoders {
    return this.#google_geocoders || (this.#google_geocoders = api.google_geocoders.withAdapter(this.adapter))
  }
  get imports(): api.Imports {
    return this.#imports || (this.#imports = api.imports.withAdapter(this.adapter))
  }
  get in_stock_subscriptions(): api.InStockSubscriptions {
    return (
      this.#in_stock_subscriptions ||
      (this.#in_stock_subscriptions = api.in_stock_subscriptions.withAdapter(this.adapter))
    )
  }
  get inventory_models(): api.InventoryModels {
    return this.#inventory_models || (this.#inventory_models = api.inventory_models.withAdapter(this.adapter))
  }
  get inventory_return_locations(): api.InventoryReturnLocations {
    return (
      this.#inventory_return_locations ||
      (this.#inventory_return_locations = api.inventory_return_locations.withAdapter(this.adapter))
    )
  }
  get inventory_stock_locations(): api.InventoryStockLocations {
    return (
      this.#inventory_stock_locations ||
      (this.#inventory_stock_locations = api.inventory_stock_locations.withAdapter(this.adapter))
    )
  }
  get klarna_gateways(): api.KlarnaGateways {
    return this.#klarna_gateways || (this.#klarna_gateways = api.klarna_gateways.withAdapter(this.adapter))
  }
  get klarna_payments(): api.KlarnaPayments {
    return this.#klarna_payments || (this.#klarna_payments = api.klarna_payments.withAdapter(this.adapter))
  }
  get line_items(): api.LineItems {
    return this.#line_items || (this.#line_items = api.line_items.withAdapter(this.adapter))
  }
  get line_item_options(): api.LineItemOptions {
    return this.#line_item_options || (this.#line_item_options = api.line_item_options.withAdapter(this.adapter))
  }
  get links(): api.Links {
    return this.#links || (this.#links = api.links.withAdapter(this.adapter))
  }
  get manual_gateways(): api.ManualGateways {
    return this.#manual_gateways || (this.#manual_gateways = api.manual_gateways.withAdapter(this.adapter))
  }
  get manual_tax_calculators(): api.ManualTaxCalculators {
    return (
      this.#manual_tax_calculators ||
      (this.#manual_tax_calculators = api.manual_tax_calculators.withAdapter(this.adapter))
    )
  }
  get markets(): api.Markets {
    return this.#markets || (this.#markets = api.markets.withAdapter(this.adapter))
  }
  get merchants(): api.Merchants {
    return this.#merchants || (this.#merchants = api.merchants.withAdapter(this.adapter))
  }
  get notifications(): api.Notifications {
    return this.#notifications || (this.#notifications = api.notifications.withAdapter(this.adapter))
  }
  get orders(): api.Orders {
    return this.#orders || (this.#orders = api.orders.withAdapter(this.adapter))
  }
  get order_amount_promotion_rules(): api.OrderAmountPromotionRules {
    return (
      this.#order_amount_promotion_rules ||
      (this.#order_amount_promotion_rules = api.order_amount_promotion_rules.withAdapter(this.adapter))
    )
  }
  get order_copies(): api.OrderCopies {
    return this.#order_copies || (this.#order_copies = api.order_copies.withAdapter(this.adapter))
  }
  get order_factories(): api.OrderFactories {
    return this.#order_factories || (this.#order_factories = api.order_factories.withAdapter(this.adapter))
  }
  get order_subscriptions(): api.OrderSubscriptions {
    return this.#order_subscriptions || (this.#order_subscriptions = api.order_subscriptions.withAdapter(this.adapter))
  }
  get order_subscription_items(): api.OrderSubscriptionItems {
    return (
      this.#order_subscription_items ||
      (this.#order_subscription_items = api.order_subscription_items.withAdapter(this.adapter))
    )
  }
  get order_validation_rules(): api.OrderValidationRules {
    return (
      this.#order_validation_rules ||
      (this.#order_validation_rules = api.order_validation_rules.withAdapter(this.adapter))
    )
  }
  get organization(): api.Organizations {
    return this.#organization || (this.#organization = api.organization.withAdapter(this.adapter))
  }
  get packages(): api.Packages {
    return this.#packages || (this.#packages = api.packages.withAdapter(this.adapter))
  }
  get parcels(): api.Parcels {
    return this.#parcels || (this.#parcels = api.parcels.withAdapter(this.adapter))
  }
  get parcel_line_items(): api.ParcelLineItems {
    return this.#parcel_line_items || (this.#parcel_line_items = api.parcel_line_items.withAdapter(this.adapter))
  }
  get payment_gateways(): api.PaymentGateways {
    return this.#payment_gateways || (this.#payment_gateways = api.payment_gateways.withAdapter(this.adapter))
  }
  get payment_methods(): api.PaymentMethods {
    return this.#payment_methods || (this.#payment_methods = api.payment_methods.withAdapter(this.adapter))
  }
  get payment_options(): api.PaymentOptions {
    return this.#payment_options || (this.#payment_options = api.payment_options.withAdapter(this.adapter))
  }
  get paypal_gateways(): api.PaypalGateways {
    return this.#paypal_gateways || (this.#paypal_gateways = api.paypal_gateways.withAdapter(this.adapter))
  }
  get paypal_payments(): api.PaypalPayments {
    return this.#paypal_payments || (this.#paypal_payments = api.paypal_payments.withAdapter(this.adapter))
  }
  get percentage_discount_promotions(): api.PercentageDiscountPromotions {
    return (
      this.#percentage_discount_promotions ||
      (this.#percentage_discount_promotions = api.percentage_discount_promotions.withAdapter(this.adapter))
    )
  }
  get pickups(): api.Pickups {
    return this.#pickups || (this.#pickups = api.pickups.withAdapter(this.adapter))
  }
  get prices(): api.Prices {
    return this.#prices || (this.#prices = api.prices.withAdapter(this.adapter))
  }
  get price_frequency_tiers(): api.PriceFrequencyTiers {
    return (
      this.#price_frequency_tiers || (this.#price_frequency_tiers = api.price_frequency_tiers.withAdapter(this.adapter))
    )
  }
  get price_lists(): api.PriceLists {
    return this.#price_lists || (this.#price_lists = api.price_lists.withAdapter(this.adapter))
  }
  get price_list_schedulers(): api.PriceListSchedulers {
    return (
      this.#price_list_schedulers || (this.#price_list_schedulers = api.price_list_schedulers.withAdapter(this.adapter))
    )
  }
  get price_tiers(): api.PriceTiers {
    return this.#price_tiers || (this.#price_tiers = api.price_tiers.withAdapter(this.adapter))
  }
  get price_volume_tiers(): api.PriceVolumeTiers {
    return this.#price_volume_tiers || (this.#price_volume_tiers = api.price_volume_tiers.withAdapter(this.adapter))
  }
  get promotions(): api.Promotions {
    return this.#promotions || (this.#promotions = api.promotions.withAdapter(this.adapter))
  }
  get promotion_rules(): api.PromotionRules {
    return this.#promotion_rules || (this.#promotion_rules = api.promotion_rules.withAdapter(this.adapter))
  }
  get recurring_order_copies(): api.RecurringOrderCopies {
    return (
      this.#recurring_order_copies ||
      (this.#recurring_order_copies = api.recurring_order_copies.withAdapter(this.adapter))
    )
  }
  get refunds(): api.Refunds {
    return this.#refunds || (this.#refunds = api.refunds.withAdapter(this.adapter))
  }
  get reserved_stocks(): api.ReservedStocks {
    return this.#reserved_stocks || (this.#reserved_stocks = api.reserved_stocks.withAdapter(this.adapter))
  }
  get resource_errors(): api.ResourceErrors {
    return this.#resource_errors || (this.#resource_errors = api.resource_errors.withAdapter(this.adapter))
  }
  get returns(): api.Returns {
    return this.#returns || (this.#returns = api.returns.withAdapter(this.adapter))
  }
  get return_line_items(): api.ReturnLineItems {
    return this.#return_line_items || (this.#return_line_items = api.return_line_items.withAdapter(this.adapter))
  }
  get satispay_gateways(): api.SatispayGateways {
    return this.#satispay_gateways || (this.#satispay_gateways = api.satispay_gateways.withAdapter(this.adapter))
  }
  get satispay_payments(): api.SatispayPayments {
    return this.#satispay_payments || (this.#satispay_payments = api.satispay_payments.withAdapter(this.adapter))
  }
  get shipments(): api.Shipments {
    return this.#shipments || (this.#shipments = api.shipments.withAdapter(this.adapter))
  }
  get shipment_line_items(): api.ShipmentLineItems {
    return this.#shipment_line_items || (this.#shipment_line_items = api.shipment_line_items.withAdapter(this.adapter))
  }
  get shipping_categories(): api.ShippingCategories {
    return this.#shipping_categories || (this.#shipping_categories = api.shipping_categories.withAdapter(this.adapter))
  }
  get shipping_methods(): api.ShippingMethods {
    return this.#shipping_methods || (this.#shipping_methods = api.shipping_methods.withAdapter(this.adapter))
  }
  get shipping_method_tiers(): api.ShippingMethodTiers {
    return (
      this.#shipping_method_tiers || (this.#shipping_method_tiers = api.shipping_method_tiers.withAdapter(this.adapter))
    )
  }
  get shipping_weight_tiers(): api.ShippingWeightTiers {
    return (
      this.#shipping_weight_tiers || (this.#shipping_weight_tiers = api.shipping_weight_tiers.withAdapter(this.adapter))
    )
  }
  get shipping_zones(): api.ShippingZones {
    return this.#shipping_zones || (this.#shipping_zones = api.shipping_zones.withAdapter(this.adapter))
  }
  get skus(): api.Skus {
    return this.#skus || (this.#skus = api.skus.withAdapter(this.adapter))
  }
  get sku_lists(): api.SkuLists {
    return this.#sku_lists || (this.#sku_lists = api.sku_lists.withAdapter(this.adapter))
  }
  get sku_list_items(): api.SkuListItems {
    return this.#sku_list_items || (this.#sku_list_items = api.sku_list_items.withAdapter(this.adapter))
  }
  get sku_list_promotion_rules(): api.SkuListPromotionRules {
    return (
      this.#sku_list_promotion_rules ||
      (this.#sku_list_promotion_rules = api.sku_list_promotion_rules.withAdapter(this.adapter))
    )
  }
  get sku_options(): api.SkuOptions {
    return this.#sku_options || (this.#sku_options = api.sku_options.withAdapter(this.adapter))
  }
  get stock_items(): api.StockItems {
    return this.#stock_items || (this.#stock_items = api.stock_items.withAdapter(this.adapter))
  }
  get stock_line_items(): api.StockLineItems {
    return this.#stock_line_items || (this.#stock_line_items = api.stock_line_items.withAdapter(this.adapter))
  }
  get stock_locations(): api.StockLocations {
    return this.#stock_locations || (this.#stock_locations = api.stock_locations.withAdapter(this.adapter))
  }
  get stock_reservations(): api.StockReservations {
    return this.#stock_reservations || (this.#stock_reservations = api.stock_reservations.withAdapter(this.adapter))
  }
  get stock_transfers(): api.StockTransfers {
    return this.#stock_transfers || (this.#stock_transfers = api.stock_transfers.withAdapter(this.adapter))
  }
  get stores(): api.Stores {
    return this.#stores || (this.#stores = api.stores.withAdapter(this.adapter))
  }
  get stripe_gateways(): api.StripeGateways {
    return this.#stripe_gateways || (this.#stripe_gateways = api.stripe_gateways.withAdapter(this.adapter))
  }
  get stripe_payments(): api.StripePayments {
    return this.#stripe_payments || (this.#stripe_payments = api.stripe_payments.withAdapter(this.adapter))
  }
  get stripe_tax_accounts(): api.StripeTaxAccounts {
    return this.#stripe_tax_accounts || (this.#stripe_tax_accounts = api.stripe_tax_accounts.withAdapter(this.adapter))
  }
  get subscription_models(): api.SubscriptionModels {
    return this.#subscription_models || (this.#subscription_models = api.subscription_models.withAdapter(this.adapter))
  }
  get tags(): api.Tags {
    return this.#tags || (this.#tags = api.tags.withAdapter(this.adapter))
  }
  get talon_one_accounts(): api.TalonOneAccounts {
    return this.#talon_one_accounts || (this.#talon_one_accounts = api.talon_one_accounts.withAdapter(this.adapter))
  }
  get tax_calculators(): api.TaxCalculators {
    return this.#tax_calculators || (this.#tax_calculators = api.tax_calculators.withAdapter(this.adapter))
  }
  get tax_categories(): api.TaxCategories {
    return this.#tax_categories || (this.#tax_categories = api.tax_categories.withAdapter(this.adapter))
  }
  get tax_rules(): api.TaxRules {
    return this.#tax_rules || (this.#tax_rules = api.tax_rules.withAdapter(this.adapter))
  }
  get taxjar_accounts(): api.TaxjarAccounts {
    return this.#taxjar_accounts || (this.#taxjar_accounts = api.taxjar_accounts.withAdapter(this.adapter))
  }
  get transactions(): api.Transactions {
    return this.#transactions || (this.#transactions = api.transactions.withAdapter(this.adapter))
  }
  get vertex_accounts(): api.VertexAccounts {
    return this.#vertex_accounts || (this.#vertex_accounts = api.vertex_accounts.withAdapter(this.adapter))
  }
  get voids(): api.Voids {
    return this.#voids || (this.#voids = api.voids.withAdapter(this.adapter))
  }
  get webhooks(): api.Webhooks {
    return this.#webhooks || (this.#webhooks = api.webhooks.withAdapter(this.adapter))
  }
  get wire_transfers(): api.WireTransfers {
    return this.#wire_transfers || (this.#wire_transfers = api.wire_transfers.withAdapter(this.adapter))
  }
  // ##__CL_RESOURCES_LEAZY_LOADING_STOP__##

  // ##__CL_RESOURCES_ACCESSORS_ONLY_START__##
  // ##__CL_RESOURCES_ACCESSORS_ONLY_TEMPLATE:: ##__TAB__##get ##__RESOURCE_TYPE__##(): api.##__RESOURCE_CLASS__## { return api.##__RESOURCE_TYPE__## }
  // ##__CL_RESOURCES_ACCESSORS_ONLY_STOP__##
}

function CommerceLayer(config: CommerceLayerInitConfig): CommerceLayerBundle {
  return CommerceLayerBundle.get(config)
}

export { CommerceLayer, type CommerceLayerBundle }
