import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { StockLocation } from './stock_locations';
import { ShippingMethod } from './shipping_methods';
import { Attachment } from './attachments';
declare type DeliveryLeadTimeRel = ResourceId & {
    type: typeof DeliveryLeadTimes.TYPE;
};
declare type StockLocationRel = ResourceId & {
    type: 'stock_locations';
};
declare type ShippingMethodRel = ResourceId & {
    type: 'shipping_methods';
};
interface DeliveryLeadTime extends Resource {
    min_hours?: number;
    max_hours?: number;
    min_days?: number;
    max_days?: number;
    stock_location?: StockLocation;
    shipping_method?: ShippingMethod;
    attachments?: Attachment[];
}
interface DeliveryLeadTimeCreate extends ResourceCreate {
    min_hours: number;
    max_hours: number;
    stock_location: StockLocationRel;
    shipping_method: ShippingMethodRel;
}
interface DeliveryLeadTimeUpdate extends ResourceUpdate {
    min_hours?: number;
    max_hours?: number;
    stock_location?: StockLocationRel;
    shipping_method?: ShippingMethodRel;
}
declare class DeliveryLeadTimes extends ApiResource {
    static readonly TYPE: 'delivery_lead_times';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<DeliveryLeadTime>>;
    create(resource: DeliveryLeadTimeCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<DeliveryLeadTime>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<DeliveryLeadTime>;
    update(resource: DeliveryLeadTimeUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<DeliveryLeadTime>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isDeliveryLeadTime(resource: any): resource is DeliveryLeadTime;
    relationship(id: string | ResourceId): DeliveryLeadTimeRel;
    type(): string;
}
export default DeliveryLeadTimes;
export { DeliveryLeadTime, DeliveryLeadTimeCreate, DeliveryLeadTimeUpdate };
