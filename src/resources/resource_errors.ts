import { ApiResource, Resource, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { Order } from './orders'


type ResourceErrorRel = ResourceRel & { type: typeof ResourceErrors.TYPE }


interface ResourceError extends Resource {
	
	name?: string
	code?: string
	message?: string

	resource?: Order

}


class ResourceErrors extends ApiResource {

	static readonly TYPE: 'resource_errors' = 'resource_errors' as const
	// static readonly PATH = 'resource_errors'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<ResourceError>> {
		return this.resources.list<ResourceError>({ type: ResourceErrors.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ResourceError> {
		return this.resources.retrieve<ResourceError>({ type: ResourceErrors.TYPE, id }, params, options)
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isResourceError(resource: any): resource is ResourceError {
		return resource.type && (resource.type === ResourceErrors.TYPE)
	}


	relationship(id: string | ResourceId | null): ResourceErrorRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: ResourceErrors.TYPE } : { id: id.id, type: ResourceErrors.TYPE }
	}


	type(): string {
		return ResourceErrors.TYPE
	}

}


export default ResourceErrors

export { ResourceError }
