import { ApiResource } from '../resource'
import type { Resource, ResourceId, ResourceRel, ResourceSort, /* ResourceFilter */ } from '../resource'


import type { Resource } from './resources'


type ResourceErrorType = 'resource_errors'
type ResourceErrorRel = ResourceRel & { type: ResourceErrorType }


export type ResourceErrorSort = Pick<ResourceError, 'id' | 'name' | 'code'> & ResourceSort
// export type ResourceErrorFilter = Pick<ResourceError, 'id' | 'name' | 'code' | 'message'> & ResourceFilter


interface ResourceError extends Resource {
	
	readonly type: ResourceErrorType

	/** 
	 * The resource attribute name related to the error.
	 * @example ```"number"```
	 */
	name: string
	/** 
	 * The error code.
	 * @example ```"BLANK"```
	 */
	code: string
	/** 
	 * The error message.
	 * @example ```"can't be blank"```
	 */
	message: string

	resource?: Resource | null

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
