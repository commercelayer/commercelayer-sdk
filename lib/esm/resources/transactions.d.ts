import { ApiResource, Resource, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { Order } from './orders';
declare type TransactionRel = ResourceId & {
    type: typeof Transactions.TYPE;
};
interface Transaction extends Resource {
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
}
declare class Transactions extends ApiResource {
    static readonly TYPE: 'transactions';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Transaction>>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Transaction>;
    isTransaction(resource: any): resource is Transaction;
    relationship(id: string | ResourceId): TransactionRel;
    type(): string;
}
export default Transactions;
export { Transaction };
