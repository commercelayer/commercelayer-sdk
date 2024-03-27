import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSortable, ResourceFilterable } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Price, PriceSortable } from './prices'
import type { Attachment, AttachmentSortable } from './attachments'
import type { Version, VersionSortable } from './versions'


type PriceListType = 'price_lists'
type PriceListRel = ResourceRel & { type: PriceListType }


export type PriceListSortable = Pick<PriceList, 'id' | 'name' | 'code' | 'currency_code' | 'tax_included'> & ResourceSortable
export type PriceListFilterable = Pick<PriceList, 'id' | 'name' | 'code' | 'currency_code' | 'tax_included'> & ResourceFilterable


interface PriceList extends Resource {
	
	readonly type: PriceListType

	name: string
	code?: string | null
	currency_code: string
	tax_included?: boolean | null

	prices?: Price[] | null
	attachments?: Attachment[] | null
	versions?: Version[] | null

}


interface PriceListCreate extends ResourceCreate {
	
	name: string
	code?: string | null
	currency_code: string
	tax_included?: boolean | null
	
}


interface PriceListUpdate extends ResourceUpdate {
	
	name?: string | null
	code?: string | null
	currency_code?: string | null
	tax_included?: boolean | null
	
}


class PriceLists extends ApiResource<PriceList, PriceListSortable> {

	static readonly TYPE: PriceListType = 'price_lists' as const

	async create(resource: PriceListCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PriceList> {
		return this.resources.create<PriceListCreate, PriceList>({ ...resource, type: PriceLists.TYPE }, params, options)
	}

	async update(resource: PriceListUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PriceList> {
		return this.resources.update<PriceListUpdate, PriceList>({ ...resource, type: PriceLists.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: PriceLists.TYPE } : id, options)
	}

	async prices(priceListId: string | PriceList, params?: QueryParamsList<PriceSortable>, options?: ResourcesConfig): Promise<ListResponse<Price>> {
		const _priceListId = (priceListId as PriceList).id || priceListId as string
		return this.resources.fetch<Price, PriceSortable>({ type: 'prices' }, `price_lists/${_priceListId}/prices`, params, options) as unknown as ListResponse<Price>
	}

	async attachments(priceListId: string | PriceList, params?: QueryParamsList<AttachmentSortable>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _priceListId = (priceListId as PriceList).id || priceListId as string
		return this.resources.fetch<Attachment, AttachmentSortable>({ type: 'attachments' }, `price_lists/${_priceListId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async versions(priceListId: string | PriceList, params?: QueryParamsList<VersionSortable>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _priceListId = (priceListId as PriceList).id || priceListId as string
		return this.resources.fetch<Version, VersionSortable>({ type: 'versions' }, `price_lists/${_priceListId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	isPriceList(resource: any): resource is PriceList {
		return resource.type && (resource.type === PriceLists.TYPE)
	}


	relationship(id: string | ResourceId | null): PriceListRel {
		return super.relationshipOneToOne<PriceListRel>(id)
	}

	relationshipToMany(...ids: string[]): PriceListRel[] {
		return super.relationshipOneToMany<PriceListRel>(...ids)
	}


	type(): PriceListType {
		return PriceLists.TYPE
	}

}


export default PriceLists

export type { PriceList, PriceListCreate, PriceListUpdate, PriceListType }

/*
export const PriceListsClient = (init: ResourceAdapter | ResourcesInitConfig): PriceLists => {
	return new PriceLists((init instanceof ResourcesInitConfig)? ApiResourceAdapter(init) : init )
}
*/
