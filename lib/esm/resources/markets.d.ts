import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { Merchant } from './merchants';
import { PriceList } from './price_lists';
import { InventoryModel } from './inventory_models';
import { TaxCalculator } from './tax_calculators';
import { CustomerGroup } from './customer_groups';
import { Attachment } from './attachments';
declare type MarketRel = ResourceId & {
    type: typeof Markets.TYPE;
};
declare type MerchantRel = ResourceId & {
    type: 'merchants';
};
declare type PriceListRel = ResourceId & {
    type: 'price_lists';
};
declare type InventoryModelRel = ResourceId & {
    type: 'inventory_models';
};
declare type TaxCalculatorRel = ResourceId & {
    type: 'tax_calculators';
};
declare type CustomerGroupRel = ResourceId & {
    type: 'customer_groups';
};
interface Market extends Resource {
    number?: number;
    name?: string;
    facebook_pixel_id?: string;
    checkout_url?: string;
    external_prices_url?: string;
    private?: boolean;
    merchant?: Merchant;
    price_list?: PriceList;
    inventory_model?: InventoryModel;
    tax_calculator?: TaxCalculator;
    customer_group?: CustomerGroup;
    attachments?: Attachment[];
}
interface MarketCreate extends ResourceCreate {
    name: string;
    facebook_pixel_id?: string;
    checkout_url?: string;
    external_prices_url?: string;
    merchant: MerchantRel;
    price_list: PriceListRel;
    inventory_model: InventoryModelRel;
    tax_calculator?: TaxCalculatorRel;
    customer_group?: CustomerGroupRel;
}
interface MarketUpdate extends ResourceUpdate {
    name?: string;
    facebook_pixel_id?: string;
    checkout_url?: string;
    external_prices_url?: string;
    merchant?: MerchantRel;
    price_list?: PriceListRel;
    inventory_model?: InventoryModelRel;
    tax_calculator?: TaxCalculatorRel;
    customer_group?: CustomerGroupRel;
}
declare class Markets extends ApiResource {
    static readonly TYPE: 'markets';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Market>>;
    create(resource: MarketCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Market>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Market>;
    update(resource: MarketUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Market>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isMarket(resource: any): resource is Market;
    relationship(id: string | ResourceId): MarketRel;
    type(): string;
}
export default Markets;
export { Market, MarketCreate, MarketUpdate };
