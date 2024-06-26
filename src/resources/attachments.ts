import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve } from '../query'

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
import type { StockTransfer, StockTransferType } from './stock_transfers'
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
type StockTransferRel = ResourceRel & { type: StockTransferType }
type TaxCalculatorRel = ResourceRel & { type: TaxCalculatorType }
type TaxCategoryRel = ResourceRel & { type: TaxCategoryType }


export type AttachmentSort = Pick<Attachment, 'id' | 'name'> & ResourceSort
// export type AttachmentFilter = Pick<Attachment, 'id' | 'name' | 'description'> & ResourceFilter


interface Attachment extends Resource {
	
	readonly type: AttachmentType

	/** 
	 * The internal name of the attachment..
	 * @example ```"DDT transport document"```
	 */
	name: string
	/** 
	 * An internal description of the attachment..
	 * @example ```"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."```
	 */
	description?: string | null
	/** 
	 * The attachment URL..
	 * @example ```"https://s3.yourdomain.com/attachment.pdf"```
	 */
	url?: string | null

	attachable?: Bundle | CarrierAccount | CustomerGroup | Customer | DeliveryLeadTime | Geocoder | GiftCardRecipient | GiftCard | InventoryModel | Market | Merchant | BillingInfoValidationRule | Order | Package | Parcel | PaymentMethod | PriceList | Price | Promotion | Return | Shipment | ShippingCategory | ShippingMethod | ShippingZone | SkuOption | Sku | StockItem | StockLocation | StockTransfer | TaxCalculator | TaxCategory | null

}


interface AttachmentCreate extends ResourceCreate {
	
	/** 
	 * The internal name of the attachment..
	 * @example ```"DDT transport document"```
	 */
	name: string
	/** 
	 * An internal description of the attachment..
	 * @example ```"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."```
	 */
	description?: string | null
	/** 
	 * The attachment URL..
	 * @example ```"https://s3.yourdomain.com/attachment.pdf"```
	 */
	url?: string | null

	attachable: BundleRel | CarrierAccountRel | CustomerGroupRel | CustomerRel | DeliveryLeadTimeRel | GeocoderRel | GiftCardRecipientRel | GiftCardRel | InventoryModelRel | MarketRel | MerchantRel | BillingInfoValidationRuleRel | OrderRel | PackageRel | ParcelRel | PaymentMethodRel | PriceListRel | PriceRel | PromotionRel | ReturnRel | ShipmentRel | ShippingCategoryRel | ShippingMethodRel | ShippingZoneRel | SkuOptionRel | SkuRel | StockItemRel | StockLocationRel | StockTransferRel | TaxCalculatorRel | TaxCategoryRel

}


interface AttachmentUpdate extends ResourceUpdate {
	
	/** 
	 * The internal name of the attachment..
	 * @example ```"DDT transport document"```
	 */
	name?: string | null
	/** 
	 * An internal description of the attachment..
	 * @example ```"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."```
	 */
	description?: string | null
	/** 
	 * The attachment URL..
	 * @example ```"https://s3.yourdomain.com/attachment.pdf"```
	 */
	url?: string | null

	attachable?: BundleRel | CarrierAccountRel | CustomerGroupRel | CustomerRel | DeliveryLeadTimeRel | GeocoderRel | GiftCardRecipientRel | GiftCardRel | InventoryModelRel | MarketRel | MerchantRel | BillingInfoValidationRuleRel | OrderRel | PackageRel | ParcelRel | PaymentMethodRel | PriceListRel | PriceRel | PromotionRel | ReturnRel | ShipmentRel | ShippingCategoryRel | ShippingMethodRel | ShippingZoneRel | SkuOptionRel | SkuRel | StockItemRel | StockLocationRel | StockTransferRel | TaxCalculatorRel | TaxCategoryRel | null

}


class Attachments extends ApiResource<Attachment> {

	static readonly TYPE: AttachmentType = 'attachments' as const

	async create(resource: AttachmentCreate, params?: QueryParamsRetrieve<Attachment>, options?: ResourcesConfig): Promise<Attachment> {
		return this.resources.create<AttachmentCreate, Attachment>({ ...resource, type: Attachments.TYPE }, params, options)
	}

	async update(resource: AttachmentUpdate, params?: QueryParamsRetrieve<Attachment>, options?: ResourcesConfig): Promise<Attachment> {
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
