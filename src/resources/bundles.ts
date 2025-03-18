import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
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


export type BundleSort = Pick<Bundle, 'id' | 'code' | 'currency_code' | 'price_amount_cents' | 'compare_at_amount_cents'> & ResourceSort
// export type BundleFilter = Pick<Bundle, 'id' | 'code' | 'name' | 'currency_code' | 'description' | 'image_url' | 'do_not_ship' | 'do_not_track' | 'price_amount_cents' | 'compare_at_amount_cents'> & ResourceFilter


interface Bundle extends Resource {
	
	readonly type: BundleType

	/** 
	 * The bundle code, that uniquely identifies the bundle within the market.
	 * @example ```"BUNDMM000000FFFFFFXLXX"```
	 */
	code: string
	/** 
	 * The internal name of the bundle.
	 * @example ```"Men's Black T-shirt (XL) with Black Cap and Socks, all with White Logo"```
	 */
	name: string
	/** 
	 * The international 3-letter currency code as defined by the ISO 4217 standard.
	 * @example ```"EUR"```
	 */
	currency_code?: string | null
	/** 
	 * An internal description of the bundle.
	 * @example ```"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."```
	 */
	description?: string | null
	/** 
	 * The URL of an image that represents the bundle.
	 * @example ```"https://img.yourdomain.com/bundles/xYZkjABcde.png"```
	 */
	image_url?: string | null
	/** 
	 * Indicates if the bundle doesn't generate shipments (all sku_list's SKUs must be do_not_ship).
	 */
	do_not_ship?: boolean | null
	/** 
	 * Indicates if the bundle doesn't track the stock inventory (all sku_list's SKUs must be do_not_track).
	 */
	do_not_track?: boolean | null
	/** 
	 * The bundle price amount for the associated market, in cents.
	 * @example ```10000```
	 */
	price_amount_cents?: number | null
	/** 
	 * The bundle price amount for the associated market, float.
	 * @example ```100```
	 */
	price_amount_float?: number | null
	/** 
	 * The bundle price amount for the associated market, formatted.
	 * @example ```"€100,00"```
	 */
	formatted_price_amount?: string | null
	/** 
	 * The compared price amount, in cents. Useful to display a percentage discount.
	 * @example ```13000```
	 */
	compare_at_amount_cents?: number | null
	/** 
	 * The compared price amount, float.
	 * @example ```130```
	 */
	compare_at_amount_float?: number | null
	/** 
	 * The compared price amount, formatted.
	 * @example ```"€130,00"```
	 */
	formatted_compare_at_amount?: string | null
	/** 
	 * The total number of SKUs in the bundle.
	 * @example ```2```
	 */
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
	
	/** 
	 * The bundle code, that uniquely identifies the bundle within the market.
	 * @example ```"BUNDMM000000FFFFFFXLXX"```
	 */
	code: string
	/** 
	 * The internal name of the bundle.
	 * @example ```"Men's Black T-shirt (XL) with Black Cap and Socks, all with White Logo"```
	 */
	name: string
	/** 
	 * The international 3-letter currency code as defined by the ISO 4217 standard.
	 * @example ```"EUR"```
	 */
	currency_code?: string | null
	/** 
	 * An internal description of the bundle.
	 * @example ```"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."```
	 */
	description?: string | null
	/** 
	 * The URL of an image that represents the bundle.
	 * @example ```"https://img.yourdomain.com/bundles/xYZkjABcde.png"```
	 */
	image_url?: string | null
	/** 
	 * The bundle price amount for the associated market, in cents.
	 * @example ```10000```
	 */
	price_amount_cents?: number | null
	/** 
	 * The compared price amount, in cents. Useful to display a percentage discount.
	 * @example ```13000```
	 */
	compare_at_amount_cents?: number | null
	/** 
	 * Send this attribute if you want to compute the price_amount_cents as the sum of the prices of the bundle SKUs for the market.
	 * @example ```true```
	 */
	_compute_price_amount?: boolean | null
	/** 
	 * Send this attribute if you want to compute the compare_at_amount_cents as the sum of the prices of the bundle SKUs for the market.
	 * @example ```true```
	 */
	_compute_compare_at_amount?: boolean | null

	market?: MarketRel | null
	sku_list: SkuListRel
	tags?: TagRel[] | null

}


interface BundleUpdate extends ResourceUpdate {
	
	/** 
	 * The bundle code, that uniquely identifies the bundle within the market.
	 * @example ```"BUNDMM000000FFFFFFXLXX"```
	 */
	code?: string | null
	/** 
	 * The internal name of the bundle.
	 * @example ```"Men's Black T-shirt (XL) with Black Cap and Socks, all with White Logo"```
	 */
	name?: string | null
	/** 
	 * The international 3-letter currency code as defined by the ISO 4217 standard.
	 * @example ```"EUR"```
	 */
	currency_code?: string | null
	/** 
	 * An internal description of the bundle.
	 * @example ```"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."```
	 */
	description?: string | null
	/** 
	 * The URL of an image that represents the bundle.
	 * @example ```"https://img.yourdomain.com/bundles/xYZkjABcde.png"```
	 */
	image_url?: string | null
	/** 
	 * The bundle price amount for the associated market, in cents.
	 * @example ```10000```
	 */
	price_amount_cents?: number | null
	/** 
	 * The compared price amount, in cents. Useful to display a percentage discount.
	 * @example ```13000```
	 */
	compare_at_amount_cents?: number | null
	/** 
	 * Send this attribute if you want to compute the price_amount_cents as the sum of the prices of the bundle SKUs for the market.
	 * @example ```true```
	 */
	_compute_price_amount?: boolean | null
	/** 
	 * Send this attribute if you want to compute the compare_at_amount_cents as the sum of the prices of the bundle SKUs for the market.
	 * @example ```true```
	 */
	_compute_compare_at_amount?: boolean | null
	/** 
	 * Comma separated list of tags to be added. Duplicates, invalid and non existing ones are discarded. Cannot be passed by sales channels.
	 */
	_add_tags?: string | null
	/** 
	 * Comma separated list of tags to be removed. Duplicates, invalid and non existing ones are discarded. Cannot be passed by sales channels.
	 */
	_remove_tags?: string | null

	tags?: TagRel[] | null

}


class Bundles extends ApiResource<Bundle> {

	static readonly TYPE: BundleType = 'bundles' as const

	async create(resource: BundleCreate, params?: QueryParamsRetrieve<Bundle>, options?: ResourcesConfig): Promise<Bundle> {
		return this.resources.create<BundleCreate, Bundle>({ ...resource, type: Bundles.TYPE }, params, options)
	}

	async update(resource: BundleUpdate, params?: QueryParamsRetrieve<Bundle>, options?: ResourcesConfig): Promise<Bundle> {
		return this.resources.update<BundleUpdate, Bundle>({ ...resource, type: Bundles.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: Bundles.TYPE } : id, options)
	}

	async market(bundleId: string | Bundle, params?: QueryParamsRetrieve<Market>, options?: ResourcesConfig): Promise<Market> {
		const _bundleId = (bundleId as Bundle).id || bundleId as string
		return this.resources.fetch<Market>({ type: 'markets' }, `bundles/${_bundleId}/market`, params, options) as unknown as Market
	}

	async sku_list(bundleId: string | Bundle, params?: QueryParamsRetrieve<SkuList>, options?: ResourcesConfig): Promise<SkuList> {
		const _bundleId = (bundleId as Bundle).id || bundleId as string
		return this.resources.fetch<SkuList>({ type: 'sku_lists' }, `bundles/${_bundleId}/sku_list`, params, options) as unknown as SkuList
	}

	async skus(bundleId: string | Bundle, params?: QueryParamsList<Sku>, options?: ResourcesConfig): Promise<ListResponse<Sku>> {
		const _bundleId = (bundleId as Bundle).id || bundleId as string
		return this.resources.fetch<Sku>({ type: 'skus' }, `bundles/${_bundleId}/skus`, params, options) as unknown as ListResponse<Sku>
	}

	async attachments(bundleId: string | Bundle, params?: QueryParamsList<Attachment>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _bundleId = (bundleId as Bundle).id || bundleId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `bundles/${_bundleId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async events(bundleId: string | Bundle, params?: QueryParamsList<Event>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _bundleId = (bundleId as Bundle).id || bundleId as string
		return this.resources.fetch<Event>({ type: 'events' }, `bundles/${_bundleId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async tags(bundleId: string | Bundle, params?: QueryParamsList<Tag>, options?: ResourcesConfig): Promise<ListResponse<Tag>> {
		const _bundleId = (bundleId as Bundle).id || bundleId as string
		return this.resources.fetch<Tag>({ type: 'tags' }, `bundles/${_bundleId}/tags`, params, options) as unknown as ListResponse<Tag>
	}

	async versions(bundleId: string | Bundle, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _bundleId = (bundleId as Bundle).id || bundleId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `bundles/${_bundleId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async _compute_price_amount(id: string | Bundle, params?: QueryParamsRetrieve<Bundle>, options?: ResourcesConfig): Promise<Bundle> {
		return this.resources.update<BundleUpdate, Bundle>({ id: (typeof id === 'string')? id: id.id, type: Bundles.TYPE, _compute_price_amount: true }, params, options)
	}

	async _compute_compare_at_amount(id: string | Bundle, params?: QueryParamsRetrieve<Bundle>, options?: ResourcesConfig): Promise<Bundle> {
		return this.resources.update<BundleUpdate, Bundle>({ id: (typeof id === 'string')? id: id.id, type: Bundles.TYPE, _compute_compare_at_amount: true }, params, options)
	}

	async _add_tags(id: string | Bundle, triggerValue: string, params?: QueryParamsRetrieve<Bundle>, options?: ResourcesConfig): Promise<Bundle> {
		return this.resources.update<BundleUpdate, Bundle>({ id: (typeof id === 'string')? id: id.id, type: Bundles.TYPE, _add_tags: triggerValue }, params, options)
	}

	async _remove_tags(id: string | Bundle, triggerValue: string, params?: QueryParamsRetrieve<Bundle>, options?: ResourcesConfig): Promise<Bundle> {
		return this.resources.update<BundleUpdate, Bundle>({ id: (typeof id === 'string')? id: id.id, type: Bundles.TYPE, _remove_tags: triggerValue }, params, options)
	}


	isBundle(resource: any): resource is Bundle {
		return resource.type && (resource.type === Bundles.TYPE)
	}


	relationship(id: string | ResourceId | null): BundleRel {
		return super.relationshipOneToOne<BundleRel>(id)
	}

	relationshipToMany(...ids: string[]): BundleRel[] {
		return super.relationshipOneToMany<BundleRel>(...ids)
	}


	type(): BundleType {
		return Bundles.TYPE
	}

}


export default Bundles

export type { Bundle, BundleCreate, BundleUpdate, BundleType }
