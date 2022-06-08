
import * as api from './api'
import { ApiError } from './error'
import type { ErrorInterceptor, InterceptorType, RawResponseReader, RequestInterceptor, ResponseInterceptor, ResponseObj } from './interceptor'
import { CommerceLayerStatic } from './static'
import ResourceAdapter, { ResourcesConfig, ResourcesInitConfig } from './resource'


const OPEN_API_SCHEMA_VERSION = '2.9.4'


type SdkConfig = {}

type CommerceLayerInitConfig = SdkConfig & ResourcesInitConfig
type CommerceLayerConfig = SdkConfig & ResourcesConfig



class CommerceLayerClient {

	static get openApiSchemaVersion() { return OPEN_API_SCHEMA_VERSION }

	#adapter: ResourceAdapter
	#organization: string

	// ##__CL_RESOURCES_DEF_START__##
	// ##__CL_RESOURCES_DEF_TEMPLATE:: ##__TAB__####__RESOURCE_TYPE__##: api.##__RESOURCE_CLASS__##
	addresses: api.Addresses
	adjustments: api.Adjustments
	adyen_gateways: api.AdyenGateways
	adyen_payments: api.AdyenPayments
	application: api.Applications
	attachments: api.Attachments
	authorizations: api.Authorizations
	avalara_accounts: api.AvalaraAccounts
	billing_info_validation_rules: api.BillingInfoValidationRules
	bing_geocoders: api.BingGeocoders
	braintree_gateways: api.BraintreeGateways
	braintree_payments: api.BraintreePayments
	bundles: api.Bundles
	captures: api.Captures
	carrier_accounts: api.CarrierAccounts
	checkout_com_gateways: api.CheckoutComGateways
	checkout_com_payments: api.CheckoutComPayments
	coupon_codes_promotion_rules: api.CouponCodesPromotionRules
	coupon_recipients: api.CouponRecipients
	coupons: api.Coupons
	customer_addresses: api.CustomerAddresses
	customer_groups: api.CustomerGroups
	customer_password_resets: api.CustomerPasswordResets
	customer_payment_sources: api.CustomerPaymentSources
	customer_subscriptions: api.CustomerSubscriptions
	customers: api.Customers
	delivery_lead_times: api.DeliveryLeadTimes
	event_callbacks: api.EventCallbacks
	external_gateways: api.ExternalGateways
	external_payments: api.ExternalPayments
	external_promotions: api.ExternalPromotions
	external_tax_calculators: api.ExternalTaxCalculators
	fixed_amount_promotions: api.FixedAmountPromotions
	fixed_price_promotions: api.FixedPricePromotions
	free_gift_promotions: api.FreeGiftPromotions
	free_shipping_promotions: api.FreeShippingPromotions
	geocoders: api.Geocoders
	gift_card_recipients: api.GiftCardRecipients
	gift_cards: api.GiftCards
	google_geocoders: api.GoogleGeocoders
	imports: api.Imports
	in_stock_subscriptions: api.InStockSubscriptions
	inventory_models: api.InventoryModels
	inventory_return_locations: api.InventoryReturnLocations
	inventory_stock_locations: api.InventoryStockLocations
	klarna_gateways: api.KlarnaGateways
	klarna_payments: api.KlarnaPayments
	line_item_options: api.LineItemOptions
	line_items: api.LineItems
	manual_gateways: api.ManualGateways
	manual_tax_calculators: api.ManualTaxCalculators
	markets: api.Markets
	merchants: api.Merchants
	order_amount_promotion_rules: api.OrderAmountPromotionRules
	order_copies: api.OrderCopies
	order_subscriptions: api.OrderSubscriptions
	order_validation_rules: api.OrderValidationRules
	orders: api.Orders
	organization: api.Organizations
	packages: api.Packages
	parcel_line_items: api.ParcelLineItems
	parcels: api.Parcels
	payment_gateways: api.PaymentGateways
	payment_methods: api.PaymentMethods
	paypal_gateways: api.PaypalGateways
	paypal_payments: api.PaypalPayments
	percentage_discount_promotions: api.PercentageDiscountPromotions
	price_lists: api.PriceLists
	prices: api.Prices
	promotion_rules: api.PromotionRules
	promotions: api.Promotions
	refunds: api.Refunds
	return_line_items: api.ReturnLineItems
	returns: api.Returns
	shipments: api.Shipments
	shipping_categories: api.ShippingCategories
	shipping_methods: api.ShippingMethods
	shipping_zones: api.ShippingZones
	sku_list_items: api.SkuListItems
	sku_list_promotion_rules: api.SkuListPromotionRules
	sku_lists: api.SkuLists
	sku_options: api.SkuOptions
	skus: api.Skus
	stock_items: api.StockItems
	stock_line_items: api.StockLineItems
	stock_locations: api.StockLocations
	stock_transfers: api.StockTransfers
	stripe_gateways: api.StripeGateways
	stripe_payments: api.StripePayments
	tax_calculators: api.TaxCalculators
	tax_categories: api.TaxCategories
	tax_rules: api.TaxRules
	taxjar_accounts: api.TaxjarAccounts
	transactions: api.Transactions
	voids: api.Voids
	webhooks: api.Webhooks
	wire_transfers: api.WireTransfers
	// ##__CL_RESOURCES_DEF_STOP__##


	constructor(config: CommerceLayerInitConfig) {

		this.#adapter = new ResourceAdapter(config)
		this.#organization = config.organization

		// ##__CL_RESOURCES_INIT_START__##
		// ##__CL_RESOURCES_INIT_TEMPLATE:: ##__TAB__####__TAB__##this.##__RESOURCE_TYPE__## = new api.##__RESOURCE_CLASS__##(this.#adapter)
		this.addresses = new api.Addresses(this.#adapter)
		this.adjustments = new api.Adjustments(this.#adapter)
		this.adyen_gateways = new api.AdyenGateways(this.#adapter)
		this.adyen_payments = new api.AdyenPayments(this.#adapter)
		this.application = new api.Applications(this.#adapter)
		this.attachments = new api.Attachments(this.#adapter)
		this.authorizations = new api.Authorizations(this.#adapter)
		this.avalara_accounts = new api.AvalaraAccounts(this.#adapter)
		this.billing_info_validation_rules = new api.BillingInfoValidationRules(this.#adapter)
		this.bing_geocoders = new api.BingGeocoders(this.#adapter)
		this.braintree_gateways = new api.BraintreeGateways(this.#adapter)
		this.braintree_payments = new api.BraintreePayments(this.#adapter)
		this.bundles = new api.Bundles(this.#adapter)
		this.captures = new api.Captures(this.#adapter)
		this.carrier_accounts = new api.CarrierAccounts(this.#adapter)
		this.checkout_com_gateways = new api.CheckoutComGateways(this.#adapter)
		this.checkout_com_payments = new api.CheckoutComPayments(this.#adapter)
		this.coupon_codes_promotion_rules = new api.CouponCodesPromotionRules(this.#adapter)
		this.coupon_recipients = new api.CouponRecipients(this.#adapter)
		this.coupons = new api.Coupons(this.#adapter)
		this.customer_addresses = new api.CustomerAddresses(this.#adapter)
		this.customer_groups = new api.CustomerGroups(this.#adapter)
		this.customer_password_resets = new api.CustomerPasswordResets(this.#adapter)
		this.customer_payment_sources = new api.CustomerPaymentSources(this.#adapter)
		this.customer_subscriptions = new api.CustomerSubscriptions(this.#adapter)
		this.customers = new api.Customers(this.#adapter)
		this.delivery_lead_times = new api.DeliveryLeadTimes(this.#adapter)
		this.event_callbacks = new api.EventCallbacks(this.#adapter)
		this.external_gateways = new api.ExternalGateways(this.#adapter)
		this.external_payments = new api.ExternalPayments(this.#adapter)
		this.external_promotions = new api.ExternalPromotions(this.#adapter)
		this.external_tax_calculators = new api.ExternalTaxCalculators(this.#adapter)
		this.fixed_amount_promotions = new api.FixedAmountPromotions(this.#adapter)
		this.fixed_price_promotions = new api.FixedPricePromotions(this.#adapter)
		this.free_gift_promotions = new api.FreeGiftPromotions(this.#adapter)
		this.free_shipping_promotions = new api.FreeShippingPromotions(this.#adapter)
		this.geocoders = new api.Geocoders(this.#adapter)
		this.gift_card_recipients = new api.GiftCardRecipients(this.#adapter)
		this.gift_cards = new api.GiftCards(this.#adapter)
		this.google_geocoders = new api.GoogleGeocoders(this.#adapter)
		this.imports = new api.Imports(this.#adapter)
		this.in_stock_subscriptions = new api.InStockSubscriptions(this.#adapter)
		this.inventory_models = new api.InventoryModels(this.#adapter)
		this.inventory_return_locations = new api.InventoryReturnLocations(this.#adapter)
		this.inventory_stock_locations = new api.InventoryStockLocations(this.#adapter)
		this.klarna_gateways = new api.KlarnaGateways(this.#adapter)
		this.klarna_payments = new api.KlarnaPayments(this.#adapter)
		this.line_item_options = new api.LineItemOptions(this.#adapter)
		this.line_items = new api.LineItems(this.#adapter)
		this.manual_gateways = new api.ManualGateways(this.#adapter)
		this.manual_tax_calculators = new api.ManualTaxCalculators(this.#adapter)
		this.markets = new api.Markets(this.#adapter)
		this.merchants = new api.Merchants(this.#adapter)
		this.order_amount_promotion_rules = new api.OrderAmountPromotionRules(this.#adapter)
		this.order_copies = new api.OrderCopies(this.#adapter)
		this.order_subscriptions = new api.OrderSubscriptions(this.#adapter)
		this.order_validation_rules = new api.OrderValidationRules(this.#adapter)
		this.orders = new api.Orders(this.#adapter)
		this.organization = new api.Organizations(this.#adapter)
		this.packages = new api.Packages(this.#adapter)
		this.parcel_line_items = new api.ParcelLineItems(this.#adapter)
		this.parcels = new api.Parcels(this.#adapter)
		this.payment_gateways = new api.PaymentGateways(this.#adapter)
		this.payment_methods = new api.PaymentMethods(this.#adapter)
		this.paypal_gateways = new api.PaypalGateways(this.#adapter)
		this.paypal_payments = new api.PaypalPayments(this.#adapter)
		this.percentage_discount_promotions = new api.PercentageDiscountPromotions(this.#adapter)
		this.price_lists = new api.PriceLists(this.#adapter)
		this.prices = new api.Prices(this.#adapter)
		this.promotion_rules = new api.PromotionRules(this.#adapter)
		this.promotions = new api.Promotions(this.#adapter)
		this.refunds = new api.Refunds(this.#adapter)
		this.return_line_items = new api.ReturnLineItems(this.#adapter)
		this.returns = new api.Returns(this.#adapter)
		this.shipments = new api.Shipments(this.#adapter)
		this.shipping_categories = new api.ShippingCategories(this.#adapter)
		this.shipping_methods = new api.ShippingMethods(this.#adapter)
		this.shipping_zones = new api.ShippingZones(this.#adapter)
		this.sku_list_items = new api.SkuListItems(this.#adapter)
		this.sku_list_promotion_rules = new api.SkuListPromotionRules(this.#adapter)
		this.sku_lists = new api.SkuLists(this.#adapter)
		this.sku_options = new api.SkuOptions(this.#adapter)
		this.skus = new api.Skus(this.#adapter)
		this.stock_items = new api.StockItems(this.#adapter)
		this.stock_line_items = new api.StockLineItems(this.#adapter)
		this.stock_locations = new api.StockLocations(this.#adapter)
		this.stock_transfers = new api.StockTransfers(this.#adapter)
		this.stripe_gateways = new api.StripeGateways(this.#adapter)
		this.stripe_payments = new api.StripePayments(this.#adapter)
		this.tax_calculators = new api.TaxCalculators(this.#adapter)
		this.tax_categories = new api.TaxCategories(this.#adapter)
		this.tax_rules = new api.TaxRules(this.#adapter)
		this.taxjar_accounts = new api.TaxjarAccounts(this.#adapter)
		this.transactions = new api.Transactions(this.#adapter)
		this.voids = new api.Voids(this.#adapter)
		this.webhooks = new api.Webhooks(this.#adapter)
		this.wire_transfers = new api.WireTransfers(this.#adapter)
		// ##__CL_RESOURCES_INIT_STOP__##

	}


	get currentOrganization(): string { return this.#organization }


	config(config: CommerceLayerConfig): void {

		// CommerceLayer config
		if (config.organization) this.#organization = config.organization

		// ResourceAdapter config
		this.#adapter.config(config)

	}

	
	resources(): readonly string[] {
		return CommerceLayerStatic.resources()
	}
	

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isApiError(error: any): error is ApiError {
		return CommerceLayerStatic.isApiError(error)
	}


	addRequestInterceptor(onFulfilled?: RequestInterceptor, onRejected?: ErrorInterceptor): number {
		return this.#adapter.interceptors.request.use(onFulfilled, onRejected)
	}

	addResponseInterceptor(onFulfilled?: ResponseInterceptor, onRejected?: ErrorInterceptor): number {
		return this.#adapter.interceptors.response.use(onFulfilled, onRejected)
	}

	removeInterceptor(type: InterceptorType, id: number): void {
		return this.#adapter.interceptors[type].eject(id)
	}


	addRawResponseReader(): RawResponseReader {

		const reader: RawResponseReader = {
			id: undefined,
			rawResponse: undefined,
		}

		function rawResponseInterceptor(response: ResponseObj): ResponseObj {
			reader.rawResponse = response?.data
			return response
		}
		
		const interceptor = this.addResponseInterceptor(rawResponseInterceptor)
		reader.id = interceptor

		return reader

	}

	removeRawResponseReader(reader: number | RawResponseReader): void {
		const id = (typeof reader === 'number') ? reader : reader.id
		if (id) return this.removeInterceptor('response', id)
	}

}



const CommerceLayer = (config: CommerceLayerInitConfig): CommerceLayerClient => {
	return new CommerceLayerClient(config)
}


export default CommerceLayer

export type { CommerceLayerClient, CommerceLayerConfig, CommerceLayerInitConfig }
