import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ResourceSortable, /* ResourceFilterable */ } from '../resource'
import type { QueryParamsRetrieve } from '../query'



type TagType = 'tags'
type TagRel = ResourceRel & { type: TagType }


export type TagSortable = Pick<Tag, 'id' | 'name'> & ResourceSortable
// export type TagFilterable = Pick<Tag, 'id' | 'name'> & ResourceFilterable


interface Tag extends Resource {
	
	readonly type: TagType

	name: string
	
}


interface TagCreate extends ResourceCreate {
	
	name: string
	
}


interface TagUpdate extends ResourceUpdate {
	
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

/*
export const TagsClient = (init: ResourceAdapter | ResourcesInitConfig): Tags => {
	return new Tags((init instanceof ResourcesInitConfig)? ApiResourceAdapter(init) : init )
}
*/
