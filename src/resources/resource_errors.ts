import { ApiResource } from '../resource'
import type { Resource, ResourceId, ResourceRel, ResourceSortable, /* ResourceFilterable */ } from '../resource'


import type { Order } from './orders'


type ResourceErrorType = 'resource_errors'
type ResourceErrorRel = ResourceRel & { type: ResourceErrorType }


export type ResourceErrorSortable = Pick<ResourceError, 'id' | 'name' | 'code'> & ResourceSortable
// export type ResourceErrorFilterable = Pick<ResourceError, 'id' | 'name' | 'code' | 'message'> & ResourceFilterable


interface ResourceError extends Resource {
	
	readonly type: ResourceErrorType

	name: string
	code: string
	message: string

	resource?: Order | null

}


class ResourceErrors extends ApiResource<ResourceError> {

	static readonly TYPE: ResourceErrorType = 'resource_errors' as const

	


	isResourceError(resource: any): resource is ResourceError {
		return resource.type && (resource.type === ResourceErrors.TYPE)
	}


	relationship(id: string | ResourceId | null): ResourceErrorRel {
		return super.relationshipOneToOne<ResourceErrorRel>(id)
	}

	relationshipToMany(...ids: string[]): ResourceErrorRel[] {
		return super.relationshipOneToMany<ResourceErrorRel>(...ids)
	}


	type(): ResourceErrorType {
		return ResourceErrors.TYPE
	}

}


export default ResourceErrors

export type { ResourceError, ResourceErrorType }

/*
export const ResourceErrorsClient = (init: ResourceAdapter | ResourcesInitConfig): ResourceErrors => {
	return new ResourceErrors((init instanceof ResourcesInitConfig)? ApiResourceAdapter(init) : init )
}
*/
