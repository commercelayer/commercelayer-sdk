import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { Address } from './addresses';
import { Attachment } from './attachments';
declare type GoogleGeocoderRel = ResourceId & {
    type: typeof GoogleGeocoders.TYPE;
};
interface GoogleGeocoder extends Resource {
    name?: string;
    addresses?: Address[];
    attachments?: Attachment[];
}
interface GoogleGeocoderCreate extends ResourceCreate {
    name: string;
    api_key: string;
}
interface GoogleGeocoderUpdate extends ResourceUpdate {
    name?: string;
    api_key?: string;
}
declare class GoogleGeocoders extends ApiResource {
    static readonly TYPE: 'google_geocoders';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<GoogleGeocoder>>;
    create(resource: GoogleGeocoderCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<GoogleGeocoder>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<GoogleGeocoder>;
    update(resource: GoogleGeocoderUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<GoogleGeocoder>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isGoogleGeocoder(resource: any): resource is GoogleGeocoder;
    relationship(id: string | ResourceId): GoogleGeocoderRel;
    type(): string;
}
export default GoogleGeocoders;
export { GoogleGeocoder, GoogleGeocoderCreate, GoogleGeocoderUpdate };
