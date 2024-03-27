import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSortable, ResourceFilterable } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Market, MarketSortable } from './markets'
import type { Attachment, AttachmentSortable } from './attachments'
import type { Version, VersionSortable } from './versions'
import type { TaxCategory, TaxCategoryType, TaxCategorySortable } from './tax_categories'


type TaxjarAccountType = 'taxjar_accounts'
type TaxjarAccountRel = ResourceRel & { type: TaxjarAccountType }
type TaxCategoryRel = ResourceRel & { type: TaxCategoryType }


export type TaxjarAccountSortable = Pick<TaxjarAccount, 'id' | 'name'> & ResourceSortable
export type TaxjarAccountFilterable = Pick<TaxjarAccount, 'id' | 'name'> & ResourceFilterable


interface TaxjarAccount extends Resource {
	
	readonly type: TaxjarAccountType

	name: string

	markets?: Market[] | null
	attachments?: Attachment[] | null
	versions?: Version[] | null
	tax_categories?: TaxCategory[] | null

}


interface TaxjarAccountCreate extends ResourceCreate {
	
	name: string
	api_key: string

	tax_categories?: TaxCategoryRel[] | null

}


interface TaxjarAccountUpdate extends ResourceUpdate {
	
	name?: string | null
	api_key?: string | null

	tax_categories?: TaxCategoryRel[] | null

}


class TaxjarAccounts extends ApiResource<TaxjarAccount, TaxjarAccountSortable> {

	static readonly TYPE: TaxjarAccountType = 'taxjar_accounts' as const

	async create(resource: TaxjarAccountCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<TaxjarAccount> {
		return this.resources.create<TaxjarAccountCreate, TaxjarAccount>({ ...resource, type: TaxjarAccounts.TYPE }, params, options)
	}

	async update(resource: TaxjarAccountUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<TaxjarAccount> {
		return this.resources.update<TaxjarAccountUpdate, TaxjarAccount>({ ...resource, type: TaxjarAccounts.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: TaxjarAccounts.TYPE } : id, options)
	}

	async markets(taxjarAccountId: string | TaxjarAccount, params?: QueryParamsList<MarketSortable>, options?: ResourcesConfig): Promise<ListResponse<Market>> {
		const _taxjarAccountId = (taxjarAccountId as TaxjarAccount).id || taxjarAccountId as string
		return this.resources.fetch<Market, MarketSortable>({ type: 'markets' }, `taxjar_accounts/${_taxjarAccountId}/markets`, params, options) as unknown as ListResponse<Market>
	}

	async attachments(taxjarAccountId: string | TaxjarAccount, params?: QueryParamsList<AttachmentSortable>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _taxjarAccountId = (taxjarAccountId as TaxjarAccount).id || taxjarAccountId as string
		return this.resources.fetch<Attachment, AttachmentSortable>({ type: 'attachments' }, `taxjar_accounts/${_taxjarAccountId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async versions(taxjarAccountId: string | TaxjarAccount, params?: QueryParamsList<VersionSortable>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _taxjarAccountId = (taxjarAccountId as TaxjarAccount).id || taxjarAccountId as string
		return this.resources.fetch<Version, VersionSortable>({ type: 'versions' }, `taxjar_accounts/${_taxjarAccountId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async tax_categories(taxjarAccountId: string | TaxjarAccount, params?: QueryParamsList<TaxCategorySortable>, options?: ResourcesConfig): Promise<ListResponse<TaxCategory>> {
		const _taxjarAccountId = (taxjarAccountId as TaxjarAccount).id || taxjarAccountId as string
		return this.resources.fetch<TaxCategory, TaxCategorySortable>({ type: 'tax_categories' }, `taxjar_accounts/${_taxjarAccountId}/tax_categories`, params, options) as unknown as ListResponse<TaxCategory>
	}


	isTaxjarAccount(resource: any): resource is TaxjarAccount {
		return resource.type && (resource.type === TaxjarAccounts.TYPE)
	}


	relationship(id: string | ResourceId | null): TaxjarAccountRel {
		return super.relationshipOneToOne<TaxjarAccountRel>(id)
	}

	relationshipToMany(...ids: string[]): TaxjarAccountRel[] {
		return super.relationshipOneToMany<TaxjarAccountRel>(...ids)
	}


	type(): TaxjarAccountType {
		return TaxjarAccounts.TYPE
	}

}


export default TaxjarAccounts

export type { TaxjarAccount, TaxjarAccountCreate, TaxjarAccountUpdate, TaxjarAccountType }

/*
export const TaxjarAccountsClient = (init: ResourceAdapter | ResourcesInitConfig): TaxjarAccounts => {
	return new TaxjarAccounts((init instanceof ResourcesInitConfig)? ApiResourceAdapter(init) : init )
}
*/
