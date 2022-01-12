import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { Bundle } from './bundles';
import { CarrierAccount } from './carrier_accounts';
import { CustomerGroup } from './customer_groups';
import { Customer } from './customers';
import { DeliveryLeadTime } from './delivery_lead_times';
import { Geocoder } from './geocoders';
import { GiftCardRecipient } from './gift_card_recipients';
import { GiftCard } from './gift_cards';
import { InventoryModel } from './inventory_models';
import { Market } from './markets';
import { Merchant } from './merchants';
import { BillingInfoValidationRule } from './billing_info_validation_rules';
import { Order } from './orders';
import { Package } from './packages';
import { Parcel } from './parcels';
import { PaymentMethod } from './payment_methods';
import { PriceList } from './price_lists';
import { Price } from './prices';
import { Promotion } from './promotions';
import { Return } from './returns';
import { Shipment } from './shipments';
import { ShippingCategory } from './shipping_categories';
import { ShippingMethod } from './shipping_methods';
import { ShippingZone } from './shipping_zones';
import { SkuOption } from './sku_options';
import { Sku } from './skus';
import { StockItem } from './stock_items';
import { StockLocation } from './stock_locations';
import { TaxCalculator } from './tax_calculators';
import { TaxCategory } from './tax_categories';
declare type AttachmentRel = ResourceId & {
    type: typeof Attachments.TYPE;
};
declare type BundleRel = ResourceId & {
    type: 'bundles';
};
declare type CarrierAccountRel = ResourceId & {
    type: 'carrier_accounts';
};
declare type CustomerGroupRel = ResourceId & {
    type: 'customer_groups';
};
declare type CustomerRel = ResourceId & {
    type: 'customers';
};
declare type DeliveryLeadTimeRel = ResourceId & {
    type: 'delivery_lead_times';
};
declare type GeocoderRel = ResourceId & {
    type: 'geocoders';
};
declare type GiftCardRecipientRel = ResourceId & {
    type: 'gift_card_recipients';
};
declare type GiftCardRel = ResourceId & {
    type: 'gift_cards';
};
declare type InventoryModelRel = ResourceId & {
    type: 'inventory_models';
};
declare type MarketRel = ResourceId & {
    type: 'markets';
};
declare type MerchantRel = ResourceId & {
    type: 'merchants';
};
declare type BillingInfoValidationRuleRel = ResourceId & {
    type: 'billing_info_validation_rules';
};
declare type OrderRel = ResourceId & {
    type: 'orders';
};
declare type PackageRel = ResourceId & {
    type: 'packages';
};
declare type ParcelRel = ResourceId & {
    type: 'parcels';
};
declare type PaymentMethodRel = ResourceId & {
    type: 'payment_methods';
};
declare type PriceListRel = ResourceId & {
    type: 'price_lists';
};
declare type PriceRel = ResourceId & {
    type: 'prices';
};
declare type PromotionRel = ResourceId & {
    type: 'promotions';
};
declare type ReturnRel = ResourceId & {
    type: 'returns';
};
declare type ShipmentRel = ResourceId & {
    type: 'shipments';
};
declare type ShippingCategoryRel = ResourceId & {
    type: 'shipping_categories';
};
declare type ShippingMethodRel = ResourceId & {
    type: 'shipping_methods';
};
declare type ShippingZoneRel = ResourceId & {
    type: 'shipping_zones';
};
declare type SkuOptionRel = ResourceId & {
    type: 'sku_options';
};
declare type SkuRel = ResourceId & {
    type: 'skus';
};
declare type StockItemRel = ResourceId & {
    type: 'stock_items';
};
declare type StockLocationRel = ResourceId & {
    type: 'stock_locations';
};
declare type TaxCalculatorRel = ResourceId & {
    type: 'tax_calculators';
};
declare type TaxCategoryRel = ResourceId & {
    type: 'tax_categories';
};
interface Attachment extends Resource {
    name?: string;
    description?: string;
    url?: string;
    attachable?: Bundle | CarrierAccount | CustomerGroup | Customer | DeliveryLeadTime | Geocoder | GiftCardRecipient | GiftCard | InventoryModel | Market | Merchant | BillingInfoValidationRule | Order | Package | Parcel | PaymentMethod | PriceList | Price | Promotion | Return | Shipment | ShippingCategory | ShippingMethod | ShippingZone | SkuOption | Sku | StockItem | StockLocation | TaxCalculator | TaxCategory;
}
interface AttachmentCreate extends ResourceCreate {
    name: string;
    description?: string;
    url?: string;
    attachable: BundleRel | CarrierAccountRel | CustomerGroupRel | CustomerRel | DeliveryLeadTimeRel | GeocoderRel | GiftCardRecipientRel | GiftCardRel | InventoryModelRel | MarketRel | MerchantRel | BillingInfoValidationRuleRel | OrderRel | PackageRel | ParcelRel | PaymentMethodRel | PriceListRel | PriceRel | PromotionRel | ReturnRel | ShipmentRel | ShippingCategoryRel | ShippingMethodRel | ShippingZoneRel | SkuOptionRel | SkuRel | StockItemRel | StockLocationRel | TaxCalculatorRel | TaxCategoryRel;
}
interface AttachmentUpdate extends ResourceUpdate {
    name?: string;
    description?: string;
    url?: string;
    attachable?: BundleRel | CarrierAccountRel | CustomerGroupRel | CustomerRel | DeliveryLeadTimeRel | GeocoderRel | GiftCardRecipientRel | GiftCardRel | InventoryModelRel | MarketRel | MerchantRel | BillingInfoValidationRuleRel | OrderRel | PackageRel | ParcelRel | PaymentMethodRel | PriceListRel | PriceRel | PromotionRel | ReturnRel | ShipmentRel | ShippingCategoryRel | ShippingMethodRel | ShippingZoneRel | SkuOptionRel | SkuRel | StockItemRel | StockLocationRel | TaxCalculatorRel | TaxCategoryRel;
}
declare class Attachments extends ApiResource {
    static readonly TYPE: 'attachments';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>>;
    create(resource: AttachmentCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Attachment>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Attachment>;
    update(resource: AttachmentUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Attachment>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isAttachment(resource: any): resource is Attachment;
    relationship(id: string | ResourceId): AttachmentRel;
    type(): string;
}
export default Attachments;
export { Attachment, AttachmentCreate, AttachmentUpdate };
