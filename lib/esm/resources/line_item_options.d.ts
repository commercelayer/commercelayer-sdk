import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { LineItem } from './line_items';
import { SkuOption } from './sku_options';
declare type LineItemOptionRel = ResourceId & {
    type: typeof LineItemOptions.TYPE;
};
declare type LineItemRel = ResourceId & {
    type: 'line_items';
};
declare type SkuOptionRel = ResourceId & {
    type: 'sku_options';
};
interface LineItemOption extends Resource {
    name?: string;
    quantity?: number;
    currency_code?: string;
    unit_amount_cents?: number;
    unit_amount_float?: number;
    formatted_unit_amount?: string;
    total_amount_cents?: number;
    total_amount_float?: number;
    formatted_total_amount?: string;
    delay_hours?: number;
    delay_days?: number;
    options?: object;
    line_item?: LineItem;
    sku_option?: SkuOption;
}
interface LineItemOptionCreate extends ResourceCreate {
    name?: string;
    quantity: number;
    options: object;
    line_item: LineItemRel;
    sku_option: SkuOptionRel;
}
interface LineItemOptionUpdate extends ResourceUpdate {
    name?: string;
    quantity?: number;
    options?: object;
    sku_option?: SkuOptionRel;
}
declare class LineItemOptions extends ApiResource {
    static readonly TYPE: 'line_item_options';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<LineItemOption>>;
    create(resource: LineItemOptionCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<LineItemOption>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<LineItemOption>;
    update(resource: LineItemOptionUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<LineItemOption>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isLineItemOption(resource: any): resource is LineItemOption;
    relationship(id: string | ResourceId): LineItemOptionRel;
    type(): string;
}
export default LineItemOptions;
export { LineItemOption, LineItemOptionCreate, LineItemOptionUpdate };
