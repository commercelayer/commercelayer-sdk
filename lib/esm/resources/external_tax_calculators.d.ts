import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { TaxCategory } from './tax_categories';
import { Market } from './markets';
import { Attachment } from './attachments';
declare type ExternalTaxCalculatorRel = ResourceId & {
    type: typeof ExternalTaxCalculators.TYPE;
};
declare type TaxCategoryRel = ResourceId & {
    type: 'tax_categories';
};
interface ExternalTaxCalculator extends Resource {
    name?: string;
    tax_calculator_url?: string;
    tax_categories?: TaxCategory[];
    markets?: Market[];
    attachments?: Attachment[];
}
interface ExternalTaxCalculatorCreate extends ResourceCreate {
    name: string;
    tax_calculator_url: string;
    tax_categories?: TaxCategoryRel[];
}
interface ExternalTaxCalculatorUpdate extends ResourceUpdate {
    name?: string;
    tax_calculator_url?: string;
    tax_categories?: TaxCategoryRel[];
}
declare class ExternalTaxCalculators extends ApiResource {
    static readonly TYPE: 'external_tax_calculators';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<ExternalTaxCalculator>>;
    create(resource: ExternalTaxCalculatorCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ExternalTaxCalculator>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ExternalTaxCalculator>;
    update(resource: ExternalTaxCalculatorUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ExternalTaxCalculator>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isExternalTaxCalculator(resource: any): resource is ExternalTaxCalculator;
    relationship(id: string | ResourceId): ExternalTaxCalculatorRel;
    type(): string;
}
export default ExternalTaxCalculators;
export { ExternalTaxCalculator, ExternalTaxCalculatorCreate, ExternalTaxCalculatorUpdate };
