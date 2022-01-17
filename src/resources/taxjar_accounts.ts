import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import { QueryParamsList, QueryParamsRetrieve } from '../query'

import { TaxCategory } from './tax_categories'
import { Market } from './markets'
import { Attachment } from './attachments'


type TaxjarAccountRel = ResourceRel & { type: typeof TaxjarAccounts.TYPE }
type TaxCategoryRel = ResourceRel & { type: 'tax_categories' }


interface TaxjarAccount extends Resource {
	
	name?: string

	tax_categories?: TaxCategory[]
	markets?: Market[]
	attachments?: Attachment[]

}


interface TaxjarAccountCreate extends ResourceCreate {
	
	name: string
	api_key: string

	tax_categories?: TaxCategoryRel[]

}


interface TaxjarAccountUpdate extends ResourceUpdate {
	
	name?: string
	api_key?: string

	tax_categories?: TaxCategoryRel[]

}


class TaxjarAccounts extends ApiResource {

	static readonly TYPE: 'taxjar_accounts' = 'taxjar_accounts'
	// static readonly PATH = 'taxjar_accounts'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<TaxjarAccount>> {
		return this.resources.list({ type: TaxjarAccounts.TYPE }, params, options)
	}

	async create(resource: TaxjarAccountCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<TaxjarAccount> {
		return this.resources.create({ ...resource, type: TaxjarAccounts.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<TaxjarAccount> {
		return this.resources.retrieve<TaxjarAccount>({ type: TaxjarAccounts.TYPE, id }, params, options)
	}

	async update(resource: TaxjarAccountUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<TaxjarAccount> {
		return this.resources.update({ ...resource, type: TaxjarAccounts.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: TaxjarAccounts.TYPE, id }, options)
	}
	


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isTaxjarAccount(resource: any): resource is TaxjarAccount {
		return resource.type && (resource.type === TaxjarAccounts.TYPE)
	}


	relationship(id: string | ResourceId | null): TaxjarAccountRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: TaxjarAccounts.TYPE } : { id: id.id, type: TaxjarAccounts.TYPE }
	}


	type(): string {
		return TaxjarAccounts.TYPE
	}

}


export default TaxjarAccounts

export { TaxjarAccount, TaxjarAccountCreate, TaxjarAccountUpdate }
