import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { Market } from './markets';
import { ShippingZone } from './shipping_zones';
import { ShippingCategory } from './shipping_categories';
import { DeliveryLeadTime } from './delivery_lead_times';
import { Attachment } from './attachments';
declare type ShippingMethodRel = ResourceId & {
    type: typeof ShippingMethods.TYPE;
};
declare type MarketRel = ResourceId & {
    type: 'markets';
};
declare type ShippingZoneRel = ResourceId & {
    type: 'shipping_zones';
};
declare type ShippingCategoryRel = ResourceId & {
    type: 'shipping_categories';
};
interface ShippingMethod extends Resource {
    name?: string;
    disabled_at?: string;
    currency_code?: string;
    price_amount_cents?: number;
    price_amount_float?: number;
    formatted_price_amount?: string;
    free_over_amount_cents?: number;
    free_over_amount_float?: number;
    formatted_free_over_amount?: string;
    price_amount_for_shipment_cents?: number;
    price_amount_for_shipment_float?: number;
    formatted_price_amount_for_shipment?: string;
    market?: Market;
    shipping_zone?: ShippingZone;
    shipping_category?: ShippingCategory;
    delivery_lead_time_for_shipment?: DeliveryLeadTime;
    attachments?: Attachment[];
}
interface ShippingMethodCreate extends ResourceCreate {
    name: string;
    price_amount_cents: number;
    free_over_amount_cents?: number;
    market: MarketRel;
    shipping_zone: ShippingZoneRel;
    shipping_category: ShippingCategoryRel;
}
interface ShippingMethodUpdate extends ResourceUpdate {
    name?: string;
    price_amount_cents?: number;
    free_over_amount_cents?: number;
    market?: MarketRel;
    shipping_zone?: ShippingZoneRel;
    shipping_category?: ShippingCategoryRel;
}
declare class ShippingMethods extends ApiResource {
    static readonly TYPE: 'shipping_methods';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<ShippingMethod>>;
    create(resource: ShippingMethodCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ShippingMethod>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ShippingMethod>;
    update(resource: ShippingMethodUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ShippingMethod>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isShippingMethod(resource: any): resource is ShippingMethod;
    relationship(id: string | ResourceId): ShippingMethodRel;
    type(): string;
}
export default ShippingMethods;
export { ShippingMethod, ShippingMethodCreate, ShippingMethodUpdate };
