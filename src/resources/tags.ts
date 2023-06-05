import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'



type TagRel = ResourceRel & { type: typeof Tags.TYPE }


interface Tag extends Resource {
	
	name?: string
	
}


interface TagCreate extends ResourceCreate {
	
	name: string
	
}


interface TagUpdate extends ResourceUpdate {
	
	name?: string
	
}


class Tags extends ApiResource {

	static readonly TYPE: 'tags' = 'tags' as const
	// static readonly PATH = 'tags'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Tag>> {
		return this.resources.list<Tag>({ type: Tags.TYPE }, params, options)
	}

	async create(resource: TagCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Tag> {
		return this.resources.create<TagCreate, Tag>({ ...resource, type: Tags.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Tag> {
		return this.resources.retrieve<Tag>({ type: Tags.TYPE, id }, params, options)
	}

	async update(resource: TagUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Tag> {
		return this.resources.update<TagUpdate, Tag>({ ...resource, type: Tags.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: Tags.TYPE, id }, options)
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isTag(resource: any): resource is Tag {
		return resource.type && (resource.type === Tags.TYPE)
	}


	relationship(id: string | ResourceId | null): TagRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: Tags.TYPE } : { id: id.id, type: Tags.TYPE }
	}


	type(): string {
		return Tags.TYPE
	}

}


export default Tags

export { Tag, TagCreate, TagUpdate }
