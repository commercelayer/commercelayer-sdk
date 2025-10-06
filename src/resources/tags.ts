import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { EventStore } from './event_stores'


type TagType = 'tags'
type TagRel = ResourceRel & { type: TagType }


export type TagSort = Pick<Tag, 'id' | 'name'> & ResourceSort
// export type TagFilter = Pick<Tag, 'id' | 'name'> & ResourceFilter


interface Tag extends Resource {
	
	readonly type: TagType

	/** 
	 * The tag name.
	 * @example ```"new_campaign"```
	 */
	name: string

	event_stores?: EventStore[] | null

}


interface TagCreate extends ResourceCreate {
	
	/** 
	 * The tag name.
	 * @example ```"new_campaign"```
	 */
	name: string
	
}


interface TagUpdate extends ResourceUpdate {
	
	/** 
	 * The tag name.
	 * @example ```"new_campaign"```
	 */
	name?: string | null
	
}


class Tags extends ApiResource<Tag> {

	static readonly TYPE: TagType = 'tags' as const

	async create(resource: TagCreate, params?: QueryParamsRetrieve<Tag>, options?: ResourcesConfig): Promise<Tag> {
		return this.resources.create<TagCreate, Tag>({ ...resource, type: Tags.TYPE }, params, options)
	}

	async update(resource: TagUpdate, params?: QueryParamsRetrieve<Tag>, options?: ResourcesConfig): Promise<Tag> {
		return this.resources.update<TagUpdate, Tag>({ ...resource, type: Tags.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: Tags.TYPE } : id, options)
	}

	async event_stores(tagId: string | Tag, params?: QueryParamsList<EventStore>, options?: ResourcesConfig): Promise<ListResponse<EventStore>> {
		const _tagId = (tagId as Tag).id || tagId as string
		return this.resources.fetch<EventStore>({ type: 'event_stores' }, `tags/${_tagId}/event_stores`, params, options) as unknown as ListResponse<EventStore>
	}


	isTag(resource: any): resource is Tag {
		return resource.type && (resource.type === Tags.TYPE)
	}


	relationship(id: string | ResourceId | null): TagRel {
		return super.relationshipOneToOne<TagRel>(id)
	}

	relationshipToMany(...ids: string[]): TagRel[] {
		return super.relationshipOneToMany<TagRel>(...ids)
	}


	type(): TagType {
		return Tags.TYPE
	}

}


export default Tags

export type { Tag, TagCreate, TagUpdate, TagType }
