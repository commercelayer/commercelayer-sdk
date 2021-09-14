/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.7.0
 * Generation date: 14-09-2021
 **/

import { ApiResource, Resource, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsRetrieve } from '../query'



type ApplicationRel = ResourceId & { type: typeof Applications.TYPE }


interface Application extends Resource {
	
	name?: string
	kind?: string
	public_access?: string
	redirect_uri?: string
	scopes?: string
	
}


class Applications extends ApiResource {

	static readonly TYPE: 'application' = 'application'
	// static readonly PATH = 'application'

	async retrieve(params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Application> {
		return this.resources.singleton<Application>({ type: Applications.TYPE }, params, options)
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

export { Application }
