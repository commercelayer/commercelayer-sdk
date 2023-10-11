import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Market, MarketType } from './markets'
import type { SkuList, SkuListType } from './sku_lists'
import type { Sku } from './skus'
import type { Attachment } from './attachments'
import type { Event } from './events'
import type { Tag, TagType } from './tags'
import type { Version } from './versions'


type BundleType = 'bundles'
type BundleRel = ResourceRel & { type: BundleType }
type MarketRel = ResourceRel & { type: MarketType }
type SkuListRel = ResourceRel & { type: SkuListType }
type TagRel = ResourceRel & { type: TagType }


interface Bundle extends Resource {
	
	readonly type: BundleType

	code: string
	name: string
	currency_code?: string | null
	description?: string | null
	image_url?: string | null
	do_not_ship?: boolean | null
	do_not_track?: boolean | null
	price_amount_cents: number
	price_amount_float: number
	formatted_price_amount: string
	compare_at_amount_cents: number
	compare_at_amount_float: number
	formatted_compare_at_amount: string
	skus_count?: number | null

	market?: Market | null
	sku_list?: SkuList | null
	skus?: Sku[] | null
	attachments?: Attachment[] | null
	events?: Event[] | null
	tags?: Tag[] | null
	versions?: Version[] | null

}


interface BundleCreate extends ResourceCreate {
	
	code: string
	name: string
	currency_code?: string | null
	description?: string | null
	image_url?: string | null
	price_amount_cents: number
	compare_at_amount_cents: number
	_compute_price_amount?: boolean | null
	_compute_compare_at_amount?: boolean | null

	market?: MarketRel | null
	sku_list: SkuListRel
	tags?: TagRel[] | null

}


interface BundleUpdate extends ResourceUpdate {
	
	code?: string | null
	name?: string | null
	currency_code?: string | null
	description?: string | null
	image_url?: string | null
	price_amount_cents?: number | null
	compare_at_amount_cents?: number | null
	_compute_price_amount?: boolean | null
	_compute_compare_at_amount?: boolean | null

	tags?: TagRel[] | null

}


class Bundles extends ApiResource<Bundle> {

	static readonly TYPE: BundleType = 'bundles' as const

	async create(resource: BundleCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Bundle> {
		return this.resources.create<BundleCreate, Bundle>({ ...resource, type: Bundles.TYPE }, params, options)
	}

	async update(resource: BundleUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Bundle> {
		return this.resources.update<BundleUpdate, Bundle>({ ...resource, type: Bundles.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: Bundles.TYPE } : id, options)
	}

	async market(bundleId: string | Bundle, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Market> {
		const _bundleId = (bundleId as Bundle).id || bundleId as string
		return this.resources.fetch<Market>({ type: 'markets' }, `bundles/${_bundleId}/market`, params, options) as unknown as Market
	}

	async sku_list(bundleId: string | Bundle, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuList> {
		const _bundleId = (bundleId as Bundle).id || bundleId as string
		return this.resources.fetch<SkuList>({ type: 'sku_lists' }, `bundles/${_bundleId}/sku_list`, params, options) as unknown as SkuList
	}

	async skus(bundleId: string | Bundle, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Sku>> {
		const _bundleId = (bundleId as Bundle).id || bundleId as string
		return this.resources.fetch<Sku>({ type: 'skus' }, `bundles/${_bundleId}/skus`, params, options) as unknown as ListResponse<Sku>
	}

	async attachments(bundleId: string | Bundle, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _bundleId = (bundleId as Bundle).id || bundleId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `bundles/${_bundleId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async events(bundleId: string | Bundle, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _bundleId = (bundleId as Bundle).id || bundleId as string
		return this.resources.fetch<Event>({ type: 'events' }, `bundles/${_bundleId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async tags(bundleId: string | Bundle, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Tag>> {
		const _bundleId = (bundleId as Bundle).id || bundleId as string
		return this.resources.fetch<Tag>({ type: 'tags' }, `bundles/${_bundleId}/tags`, params, options) as unknown as ListResponse<Tag>
	}

	async versions(bundleId: string | Bundle, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _bundleId = (bundleId as Bundle).id || bundleId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `bundles/${_bundleId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async _compute_price_amount(id: string | Bundle, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Bundle> {
		return this.resources.update<BundleUpdate, Bundle>({ id: (typeof id === 'string')? id: id.id, type: Bundles.TYPE, _compute_price_amount: true }, params, options)
	}

	async _compute_compare_at_amount(id: string | Bundle, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Bundle> {
		return this.resources.update<BundleUpdate, Bundle>({ id: (typeof id === 'string')? id: id.id, type: Bundles.TYPE, _compute_compare_at_amount: true }, params, options)
	}


	isBundle(resource: any): resource is Bundle {
		return resource.type && (resource.type === Bundles.TYPE)
	}


	relationship(id: string | ResourceId | null): BundleRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: Bundles.TYPE } : { id: id.id, type: Bundles.TYPE }
	}


	type(): BundleType {
		return Bundles.TYPE
	}


	parse(payload: any): Bundle | Bundle[] {
		return super.parse(payload)
	}

}


export default Bundles

export type { Bundle, BundleCreate, BundleUpdate, BundleType }
