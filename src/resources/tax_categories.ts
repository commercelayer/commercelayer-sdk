import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import { QueryParamsList, QueryParamsRetrieve } from '../query'

import { Sku } from './skus'
import { AvalaraAccount } from './avalara_accounts'
import { TaxjarAccount } from './taxjar_accounts'
import { ManualTaxCalculator } from './manual_tax_calculators'
import { ExternalTaxCalculator } from './external_tax_calculators'
import { Attachment } from './attachments'


type TaxCategoryRel = ResourceRel & { type: typeof TaxCategories.TYPE }
type SkuRel = ResourceRel & { type: 'skus' }
type AvalaraAccountRel = ResourceRel & { type: 'avalara_accounts' }
type TaxjarAccountRel = ResourceRel & { type: 'taxjar_accounts' }
type ManualTaxCalculatorRel = ResourceRel & { type: 'manual_tax_calculators' }
type ExternalTaxCalculatorRel = ResourceRel & { type: 'external_tax_calculators' }


interface TaxCategory extends Resource {
	
	code?: string
	sku_code?: string

	sku?: Sku
	tax_calculator?: AvalaraAccount | TaxjarAccount | ManualTaxCalculator | ExternalTaxCalculator
	attachments?: Attachment[]

}


interface TaxCategoryCreate extends ResourceCreate {
	
	code: string
	sku_code?: string

	sku: SkuRel
	tax_calculator: AvalaraAccountRel | TaxjarAccountRel | ManualTaxCalculatorRel | ExternalTaxCalculatorRel

}


interface TaxCategoryUpdate extends ResourceUpdate {
	
	code?: string
	sku_code?: string

	sku?: SkuRel

}


class TaxCategories extends ApiResource {

	static readonly TYPE: 'tax_categories' = 'tax_categories'
	// static readonly PATH = 'tax_categories'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<TaxCategory>> {
		return this.resources.list<TaxCategory>({ type: TaxCategories.TYPE }, params, options)
	}

	async create(resource: TaxCategoryCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<TaxCategory> {
		return this.resources.create({ ...resource, type: TaxCategories.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<TaxCategory> {
		return this.resources.retrieve<TaxCategory>({ type: TaxCategories.TYPE, id }, params, options)
	}

	async update(resource: TaxCategoryUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<TaxCategory> {
		return this.resources.update({ ...resource, type: TaxCategories.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: TaxCategories.TYPE, id }, options)
	}

	async sku(taxCategoryId: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Sku> {
		return this.resources.fetch<Sku>({ type: 'skus' }, `tax_categories/${taxCategoryId}/sku`, params, options) as unknown as Sku
	}

	async attachments(taxCategoryId: string, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `tax_categories/${taxCategoryId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isTaxCategory(resource: any): resource is TaxCategory {
		return resource.type && (resource.type === TaxCategories.TYPE)
	}


	relationship(id: string | ResourceId | null): TaxCategoryRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: TaxCategories.TYPE } : { id: id.id, type: TaxCategories.TYPE }
	}


	type(): string {
		return TaxCategories.TYPE
	}

}


export default TaxCategories

export { TaxCategory, TaxCategoryCreate, TaxCategoryUpdate }
