import { ApiResource, Resource, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { TaxCategory } from './tax_categories';
import { Market } from './markets';
import { Attachment } from './attachments';
declare type TaxCalculatorRel = ResourceId & {
    type: typeof TaxCalculators.TYPE;
};
interface TaxCalculator extends Resource {
    name?: string;
    tax_categories?: TaxCategory[];
    markets?: Market[];
    attachments?: Attachment[];
}
declare class TaxCalculators extends ApiResource {
    static readonly TYPE: 'tax_calculators';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<TaxCalculator>>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<TaxCalculator>;
    isTaxCalculator(resource: any): resource is TaxCalculator;
    relationship(id: string | ResourceId): TaxCalculatorRel;
    type(): string;
}
export default TaxCalculators;
export { TaxCalculator };
