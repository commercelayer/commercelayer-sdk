import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { Customer } from './customers';
import { Attachment } from './attachments';
declare type GiftCardRecipientRel = ResourceId & {
    type: typeof GiftCardRecipients.TYPE;
};
declare type CustomerRel = ResourceId & {
    type: 'customers';
};
interface GiftCardRecipient extends Resource {
    email?: string;
    first_name?: string;
    last_name?: string;
    customer?: Customer;
    attachments?: Attachment[];
}
interface GiftCardRecipientCreate extends ResourceCreate {
    email: string;
    first_name?: string;
    last_name?: string;
    customer?: CustomerRel;
}
interface GiftCardRecipientUpdate extends ResourceUpdate {
    email?: string;
    first_name?: string;
    last_name?: string;
    customer?: CustomerRel;
}
declare class GiftCardRecipients extends ApiResource {
    static readonly TYPE: 'gift_card_recipients';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<GiftCardRecipient>>;
    create(resource: GiftCardRecipientCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<GiftCardRecipient>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<GiftCardRecipient>;
    update(resource: GiftCardRecipientUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<GiftCardRecipient>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isGiftCardRecipient(resource: any): resource is GiftCardRecipient;
    relationship(id: string | ResourceId): GiftCardRecipientRel;
    type(): string;
}
export default GiftCardRecipients;
export { GiftCardRecipient, GiftCardRecipientCreate, GiftCardRecipientUpdate };
