import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Event } from './events'
import type { Order, OrderType } from './orders'
import type { SkuList, SkuListType } from './sku_lists'


type LinkType = 'links'
type LinkRel = ResourceRel & { type: LinkType }
type OrderRel = ResourceRel & { type: OrderType }
type SkuListRel = ResourceRel & { type: SkuListType }


interface Link extends Resource {
	
	readonly type: LinkType

	name: string
	client_id: string
	scope: string
	starts_at: string
	expires_at: string
	active?: boolean | null
	status?: 'expired' | 'pending' | 'active' | 'disabled' | null
	domain?: string | null
	url?: string | null
	disabled_at?: string | null

	item?: Order | SkuList | null
	events?: Event[] | null

}


interface LinkCreate extends ResourceCreate {
	
	name: string
	client_id: string
	scope: string
	starts_at: string
	expires_at: string
	domain?: string | null
	_disable?: boolean | null
	_enable?: boolean | null

	item: OrderRel | SkuListRel

}


interface LinkUpdate extends ResourceUpdate {
	
	name?: string | null
	client_id?: string | null
	scope?: string | null
	starts_at?: string | null
	expires_at?: string | null
	domain?: string | null
	_disable?: boolean | null
	_enable?: boolean | null

	item?: OrderRel | SkuListRel | null

}


class Links extends ApiResource<Link> {

	static readonly TYPE: LinkType = 'links' as const

	async create(resource: LinkCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Link> {
		return this.resources.create<LinkCreate, Link>({ ...resource, type: Links.TYPE }, params, options)
	}

	async update(resource: LinkUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Link> {
		return this.resources.update<LinkUpdate, Link>({ ...resource, type: Links.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: Links.TYPE } : id, options)
	}

	async events(linkId: string | Link, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _linkId = (linkId as Link).id || linkId as string
		return this.resources.fetch<Event>({ type: 'events' }, `links/${_linkId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async _disable(id: string | Link, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Link> {
		return this.resources.update<LinkUpdate, Link>({ id: (typeof id === 'string')? id: id.id, type: Links.TYPE, _disable: true }, params, options)
	}

	async _enable(id: string | Link, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Link> {
		return this.resources.update<LinkUpdate, Link>({ id: (typeof id === 'string')? id: id.id, type: Links.TYPE, _enable: true }, params, options)
	}


	isLink(resource: any): resource is Link {
		return resource.type && (resource.type === Links.TYPE)
	}


	relationship(id: string | ResourceId | null): LinkRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: Links.TYPE } : { id: id.id, type: Links.TYPE }
	}


	type(): LinkType {
		return Links.TYPE
	}

}


export default Links

export type { Link, LinkCreate, LinkUpdate, LinkType }
