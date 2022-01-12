import { ApiResource, Resource, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { Order } from './orders';
import { Authorization } from './authorizations';
declare type VoidRel = ResourceId & {
    type: typeof Voids.TYPE;
};
interface Void extends Resource {
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
    reference_authorization?: Authorization;
}
declare class Voids extends ApiResource {
    static readonly TYPE: 'voids';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Void>>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Void>;
    isVoid(resource: any): resource is Void;
    relationship(id: string | ResourceId): VoidRel;
    type(): string;
}
export default Voids;
export { Void };
