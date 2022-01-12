import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { Customer } from './customers';
import { Attachment } from './attachments';
declare type CouponRecipientRel = ResourceId & {
    type: typeof CouponRecipients.TYPE;
};
declare type CustomerRel = ResourceId & {
    type: 'customers';
};
interface CouponRecipient extends Resource {
    email?: string;
    first_name?: string;
    last_name?: string;
    customer?: Customer;
    attachments?: Attachment[];
}
interface CouponRecipientCreate extends ResourceCreate {
    email: string;
    first_name?: string;
    last_name?: string;
    customer?: CustomerRel;
}
interface CouponRecipientUpdate extends ResourceUpdate {
    email?: string;
    first_name?: string;
    last_name?: string;
    customer?: CustomerRel;
}
declare class CouponRecipients extends ApiResource {
    static readonly TYPE: 'coupon_recipients';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<CouponRecipient>>;
    create(resource: CouponRecipientCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CouponRecipient>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CouponRecipient>;
    update(resource: CouponRecipientUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CouponRecipient>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isCouponRecipient(resource: any): resource is CouponRecipient;
    relationship(id: string | ResourceId): CouponRecipientRel;
    type(): string;
}
export default CouponRecipients;
export { CouponRecipient, CouponRecipientCreate, CouponRecipientUpdate };
