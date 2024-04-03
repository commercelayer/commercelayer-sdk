import type { Nullable } from '../types'
import { ApiSingleton } from '../resource'
import type { Resource, ResourceId, ResourceRel, ResourceSort, /* ResourceFilter */ } from '../resource'




type OrganizationType = 'organization'
type OrganizationRel = ResourceRel & { type: OrganizationType }


export type OrganizationSort = Pick<Organization, 'id'> & ResourceSort
// export type OrganizationFilter = Pick<Organization, 'id'> & ResourceFilter


interface Organization extends Resource {
	
	readonly type: OrganizationType

	name?: Nullable<string>
	slug?: Nullable<string>
	domain?: Nullable<string>
	support_phone?: Nullable<string>
	support_email?: Nullable<string>
	logo_url?: Nullable<string>
	favicon_url?: Nullable<string>
	primary_color?: Nullable<string>
	gtm_id?: Nullable<string>
	gtm_id_test?: Nullable<string>
	max_concurrent_promotions?: Nullable<number>
	max_concurrent_imports?: Nullable<number>
	max_concurrent_exports?: Nullable<number>
	max_concurrent_cleanups?: Nullable<number>
	order_number_editable_test?: Nullable<boolean>
	order_number_editable_live?: Nullable<boolean>
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
