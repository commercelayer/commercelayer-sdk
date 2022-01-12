import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { Attachment } from './attachments';
declare type ShippingZoneRel = ResourceId & {
    type: typeof ShippingZones.TYPE;
};
interface ShippingZone extends Resource {
    name?: string;
    country_code_regex?: string;
    not_country_code_regex?: string;
    state_code_regex?: string;
    not_state_code_regex?: string;
    zip_code_regex?: string;
    not_zip_code_regex?: string;
    attachments?: Attachment[];
}
interface ShippingZoneCreate extends ResourceCreate {
    name: string;
    country_code_regex?: string;
    not_country_code_regex?: string;
    state_code_regex?: string;
    not_state_code_regex?: string;
    zip_code_regex?: string;
    not_zip_code_regex?: string;
}
interface ShippingZoneUpdate extends ResourceUpdate {
    name?: string;
    country_code_regex?: string;
    not_country_code_regex?: string;
    state_code_regex?: string;
    not_state_code_regex?: string;
    zip_code_regex?: string;
    not_zip_code_regex?: string;
}
declare class ShippingZones extends ApiResource {
    static readonly TYPE: 'shipping_zones';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<ShippingZone>>;
    create(resource: ShippingZoneCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ShippingZone>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ShippingZone>;
    update(resource: ShippingZoneUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ShippingZone>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isShippingZone(resource: any): resource is ShippingZone;
    relationship(id: string | ResourceId): ShippingZoneRel;
    type(): string;
}
export default ShippingZones;
export { ShippingZone, ShippingZoneCreate, ShippingZoneUpdate };
