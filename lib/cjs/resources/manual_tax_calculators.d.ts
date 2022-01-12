import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { TaxCategory } from './tax_categories';
import { Market } from './markets';
import { Attachment } from './attachments';
import { TaxRule } from './tax_rules';
declare type ManualTaxCalculatorRel = ResourceId & {
    type: typeof ManualTaxCalculators.TYPE;
};
declare type TaxCategoryRel = ResourceId & {
    type: 'tax_categories';
};
declare type TaxRuleRel = ResourceId & {
    type: 'tax_rules';
};
interface ManualTaxCalculator extends Resource {
    name?: string;
    tax_categories?: TaxCategory[];
    markets?: Market[];
    attachments?: Attachment[];
    tax_rules?: TaxRule[];
}
interface ManualTaxCalculatorCreate extends ResourceCreate {
    name: string;
    tax_categories?: TaxCategoryRel[];
    tax_rules?: TaxRuleRel[];
}
interface ManualTaxCalculatorUpdate extends ResourceUpdate {
    name?: string;
    tax_categories?: TaxCategoryRel[];
    tax_rules?: TaxRuleRel[];
}
declare class ManualTaxCalculators extends ApiResource {
    static readonly TYPE: 'manual_tax_calculators';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<ManualTaxCalculator>>;
    create(resource: ManualTaxCalculatorCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ManualTaxCalculator>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ManualTaxCalculator>;
    update(resource: ManualTaxCalculatorUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ManualTaxCalculator>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isManualTaxCalculator(resource: any): resource is ManualTaxCalculator;
    relationship(id: string | ResourceId): ManualTaxCalculatorRel;
    type(): string;
}
export default ManualTaxCalculators;
export { ManualTaxCalculator, ManualTaxCalculatorCreate, ManualTaxCalculatorUpdate };
