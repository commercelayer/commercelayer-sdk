/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.3.0
 * Generation date: 14-09-2021
 **/

import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'



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


interface OrganizationCreate extends ResourceCreate {
	
	name?: string
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


interface OrganizationUpdate extends ResourceUpdate {
	
	name?: string
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

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Organization>> {
		return this.resources.list({ type: Organizations.TYPE }, params, options)
	}

	async create(resource: OrganizationCreate, options?: ResourcesConfig): Promise<Organization> {
		return this.resources.create(Object.assign(resource, { type: Organizations.TYPE }) , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Organization> {
		return this.resources.retrieve<Organization>({ type: Organizations.TYPE, id }, params, options)
	}

	async update(resource: OrganizationUpdate, options?: ResourcesConfig): Promise<Organization> {
		return this.resources.update({ ...resource, type: Organizations.TYPE }, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		this.resources.delete({ type: Organizations.TYPE, id }, options)
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

export { Organization, OrganizationCreate, OrganizationUpdate }
