import { CommerceLayerClient, type CommerceLayerInitConfig } from './commercelayer'
import * as api from './api'

import Debug from './debug'
const debug = Debug('bundle')


class CommerceLayerBundle extends CommerceLayerClient {

  // ##__CL_RESOURCES_DEF_START__##
	// ##__CL_RESOURCES_DEF_TEMPLATE:: ##__TAB__#####__RESOURCE_TYPE__##?: api.##__RESOURCE_CLASS__##
	// ##__CL_RESOURCES_DEF_STOP__##

  public constructor(config: CommerceLayerInitConfig) {

		super(config)
		debug('new commercelayer bundle instance %O', config)

		// ##__CL_RESOURCES_INIT_START__##
		// ##__CL_RESOURCES_INIT_TEMPLATE:: ##__TAB__####__TAB__##this.##__RESOURCE_TYPE__## = new api.##__RESOURCE_CLASS__##(this.#adapter)
		// ##__CL_RESOURCES_INIT_STOP__##

	}


	static get (config?: CommerceLayerInitConfig): CommerceLayerBundle {
		if (config) return (CommerceLayerBundle.cl = new CommerceLayerBundle(config))
		else
		if (!CommerceLayerBundle.cl) throw new Error('CommerceLayer bundle client not initialized')
		return CommerceLayerBundle.cl as CommerceLayerBundle
	}

	// private get adapter(): ResourceAdapter { return ApiResourceAdapter.get() }

  // ##__CL_RESOURCES_LEAZY_LOADING_START__##
	// ##__CL_RESOURCES_LEAZY_LOADING_TEMPLATE:: ##__TAB__##get ##__RESOURCE_TYPE__##(): api.##__RESOURCE_CLASS__## { return this.###__RESOURCE_TYPE__## || (this.###__RESOURCE_TYPE__## = api.##__RESOURCE_TYPE__##) }
	// ##__CL_RESOURCES_LEAZY_LOADING_STOP__##

	// ##__CL_RESOURCES_ACCESSORS_ONLY_START__##
	// ##__CL_RESOURCES_ACCESSORS_ONLY_TEMPLATE:: ##__TAB__##get ##__RESOURCE_TYPE__##(): api.##__RESOURCE_CLASS__## { return api.##__RESOURCE_TYPE__## }
	get addresses(): api.Addresses { return api.addresses }
	get adjustments(): api.Adjustments { return api.adjustments }
	get adyen_gateways(): api.AdyenGateways { return api.adyen_gateways }
	get adyen_payments(): api.AdyenPayments { return api.adyen_payments }
	get application(): api.Applications { return api.application }
	get attachments(): api.Attachments { return api.attachments }
	get authorizations(): api.Authorizations { return api.authorizations }
	get avalara_accounts(): api.AvalaraAccounts { return api.avalara_accounts }
	get axerve_gateways(): api.AxerveGateways { return api.axerve_gateways }
	get axerve_payments(): api.AxervePayments { return api.axerve_payments }
	get bing_geocoders(): api.BingGeocoders { return api.bing_geocoders }
	get braintree_gateways(): api.BraintreeGateways { return api.braintree_gateways }
	get braintree_payments(): api.BraintreePayments { return api.braintree_payments }
	get bundles(): api.Bundles { return api.bundles }
	get buy_x_pay_y_promotions(): api.BuyXPayYPromotions { return api.buy_x_pay_y_promotions }
	get captures(): api.Captures { return api.captures }
	get carrier_accounts(): api.CarrierAccounts { return api.carrier_accounts }
	get checkout_com_gateways(): api.CheckoutComGateways { return api.checkout_com_gateways }
	get checkout_com_payments(): api.CheckoutComPayments { return api.checkout_com_payments }
	get cleanups(): api.Cleanups { return api.cleanups }
	get coupon_codes_promotion_rules(): api.CouponCodesPromotionRules { return api.coupon_codes_promotion_rules }
	get coupon_recipients(): api.CouponRecipients { return api.coupon_recipients }
	get coupons(): api.Coupons { return api.coupons }
	get custom_promotion_rules(): api.CustomPromotionRules { return api.custom_promotion_rules }
	get customer_addresses(): api.CustomerAddresses { return api.customer_addresses }
	get customer_groups(): api.CustomerGroups { return api.customer_groups }
	get customer_password_resets(): api.CustomerPasswordResets { return api.customer_password_resets }
	get customer_payment_sources(): api.CustomerPaymentSources { return api.customer_payment_sources }
	get customer_subscriptions(): api.CustomerSubscriptions { return api.customer_subscriptions }
	get customers(): api.Customers { return api.customers }
	get delivery_lead_times(): api.DeliveryLeadTimes { return api.delivery_lead_times }
	get discount_engine_items(): api.DiscountEngineItems { return api.discount_engine_items }
	get discount_engines(): api.DiscountEngines { return api.discount_engines }
	get easypost_pickups(): api.EasypostPickups { return api.easypost_pickups }
	get event_callbacks(): api.EventCallbacks { return api.event_callbacks }
	get event_stores(): api.EventStores { return api.event_stores }
	get events(): api.Events { return api.events }
	get exports(): api.Exports { return api.exports }
	get external_gateways(): api.ExternalGateways { return api.external_gateways }
	get external_payments(): api.ExternalPayments { return api.external_payments }
	get external_promotions(): api.ExternalPromotions { return api.external_promotions }
	get external_tax_calculators(): api.ExternalTaxCalculators { return api.external_tax_calculators }
	get fixed_amount_promotions(): api.FixedAmountPromotions { return api.fixed_amount_promotions }
	get fixed_price_promotions(): api.FixedPricePromotions { return api.fixed_price_promotions }
	get flex_promotions(): api.FlexPromotions { return api.flex_promotions }
	get free_gift_promotions(): api.FreeGiftPromotions { return api.free_gift_promotions }
	get free_shipping_promotions(): api.FreeShippingPromotions { return api.free_shipping_promotions }
	get geocoders(): api.Geocoders { return api.geocoders }
	get gift_card_recipients(): api.GiftCardRecipients { return api.gift_card_recipients }
	get gift_cards(): api.GiftCards { return api.gift_cards }
	get google_geocoders(): api.GoogleGeocoders { return api.google_geocoders }
	get imports(): api.Imports { return api.imports }
	get in_stock_subscriptions(): api.InStockSubscriptions { return api.in_stock_subscriptions }
	get inventory_models(): api.InventoryModels { return api.inventory_models }
	get inventory_return_locations(): api.InventoryReturnLocations { return api.inventory_return_locations }
	get inventory_stock_locations(): api.InventoryStockLocations { return api.inventory_stock_locations }
	get klarna_gateways(): api.KlarnaGateways { return api.klarna_gateways }
	get klarna_payments(): api.KlarnaPayments { return api.klarna_payments }
	get line_item_options(): api.LineItemOptions { return api.line_item_options }
	get line_items(): api.LineItems { return api.line_items }
	get links(): api.Links { return api.links }
	get manual_gateways(): api.ManualGateways { return api.manual_gateways }
	get manual_tax_calculators(): api.ManualTaxCalculators { return api.manual_tax_calculators }
	get markets(): api.Markets { return api.markets }
	get merchants(): api.Merchants { return api.merchants }
	get notifications(): api.Notifications { return api.notifications }
	get order_amount_promotion_rules(): api.OrderAmountPromotionRules { return api.order_amount_promotion_rules }
	get order_copies(): api.OrderCopies { return api.order_copies }
	get order_factories(): api.OrderFactories { return api.order_factories }
	get order_subscription_items(): api.OrderSubscriptionItems { return api.order_subscription_items }
	get order_subscriptions(): api.OrderSubscriptions { return api.order_subscriptions }
	get orders(): api.Orders { return api.orders }
	get organization(): api.Organizations { return api.organization }
	get packages(): api.Packages { return api.packages }
	get parcel_line_items(): api.ParcelLineItems { return api.parcel_line_items }
	get parcels(): api.Parcels { return api.parcels }
	get payment_gateways(): api.PaymentGateways { return api.payment_gateways }
	get payment_methods(): api.PaymentMethods { return api.payment_methods }
	get payment_options(): api.PaymentOptions { return api.payment_options }
	get paypal_gateways(): api.PaypalGateways { return api.paypal_gateways }
	get paypal_payments(): api.PaypalPayments { return api.paypal_payments }
	get percentage_discount_promotions(): api.PercentageDiscountPromotions { return api.percentage_discount_promotions }
	get pickups(): api.Pickups { return api.pickups }
	get price_frequency_tiers(): api.PriceFrequencyTiers { return api.price_frequency_tiers }
	get price_list_schedulers(): api.PriceListSchedulers { return api.price_list_schedulers }
	get price_lists(): api.PriceLists { return api.price_lists }
	get price_tiers(): api.PriceTiers { return api.price_tiers }
	get price_volume_tiers(): api.PriceVolumeTiers { return api.price_volume_tiers }
	get prices(): api.Prices { return api.prices }
	get promotion_rules(): api.PromotionRules { return api.promotion_rules }
	get promotions(): api.Promotions { return api.promotions }
	get recurring_order_copies(): api.RecurringOrderCopies { return api.recurring_order_copies }
	get refunds(): api.Refunds { return api.refunds }
	get reserved_stocks(): api.ReservedStocks { return api.reserved_stocks }
	get resource_errors(): api.ResourceErrors { return api.resource_errors }
	get return_line_items(): api.ReturnLineItems { return api.return_line_items }
	get returns(): api.Returns { return api.returns }
	get satispay_gateways(): api.SatispayGateways { return api.satispay_gateways }
	get satispay_payments(): api.SatispayPayments { return api.satispay_payments }
	get shipments(): api.Shipments { return api.shipments }
	get shipping_categories(): api.ShippingCategories { return api.shipping_categories }
	get shipping_method_tiers(): api.ShippingMethodTiers { return api.shipping_method_tiers }
	get shipping_methods(): api.ShippingMethods { return api.shipping_methods }
	get shipping_weight_tiers(): api.ShippingWeightTiers { return api.shipping_weight_tiers }
	get shipping_zones(): api.ShippingZones { return api.shipping_zones }
	get sku_list_items(): api.SkuListItems { return api.sku_list_items }
	get sku_list_promotion_rules(): api.SkuListPromotionRules { return api.sku_list_promotion_rules }
	get sku_lists(): api.SkuLists { return api.sku_lists }
	get sku_options(): api.SkuOptions { return api.sku_options }
	get skus(): api.Skus { return api.skus }
	get stock_items(): api.StockItems { return api.stock_items }
	get stock_line_items(): api.StockLineItems { return api.stock_line_items }
	get stock_locations(): api.StockLocations { return api.stock_locations }
	get stock_reservations(): api.StockReservations { return api.stock_reservations }
	get stock_transfers(): api.StockTransfers { return api.stock_transfers }
	get stores(): api.Stores { return api.stores }
	get stripe_gateways(): api.StripeGateways { return api.stripe_gateways }
	get stripe_payments(): api.StripePayments { return api.stripe_payments }
	get stripe_tax_accounts(): api.StripeTaxAccounts { return api.stripe_tax_accounts }
	get subscription_models(): api.SubscriptionModels { return api.subscription_models }
	get tags(): api.Tags { return api.tags }
	get talon_one_accounts(): api.TalonOneAccounts { return api.talon_one_accounts }
	get tax_calculators(): api.TaxCalculators { return api.tax_calculators }
	get tax_categories(): api.TaxCategories { return api.tax_categories }
	get tax_rules(): api.TaxRules { return api.tax_rules }
	get taxjar_accounts(): api.TaxjarAccounts { return api.taxjar_accounts }
	get transactions(): api.Transactions { return api.transactions }
	get versions(): api.Versions { return api.versions }
	get vertex_accounts(): api.VertexAccounts { return api.vertex_accounts }
	get voids(): api.Voids { return api.voids }
	get webhooks(): api.Webhooks { return api.webhooks }
	get wire_transfers(): api.WireTransfers { return api.wire_transfers }
	// ##__CL_RESOURCES_ACCESSORS_ONLY_STOP__##

}



function CommerceLayer(config: CommerceLayerInitConfig): CommerceLayerBundle {
	return CommerceLayerBundle.get(config)
}


export { CommerceLayer, type CommerceLayerBundle }
