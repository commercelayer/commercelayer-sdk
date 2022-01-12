import { ApiResource, Resource, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { Order } from './orders';
import { Authorization } from './authorizations';
import { Refund } from './refunds';
declare type CaptureRel = ResourceId & {
    type: typeof Captures.TYPE;
};
interface Capture extends Resource {
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
    refund_amount_cents?: number;
    refund_amount_float?: number;
    formatted_refund_amount?: string;
    refund_balance_cents?: number;
    refund_balance_float?: number;
    formatted_refund_balance?: string;
    order?: Order;
    reference_authorization?: Authorization;
    refunds?: Refund[];
}
interface CaptureUpdate extends ResourceUpdate {
    _refund?: boolean;
    _refund_amount_cents?: number;
}
declare class Captures extends ApiResource {
    static readonly TYPE: 'captures';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Capture>>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Capture>;
    update(resource: CaptureUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Capture>;
    isCapture(resource: any): resource is Capture;
    relationship(id: string | ResourceId): CaptureRel;
    type(): string;
}
export default Captures;
export { Capture, CaptureUpdate };
