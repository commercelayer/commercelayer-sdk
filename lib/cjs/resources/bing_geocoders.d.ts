import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { Address } from './addresses';
import { Attachment } from './attachments';
declare type BingGeocoderRel = ResourceId & {
    type: typeof BingGeocoders.TYPE;
};
interface BingGeocoder extends Resource {
    name?: string;
    addresses?: Address[];
    attachments?: Attachment[];
}
interface BingGeocoderCreate extends ResourceCreate {
    name: string;
    key: string;
}
interface BingGeocoderUpdate extends ResourceUpdate {
    name?: string;
    key?: string;
}
declare class BingGeocoders extends ApiResource {
    static readonly TYPE: 'bing_geocoders';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<BingGeocoder>>;
    create(resource: BingGeocoderCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<BingGeocoder>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<BingGeocoder>;
    update(resource: BingGeocoderUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<BingGeocoder>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isBingGeocoder(resource: any): resource is BingGeocoder;
    relationship(id: string | ResourceId): BingGeocoderRel;
    type(): string;
}
export default BingGeocoders;
export { BingGeocoder, BingGeocoderCreate, BingGeocoderUpdate };
