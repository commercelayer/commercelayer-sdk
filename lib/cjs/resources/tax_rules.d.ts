import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { ManualTaxCalculator } from './manual_tax_calculators';
declare type TaxRuleRel = ResourceId & {
    type: typeof TaxRules.TYPE;
};
declare type ManualTaxCalculatorRel = ResourceId & {
    type: 'manual_tax_calculators';
};
interface TaxRule extends Resource {
    name?: string;
    tax_rate?: number;
    country_code_regex?: string;
    not_country_code_regex?: string;
    state_code_regex?: string;
    not_state_code_regex?: string;
    zip_code_regex?: string;
    not_zip_code_regex?: string;
    freight_taxable?: boolean;
    payment_method_taxable?: boolean;
    gift_card_taxable?: boolean;
    adjustment_taxable?: boolean;
    breakdown?: object;
    manual_tax_calculator?: ManualTaxCalculator;
}
interface TaxRuleCreate extends ResourceCreate {
    name: string;
    tax_rate?: number;
    country_code_regex?: string;
    not_country_code_regex?: string;
    state_code_regex?: string;
    not_state_code_regex?: string;
    zip_code_regex?: string;
    not_zip_code_regex?: string;
    freight_taxable?: boolean;
    payment_method_taxable?: boolean;
    gift_card_taxable?: boolean;
    adjustment_taxable?: boolean;
    manual_tax_calculator: ManualTaxCalculatorRel;
}
interface TaxRuleUpdate extends ResourceUpdate {
    name?: string;
    tax_rate?: number;
    country_code_regex?: string;
    not_country_code_regex?: string;
    state_code_regex?: string;
    not_state_code_regex?: string;
    zip_code_regex?: string;
    not_zip_code_regex?: string;
    freight_taxable?: boolean;
    payment_method_taxable?: boolean;
    gift_card_taxable?: boolean;
    adjustment_taxable?: boolean;
    manual_tax_calculator?: ManualTaxCalculatorRel;
}
declare class TaxRules extends ApiResource {
    static readonly TYPE: 'tax_rules';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<TaxRule>>;
    create(resource: TaxRuleCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<TaxRule>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<TaxRule>;
    update(resource: TaxRuleUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<TaxRule>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isTaxRule(resource: any): resource is TaxRule;
    relationship(id: string | ResourceId): TaxRuleRel;
    type(): string;
}
export default TaxRules;
export { TaxRule, TaxRuleCreate, TaxRuleUpdate };
