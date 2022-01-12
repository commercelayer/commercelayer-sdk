import { ApiResource, Resource, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { Address } from './addresses';
import { Attachment } from './attachments';
declare type GeocoderRel = ResourceId & {
    type: typeof Geocoders.TYPE;
};
interface Geocoder extends Resource {
    name?: string;
    addresses?: Address[];
    attachments?: Attachment[];
}
declare class Geocoders extends ApiResource {
    static readonly TYPE: 'geocoders';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Geocoder>>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Geocoder>;
    isGeocoder(resource: any): resource is Geocoder;
    relationship(id: string | ResourceId): GeocoderRel;
    type(): string;
}
export default Geocoders;
export { Geocoder };
