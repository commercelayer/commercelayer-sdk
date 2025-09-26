import { ApiResource } from '../resource'
import type { Resource, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsList } from '../query'

import type { EventStore } from './event_stores'
import type { Order } from './orders'
import type { Return } from './returns'


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

	resource?: Order | Return | null
	event_stores?: EventStore[] | null

}


class ResourceErrors extends ApiResource<ResourceError> {

	static readonly TYPE: ResourceErrorType = 'resource_errors' as const

	async event_stores(resourceErrorId: string | ResourceError, params?: QueryParamsList<EventStore>, options?: ResourcesConfig): Promise<ListResponse<EventStore>> {
		const _resourceErrorId = (resourceErrorId as ResourceError).id || resourceErrorId as string
		return this.resources.fetch<EventStore>({ type: 'event_stores' }, `resource_errors/${_resourceErrorId}/event_stores`, params, options) as unknown as ListResponse<EventStore>
	}


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


const instance = new ResourceErrors()
export default instance

export type { ResourceErrors, ResourceError, ResourceErrorType }
