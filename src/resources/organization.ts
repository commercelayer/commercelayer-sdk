import type { Nullable } from '../types'
import { ApiSingleton } from '../resource'
import type { Resource, ResourceId, ResourceRel, ResourceSort, /* ResourceFilter */ } from '../resource'




type OrganizationType = 'organization'
type OrganizationRel = ResourceRel & { type: OrganizationType }


export type OrganizationSort = Pick<Organization, 'id'> & ResourceSort
// export type OrganizationFilter = Pick<Organization, 'id'> & ResourceFilter


interface Organization extends Resource {
	
	readonly type: OrganizationType

	/** 
	 * The organization's internal name..
	 * @example ```"The Blue Brand"```
	 */
	name?: Nullable<string>
	/** 
	 * The organization's slug name..
	 * @example ```"the-blue-brand"```
	 */
	slug?: Nullable<string>
	/** 
	 * The organization's domain..
	 * @example ```"the-blue-brand.commercelayer.io"```
	 */
	domain?: Nullable<string>
	/** 
	 * The organization's support phone..
	 * @example ```"+01 30800857"```
	 */
	support_phone?: Nullable<string>
	/** 
	 * The organization's support email..
	 * @example ```"support@bluebrand.com"```
	 */
	support_email?: Nullable<string>
	/** 
	 * The URL to the organization's logo..
	 * @example ```"https://bluebrand.com/img/logo.svg"```
	 */
	logo_url?: Nullable<string>
	/** 
	 * The URL to the organization's favicon..
	 * @example ```"https://bluebrand.com/img/favicon.ico"```
	 */
	favicon_url?: Nullable<string>
	/** 
	 * The organization's primary color..
	 * @example ```"#C8984E"```
	 */
	primary_color?: Nullable<string>
	/** 
	 * The organization's Google Tag Manager ID..
	 * @example ```"GTM-5FJXX6"```
	 */
	gtm_id?: Nullable<string>
	/** 
	 * The organization's Google Tag Manager ID for test..
	 * @example ```"GTM-5FJXX7"```
	 */
	gtm_id_test?: Nullable<string>
	/** 
	 * The maximum number of active concurrent promotions allowed for your organization..
	 * @example ```"10"```
	 */
	max_concurrent_promotions?: Nullable<number>
	/** 
	 * The maximum number of concurrent imports allowed for your organization..
	 * @example ```"10"```
	 */
	max_concurrent_imports?: Nullable<number>
	/** 
	 * The maximum number of concurrent exports allowed for your organization..
	 * @example ```"10"```
	 */
	max_concurrent_exports?: Nullable<number>
	/** 
	 * The maximum number of concurrent cleanups allowed for your organization..
	 * @example ```"10"```
	 */
	max_concurrent_cleanups?: Nullable<number>
	/** 
	 * Enables orders number editing as a string in test (for enterprise plans only)..
	 */
	order_number_editable_test?: Nullable<boolean>
	/** 
	 * Enables orders number editing as a string in live (for enterprise plans only)..
	 */
	order_number_editable_live?: Nullable<boolean>
	/** 
	 * The organization's configuration..
	 * @example ```"[object Object]"```
	 */
	config?: Nullable<Record<string, any>>
	
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
