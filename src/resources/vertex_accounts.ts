import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Market } from './markets'
import type { Attachment } from './attachments'
import type { Event } from './events'
import type { Version } from './versions'


type VertexAccountType = 'vertex_accounts'
type VertexAccountRel = ResourceRel & { type: VertexAccountType }


export type VertexAccountSort = Pick<VertexAccount, 'id' | 'name'> & ResourceSort
// export type VertexAccountFilter = Pick<VertexAccount, 'id' | 'name'> & ResourceFilter


interface VertexAccount extends Resource {
	
	readonly type: VertexAccountType

	/** 
	 * The tax calculator's internal name.
	 * @example ```"Personal tax calculator"```
	 */
	name: string
	/** 
	 * The Vertex account kind. One of 'cloud', 'on_demand', or 'on_premise'.
	 * @example ```"cloud"```
	 */
	kind?: 'cloud' | 'on_demand' | 'on_premise' | null
	/** 
	 * The Vertex API baseurl, optional for 'cloud' kind.
	 * @example ```"yourbaseurl"```
	 */
	baseurl?: string | null
	/** 
	 * The API endpoint as computed by specified kind and baseurl.
	 * @example ```"https://my_baseurl.ondemand.vertexinc.com"```
	 */
	api_endpoint?: string | null
	/** 
	 * Indicates if the transaction will be recorded and visible on the Vertex website.
	 * @example ```true```
	 */
	commit_invoice?: boolean | null
	/** 
	 * The expiration date/time of the access token.
	 * @example ```"2018-01-02T12:00:00.000Z"```
	 */
	token_expires_at?: string | null

	markets?: Market[] | null
	attachments?: Attachment[] | null
	events?: Event[] | null
	versions?: Version[] | null

}


interface VertexAccountCreate extends ResourceCreate {
	
	/** 
	 * The tax calculator's internal name.
	 * @example ```"Personal tax calculator"```
	 */
	name: string
	/** 
	 * The Vertex account kind. One of 'cloud', 'on_demand', or 'on_premise'.
	 * @example ```"cloud"```
	 */
	kind?: 'cloud' | 'on_demand' | 'on_premise' | null
	/** 
	 * The Vertex API baseurl, optional for 'cloud' kind.
	 * @example ```"yourbaseurl"```
	 */
	baseurl?: string | null
	/** 
	 * The Vertex account client ID.
	 * @example ```"xxx-yyy-zzz"```
	 */
	client_id: string
	/** 
	 * The Vertex account client secret.
	 * @example ```"xxx-yyy-zzz"```
	 */
	client_secret: string
	/** 
	 * Indicates if the transaction will be recorded and visible on the Vertex website.
	 * @example ```true```
	 */
	commit_invoice?: boolean | null
	
}


interface VertexAccountUpdate extends ResourceUpdate {
	
	/** 
	 * The tax calculator's internal name.
	 * @example ```"Personal tax calculator"```
	 */
	name?: string | null
	/** 
	 * The Vertex account kind. One of 'cloud', 'on_demand', or 'on_premise'.
	 * @example ```"cloud"```
	 */
	kind?: 'cloud' | 'on_demand' | 'on_premise' | null
	/** 
	 * The Vertex API baseurl, optional for 'cloud' kind.
	 * @example ```"yourbaseurl"```
	 */
	baseurl?: string | null
	/** 
	 * The Vertex account client ID.
	 * @example ```"xxx-yyy-zzz"```
	 */
	client_id?: string | null
	/** 
	 * The Vertex account client secret.
	 * @example ```"xxx-yyy-zzz"```
	 */
	client_secret?: string | null
	/** 
	 * Indicates if the transaction will be recorded and visible on the Vertex website.
	 * @example ```true```
	 */
	commit_invoice?: boolean | null
	/** 
	 * Send this attribute if you want to manually refresh the access token.
	 * @example ```true```
	 */
	_refresh_token?: boolean | null
	
}


class VertexAccounts extends ApiResource<VertexAccount> {

	static readonly TYPE: VertexAccountType = 'vertex_accounts' as const

	async create(resource: VertexAccountCreate, params?: QueryParamsRetrieve<VertexAccount>, options?: ResourcesConfig): Promise<VertexAccount> {
		return this.resources.create<VertexAccountCreate, VertexAccount>({ ...resource, type: VertexAccounts.TYPE }, params, options)
	}

	async update(resource: VertexAccountUpdate, params?: QueryParamsRetrieve<VertexAccount>, options?: ResourcesConfig): Promise<VertexAccount> {
		return this.resources.update<VertexAccountUpdate, VertexAccount>({ ...resource, type: VertexAccounts.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: VertexAccounts.TYPE } : id, options)
	}

	async markets(vertexAccountId: string | VertexAccount, params?: QueryParamsList<Market>, options?: ResourcesConfig): Promise<ListResponse<Market>> {
		const _vertexAccountId = (vertexAccountId as VertexAccount).id || vertexAccountId as string
		return this.resources.fetch<Market>({ type: 'markets' }, `vertex_accounts/${_vertexAccountId}/markets`, params, options) as unknown as ListResponse<Market>
	}

	async attachments(vertexAccountId: string | VertexAccount, params?: QueryParamsList<Attachment>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _vertexAccountId = (vertexAccountId as VertexAccount).id || vertexAccountId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `vertex_accounts/${_vertexAccountId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async events(vertexAccountId: string | VertexAccount, params?: QueryParamsList<Event>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _vertexAccountId = (vertexAccountId as VertexAccount).id || vertexAccountId as string
		return this.resources.fetch<Event>({ type: 'events' }, `vertex_accounts/${_vertexAccountId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async versions(vertexAccountId: string | VertexAccount, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _vertexAccountId = (vertexAccountId as VertexAccount).id || vertexAccountId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `vertex_accounts/${_vertexAccountId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async _refresh_token(id: string | VertexAccount, params?: QueryParamsRetrieve<VertexAccount>, options?: ResourcesConfig): Promise<VertexAccount> {
		return this.resources.update<VertexAccountUpdate, VertexAccount>({ id: (typeof id === 'string')? id: id.id, type: VertexAccounts.TYPE, _refresh_token: true }, params, options)
	}


	isVertexAccount(resource: any): resource is VertexAccount {
		return resource.type && (resource.type === VertexAccounts.TYPE)
	}


	relationship(id: string | ResourceId | null): VertexAccountRel {
		return super.relationshipOneToOne<VertexAccountRel>(id)
	}

	relationshipToMany(...ids: string[]): VertexAccountRel[] {
		return super.relationshipOneToMany<VertexAccountRel>(...ids)
	}


	type(): VertexAccountType {
		return VertexAccounts.TYPE
	}

}


export default VertexAccounts

export type { VertexAccount, VertexAccountCreate, VertexAccountUpdate, VertexAccountType }
