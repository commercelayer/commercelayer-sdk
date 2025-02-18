import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Event } from './events'
import type { Order, OrderType } from './orders'
import type { Sku, SkuType } from './skus'
import type { SkuList, SkuListType } from './sku_lists'


type LinkType = 'links'
type LinkRel = ResourceRel & { type: LinkType }
type OrderRel = ResourceRel & { type: OrderType }
type SkuRel = ResourceRel & { type: SkuType }
type SkuListRel = ResourceRel & { type: SkuListType }


export type LinkSort = Pick<Link, 'id' | 'name' | 'starts_at' | 'expires_at' | 'item_type' | 'disabled_at'> & ResourceSort
// export type LinkFilter = Pick<Link, 'id' | 'name' | 'client_id' | 'scope' | 'starts_at' | 'expires_at' | 'item_type' | 'params' | 'disabled_at'> & ResourceFilter


interface Link extends Resource {
	
	readonly type: LinkType

	/** 
	 * The link internal name.
	 * @example ```"FW SALE 2023"```
	 */
	name: string
	/** 
	 * The link application client id, used to fetch JWT.
	 * @example ```"xxxx-yyyy-zzzz"```
	 */
	client_id: string
	/** 
	 * The link application scope, used to fetch JWT.
	 * @example ```"market:id:GhvCxsElAQ,market:id:kJhgVcxZDr"```
	 */
	scope: string
	/** 
	 * The activation date/time of this link.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	starts_at?: string | null
	/** 
	 * The expiration date/time of this link (must be after starts_at).
	 * @example ```"2018-01-02T12:00:00.000Z"```
	 */
	expires_at?: string | null
	/** 
	 * Indicates if the link is active (enabled and not expired).
	 * @example ```true```
	 */
	active?: boolean | null
	/** 
	 * The link status. One of 'disabled', 'expired', 'pending', or 'active'.
	 * @example ```"pending"```
	 */
	status?: 'disabled' | 'expired' | 'pending' | 'active' | null
	/** 
	 * The link URL second level domain.
	 * @example ```"commercelayer.link"```
	 */
	domain?: string | null
	/** 
	 * The link URL.
	 * @example ```"https://commercelayer.link/ZXUtd2VzdC0xLzE5ZjBlMGVlLTg4OGMtNDQ1Yi1iYTA0LTg3MTUxY2FjZjFmYQ"```
	 */
	url?: string | null
	/** 
	 * The type of the associated item. One of 'orders', 'skus', or 'sku_lists'.
	 * @example ```"orders"```
	 */
	item_type?: 'orders' | 'skus' | 'sku_lists' | null
	/** 
	 * The link params to be passed in URL the query string.
	 * @example ```{"param1":"ABC","param2":"XYZ"}```
	 */
	params?: Record<string, any> | null
	/** 
	 * Time at which this resource was disabled.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	disabled_at?: string | null

	item?: Order | Sku | SkuList | null
	events?: Event[] | null

}


interface LinkCreate extends ResourceCreate {
	
	/** 
	 * The link internal name.
	 * @example ```"FW SALE 2023"```
	 */
	name: string
	/** 
	 * The link application client id, used to fetch JWT.
	 * @example ```"xxxx-yyyy-zzzz"```
	 */
	client_id: string
	/** 
	 * The link application scope, used to fetch JWT.
	 * @example ```"market:id:GhvCxsElAQ,market:id:kJhgVcxZDr"```
	 */
	scope: string
	/** 
	 * The activation date/time of this link.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	starts_at?: string | null
	/** 
	 * The expiration date/time of this link (must be after starts_at).
	 * @example ```"2018-01-02T12:00:00.000Z"```
	 */
	expires_at?: string | null
	/** 
	 * The link URL second level domain.
	 * @example ```"commercelayer.link"```
	 */
	domain?: string | null
	/** 
	 * The type of the associated item. One of 'orders', 'skus', or 'sku_lists'.
	 * @example ```"orders"```
	 */
	item_type?: 'orders' | 'skus' | 'sku_lists' | null
	/** 
	 * The link params to be passed in URL the query string.
	 * @example ```{"param1":"ABC","param2":"XYZ"}```
	 */
	params?: Record<string, any> | null
	/** 
	 * Send this attribute if you want to mark this resource as disabled.
	 * @example ```true```
	 */
	_disable?: boolean | null
	/** 
	 * Send this attribute if you want to mark this resource as enabled.
	 * @example ```true```
	 */
	_enable?: boolean | null

	item: OrderRel | SkuRel | SkuListRel

}


interface LinkUpdate extends ResourceUpdate {
	
	/** 
	 * The link internal name.
	 * @example ```"FW SALE 2023"```
	 */
	name?: string | null
	/** 
	 * The link application client id, used to fetch JWT.
	 * @example ```"xxxx-yyyy-zzzz"```
	 */
	client_id?: string | null
	/** 
	 * The link application scope, used to fetch JWT.
	 * @example ```"market:id:GhvCxsElAQ,market:id:kJhgVcxZDr"```
	 */
	scope?: string | null
	/** 
	 * The activation date/time of this link.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	starts_at?: string | null
	/** 
	 * The expiration date/time of this link (must be after starts_at).
	 * @example ```"2018-01-02T12:00:00.000Z"```
	 */
	expires_at?: string | null
	/** 
	 * The link URL second level domain.
	 * @example ```"commercelayer.link"```
	 */
	domain?: string | null
	/** 
	 * The link params to be passed in URL the query string.
	 * @example ```{"param1":"ABC","param2":"XYZ"}```
	 */
	params?: Record<string, any> | null
	/** 
	 * Send this attribute if you want to mark this resource as disabled.
	 * @example ```true```
	 */
	_disable?: boolean | null
	/** 
	 * Send this attribute if you want to mark this resource as enabled.
	 * @example ```true```
	 */
	_enable?: boolean | null

	item?: OrderRel | SkuRel | SkuListRel | null

}


class Links extends ApiResource<Link> {

	static readonly TYPE: LinkType = 'links' as const

	async create(resource: LinkCreate, params?: QueryParamsRetrieve<Link>, options?: ResourcesConfig): Promise<Link> {
		return this.resources.create<LinkCreate, Link>({ ...resource, type: Links.TYPE }, params, options)
	}

	async update(resource: LinkUpdate, params?: QueryParamsRetrieve<Link>, options?: ResourcesConfig): Promise<Link> {
		return this.resources.update<LinkUpdate, Link>({ ...resource, type: Links.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: Links.TYPE } : id, options)
	}

	async events(linkId: string | Link, params?: QueryParamsList<Event>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _linkId = (linkId as Link).id || linkId as string
		return this.resources.fetch<Event>({ type: 'events' }, `links/${_linkId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async _disable(id: string | Link, params?: QueryParamsRetrieve<Link>, options?: ResourcesConfig): Promise<Link> {
		return this.resources.update<LinkUpdate, Link>({ id: (typeof id === 'string')? id: id.id, type: Links.TYPE, _disable: true }, params, options)
	}

	async _enable(id: string | Link, params?: QueryParamsRetrieve<Link>, options?: ResourcesConfig): Promise<Link> {
		return this.resources.update<LinkUpdate, Link>({ id: (typeof id === 'string')? id: id.id, type: Links.TYPE, _enable: true }, params, options)
	}


	isLink(resource: any): resource is Link {
		return resource.type && (resource.type === Links.TYPE)
	}


	relationship(id: string | ResourceId | null): LinkRel {
		return super.relationshipOneToOne<LinkRel>(id)
	}

	relationshipToMany(...ids: string[]): LinkRel[] {
		return super.relationshipOneToMany<LinkRel>(...ids)
	}


	type(): LinkType {
		return Links.TYPE
	}

}


export default Links

export type { Link, LinkCreate, LinkUpdate, LinkType }
