import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { Order } from './orders'
import type { SkuList } from './sku_lists'
import type { Event } from './events'


type LinkRel = ResourceRel & { type: typeof Links.TYPE }
type OrderRel = ResourceRel & { type: 'orders' }
type SkuListRel = ResourceRel & { type: 'sku_lists' }


interface Link extends Resource {
	
	name?: string
	client_id?: string
	scope?: string
	starts_at?: string
	expires_at?: string
	active?: boolean
	status?: string
	domain?: string
	url?: string
	disabled_at?: string

	item?: Order | SkuList
	events?: Event[]

}


interface LinkCreate extends ResourceCreate {
	
	name: string
	client_id: string
	scope: string
	starts_at: string
	expires_at: string
	domain?: string
	_disable?: boolean
	_enable?: boolean

	item: OrderRel | SkuListRel

}


interface LinkUpdate extends ResourceUpdate {
	
	name?: string
	client_id?: string
	scope?: string
	starts_at?: string
	expires_at?: string
	domain?: string
	_disable?: boolean
	_enable?: boolean

	item?: OrderRel | SkuListRel

}


class Links extends ApiResource {

	static readonly TYPE: 'links' = 'links' as const
	// static readonly PATH = 'links'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Link>> {
		return this.resources.list<Link>({ type: Links.TYPE }, params, options)
	}

	async create(resource: LinkCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Link> {
		return this.resources.create<LinkCreate, Link>({ ...resource, type: Links.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Link> {
		return this.resources.retrieve<Link>({ type: Links.TYPE, id }, params, options)
	}

	async update(resource: LinkUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Link> {
		return this.resources.update<LinkUpdate, Link>({ ...resource, type: Links.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: Links.TYPE, id }, options)
	}

	async events(linkId: string | Link, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _linkId = (linkId as Link).id || linkId as string
		return this.resources.fetch<Event>({ type: 'events' }, `links/${_linkId}/events`, params, options) as unknown as ListResponse<Event>
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isLink(resource: any): resource is Link {
		return resource.type && (resource.type === Links.TYPE)
	}


	relationship(id: string | ResourceId | null): LinkRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: Links.TYPE } : { id: id.id, type: Links.TYPE }
	}


	type(): string {
		return Links.TYPE
	}

}


export default Links

export { Link, LinkCreate, LinkUpdate }
