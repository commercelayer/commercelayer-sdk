import { ApiSingleton } from '../resource'
import type { Resource, ResourceId, ResourceRel, ResourceSort, /* ResourceFilter */ } from '../resource'




type OrganizationType = 'organization'
type OrganizationRel = ResourceRel & { type: OrganizationType }


export type OrganizationSort = Pick<Organization, 'id'> & ResourceSort
// export type OrganizationFilter = Pick<Organization, 'id'> & ResourceFilter


interface Organization extends Resource {
	
	readonly type: OrganizationType

	/** 
	 * The organization's internal name.
	 * @example ```"The Blue Brand"```
	 */
	name?: string | null
	/** 
	 * The organization's slug name.
	 * @example ```"the-blue-brand"```
	 */
	slug?: string | null
	/** 
	 * The organization's domain.
	 * @example ```"the-blue-brand.commercelayer.io"```
	 */
	domain?: string | null
	/** 
	 * The organization's support phone.
	 * @example ```"+01 30800857"```
	 */
	support_phone?: string | null
	/** 
	 * The organization's support email.
	 * @example ```"support@bluebrand.com"```
	 */
	support_email?: string | null
	/** 
	 * The URL to the organization's logo.
	 * @example ```"https://bluebrand.com/img/logo.svg"```
	 */
	logo_url?: string | null
	/** 
	 * The URL to the organization's favicon.
	 * @example ```"https://bluebrand.com/img/favicon.ico"```
	 */
	favicon_url?: string | null
	/** 
	 * The organization's primary color.
	 * @example ```"#C8984E"```
	 */
	primary_color?: string | null
	/** 
	 * The organization's Google Tag Manager ID.
	 * @example ```"GTM-5FJXX6"```
	 */
	gtm_id?: string | null
	/** 
	 * The organization's Google Tag Manager ID for test.
	 * @example ```"GTM-5FJXX7"```
	 */
	gtm_id_test?: string | null
	/** 
	 * Indicates if the phone attribute is required for addresses, default is true.
	 * @example ```"true"```
	 */
	addresses_phone_required?: boolean | null
	/** 
	 * The maximum number of SKUs allowed for bundles, default is 10.
	 * @example ```"10"```
	 */
	bundles_max_items_count?: number | null
	/** 
	 * The minimum length for coupon code, default is 8.
	 * @example ```"8"```
	 */
	coupons_min_code_length?: number | null
	/** 
	 * The maximum length for coupon code, default is 40.
	 * @example ```"40"```
	 */
	coupons_max_code_length?: number | null
	/** 
	 * The maximum number of active concurrent promotions allowed for your organization, default is 10.
	 * @example ```"10"```
	 */
	promotions_max_concurrent_count?: number | null
	/** 
	 * The maximum number of concurrent imports allowed for your organization, default is 10.
	 * @example ```"10"```
	 */
	imports_max_concurrent_count?: number | null
	/** 
	 * The maximum number of concurrent exports allowed for your organization, default is 10.
	 * @example ```"10"```
	 */
	exports_max_concurrent_count?: number | null
	/** 
	 * The maximum number of concurrent cleanups allowed for your organization, default is 10.
	 * @example ```"10"```
	 */
	cleanups_max_concurrent_count?: number | null
	/** 
	 * Enables orders number editing as a string in test (for enterprise plans only).
	 */
	orders_number_editable_test?: boolean | null
	/** 
	 * Enables orders number editing as a string in live (for enterprise plans only).
	 */
	orders_number_editable_live?: boolean | null
	/** 
	 * Enables raising of API errors in case of tax calculation failure, default is false.
	 * @example ```"true"```
	 */
	tax_calculators_errors?: boolean | null
	/** 
	 * Enables raising of API errors in case of external promotion failure, default is false.
	 * @example ```"true"```
	 */
	external_promotions_errors?: boolean | null
	/** 
	 * The organization's configuration.
	 * @example ```"[object Object]"```
	 */
	config?: Record<string, any> | null
	
}


class Organizations extends ApiSingleton<Organization> {

	static readonly TYPE: OrganizationType = 'organization' as const

	


	isOrganization(resource: any): resource is Organization {
		return resource.type && (resource.type === Organizations.TYPE)
	}


	relationship(id: string | ResourceId | null): OrganizationRel {
		return super.relationshipOneToOne<OrganizationRel>(id)
	}

	relationshipToMany(...ids: string[]): OrganizationRel[] {
		return super.relationshipOneToMany<OrganizationRel>(...ids)
	}


	type(): OrganizationType {
		return Organizations.TYPE
	}

}


export default Organizations

export type { Organization, OrganizationType }
