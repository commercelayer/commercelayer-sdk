import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ResourceSortable, ResourceFilterable } from '../resource'
import type { QueryParamsRetrieve } from '../query'

import type { Bundle, BundleType, BundleSortable } from './bundles'
import type { CarrierAccount, CarrierAccountType, CarrierAccountSortable } from './carrier_accounts'
import type { CustomerGroup, CustomerGroupType, CustomerGroupSortable } from './customer_groups'
import type { Customer, CustomerType, CustomerSortable } from './customers'
import type { DeliveryLeadTime, DeliveryLeadTimeType, DeliveryLeadTimeSortable } from './delivery_lead_times'
import type { Geocoder, GeocoderType, GeocoderSortable } from './geocoders'
import type { GiftCardRecipient, GiftCardRecipientType, GiftCardRecipientSortable } from './gift_card_recipients'
import type { GiftCard, GiftCardType, GiftCardSortable } from './gift_cards'
import type { InventoryModel, InventoryModelType, InventoryModelSortable } from './inventory_models'
import type { Market, MarketType, MarketSortable } from './markets'
import type { Merchant, MerchantType, MerchantSortable } from './merchants'
import type { BillingInfoValidationRule, BillingInfoValidationRuleType, BillingInfoValidationRuleSortable } from './billing_info_validation_rules'
import type { Order, OrderType, OrderSortable } from './orders'
import type { Package, PackageType, PackageSortable } from './packages'
import type { Parcel, ParcelType, ParcelSortable } from './parcels'
import type { PaymentMethod, PaymentMethodType, PaymentMethodSortable } from './payment_methods'
import type { PriceList, PriceListType, PriceListSortable } from './price_lists'
import type { Price, PriceType, PriceSortable } from './prices'
import type { Promotion, PromotionType, PromotionSortable } from './promotions'
import type { Return, ReturnType, ReturnSortable } from './returns'
import type { Shipment, ShipmentType, ShipmentSortable } from './shipments'
import type { ShippingCategory, ShippingCategoryType, ShippingCategorySortable } from './shipping_categories'
import type { ShippingMethod, ShippingMethodType, ShippingMethodSortable } from './shipping_methods'
import type { ShippingZone, ShippingZoneType, ShippingZoneSortable } from './shipping_zones'
import type { SkuOption, SkuOptionType, SkuOptionSortable } from './sku_options'
import type { Sku, SkuType, SkuSortable } from './skus'
import type { StockItem, StockItemType, StockItemSortable } from './stock_items'
import type { StockLocation, StockLocationType, StockLocationSortable } from './stock_locations'
import type { TaxCalculator, TaxCalculatorType, TaxCalculatorSortable } from './tax_calculators'
import type { TaxCategory, TaxCategoryType, TaxCategorySortable } from './tax_categories'


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


export type AttachmentSortable = Pick<Attachment, 'id' | 'name'> & ResourceSortable
export type AttachmentFilterable = Pick<Attachment, 'id' | 'name' | 'description'> & ResourceFilterable


interface Attachment extends Resource {
	
	readonly type: AttachmentType

	name: string
	description?: string | null
	url?: string | null

	attachable?: Bundle | CarrierAccount | CustomerGroup | Customer | DeliveryLeadTime | Geocoder | GiftCardRecipient | GiftCard | InventoryModel | Market | Merchant | BillingInfoValidationRule | Order | Package | Parcel | PaymentMethod | PriceList | Price | Promotion | Return | Shipment | ShippingCategory | ShippingMethod | ShippingZone | SkuOption | Sku | StockItem | StockLocation | TaxCalculator | TaxCategory | null

}


interface AttachmentCreate extends ResourceCreate {
	
	name: string
	description?: string | null
	url?: string | null

	attachable: BundleRel | CarrierAccountRel | CustomerGroupRel | CustomerRel | DeliveryLeadTimeRel | GeocoderRel | GiftCardRecipientRel | GiftCardRel | InventoryModelRel | MarketRel | MerchantRel | BillingInfoValidationRuleRel | OrderRel | PackageRel | ParcelRel | PaymentMethodRel | PriceListRel | PriceRel | PromotionRel | ReturnRel | ShipmentRel | ShippingCategoryRel | ShippingMethodRel | ShippingZoneRel | SkuOptionRel | SkuRel | StockItemRel | StockLocationRel | TaxCalculatorRel | TaxCategoryRel

}


interface AttachmentUpdate extends ResourceUpdate {
	
	name?: string | null
	description?: string | null
	url?: string | null

	attachable?: BundleRel | CarrierAccountRel | CustomerGroupRel | CustomerRel | DeliveryLeadTimeRel | GeocoderRel | GiftCardRecipientRel | GiftCardRel | InventoryModelRel | MarketRel | MerchantRel | BillingInfoValidationRuleRel | OrderRel | PackageRel | ParcelRel | PaymentMethodRel | PriceListRel | PriceRel | PromotionRel | ReturnRel | ShipmentRel | ShippingCategoryRel | ShippingMethodRel | ShippingZoneRel | SkuOptionRel | SkuRel | StockItemRel | StockLocationRel | TaxCalculatorRel | TaxCategoryRel | null

}


class Attachments extends ApiResource<Attachment, AttachmentSortable> {

	static readonly TYPE: AttachmentType = 'attachments' as const

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
		return super.relationshipOneToOne<AttachmentRel>(id)
	}

	relationshipToMany(...ids: string[]): AttachmentRel[] {
		return super.relationshipOneToMany<AttachmentRel>(...ids)
	}


	type(): AttachmentType {
		return Attachments.TYPE
	}

}


export default Attachments

export type { Attachment, AttachmentCreate, AttachmentUpdate, AttachmentType }

/*
export const AttachmentsClient = (init: ResourceAdapter | ResourcesInitConfig): Attachments => {
	return new Attachments((init instanceof ResourcesInitConfig)? ApiResourceAdapter(init) : init )
}
*/
