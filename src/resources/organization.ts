import { ApiSingleton } from '../resource'
import type { Resource, ResourceId, ResourceRel } from '../resource'




type OrganizationType = 'organization'
type OrganizationRel = ResourceRel & { type: OrganizationType }


interface Organization extends Resource {
	
	readonly type: OrganizationType

	name?: string | null
	slug?: string | null
	domain?: string | null
	support_phone?: string | null
	support_email?: string | null
	logo_url?: string | null
	favicon_url?: string | null
	primary_color?: string | null
	gtm_id?: string | null
	gtm_id_test?: string | null
	max_concurrent_promotions?: number | null
	max_concurrent_imports?: number | null
	max_concurrent_exports?: number | null
	max_concurrent_cleanups?: number | null
	order_number_editable_test?: boolean | null
	order_number_editable_live?: boolean | null
	
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
