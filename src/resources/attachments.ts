/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.7.0
 * Generation date: 14-09-2021
 **/

import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { Bundle } from './bundles'
import { CarrierAccount } from './carrier_accounts'
import { CustomerGroup } from './customer_groups'
import { Customer } from './customers'
import { DeliveryLeadTime } from './delivery_lead_times'
import { Geocoder } from './geocoders'
import { GiftCardRecipient } from './gift_card_recipients'
import { GiftCard } from './gift_cards'
import { InventoryModel } from './inventory_models'
import { Market } from './markets'
import { Merchant } from './merchants'
import { BillingInfoValidationRule } from './billing_info_validation_rules'
import { Order } from './orders'
import { Package } from './packages'
import { Parcel } from './parcels'
import { PaymentMethod } from './payment_methods'
import { PriceList } from './price_lists'
import { Price } from './prices'
import { Promotion } from './promotions'
import { Return } from './returns'
import { Shipment } from './shipments'
import { ShippingCategory } from './shipping_categories'
import { ShippingMethod } from './shipping_methods'
import { ShippingZone } from './shipping_zones'
import { SkuOption } from './sku_options'
import { Sku } from './skus'
import { StockItem } from './stock_items'
import { StockLocation } from './stock_locations'
import { TaxCalculator } from './tax_calculators'
import { TaxCategory } from './tax_categories'


type AttachmentRel = ResourceId & { type: typeof Attachments.TYPE }
type BundleRel = ResourceId & { type: 'bundles' }
type CarrierAccountRel = ResourceId & { type: 'carrier_accounts' }
type CustomerGroupRel = ResourceId & { type: 'customer_groups' }
type CustomerRel = ResourceId & { type: 'customers' }
type DeliveryLeadTimeRel = ResourceId & { type: 'delivery_lead_times' }
type GeocoderRel = ResourceId & { type: 'geocoders' }
type GiftCardRecipientRel = ResourceId & { type: 'gift_card_recipients' }
type GiftCardRel = ResourceId & { type: 'gift_cards' }
type InventoryModelRel = ResourceId & { type: 'inventory_models' }
type MarketRel = ResourceId & { type: 'markets' }
type MerchantRel = ResourceId & { type: 'merchants' }
type BillingInfoValidationRuleRel = ResourceId & { type: 'billing_info_validation_rules' }
type OrderRel = ResourceId & { type: 'orders' }
type PackageRel = ResourceId & { type: 'packages' }
type ParcelRel = ResourceId & { type: 'parcels' }
type PaymentMethodRel = ResourceId & { type: 'payment_methods' }
type PriceListRel = ResourceId & { type: 'price_lists' }
type PriceRel = ResourceId & { type: 'prices' }
type PromotionRel = ResourceId & { type: 'promotions' }
type ReturnRel = ResourceId & { type: 'returns' }
type ShipmentRel = ResourceId & { type: 'shipments' }
type ShippingCategoryRel = ResourceId & { type: 'shipping_categories' }
type ShippingMethodRel = ResourceId & { type: 'shipping_methods' }
type ShippingZoneRel = ResourceId & { type: 'shipping_zones' }
type SkuOptionRel = ResourceId & { type: 'sku_options' }
type SkuRel = ResourceId & { type: 'skus' }
type StockItemRel = ResourceId & { type: 'stock_items' }
type StockLocationRel = ResourceId & { type: 'stock_locations' }
type TaxCalculatorRel = ResourceId & { type: 'tax_calculators' }
type TaxCategoryRel = ResourceId & { type: 'tax_categories' }


interface Attachment extends Resource {
	
	name?: string
	description?: string
	url?: string

	attachable?: Bundle | CarrierAccount | CustomerGroup | Customer | DeliveryLeadTime | Geocoder | GiftCardRecipient | GiftCard | InventoryModel | Market | Merchant | BillingInfoValidationRule | Order | Package | Parcel | PaymentMethod | PriceList | Price | Promotion | Return | Shipment | ShippingCategory | ShippingMethod | ShippingZone | SkuOption | Sku | StockItem | StockLocation | TaxCalculator | TaxCategory

}


interface AttachmentCreate extends ResourceCreate {
	
	name: string
	description?: string
	url?: string

	attachable?: BundleRel | CarrierAccountRel | CustomerGroupRel | CustomerRel | DeliveryLeadTimeRel | GeocoderRel | GiftCardRecipientRel | GiftCardRel | InventoryModelRel | MarketRel | MerchantRel | BillingInfoValidationRuleRel | OrderRel | PackageRel | ParcelRel | PaymentMethodRel | PriceListRel | PriceRel | PromotionRel | ReturnRel | ShipmentRel | ShippingCategoryRel | ShippingMethodRel | ShippingZoneRel | SkuOptionRel | SkuRel | StockItemRel | StockLocationRel | TaxCalculatorRel | TaxCategoryRel

}


interface AttachmentUpdate extends ResourceUpdate {
	
	name?: string
	description?: string
	url?: string

	attachable?: BundleRel | CarrierAccountRel | CustomerGroupRel | CustomerRel | DeliveryLeadTimeRel | GeocoderRel | GiftCardRecipientRel | GiftCardRel | InventoryModelRel | MarketRel | MerchantRel | BillingInfoValidationRuleRel | OrderRel | PackageRel | ParcelRel | PaymentMethodRel | PriceListRel | PriceRel | PromotionRel | ReturnRel | ShipmentRel | ShippingCategoryRel | ShippingMethodRel | ShippingZoneRel | SkuOptionRel | SkuRel | StockItemRel | StockLocationRel | TaxCalculatorRel | TaxCategoryRel

}


class Attachments extends ApiResource {

	static readonly TYPE: 'attachments' = 'attachments'
	// static readonly PATH = 'attachments'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		return this.resources.list({ type: Attachments.TYPE }, params, options)
	}

	async create(resource: AttachmentCreate, options?: ResourcesConfig): Promise<Attachment> {
		return this.resources.create(Object.assign(resource, { type: Attachments.TYPE }) , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Attachment> {
		return this.resources.retrieve<Attachment>({ type: Attachments.TYPE, id }, params, options)
	}

	async update(resource: AttachmentUpdate, options?: ResourcesConfig): Promise<Attachment> {
		return this.resources.update({ ...resource, type: Attachments.TYPE }, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: Attachments.TYPE, id }, options)
	}
	


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isAttachment(resource: any): resource is Attachment {
		return resource.type && (resource.type === Attachments.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(Attachments.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(Attachments.TYPE)
	}
	*/

	relationship(id: string | ResourceId): AttachmentRel {
		return (typeof id === 'string') ? { id, type: Attachments.TYPE } : {id: id.id, type: Attachments.TYPE }
	}

}


export default Attachments

export { Attachment, AttachmentCreate, AttachmentUpdate }
