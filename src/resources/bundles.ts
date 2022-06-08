import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import { QueryParamsList, QueryParamsRetrieve } from '../query'

import { Market } from './markets'
import { SkuList } from './sku_lists'
import { Sku } from './skus'
import { Attachment } from './attachments'


type BundleRel = ResourceRel & { type: typeof Bundles.TYPE }
type MarketRel = ResourceRel & { type: 'markets' }
type SkuListRel = ResourceRel & { type: 'sku_lists' }


interface Bundle extends Resource {
	
	code?: string
	name?: string
	currency_code?: string
	description?: string
	image_url?: string
	do_not_ship?: boolean
	do_not_track?: boolean
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
	do_not_ship?: boolean
	do_not_track?: boolean
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
	do_not_ship?: boolean
	do_not_track?: boolean
	price_amount_cents?: number
	compare_at_amount_cents?: number
	_compute_price_amount?: boolean
	_compute_compare_at_amount?: boolean
	
}


class Bundles extends ApiResource {

	static readonly TYPE: 'bundles' = 'bundles'
	// static readonly PATH = 'bundles'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Bundle>> {
		return this.resources.list({ type: Bundles.TYPE }, params, options)
	}

	async create(resource: BundleCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Bundle> {
		return this.resources.create({ ...resource, type: Bundles.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Bundle> {
		return this.resources.retrieve<Bundle>({ type: Bundles.TYPE, id }, params, options)
	}

	async update(resource: BundleUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Bundle> {
		return this.resources.update({ ...resource, type: Bundles.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: Bundles.TYPE, id }, options)
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
