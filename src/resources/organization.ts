/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.7.0
 * Generation date: 14-09-2021
 **/

import { ApiResource, Resource, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsRetrieve } from '../query'



type OrganizationRel = ResourceId & { type: typeof Organizations.TYPE }


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
	
}


class Organizations extends ApiResource {

	static readonly TYPE: 'organization' = 'organization'
	// static readonly PATH = 'organization'

	async retrieve(params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Organization> {
		return this.resources.singleton<Organization>({ type: Organizations.TYPE }, params, options)
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isOrganization(resource: any): resource is Organization {
		return resource.type && (resource.type === Organizations.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(Organizations.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(Organizations.TYPE)
	}
	*/

	relationship(id: string | ResourceId): OrganizationRel {
		return (typeof id === 'string') ? { id, type: Organizations.TYPE } : {id: id.id, type: Organizations.TYPE }
	}

}


export default Organizations

export { Organization }
