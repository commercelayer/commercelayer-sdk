import { ApiResource, Resource, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { Order } from './orders';
import { Capture } from './captures';
declare type RefundRel = ResourceId & {
    type: typeof Refunds.TYPE;
};
interface Refund extends Resource {
    number?: string;
    currency_code?: string;
    amount_cents?: number;
    amount_float?: number;
    formatted_amount?: string;
    succeeded?: boolean;
    message?: string;
    error_code?: string;
    error_detail?: string;
    token?: string;
    gateway_transaction_id?: string;
    order?: Order;
    reference_capture?: Capture;
}
declare class Refunds extends ApiResource {
    static readonly TYPE: 'refunds';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Refund>>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Refund>;
    isRefund(resource: any): resource is Refund;
    relationship(id: string | ResourceId): RefundRel;
    type(): string;
}
export default Refunds;
export { Refund };
