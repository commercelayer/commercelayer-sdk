import { ApiSingleton, Resource, ResourceId, ResourceRel } from '../resource'




type OrganizationType = 'organization'
type OrganizationRel = ResourceRel & { type: OrganizationType }


interface Organization extends Resource {
	
	readonly type: OrganizationType

	name?: string
	slug?: string
	domain?: string
	support_phone?: string
	support_email?: string
	logo_url?: string
	favicon_url?: string
	primary_color?: string
	contrast_color?: string
	gtm_id?: string
	gtm_id_test?: string
	discount_disabled?: boolean
	account_disabled?: boolean
	acceptance_disabled?: boolean
	max_concurrent_promotions?: number
	max_concurrent_imports?: number
	
}


class Organizations extends ApiSingleton<Organization> {

	static readonly TYPE: OrganizationType = 'organization' as const

	


	isOrganization(resource: any): resource is Organization {
		return resource.type && (resource.type === Organizations.TYPE)
	}


	relationship(id: string | ResourceId | null): OrganizationRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: Organizations.TYPE } : { id: id.id, type: Organizations.TYPE }
	}


	type(): OrganizationType {
		return Organizations.TYPE
	}

}


export default Organizations

export type { Organization, OrganizationType }
