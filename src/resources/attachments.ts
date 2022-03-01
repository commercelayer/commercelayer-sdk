import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import { QueryParamsList, QueryParamsRetrieve } from '../query'

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


type AttachmentRel = ResourceRel & { type: typeof Attachments.TYPE }
type BundleRel = ResourceRel & { type: 'bundles' }
type CarrierAccountRel = ResourceRel & { type: 'carrier_accounts' }
type CustomerGroupRel = ResourceRel & { type: 'customer_groups' }
type CustomerRel = ResourceRel & { type: 'customers' }
type DeliveryLeadTimeRel = ResourceRel & { type: 'delivery_lead_times' }
type GeocoderRel = ResourceRel & { type: 'geocoders' }
type GiftCardRecipientRel = ResourceRel & { type: 'gift_card_recipients' }
type GiftCardRel = ResourceRel & { type: 'gift_cards' }
type InventoryModelRel = ResourceRel & { type: 'inventory_models' }
type MarketRel = ResourceRel & { type: 'markets' }
type MerchantRel = ResourceRel & { type: 'merchants' }
type BillingInfoValidationRuleRel = ResourceRel & { type: 'billing_info_validation_rules' }
type OrderRel = ResourceRel & { type: 'orders' }
type PackageRel = ResourceRel & { type: 'packages' }
type ParcelRel = ResourceRel & { type: 'parcels' }
type PaymentMethodRel = ResourceRel & { type: 'payment_methods' }
type PriceListRel = ResourceRel & { type: 'price_lists' }
type PriceRel = ResourceRel & { type: 'prices' }
type PromotionRel = ResourceRel & { type: 'promotions' }
type ReturnRel = ResourceRel & { type: 'returns' }
type ShipmentRel = ResourceRel & { type: 'shipments' }
type ShippingCategoryRel = ResourceRel & { type: 'shipping_categories' }
type ShippingMethodRel = ResourceRel & { type: 'shipping_methods' }
type ShippingZoneRel = ResourceRel & { type: 'shipping_zones' }
type SkuOptionRel = ResourceRel & { type: 'sku_options' }
type SkuRel = ResourceRel & { type: 'skus' }
type StockItemRel = ResourceRel & { type: 'stock_items' }
type StockLocationRel = ResourceRel & { type: 'stock_locations' }
type TaxCalculatorRel = ResourceRel & { type: 'tax_calculators' }
type TaxCategoryRel = ResourceRel & { type: 'tax_categories' }


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

	attachable: BundleRel | CarrierAccountRel | CustomerGroupRel | CustomerRel | DeliveryLeadTimeRel | GeocoderRel | GiftCardRecipientRel | GiftCardRel | InventoryModelRel | MarketRel | MerchantRel | BillingInfoValidationRuleRel | OrderRel | PackageRel | ParcelRel | PaymentMethodRel | PriceListRel | PriceRel | PromotionRel | ReturnRel | ShipmentRel | ShippingCategoryRel | ShippingMethodRel | ShippingZoneRel | SkuOptionRel | SkuRel | StockItemRel | StockLocationRel | TaxCalculatorRel | TaxCategoryRel

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
		return this.resources.list<Attachment>({ type: Attachments.TYPE }, params, options)
	}

	async create(resource: AttachmentCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Attachment> {
		return this.resources.create<AttachmentCreate, Attachment>({ ...resource, type: Attachments.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Attachment> {
		return this.resources.retrieve<Attachment>({ type: Attachments.TYPE, id }, params, options)
	}

	async update(resource: AttachmentUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Attachment> {
		return this.resources.update<AttachmentUpdate, Attachment>({ ...resource, type: Attachments.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: Attachments.TYPE, id }, options)
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isAttachment(resource: any): resource is Attachment {
		return resource.type && (resource.type === Attachments.TYPE)
	}


	relationship(id: string | ResourceId | null): AttachmentRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: Attachments.TYPE } : { id: id.id, type: Attachments.TYPE }
	}


	type(): string {
		return Attachments.TYPE
	}

}


export default Attachments

export { Attachment, AttachmentCreate, AttachmentUpdate }
