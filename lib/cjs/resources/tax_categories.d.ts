import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { Sku } from './skus';
import { AvalaraAccount } from './avalara_accounts';
import { TaxjarAccount } from './taxjar_accounts';
import { ManualTaxCalculator } from './manual_tax_calculators';
import { ExternalTaxCalculator } from './external_tax_calculators';
import { Attachment } from './attachments';
declare type TaxCategoryRel = ResourceId & {
    type: typeof TaxCategories.TYPE;
};
declare type SkuRel = ResourceId & {
    type: 'skus';
};
declare type AvalaraAccountRel = ResourceId & {
    type: 'avalara_accounts';
};
declare type TaxjarAccountRel = ResourceId & {
    type: 'taxjar_accounts';
};
declare type ManualTaxCalculatorRel = ResourceId & {
    type: 'manual_tax_calculators';
};
declare type ExternalTaxCalculatorRel = ResourceId & {
    type: 'external_tax_calculators';
};
interface TaxCategory extends Resource {
    code?: string;
    sku_code?: string;
    sku?: Sku;
    tax_calculator?: AvalaraAccount | TaxjarAccount | ManualTaxCalculator | ExternalTaxCalculator;
    attachments?: Attachment[];
}
interface TaxCategoryCreate extends ResourceCreate {
    code: string;
    sku_code?: string;
    sku: SkuRel;
    tax_calculator: AvalaraAccountRel | TaxjarAccountRel | ManualTaxCalculatorRel | ExternalTaxCalculatorRel;
}
interface TaxCategoryUpdate extends ResourceUpdate {
    code?: string;
    sku_code?: string;
    sku?: SkuRel;
}
declare class TaxCategories extends ApiResource {
    static readonly TYPE: 'tax_categories';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<TaxCategory>>;
    create(resource: TaxCategoryCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<TaxCategory>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<TaxCategory>;
    update(resource: TaxCategoryUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<TaxCategory>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isTaxCategory(resource: any): resource is TaxCategory;
    relationship(id: string | ResourceId): TaxCategoryRel;
    type(): string;
}
export default TaxCategories;
export { TaxCategory, TaxCategoryCreate, TaxCategoryUpdate };
