import type { QueryParamsList, QueryParamsRetrieve } from '@runtime/query'
import type {
  ListResponse,
  Resource,
  ResourceCreate,
  ResourceId,
  ResourceRel,
  ResourceSort,
  /* ResourceFilter */ ResourcesConfig,
  ResourceUpdate,
} from '@runtime/resource'
import { ApiResource } from '@runtime/resource'
import type { Bundle, BundleType } from './bundles'
import type { CarrierAccount, CarrierAccountType } from './carrier_accounts'
import type { CouponRecipient, CouponRecipientType } from './coupon_recipients'
import type { CustomerGroup, CustomerGroupType } from './customer_groups'
import type { Customer, CustomerType } from './customers'
import type { DeliveryLeadTime, DeliveryLeadTimeType } from './delivery_lead_times'
import type { DiscountEngine, DiscountEngineType } from './discount_engines'
import type { EventStore } from './event_stores'
import type { Geocoder, GeocoderType } from './geocoders'
import type { GiftCardRecipient, GiftCardRecipientType } from './gift_card_recipients'
import type { GiftCard, GiftCardType } from './gift_cards'
import type { InventoryModel, InventoryModelType } from './inventory_models'
import type { Market, MarketType } from './markets'
import type { Merchant, MerchantType } from './merchants'
import type { OrderValidationRule, OrderValidationRuleType } from './order_validation_rules'
import type { Order, OrderType } from './orders'
import type { Package, PackageType } from './packages'
import type { Parcel, ParcelType } from './parcels'
import type { PaymentLink, PaymentLinkType } from './payment_links'
import type { PaymentMethod, PaymentMethodType } from './payment_methods'
import type { PaymentOption, PaymentOptionType } from './payment_options'
import type { PaymentSession, PaymentSessionType } from './payment_sessions'
import type { PaymentTransaction, PaymentTransactionType } from './payment_transactions'
import type { PaymentWallet, PaymentWalletType } from './payment_wallets'
import type { PriceList, PriceListType } from './price_lists'
import type { PriceTier, PriceTierType } from './price_tiers'
import type { Price, PriceType } from './prices'
import type { Promotion, PromotionType } from './promotions'
import type { Return, ReturnType } from './returns'
import type { Shipment, ShipmentType } from './shipments'
import type { ShippingCategory, ShippingCategoryType } from './shipping_categories'
import type { ShippingMethodTier, ShippingMethodTierType } from './shipping_method_tiers'
import type { ShippingMethod, ShippingMethodType } from './shipping_methods'
import type { ShippingZone, ShippingZoneType } from './shipping_zones'
import type { SkuList, SkuListType } from './sku_lists'
import type { SkuOption, SkuOptionType } from './sku_options'
import type { Sku, SkuType } from './skus'
import type { StockItem, StockItemType } from './stock_items'
import type { StockLocation, StockLocationType } from './stock_locations'
import type { StockTransfer, StockTransferType } from './stock_transfers'
import type { SubscriptionModel, SubscriptionModelType } from './subscription_models'
import type { TaxCalculator, TaxCalculatorType } from './tax_calculators'
import type { TaxCategory, TaxCategoryType } from './tax_categories'
import type { Transaction, TransactionType } from './transactions'

type AttachmentType = 'attachments'
type AttachmentRel = ResourceRel & { type: AttachmentType }
type MarketRel = ResourceRel & { type: MarketType }
type PriceListRel = ResourceRel & { type: PriceListType }
type CustomerGroupRel = ResourceRel & { type: CustomerGroupType }
type PromotionRel = ResourceRel & { type: PromotionType }
type TaxCalculatorRel = ResourceRel & { type: TaxCalculatorType }
type GeocoderRel = ResourceRel & { type: GeocoderType }
type PaymentMethodRel = ResourceRel & { type: PaymentMethodType }
type OrderRel = ResourceRel & { type: OrderType }
type TransactionRel = ResourceRel & { type: TransactionType }
type PaymentSessionRel = ResourceRel & { type: PaymentSessionType }
type TaxCategoryRel = ResourceRel & { type: TaxCategoryType }
type SkuRel = ResourceRel & { type: SkuType }
type ShippingCategoryRel = ResourceRel & { type: ShippingCategoryType }
type OrderValidationRuleRel = ResourceRel & { type: OrderValidationRuleType }
type BundleRel = ResourceRel & { type: BundleType }
type SkuListRel = ResourceRel & { type: SkuListType }
type StockItemRel = ResourceRel & { type: StockItemType }
type StockLocationRel = ResourceRel & { type: StockLocationType }
type ReturnRel = ResourceRel & { type: ReturnType }
type CarrierAccountRel = ResourceRel & { type: CarrierAccountType }
type CouponRecipientRel = ResourceRel & { type: CouponRecipientType }
type CustomerRel = ResourceRel & { type: CustomerType }
type PaymentWalletRel = ResourceRel & { type: PaymentWalletType }
type DeliveryLeadTimeRel = ResourceRel & { type: DeliveryLeadTimeType }
type ShippingMethodRel = ResourceRel & { type: ShippingMethodType }
type ShipmentRel = ResourceRel & { type: ShipmentType }
type DiscountEngineRel = ResourceRel & { type: DiscountEngineType }
type ParcelRel = ResourceRel & { type: ParcelType }
type GiftCardRecipientRel = ResourceRel & { type: GiftCardRecipientType }
type GiftCardRel = ResourceRel & { type: GiftCardType }
type InventoryModelRel = ResourceRel & { type: InventoryModelType }
type StockTransferRel = ResourceRel & { type: StockTransferType }
type SkuOptionRel = ResourceRel & { type: SkuOptionType }
type MerchantRel = ResourceRel & { type: MerchantType }
type SubscriptionModelRel = ResourceRel & { type: SubscriptionModelType }
type PaymentOptionRel = ResourceRel & { type: PaymentOptionType }
type PaymentTransactionRel = ResourceRel & { type: PaymentTransactionType }
type PaymentLinkRel = ResourceRel & { type: PaymentLinkType }
type PackageRel = ResourceRel & { type: PackageType }
type PriceRel = ResourceRel & { type: PriceType }
type PriceTierRel = ResourceRel & { type: PriceTierType }
type ShippingMethodTierRel = ResourceRel & { type: ShippingMethodTierType }
type ShippingZoneRel = ResourceRel & { type: ShippingZoneType }

export type AttachmentSort = Pick<Attachment, 'id' | 'name'> & ResourceSort
// export type AttachmentFilter = Pick<Attachment, 'id' | 'name' | 'description'> & ResourceFilter

/**
 * The Attachment object is returned as part of the response body of each successful list, retrieve, create, update or delete API call to the /api/attachments endpoint.
 *
 * @link https://docs.commercelayer.io/core-api-reference/attachments/object
 */
interface Attachment extends Resource {
  readonly type: AttachmentType

  /**
   * The internal name of the attachment.
   * @example ```"DDT transport document"```
   */
  name: string
  /**
   * An internal description of the attachment.
   * @example ```"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."```
   */
  description?: string | null
  /**
   * The attachment URL.
   * @example ```"https://s3.yourdomain.com/attachment.pdf"```
   */
  url?: string | null

  attachable?:
    | Market
    | PriceList
    | CustomerGroup
    | Promotion
    | TaxCalculator
    | Geocoder
    | PaymentMethod
    | Order
    | Transaction
    | PaymentSession
    | TaxCategory
    | Sku
    | ShippingCategory
    | OrderValidationRule
    | Bundle
    | SkuList
    | StockItem
    | StockLocation
    | Return
    | CarrierAccount
    | CouponRecipient
    | Customer
    | PaymentWallet
    | DeliveryLeadTime
    | ShippingMethod
    | Shipment
    | DiscountEngine
    | Parcel
    | GiftCardRecipient
    | GiftCard
    | InventoryModel
    | StockTransfer
    | SkuOption
    | Merchant
    | SubscriptionModel
    | PaymentOption
    | PaymentTransaction
    | PaymentLink
    | Package
    | Price
    | PriceTier
    | ShippingMethodTier
    | ShippingZone
    | null
  event_stores?: EventStore[] | null
}

interface AttachmentCreate extends ResourceCreate {
  /**
   * The internal name of the attachment.
   * @example ```"DDT transport document"```
   */
  name: string
  /**
   * An internal description of the attachment.
   * @example ```"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."```
   */
  description?: string | null
  /**
   * The attachment URL.
   * @example ```"https://s3.yourdomain.com/attachment.pdf"```
   */
  url?: string | null

  attachable:
    | MarketRel
    | PriceListRel
    | CustomerGroupRel
    | PromotionRel
    | TaxCalculatorRel
    | GeocoderRel
    | PaymentMethodRel
    | OrderRel
    | TransactionRel
    | PaymentSessionRel
    | TaxCategoryRel
    | SkuRel
    | ShippingCategoryRel
    | OrderValidationRuleRel
    | BundleRel
    | SkuListRel
    | StockItemRel
    | StockLocationRel
    | ReturnRel
    | CarrierAccountRel
    | CouponRecipientRel
    | CustomerRel
    | PaymentWalletRel
    | DeliveryLeadTimeRel
    | ShippingMethodRel
    | ShipmentRel
    | DiscountEngineRel
    | ParcelRel
    | GiftCardRecipientRel
    | GiftCardRel
    | InventoryModelRel
    | StockTransferRel
    | SkuOptionRel
    | MerchantRel
    | SubscriptionModelRel
    | PaymentOptionRel
    | PaymentTransactionRel
    | PaymentLinkRel
    | PackageRel
    | PriceRel
    | PriceTierRel
    | ShippingMethodTierRel
    | ShippingZoneRel
}

interface AttachmentUpdate extends ResourceUpdate {
  /**
   * The internal name of the attachment.
   * @example ```"DDT transport document"```
   */
  name?: string | null
  /**
   * An internal description of the attachment.
   * @example ```"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."```
   */
  description?: string | null
  /**
   * The attachment URL.
   * @example ```"https://s3.yourdomain.com/attachment.pdf"```
   */
  url?: string | null

  attachable?:
    | MarketRel
    | PriceListRel
    | CustomerGroupRel
    | PromotionRel
    | TaxCalculatorRel
    | GeocoderRel
    | PaymentMethodRel
    | OrderRel
    | TransactionRel
    | PaymentSessionRel
    | TaxCategoryRel
    | SkuRel
    | ShippingCategoryRel
    | OrderValidationRuleRel
    | BundleRel
    | SkuListRel
    | StockItemRel
    | StockLocationRel
    | ReturnRel
    | CarrierAccountRel
    | CouponRecipientRel
    | CustomerRel
    | PaymentWalletRel
    | DeliveryLeadTimeRel
    | ShippingMethodRel
    | ShipmentRel
    | DiscountEngineRel
    | ParcelRel
    | GiftCardRecipientRel
    | GiftCardRel
    | InventoryModelRel
    | StockTransferRel
    | SkuOptionRel
    | MerchantRel
    | SubscriptionModelRel
    | PaymentOptionRel
    | PaymentTransactionRel
    | PaymentLinkRel
    | PackageRel
    | PriceRel
    | PriceTierRel
    | ShippingMethodTierRel
    | ShippingZoneRel
    | null
}

class Attachments extends ApiResource<Attachment> {
  static readonly TYPE: AttachmentType = 'attachments' as const

  async create(
    resource: AttachmentCreate,
    params?: QueryParamsRetrieve<Attachment>,
    options?: ResourcesConfig,
  ): Promise<Attachment> {
    return this.resources.create<AttachmentCreate, Attachment>({ ...resource, type: Attachments.TYPE }, params, options)
  }

  async update(
    resource: AttachmentUpdate,
    params?: QueryParamsRetrieve<Attachment>,
    options?: ResourcesConfig,
  ): Promise<Attachment> {
    return this.resources.update<AttachmentUpdate, Attachment>({ ...resource, type: Attachments.TYPE }, params, options)
  }

  async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
    await this.resources.delete(typeof id === 'string' ? { id, type: Attachments.TYPE } : id, options)
  }

  async event_stores(
    attachmentId: string | Attachment,
    params?: QueryParamsList<EventStore>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<EventStore>> {
    const _attachmentId = (attachmentId as Attachment).id || (attachmentId as string)
    return this.resources.fetch<EventStore>(
      { type: 'event_stores' },
      `attachments/${_attachmentId}/event_stores`,
      params,
      options,
    ) as unknown as ListResponse<EventStore>
  }

  isAttachment(resource: any): resource is Attachment {
    return resource.type && resource.type === Attachments.TYPE
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

const instance = new Attachments()
export default instance

export type { Attachment, AttachmentCreate, Attachments, AttachmentType, AttachmentUpdate }
