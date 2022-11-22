import { ApiResource, Resource, ResourcesConfig, ResourceId, ResourceRel } from '../resource'
import type { QueryParamsRetrieve } from '../query'



type OrganizationRel = ResourceRel & { type: typeof Organizations.TYPE }


interface Organization extends Resource {
	
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


class Organizations extends ApiResource {

	static readonly TYPE: 'organization' = 'organization' as const
	// static readonly PATH = 'organization'

	async retrieve(params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Organization> {
		return this.resources.singleton<Organization>({ type: Organizations.TYPE }, params, options)
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isOrganization(resource: any): resource is Organization {
		return resource.type && (resource.type === Organizations.TYPE)
	}


	relationship(id: string | ResourceId | null): OrganizationRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: Organizations.TYPE } : { id: id.id, type: Organizations.TYPE }
	}


	type(): string {
		return Organizations.TYPE
	}

}


export default Organizations

export { Organization }
