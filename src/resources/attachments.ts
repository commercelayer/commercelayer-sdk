import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Bundle, BundleType } from './bundles'
import type { CarrierAccount, CarrierAccountType } from './carrier_accounts'
import type { CustomerGroup, CustomerGroupType } from './customer_groups'
import type { Customer, CustomerType } from './customers'
import type { DeliveryLeadTime, DeliveryLeadTimeType } from './delivery_lead_times'
import type { Geocoder, GeocoderType } from './geocoders'
import type { GiftCardRecipient, GiftCardRecipientType } from './gift_card_recipients'
import type { GiftCard, GiftCardType } from './gift_cards'
import type { InventoryModel, InventoryModelType } from './inventory_models'
import type { Market, MarketType } from './markets'
import type { Merchant, MerchantType } from './merchants'
import type { BillingInfoValidationRule, BillingInfoValidationRuleType } from './billing_info_validation_rules'
import type { Order, OrderType } from './orders'
import type { Package, PackageType } from './packages'
import type { Parcel, ParcelType } from './parcels'
import type { PaymentMethod, PaymentMethodType } from './payment_methods'
import type { PriceList, PriceListType } from './price_lists'
import type { Price, PriceType } from './prices'
import type { Promotion, PromotionType } from './promotions'
import type { Return, ReturnType } from './returns'
import type { Shipment, ShipmentType } from './shipments'
import type { ShippingCategory, ShippingCategoryType } from './shipping_categories'
import type { ShippingMethod, ShippingMethodType } from './shipping_methods'
import type { ShippingZone, ShippingZoneType } from './shipping_zones'
import type { SkuOption, SkuOptionType } from './sku_options'
import type { Sku, SkuType } from './skus'
import type { StockItem, StockItemType } from './stock_items'
import type { StockLocation, StockLocationType } from './stock_locations'
import type { TaxCalculator, TaxCalculatorType } from './tax_calculators'
import type { TaxCategory, TaxCategoryType } from './tax_categories'


type AttachmentType = 'attachments'
type AttachmentRel = ResourceRel & { type: AttachmentType }
type BundleRel = ResourceRel & { type: BundleType }
type CarrierAccountRel = ResourceRel & { type: CarrierAccountType }
type CustomerGroupRel = ResourceRel & { type: CustomerGroupType }
type CustomerRel = ResourceRel & { type: CustomerType }
type DeliveryLeadTimeRel = ResourceRel & { type: DeliveryLeadTimeType }
type GeocoderRel = ResourceRel & { type: GeocoderType }
type GiftCardRecipientRel = ResourceRel & { type: GiftCardRecipientType }
type GiftCardRel = ResourceRel & { type: GiftCardType }
type InventoryModelRel = ResourceRel & { type: InventoryModelType }
type MarketRel = ResourceRel & { type: MarketType }
type MerchantRel = ResourceRel & { type: MerchantType }
type BillingInfoValidationRuleRel = ResourceRel & { type: BillingInfoValidationRuleType }
type OrderRel = ResourceRel & { type: OrderType }
type PackageRel = ResourceRel & { type: PackageType }
type ParcelRel = ResourceRel & { type: ParcelType }
type PaymentMethodRel = ResourceRel & { type: PaymentMethodType }
type PriceListRel = ResourceRel & { type: PriceListType }
type PriceRel = ResourceRel & { type: PriceType }
type PromotionRel = ResourceRel & { type: PromotionType }
type ReturnRel = ResourceRel & { type: ReturnType }
type ShipmentRel = ResourceRel & { type: ShipmentType }
type ShippingCategoryRel = ResourceRel & { type: ShippingCategoryType }
type ShippingMethodRel = ResourceRel & { type: ShippingMethodType }
type ShippingZoneRel = ResourceRel & { type: ShippingZoneType }
type SkuOptionRel = ResourceRel & { type: SkuOptionType }
type SkuRel = ResourceRel & { type: SkuType }
type StockItemRel = ResourceRel & { type: StockItemType }
type StockLocationRel = ResourceRel & { type: StockLocationType }
type TaxCalculatorRel = ResourceRel & { type: TaxCalculatorType }
type TaxCategoryRel = ResourceRel & { type: TaxCategoryType }


interface Attachment extends Resource {
	
	readonly type: AttachmentType

	name: string
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
	
	name: string
	description?: string
	url?: string

	attachable?: BundleRel | CarrierAccountRel | CustomerGroupRel | CustomerRel | DeliveryLeadTimeRel | GeocoderRel | GiftCardRecipientRel | GiftCardRel | InventoryModelRel | MarketRel | MerchantRel | BillingInfoValidationRuleRel | OrderRel | PackageRel | ParcelRel | PaymentMethodRel | PriceListRel | PriceRel | PromotionRel | ReturnRel | ShipmentRel | ShippingCategoryRel | ShippingMethodRel | ShippingZoneRel | SkuOptionRel | SkuRel | StockItemRel | StockLocationRel | TaxCalculatorRel | TaxCategoryRel

}


class Attachments extends ApiResource<Attachment> {

	static readonly TYPE: AttachmentType = 'attachments' as const

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		return this.resources.list<Attachment>({ type: Attachments.TYPE }, params, options)
	}

	async create(resource: AttachmentCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Attachment> {
		return this.resources.create<AttachmentCreate, Attachment>({ ...resource, type: Attachments.TYPE }, params, options)
	}

	async update(resource: AttachmentUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Attachment> {
		return this.resources.update<AttachmentUpdate, Attachment>({ ...resource, type: Attachments.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: Attachments.TYPE } : id, options)
	}


	isAttachment(resource: any): resource is Attachment {
		return resource.type && (resource.type === Attachments.TYPE)
	}


	relationship(id: string | ResourceId | null): AttachmentRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: Attachments.TYPE } : { id: id.id, type: Attachments.TYPE }
	}


	type(): AttachmentType {
		return Attachments.TYPE
	}

}


export default Attachments

export type { Attachment, AttachmentCreate, AttachmentUpdate, AttachmentType }
