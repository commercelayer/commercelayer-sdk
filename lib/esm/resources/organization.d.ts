import { ApiResource, Resource, ResourcesConfig, ResourceId } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsRetrieve } from '../query';
declare type OrganizationRel = ResourceId & {
    type: typeof Organizations.TYPE;
};
interface Organization extends Resource {
    name?: string;
    slug?: string;
    domain?: string;
    support_phone?: string;
    support_email?: string;
    logo_url?: string;
    favicon_url?: string;
    primary_color?: string;
    contrast_color?: string;
    gtm_id?: string;
    gtm_id_test?: string;
    discount_disabled?: boolean;
    account_disabled?: boolean;
    acceptance_disabled?: boolean;
    max_concurrent_promotions?: number;
    max_concurrent_imports?: number;
}
declare class Organizations extends ApiResource {
    static readonly TYPE: 'organization';
    retrieve(params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Organization>;
    isOrganization(resource: any): resource is Organization;
    relationship(id: string | ResourceId): OrganizationRel;
    type(): string;
}
export default Organizations;
export { Organization };
