/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.3.0
 * Generation date: 14-09-2021
 **/

import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'



type ApplicationRel = ResourceId & { type: typeof Applications.TYPE }


interface Application extends Resource {
	
	name?: string
	kind?: string
	public_access?: string
	redirect_uri?: string
	scopes?: string
	
}


interface ApplicationCreate extends ResourceCreate {
	
	name?: string
	kind?: string
	public_access?: string
	
}


interface ApplicationUpdate extends ResourceUpdate {
	
	name?: string
	kind?: string
	public_access?: string
	
}


class Applications extends ApiResource {

	static readonly TYPE: 'application' = 'application'
	// static readonly PATH = 'application'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Application>> {
		return this.resources.list({ type: Applications.TYPE }, params, options)
	}

	async create(resource: ApplicationCreate, options?: ResourcesConfig): Promise<Application> {
		return this.resources.create(Object.assign(resource, { type: Applications.TYPE }) , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Application> {
		return this.resources.retrieve<Application>({ type: Applications.TYPE, id }, params, options)
	}

	async update(resource: ApplicationUpdate, options?: ResourcesConfig): Promise<Application> {
		return this.resources.update({ ...resource, type: Applications.TYPE }, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		this.resources.delete({ type: Applications.TYPE, id }, options)
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isApplication(resource: any): resource is Application {
		return resource.type && (resource.type === Applications.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(Applications.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(Applications.TYPE)
	}
	*/

	relationship(id: string | ResourceId): ApplicationRel {
		return (typeof id === 'string') ? { id, type: Applications.TYPE } : {id: id.id, type: Applications.TYPE }
	}

}


export default Applications

export { Application, ApplicationCreate, ApplicationUpdate }
