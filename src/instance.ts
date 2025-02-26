import { CommerceLayerInitConfig } from './commercelayer'
import { ApiResourceAdapter } from './resource'

import {
// ##__RESOURCE_CLASS_LIST_START__##
	Addresses,
	Adjustments,
	AdyenGateways,
	AdyenPayments,
	Applications,
	Attachments,
	Authorizations,
	AvalaraAccounts,
	AxerveGateways,
	AxervePayments,
	BingGeocoders,
	BraintreeGateways,
	BraintreePayments,
	Bundles,
	BuyXPayYPromotions,
	Captures,
	CarrierAccounts,
	CheckoutComGateways,
	CheckoutComPayments,
	Cleanups,
	CouponCodesPromotionRules,
	CouponRecipients,
	Coupons,
	CustomPromotionRules,
	CustomerAddresses,
	CustomerGroups,
	CustomerPasswordResets,
	CustomerPaymentSources,
	CustomerSubscriptions,
	Customers,
	DeliveryLeadTimes,
	DiscountEngineItems,
	DiscountEngines,
	EasypostPickups,
	EventCallbacks,
	Events,
	Exports,
	ExternalGateways,
	ExternalPayments,
	ExternalPromotions,
	ExternalTaxCalculators,
	FixedAmountPromotions,
	FixedPricePromotions,
	FlexPromotions,
	FreeGiftPromotions,
	FreeShippingPromotions,
	Geocoders,
	GiftCardRecipients,
	GiftCards,
	GoogleGeocoders,
	Imports,
	InStockSubscriptions,
	InventoryModels,
	InventoryReturnLocations,
	InventoryStockLocations,
	KlarnaGateways,
	KlarnaPayments,
	LineItemOptions,
	LineItems,
	Links,
	ManualGateways,
	ManualTaxCalculators,
	Markets,
	Merchants,
	Notifications,
	OrderAmountPromotionRules,
	OrderCopies,
	OrderFactories,
	OrderSubscriptionItems,
	OrderSubscriptions,
	Orders,
	Organizations,
	Packages,
	ParcelLineItems,
	Parcels,
	PaymentGateways,
	PaymentMethods,
	PaymentOptions,
	PaypalGateways,
	PaypalPayments,
	PercentageDiscountPromotions,
	Pickups,
	PriceFrequencyTiers,
	PriceListSchedulers,
	PriceLists,
	PriceTiers,
	PriceVolumeTiers,
	Prices,
	PromotionRules,
	Promotions,
	RecurringOrderCopies,
	Refunds,
	ReservedStocks,
	ResourceErrors,
	ReturnLineItems,
	Returns,
	SatispayGateways,
	SatispayPayments,
	Shipments,
	ShippingCategories,
	ShippingMethodTiers,
	ShippingMethods,
	ShippingWeightTiers,
	ShippingZones,
	SkuListItems,
	SkuListPromotionRules,
	SkuLists,
	SkuOptions,
	Skus,
	StockItems,
	StockLineItems,
	StockLocations,
	StockReservations,
	StockTransfers,
	Stores,
	StripeGateways,
	StripePayments,
	StripeTaxAccounts,
	SubscriptionModels,
	Tags,
	TalonOneAccounts,
	TaxCalculators,
	TaxCategories,
	TaxRules,
	TaxjarAccounts,
	Transactions,
	Versions,
	VertexAccounts,
	Voids,
	Webhooks,
	WireTransfers
// ##__RESOURCE_CLASS_LIST_STOP__##
} from './api'


// ##__CL_INSTANCES_START__##
// ##__CL_INSTANCES_TEMPLATE:: ##__TAB__##export const ##__RESOURCE_TYPE__## = new ##__RESOURCE_CLASS__##()
	export const addresses = new Addresses()
	export const adjustments = new Adjustments()
	export const adyen_gateways = new AdyenGateways()
	export const adyen_payments = new AdyenPayments()
	export const application = new Applications()
	export const attachments = new Attachments()
	export const authorizations = new Authorizations()
	export const avalara_accounts = new AvalaraAccounts()
	export const axerve_gateways = new AxerveGateways()
	export const axerve_payments = new AxervePayments()
	export const bing_geocoders = new BingGeocoders()
	export const braintree_gateways = new BraintreeGateways()
	export const braintree_payments = new BraintreePayments()
	export const bundles = new Bundles()
	export const buy_x_pay_y_promotions = new BuyXPayYPromotions()
	export const captures = new Captures()
	export const carrier_accounts = new CarrierAccounts()
	export const checkout_com_gateways = new CheckoutComGateways()
	export const checkout_com_payments = new CheckoutComPayments()
	export const cleanups = new Cleanups()
	export const coupon_codes_promotion_rules = new CouponCodesPromotionRules()
	export const coupon_recipients = new CouponRecipients()
	export const coupons = new Coupons()
	export const custom_promotion_rules = new CustomPromotionRules()
	export const customer_addresses = new CustomerAddresses()
	export const customer_groups = new CustomerGroups()
	export const customer_password_resets = new CustomerPasswordResets()
	export const customer_payment_sources = new CustomerPaymentSources()
	export const customer_subscriptions = new CustomerSubscriptions()
	export const customers = new Customers()
	export const delivery_lead_times = new DeliveryLeadTimes()
	export const discount_engine_items = new DiscountEngineItems()
	export const discount_engines = new DiscountEngines()
	export const easypost_pickups = new EasypostPickups()
	export const event_callbacks = new EventCallbacks()
	export const events = new Events()
	export const exportz = new Exports()
	export const external_gateways = new ExternalGateways()
	export const external_payments = new ExternalPayments()
	export const external_promotions = new ExternalPromotions()
	export const external_tax_calculators = new ExternalTaxCalculators()
	export const fixed_amount_promotions = new FixedAmountPromotions()
	export const fixed_price_promotions = new FixedPricePromotions()
	export const flex_promotions = new FlexPromotions()
	export const free_gift_promotions = new FreeGiftPromotions()
	export const free_shipping_promotions = new FreeShippingPromotions()
	export const geocoders = new Geocoders()
	export const gift_card_recipients = new GiftCardRecipients()
	export const gift_cards = new GiftCards()
	export const google_geocoders = new GoogleGeocoders()
	export const imports = new Imports()
	export const in_stock_subscriptions = new InStockSubscriptions()
	export const inventory_models = new InventoryModels()
	export const inventory_return_locations = new InventoryReturnLocations()
	export const inventory_stock_locations = new InventoryStockLocations()
	export const klarna_gateways = new KlarnaGateways()
	export const klarna_payments = new KlarnaPayments()
	export const line_item_options = new LineItemOptions()
	export const line_items = new LineItems()
	export const links = new Links()
	export const manual_gateways = new ManualGateways()
	export const manual_tax_calculators = new ManualTaxCalculators()
	export const markets = new Markets()
	export const merchants = new Merchants()
	export const notifications = new Notifications()
	export const order_amount_promotion_rules = new OrderAmountPromotionRules()
	export const order_copies = new OrderCopies()
	export const order_factories = new OrderFactories()
	export const order_subscription_items = new OrderSubscriptionItems()
	export const order_subscriptions = new OrderSubscriptions()
	export const orders = new Orders()
	export const organization = new Organizations()
	export const packages = new Packages()
	export const parcel_line_items = new ParcelLineItems()
	export const parcels = new Parcels()
	export const payment_gateways = new PaymentGateways()
	export const payment_methods = new PaymentMethods()
	export const payment_options = new PaymentOptions()
	export const paypal_gateways = new PaypalGateways()
	export const paypal_payments = new PaypalPayments()
	export const percentage_discount_promotions = new PercentageDiscountPromotions()
	export const pickups = new Pickups()
	export const price_frequency_tiers = new PriceFrequencyTiers()
	export const price_list_schedulers = new PriceListSchedulers()
	export const price_lists = new PriceLists()
	export const price_tiers = new PriceTiers()
	export const price_volume_tiers = new PriceVolumeTiers()
	export const prices = new Prices()
	export const promotion_rules = new PromotionRules()
	export const promotions = new Promotions()
	export const recurring_order_copies = new RecurringOrderCopies()
	export const refunds = new Refunds()
	export const reserved_stocks = new ReservedStocks()
	export const resource_errors = new ResourceErrors()
	export const return_line_items = new ReturnLineItems()
	export const returns = new Returns()
	export const satispay_gateways = new SatispayGateways()
	export const satispay_payments = new SatispayPayments()
	export const shipments = new Shipments()
	export const shipping_categories = new ShippingCategories()
	export const shipping_method_tiers = new ShippingMethodTiers()
	export const shipping_methods = new ShippingMethods()
	export const shipping_weight_tiers = new ShippingWeightTiers()
	export const shipping_zones = new ShippingZones()
	export const sku_list_items = new SkuListItems()
	export const sku_list_promotion_rules = new SkuListPromotionRules()
	export const sku_lists = new SkuLists()
	export const sku_options = new SkuOptions()
	export const skus = new Skus()
	export const stock_items = new StockItems()
	export const stock_line_items = new StockLineItems()
	export const stock_locations = new StockLocations()
	export const stock_reservations = new StockReservations()
	export const stock_transfers = new StockTransfers()
	export const stores = new Stores()
	export const stripe_gateways = new StripeGateways()
	export const stripe_payments = new StripePayments()
	export const stripe_tax_accounts = new StripeTaxAccounts()
	export const subscription_models = new SubscriptionModels()
	export const tags = new Tags()
	export const talon_one_accounts = new TalonOneAccounts()
	export const tax_calculators = new TaxCalculators()
	export const tax_categories = new TaxCategories()
	export const tax_rules = new TaxRules()
	export const taxjar_accounts = new TaxjarAccounts()
	export const transactions = new Transactions()
	export const versions = new Versions()
	export const vertex_accounts = new VertexAccounts()
	export const voids = new Voids()
	export const webhooks = new Webhooks()
	export const wire_transfers = new WireTransfers()
// ##__CL_INSTANCES_STOP__##



export const initCommerceLayer = (config: CommerceLayerInitConfig): void => {
  ApiResourceAdapter.init(config)
}
