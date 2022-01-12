import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
declare type AdjustmentRel = ResourceId & {
    type: typeof Adjustments.TYPE;
};
interface Adjustment extends Resource {
    name?: string;
    currency_code?: string;
    amount_cents?: number;
    amount_float?: number;
    formatted_amount?: string;
}
interface AdjustmentCreate extends ResourceCreate {
    name: string;
    currency_code: string;
    amount_cents: number;
}
interface AdjustmentUpdate extends ResourceUpdate {
    name?: string;
    currency_code?: string;
    amount_cents?: number;
}
declare class Adjustments extends ApiResource {
    static readonly TYPE: 'adjustments';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Adjustment>>;
    create(resource: AdjustmentCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Adjustment>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Adjustment>;
    update(resource: AdjustmentUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Adjustment>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isAdjustment(resource: any): resource is Adjustment;
    relationship(id: string | ResourceId): AdjustmentRel;
    type(): string;
}
export default Adjustments;
export { Adjustment, AdjustmentCreate, AdjustmentUpdate };
