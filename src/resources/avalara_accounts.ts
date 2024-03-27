import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSortable, /* ResourceFilterable */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Market } from './markets'
import type { Attachment } from './attachments'
import type { Version } from './versions'
import type { TaxCategory, TaxCategoryType } from './tax_categories'


type AvalaraAccountType = 'avalara_accounts'
type AvalaraAccountRel = ResourceRel & { type: AvalaraAccountType }
type TaxCategoryRel = ResourceRel & { type: TaxCategoryType }


export type AvalaraAccountSortable = Pick<AvalaraAccount, 'id' | 'name'> & ResourceSortable
// export type AvalaraAccountFilterable = Pick<AvalaraAccount, 'id' | 'name'> & ResourceFilterable


interface AvalaraAccount extends Resource {
	
	readonly type: AvalaraAccountType

	name: string
	username: string
	company_code: string
	commit_invoice?: boolean | null
	ddp?: boolean | null

	markets?: Market[] | null
	attachments?: Attachment[] | null
	versions?: Version[] | null
	tax_categories?: TaxCategory[] | null

}


interface AvalaraAccountCreate extends ResourceCreate {
	
	name: string
	username: string
	password: string
	company_code: string
	commit_invoice?: boolean | null
	ddp?: boolean | null

	tax_categories?: TaxCategoryRel[] | null

}


interface AvalaraAccountUpdate extends ResourceUpdate {
	
	name?: string | null
	username?: string | null
	password?: string | null
	company_code?: string | null
	commit_invoice?: boolean | null
	ddp?: boolean | null

	tax_categories?: TaxCategoryRel[] | null

}


class AvalaraAccounts extends ApiResource<AvalaraAccount> {

	static readonly TYPE: AvalaraAccountType = 'avalara_accounts' as const

	async create(resource: AvalaraAccountCreate, params?: QueryParamsRetrieve<AvalaraAccount>, options?: ResourcesConfig): Promise<AvalaraAccount> {
		return this.resources.create<AvalaraAccountCreate, AvalaraAccount>({ ...resource, type: AvalaraAccounts.TYPE }, params, options)
	}

	async update(resource: AvalaraAccountUpdate, params?: QueryParamsRetrieve<AvalaraAccount>, options?: ResourcesConfig): Promise<AvalaraAccount> {
		return this.resources.update<AvalaraAccountUpdate, AvalaraAccount>({ ...resource, type: AvalaraAccounts.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: AvalaraAccounts.TYPE } : id, options)
	}

	async markets(avalaraAccountId: string | AvalaraAccount, params?: QueryParamsList<Market>, options?: ResourcesConfig): Promise<ListResponse<Market>> {
		const _avalaraAccountId = (avalaraAccountId as AvalaraAccount).id || avalaraAccountId as string
		return this.resources.fetch<Market>({ type: 'markets' }, `avalara_accounts/${_avalaraAccountId}/markets`, params, options) as unknown as ListResponse<Market>
	}

	async attachments(avalaraAccountId: string | AvalaraAccount, params?: QueryParamsList<Attachment>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _avalaraAccountId = (avalaraAccountId as AvalaraAccount).id || avalaraAccountId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `avalara_accounts/${_avalaraAccountId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async versions(avalaraAccountId: string | AvalaraAccount, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _avalaraAccountId = (avalaraAccountId as AvalaraAccount).id || avalaraAccountId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `avalara_accounts/${_avalaraAccountId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async tax_categories(avalaraAccountId: string | AvalaraAccount, params?: QueryParamsList<TaxCategory>, options?: ResourcesConfig): Promise<ListResponse<TaxCategory>> {
		const _avalaraAccountId = (avalaraAccountId as AvalaraAccount).id || avalaraAccountId as string
		return this.resources.fetch<TaxCategory>({ type: 'tax_categories' }, `avalara_accounts/${_avalaraAccountId}/tax_categories`, params, options) as unknown as ListResponse<TaxCategory>
	}


	isAvalaraAccount(resource: any): resource is AvalaraAccount {
		return resource.type && (resource.type === AvalaraAccounts.TYPE)
	}


	relationship(id: string | ResourceId | null): AvalaraAccountRel {
		return super.relationshipOneToOne<AvalaraAccountRel>(id)
	}

	relationshipToMany(...ids: string[]): AvalaraAccountRel[] {
		return super.relationshipOneToMany<AvalaraAccountRel>(...ids)
	}


	type(): AvalaraAccountType {
		return AvalaraAccounts.TYPE
	}

}


export default AvalaraAccounts

export type { AvalaraAccount, AvalaraAccountCreate, AvalaraAccountUpdate, AvalaraAccountType }

/*
export const AvalaraAccountsClient = (init: ResourceAdapter | ResourcesInitConfig): AvalaraAccounts => {
	return new AvalaraAccounts((init instanceof ResourcesInitConfig)? ApiResourceAdapter(init) : init )
}
*/
