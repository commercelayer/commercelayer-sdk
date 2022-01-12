import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { Address } from './addresses';
import { Attachment } from './attachments';
declare type MerchantRel = ResourceId & {
    type: typeof Merchants.TYPE;
};
declare type AddressRel = ResourceId & {
    type: 'addresses';
};
interface Merchant extends Resource {
    name?: string;
    address?: Address;
    attachments?: Attachment[];
}
interface MerchantCreate extends ResourceCreate {
    name: string;
    address: AddressRel;
}
interface MerchantUpdate extends ResourceUpdate {
    name?: string;
    address?: AddressRel;
}
declare class Merchants extends ApiResource {
    static readonly TYPE: 'merchants';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Merchant>>;
    create(resource: MerchantCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Merchant>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Merchant>;
    update(resource: MerchantUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Merchant>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isMerchant(resource: any): resource is Merchant;
    relationship(id: string | ResourceId): MerchantRel;
    type(): string;
}
export default Merchants;
export { Merchant, MerchantCreate, MerchantUpdate };
