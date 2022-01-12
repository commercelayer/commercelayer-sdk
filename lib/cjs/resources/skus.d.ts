import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { ShippingCategory } from './shipping_categories';
import { Price } from './prices';
import { StockItem } from './stock_items';
import { DeliveryLeadTime } from './delivery_lead_times';
import { SkuOption } from './sku_options';
import { Attachment } from './attachments';
declare type SkuRel = ResourceId & {
    type: typeof Skus.TYPE;
};
declare type ShippingCategoryRel = ResourceId & {
    type: 'shipping_categories';
};
interface Sku extends Resource {
    code?: string;
    name?: string;
    description?: string;
    image_url?: string;
    pieces_per_pack?: number;
    weight?: number;
    unit_of_weight?: string;
    hs_tariff_number?: string;
    do_not_ship?: boolean;
    do_not_track?: boolean;
    inventory?: object;
    shipping_category?: ShippingCategory;
    prices?: Price[];
    stock_items?: StockItem[];
    delivery_lead_times?: DeliveryLeadTime[];
    sku_options?: SkuOption[];
    attachments?: Attachment[];
}
interface SkuCreate extends ResourceCreate {
    code: string;
    name: string;
    description?: string;
    image_url?: string;
    pieces_per_pack?: number;
    weight?: number;
    unit_of_weight?: string;
    hs_tariff_number?: string;
    do_not_ship?: boolean;
    do_not_track?: boolean;
    shipping_category: ShippingCategoryRel;
}
interface SkuUpdate extends ResourceUpdate {
    code?: string;
    name?: string;
    description?: string;
    image_url?: string;
    pieces_per_pack?: number;
    weight?: number;
    unit_of_weight?: string;
    hs_tariff_number?: string;
    do_not_ship?: boolean;
    do_not_track?: boolean;
    shipping_category?: ShippingCategoryRel;
}
declare class Skus extends ApiResource {
    static readonly TYPE: 'skus';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Sku>>;
    create(resource: SkuCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Sku>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Sku>;
    update(resource: SkuUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Sku>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isSku(resource: any): resource is Sku;
    relationship(id: string | ResourceId): SkuRel;
    type(): string;
}
export default Skus;
export { Sku, SkuCreate, SkuUpdate };
