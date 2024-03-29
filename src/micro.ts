import ResourceAdapter, { apiResourceAdapter, type ResourcesInitConfig } from "./resource"
import * as api from './api'


type InitParamType = ResourceAdapter | ResourcesInitConfig

const initParam = (init: InitParamType): ResourceAdapter => {
  return (init instanceof ResourceAdapter)? init : apiResourceAdapter(init)
}


// ##__API_RESOURCES_MICRO_CLIENTS_START__##
/**
 * ©2024 Commerce Layer Inc.
 **/
export const addressesClient = (init: InitParamType): api.Addresses => {
	return new api.Addresses(initParam(init))
}

export const adjustmentsClient = (init: InitParamType): api.Adjustments => {
	return new api.Adjustments(initParam(init))
}

export const adyenGatewaysClient = (init: InitParamType): api.AdyenGateways => {
	return new api.AdyenGateways(initParam(init))
}

export const adyenPaymentsClient = (init: InitParamType): api.AdyenPayments => {
	return new api.AdyenPayments(initParam(init))
}

export const applicationsClient = (init: InitParamType): api.Applications => {
	return new api.Applications(initParam(init))
}

export const attachmentsClient = (init: InitParamType): api.Attachments => {
	return new api.Attachments(initParam(init))
}

export const authorizationsClient = (init: InitParamType): api.Authorizations => {
	return new api.Authorizations(initParam(init))
}

export const avalaraAccountsClient = (init: InitParamType): api.AvalaraAccounts => {
	return new api.AvalaraAccounts(initParam(init))
}

export const axerveGatewaysClient = (init: InitParamType): api.AxerveGateways => {
	return new api.AxerveGateways(initParam(init))
}

export const axervePaymentsClient = (init: InitParamType): api.AxervePayments => {
	return new api.AxervePayments(initParam(init))
}

export const billingInfoValidationRulesClient = (init: InitParamType): api.BillingInfoValidationRules => {
	return new api.BillingInfoValidationRules(initParam(init))
}

export const bingGeocodersClient = (init: InitParamType): api.BingGeocoders => {
	return new api.BingGeocoders(initParam(init))
}

export const braintreeGatewaysClient = (init: InitParamType): api.BraintreeGateways => {
	return new api.BraintreeGateways(initParam(init))
}

export const braintreePaymentsClient = (init: InitParamType): api.BraintreePayments => {
	return new api.BraintreePayments(initParam(init))
}

export const bundlesClient = (init: InitParamType): api.Bundles => {
	return new api.Bundles(initParam(init))
}

export const buyXPayYPromotionsClient = (init: InitParamType): api.BuyXPayYPromotions => {
	return new api.BuyXPayYPromotions(initParam(init))
}

export const capturesClient = (init: InitParamType): api.Captures => {
	return new api.Captures(initParam(init))
}

export const carrierAccountsClient = (init: InitParamType): api.CarrierAccounts => {
	return new api.CarrierAccounts(initParam(init))
}

export const checkoutComGatewaysClient = (init: InitParamType): api.CheckoutComGateways => {
	return new api.CheckoutComGateways(initParam(init))
}

export const checkoutComPaymentsClient = (init: InitParamType): api.CheckoutComPayments => {
	return new api.CheckoutComPayments(initParam(init))
}

export const cleanupsClient = (init: InitParamType): api.Cleanups => {
	return new api.Cleanups(initParam(init))
}

export const couponCodesPromotionRulesClient = (init: InitParamType): api.CouponCodesPromotionRules => {
	return new api.CouponCodesPromotionRules(initParam(init))
}

export const couponRecipientsClient = (init: InitParamType): api.CouponRecipients => {
	return new api.CouponRecipients(initParam(init))
}

export const couponsClient = (init: InitParamType): api.Coupons => {
	return new api.Coupons(initParam(init))
}

export const customPromotionRulesClient = (init: InitParamType): api.CustomPromotionRules => {
	return new api.CustomPromotionRules(initParam(init))
}

export const customerAddressesClient = (init: InitParamType): api.CustomerAddresses => {
	return new api.CustomerAddresses(initParam(init))
}

export const customerGroupsClient = (init: InitParamType): api.CustomerGroups => {
	return new api.CustomerGroups(initParam(init))
}

export const customerPasswordResetsClient = (init: InitParamType): api.CustomerPasswordResets => {
	return new api.CustomerPasswordResets(initParam(init))
}

export const customerPaymentSourcesClient = (init: InitParamType): api.CustomerPaymentSources => {
	return new api.CustomerPaymentSources(initParam(init))
}

export const customerSubscriptionsClient = (init: InitParamType): api.CustomerSubscriptions => {
	return new api.CustomerSubscriptions(initParam(init))
}

export const customersClient = (init: InitParamType): api.Customers => {
	return new api.Customers(initParam(init))
}

export const deliveryLeadTimesClient = (init: InitParamType): api.DeliveryLeadTimes => {
	return new api.DeliveryLeadTimes(initParam(init))
}

export const eventCallbacksClient = (init: InitParamType): api.EventCallbacks => {
	return new api.EventCallbacks(initParam(init))
}

export const eventsClient = (init: InitParamType): api.Events => {
	return new api.Events(initParam(init))
}

export const exportsClient = (init: InitParamType): api.Exports => {
	return new api.Exports(initParam(init))
}

export const externalGatewaysClient = (init: InitParamType): api.ExternalGateways => {
	return new api.ExternalGateways(initParam(init))
}

export const externalPaymentsClient = (init: InitParamType): api.ExternalPayments => {
	return new api.ExternalPayments(initParam(init))
}

export const externalPromotionsClient = (init: InitParamType): api.ExternalPromotions => {
	return new api.ExternalPromotions(initParam(init))
}

export const externalTaxCalculatorsClient = (init: InitParamType): api.ExternalTaxCalculators => {
	return new api.ExternalTaxCalculators(initParam(init))
}

export const fixedAmountPromotionsClient = (init: InitParamType): api.FixedAmountPromotions => {
	return new api.FixedAmountPromotions(initParam(init))
}

export const fixedPricePromotionsClient = (init: InitParamType): api.FixedPricePromotions => {
	return new api.FixedPricePromotions(initParam(init))
}

export const freeGiftPromotionsClient = (init: InitParamType): api.FreeGiftPromotions => {
	return new api.FreeGiftPromotions(initParam(init))
}

export const freeShippingPromotionsClient = (init: InitParamType): api.FreeShippingPromotions => {
	return new api.FreeShippingPromotions(initParam(init))
}

export const geocodersClient = (init: InitParamType): api.Geocoders => {
	return new api.Geocoders(initParam(init))
}

export const giftCardRecipientsClient = (init: InitParamType): api.GiftCardRecipients => {
	return new api.GiftCardRecipients(initParam(init))
}

export const giftCardsClient = (init: InitParamType): api.GiftCards => {
	return new api.GiftCards(initParam(init))
}

export const googleGeocodersClient = (init: InitParamType): api.GoogleGeocoders => {
	return new api.GoogleGeocoders(initParam(init))
}

export const importsClient = (init: InitParamType): api.Imports => {
	return new api.Imports(initParam(init))
}

export const inStockSubscriptionsClient = (init: InitParamType): api.InStockSubscriptions => {
	return new api.InStockSubscriptions(initParam(init))
}

export const inventoryModelsClient = (init: InitParamType): api.InventoryModels => {
	return new api.InventoryModels(initParam(init))
}

export const inventoryReturnLocationsClient = (init: InitParamType): api.InventoryReturnLocations => {
	return new api.InventoryReturnLocations(initParam(init))
}

export const inventoryStockLocationsClient = (init: InitParamType): api.InventoryStockLocations => {
	return new api.InventoryStockLocations(initParam(init))
}

export const klarnaGatewaysClient = (init: InitParamType): api.KlarnaGateways => {
	return new api.KlarnaGateways(initParam(init))
}

export const klarnaPaymentsClient = (init: InitParamType): api.KlarnaPayments => {
	return new api.KlarnaPayments(initParam(init))
}

export const lineItemOptionsClient = (init: InitParamType): api.LineItemOptions => {
	return new api.LineItemOptions(initParam(init))
}

export const lineItemsClient = (init: InitParamType): api.LineItems => {
	return new api.LineItems(initParam(init))
}

export const manualGatewaysClient = (init: InitParamType): api.ManualGateways => {
	return new api.ManualGateways(initParam(init))
}

export const manualTaxCalculatorsClient = (init: InitParamType): api.ManualTaxCalculators => {
	return new api.ManualTaxCalculators(initParam(init))
}

export const marketsClient = (init: InitParamType): api.Markets => {
	return new api.Markets(initParam(init))
}

export const merchantsClient = (init: InitParamType): api.Merchants => {
	return new api.Merchants(initParam(init))
}

export const orderAmountPromotionRulesClient = (init: InitParamType): api.OrderAmountPromotionRules => {
	return new api.OrderAmountPromotionRules(initParam(init))
}

export const orderCopiesClient = (init: InitParamType): api.OrderCopies => {
	return new api.OrderCopies(initParam(init))
}

export const orderFactoriesClient = (init: InitParamType): api.OrderFactories => {
	return new api.OrderFactories(initParam(init))
}

export const orderSubscriptionItemsClient = (init: InitParamType): api.OrderSubscriptionItems => {
	return new api.OrderSubscriptionItems(initParam(init))
}

export const orderSubscriptionsClient = (init: InitParamType): api.OrderSubscriptions => {
	return new api.OrderSubscriptions(initParam(init))
}

export const orderValidationRulesClient = (init: InitParamType): api.OrderValidationRules => {
	return new api.OrderValidationRules(initParam(init))
}

export const ordersClient = (init: InitParamType): api.Orders => {
	return new api.Orders(initParam(init))
}

export const organizationsClient = (init: InitParamType): api.Organizations => {
	return new api.Organizations(initParam(init))
}

export const packagesClient = (init: InitParamType): api.Packages => {
	return new api.Packages(initParam(init))
}

export const parcelLineItemsClient = (init: InitParamType): api.ParcelLineItems => {
	return new api.ParcelLineItems(initParam(init))
}

export const parcelsClient = (init: InitParamType): api.Parcels => {
	return new api.Parcels(initParam(init))
}

export const paymentGatewaysClient = (init: InitParamType): api.PaymentGateways => {
	return new api.PaymentGateways(initParam(init))
}

export const paymentMethodsClient = (init: InitParamType): api.PaymentMethods => {
	return new api.PaymentMethods(initParam(init))
}

export const paymentOptionsClient = (init: InitParamType): api.PaymentOptions => {
	return new api.PaymentOptions(initParam(init))
}

export const paypalGatewaysClient = (init: InitParamType): api.PaypalGateways => {
	return new api.PaypalGateways(initParam(init))
}

export const paypalPaymentsClient = (init: InitParamType): api.PaypalPayments => {
	return new api.PaypalPayments(initParam(init))
}

export const percentageDiscountPromotionsClient = (init: InitParamType): api.PercentageDiscountPromotions => {
	return new api.PercentageDiscountPromotions(initParam(init))
}

export const priceFrequencyTiersClient = (init: InitParamType): api.PriceFrequencyTiers => {
	return new api.PriceFrequencyTiers(initParam(init))
}

export const priceListsClient = (init: InitParamType): api.PriceLists => {
	return new api.PriceLists(initParam(init))
}

export const priceTiersClient = (init: InitParamType): api.PriceTiers => {
	return new api.PriceTiers(initParam(init))
}

export const priceVolumeTiersClient = (init: InitParamType): api.PriceVolumeTiers => {
	return new api.PriceVolumeTiers(initParam(init))
}

export const pricesClient = (init: InitParamType): api.Prices => {
	return new api.Prices(initParam(init))
}

export const promotionRulesClient = (init: InitParamType): api.PromotionRules => {
	return new api.PromotionRules(initParam(init))
}

export const promotionsClient = (init: InitParamType): api.Promotions => {
	return new api.Promotions(initParam(init))
}

export const recurringOrderCopiesClient = (init: InitParamType): api.RecurringOrderCopies => {
	return new api.RecurringOrderCopies(initParam(init))
}

export const refundsClient = (init: InitParamType): api.Refunds => {
	return new api.Refunds(initParam(init))
}

export const reservedStocksClient = (init: InitParamType): api.ReservedStocks => {
	return new api.ReservedStocks(initParam(init))
}

export const resourceErrorsClient = (init: InitParamType): api.ResourceErrors => {
	return new api.ResourceErrors(initParam(init))
}

export const returnLineItemsClient = (init: InitParamType): api.ReturnLineItems => {
	return new api.ReturnLineItems(initParam(init))
}

export const returnsClient = (init: InitParamType): api.Returns => {
	return new api.Returns(initParam(init))
}

export const satispayGatewaysClient = (init: InitParamType): api.SatispayGateways => {
	return new api.SatispayGateways(initParam(init))
}

export const satispayPaymentsClient = (init: InitParamType): api.SatispayPayments => {
	return new api.SatispayPayments(initParam(init))
}

export const shipmentsClient = (init: InitParamType): api.Shipments => {
	return new api.Shipments(initParam(init))
}

export const shippingCategoriesClient = (init: InitParamType): api.ShippingCategories => {
	return new api.ShippingCategories(initParam(init))
}

export const shippingMethodTiersClient = (init: InitParamType): api.ShippingMethodTiers => {
	return new api.ShippingMethodTiers(initParam(init))
}

export const shippingMethodsClient = (init: InitParamType): api.ShippingMethods => {
	return new api.ShippingMethods(initParam(init))
}

export const shippingWeightTiersClient = (init: InitParamType): api.ShippingWeightTiers => {
	return new api.ShippingWeightTiers(initParam(init))
}

export const shippingZonesClient = (init: InitParamType): api.ShippingZones => {
	return new api.ShippingZones(initParam(init))
}

export const skuListItemsClient = (init: InitParamType): api.SkuListItems => {
	return new api.SkuListItems(initParam(init))
}

export const skuListPromotionRulesClient = (init: InitParamType): api.SkuListPromotionRules => {
	return new api.SkuListPromotionRules(initParam(init))
}

export const skuListsClient = (init: InitParamType): api.SkuLists => {
	return new api.SkuLists(initParam(init))
}

export const skuOptionsClient = (init: InitParamType): api.SkuOptions => {
	return new api.SkuOptions(initParam(init))
}

export const skusClient = (init: InitParamType): api.Skus => {
	return new api.Skus(initParam(init))
}

export const stockItemsClient = (init: InitParamType): api.StockItems => {
	return new api.StockItems(initParam(init))
}

export const stockLineItemsClient = (init: InitParamType): api.StockLineItems => {
	return new api.StockLineItems(initParam(init))
}

export const stockLocationsClient = (init: InitParamType): api.StockLocations => {
	return new api.StockLocations(initParam(init))
}

export const stockReservationsClient = (init: InitParamType): api.StockReservations => {
	return new api.StockReservations(initParam(init))
}

export const stockTransfersClient = (init: InitParamType): api.StockTransfers => {
	return new api.StockTransfers(initParam(init))
}

export const stripeGatewaysClient = (init: InitParamType): api.StripeGateways => {
	return new api.StripeGateways(initParam(init))
}

export const stripePaymentsClient = (init: InitParamType): api.StripePayments => {
	return new api.StripePayments(initParam(init))
}

export const subscriptionModelsClient = (init: InitParamType): api.SubscriptionModels => {
	return new api.SubscriptionModels(initParam(init))
}

export const tagsClient = (init: InitParamType): api.Tags => {
	return new api.Tags(initParam(init))
}

export const taxCalculatorsClient = (init: InitParamType): api.TaxCalculators => {
	return new api.TaxCalculators(initParam(init))
}

export const taxCategoriesClient = (init: InitParamType): api.TaxCategories => {
	return new api.TaxCategories(initParam(init))
}

export const taxRulesClient = (init: InitParamType): api.TaxRules => {
	return new api.TaxRules(initParam(init))
}

export const taxjarAccountsClient = (init: InitParamType): api.TaxjarAccounts => {
	return new api.TaxjarAccounts(initParam(init))
}

export const transactionsClient = (init: InitParamType): api.Transactions => {
	return new api.Transactions(initParam(init))
}

export const versionsClient = (init: InitParamType): api.Versions => {
	return new api.Versions(initParam(init))
}

export const voidsClient = (init: InitParamType): api.Voids => {
	return new api.Voids(initParam(init))
}

export const webhooksClient = (init: InitParamType): api.Webhooks => {
	return new api.Webhooks(initParam(init))
}

export const wireTransfersClient = (init: InitParamType): api.WireTransfers => {
	return new api.WireTransfers(initParam(init))
}

// ##__API_RESOURCES_MICRO_CLIENTS_STOP__##
