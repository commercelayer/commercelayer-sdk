import { ApiResource, Resource, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { Market } from './markets';
import { Attachment } from './attachments';
declare type CarrierAccountRel = ResourceId & {
    type: typeof CarrierAccounts.TYPE;
};
interface CarrierAccount extends Resource {
    name?: string;
    easypost_type?: string;
    easypost_id?: string;
    market?: Market;
    attachments?: Attachment[];
}
declare class CarrierAccounts extends ApiResource {
    static readonly TYPE: 'carrier_accounts';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<CarrierAccount>>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CarrierAccount>;
    isCarrierAccount(resource: any): resource is CarrierAccount;
    relationship(id: string | ResourceId): CarrierAccountRel;
    type(): string;
}
export default CarrierAccounts;
export { CarrierAccount };
