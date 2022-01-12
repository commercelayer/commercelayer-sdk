import { ApiResource, Resource, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { Order } from './orders';
import { Capture } from './captures';
import { Void } from './voids';
declare type AuthorizationRel = ResourceId & {
    type: typeof Authorizations.TYPE;
};
interface Authorization extends Resource {
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
    cvv_code?: string;
    cvv_message?: string;
    avs_code?: string;
    avs_message?: string;
    fraud_review?: string;
    capture_amount_cents?: number;
    capture_amount_float?: number;
    formatted_capture_amount?: string;
    capture_balance_cents?: number;
    capture_balance_float?: number;
    formatted_capture_balance?: string;
    void_balance_cents?: number;
    void_balance_float?: number;
    formatted_void_balance?: string;
    order?: Order;
    captures?: Capture[];
    voids?: Void[];
}
interface AuthorizationUpdate extends ResourceUpdate {
    _capture?: boolean;
    _capture_amount_cents?: number;
    _void?: boolean;
}
declare class Authorizations extends ApiResource {
    static readonly TYPE: 'authorizations';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Authorization>>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Authorization>;
    update(resource: AuthorizationUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Authorization>;
    isAuthorization(resource: any): resource is Authorization;
    relationship(id: string | ResourceId): AuthorizationRel;
    type(): string;
}
export default Authorizations;
export { Authorization, AuthorizationUpdate };
