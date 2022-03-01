import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { Market } from './markets'
import type { SkuList } from './sku_lists'
import type { Sku } from './skus'
import type { Attachment } from './attachments'


type BundleRel = ResourceRel & { type: typeof Bundles.TYPE }
type MarketRel = ResourceRel & { type: 'markets' }
type SkuListRel = ResourceRel & { type: 'sku_lists' }


interface Bundle extends Resource {
	
	code?: string
	name?: string
	currency_code?: string
	description?: string
	image_url?: string
	price_amount_cents?: number
	price_amount_float?: number
	formatted_price_amount?: string
	compare_at_amount_cents?: number
	compare_at_amount_float?: number
	formatted_compare_at_amount?: string
	skus_count?: number

	market?: Market
	sku_list?: SkuList
	skus?: Sku[]
	attachments?: Attachment[]

}


interface BundleCreate extends ResourceCreate {
	
	code: string
	name: string
	currency_code?: string
	description?: string
	image_url?: string
	price_amount_cents: number
	compare_at_amount_cents: number
	_compute_price_amount?: boolean
	_compute_compare_at_amount?: boolean

	market?: MarketRel
	sku_list: SkuListRel

}


interface BundleUpdate extends ResourceUpdate {
	
	code?: string
	name?: string
	currency_code?: string
	description?: string
	image_url?: string
	price_amount_cents?: number
	compare_at_amount_cents?: number
	_compute_price_amount?: boolean
	_compute_compare_at_amount?: boolean
	
}


class Bundles extends ApiResource {

	static readonly TYPE: 'bundles' = 'bundles'
	// static readonly PATH = 'bundles'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Bundle>> {
		return this.resources.list<Bundle>({ type: Bundles.TYPE }, params, options)
	}

	async create(resource: BundleCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Bundle> {
		return this.resources.create<BundleCreate, Bundle>({ ...resource, type: Bundles.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Bundle> {
		return this.resources.retrieve<Bundle>({ type: Bundles.TYPE, id }, params, options)
	}

	async update(resource: BundleUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Bundle> {
		return this.resources.update<BundleUpdate, Bundle>({ ...resource, type: Bundles.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: Bundles.TYPE, id }, options)
	}

	async market(bundleId: string | Bundle, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Market> {
		const _bundleId = (bundleId as Bundle).id || bundleId
		return this.resources.fetch<Market>({ type: 'markets' }, `bundles/${_bundleId}/market`, params, options) as unknown as Market
	}

	async sku_list(bundleId: string | Bundle, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuList> {
		const _bundleId = (bundleId as Bundle).id || bundleId
		return this.resources.fetch<SkuList>({ type: 'sku_lists' }, `bundles/${_bundleId}/sku_list`, params, options) as unknown as SkuList
	}

	async skus(bundleId: string | Bundle, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Sku>> {
		const _bundleId = (bundleId as Bundle).id || bundleId
		return this.resources.fetch<Sku>({ type: 'skus' }, `bundles/${_bundleId}/skus`, params, options) as unknown as ListResponse<Sku>
	}

	async attachments(bundleId: string | Bundle, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _bundleId = (bundleId as Bundle).id || bundleId
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `bundles/${_bundleId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isBundle(resource: any): resource is Bundle {
		return resource.type && (resource.type === Bundles.TYPE)
	}


	relationship(id: string | ResourceId | null): BundleRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: Bundles.TYPE } : { id: id.id, type: Bundles.TYPE }
	}


	type(): string {
		return Bundles.TYPE
	}

}


export default Bundles

export { Bundle, BundleCreate, BundleUpdate }
