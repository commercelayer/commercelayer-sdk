import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Sku, SkuType } from './skus'
import type { AvalaraAccount, AvalaraAccountType } from './avalara_accounts'
import type { TaxjarAccount, TaxjarAccountType } from './taxjar_accounts'
import type { ManualTaxCalculator, ManualTaxCalculatorType } from './manual_tax_calculators'
import type { ExternalTaxCalculator, ExternalTaxCalculatorType } from './external_tax_calculators'
import type { Attachment } from './attachments'
import type { Version } from './versions'


type TaxCategoryType = 'tax_categories'
type TaxCategoryRel = ResourceRel & { type: TaxCategoryType }
type SkuRel = ResourceRel & { type: SkuType }
type AvalaraAccountRel = ResourceRel & { type: AvalaraAccountType }
type TaxjarAccountRel = ResourceRel & { type: TaxjarAccountType }
type ManualTaxCalculatorRel = ResourceRel & { type: ManualTaxCalculatorType }
type ExternalTaxCalculatorRel = ResourceRel & { type: ExternalTaxCalculatorType }


interface TaxCategory extends Resource {
	
	readonly type: TaxCategoryType

	code: string
	sku_code?: string | null

	sku?: Sku | null
	tax_calculator?: AvalaraAccount | TaxjarAccount | ManualTaxCalculator | ExternalTaxCalculator | null
	attachments?: Attachment[] | null
	versions?: Version[] | null

}


interface TaxCategoryCreate extends ResourceCreate {
	
	code: string
	sku_code?: string | null

	sku: SkuRel
	tax_calculator: AvalaraAccountRel | TaxjarAccountRel | ManualTaxCalculatorRel | ExternalTaxCalculatorRel

}


interface TaxCategoryUpdate extends ResourceUpdate {
	
	code?: string | null
	sku_code?: string | null

	sku?: SkuRel | null

}


class TaxCategories extends ApiResource<TaxCategory> {

	static readonly TYPE: TaxCategoryType = 'tax_categories' as const

	async create(resource: TaxCategoryCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<TaxCategory> {
		return this.resources.create<TaxCategoryCreate, TaxCategory>({ ...resource, type: TaxCategories.TYPE }, params, options)
	}

	async update(resource: TaxCategoryUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<TaxCategory> {
		return this.resources.update<TaxCategoryUpdate, TaxCategory>({ ...resource, type: TaxCategories.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: TaxCategories.TYPE } : id, options)
	}

	async sku(taxCategoryId: string | TaxCategory, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Sku> {
		const _taxCategoryId = (taxCategoryId as TaxCategory).id || taxCategoryId as string
		return this.resources.fetch<Sku>({ type: 'skus' }, `tax_categories/${_taxCategoryId}/sku`, params, options) as unknown as Sku
	}

	async attachments(taxCategoryId: string | TaxCategory, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _taxCategoryId = (taxCategoryId as TaxCategory).id || taxCategoryId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `tax_categories/${_taxCategoryId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async versions(taxCategoryId: string | TaxCategory, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _taxCategoryId = (taxCategoryId as TaxCategory).id || taxCategoryId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `tax_categories/${_taxCategoryId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	isTaxCategory(resource: any): resource is TaxCategory {
		return resource.type && (resource.type === TaxCategories.TYPE)
	}


	relationship(id: string | ResourceId | null): TaxCategoryRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: TaxCategories.TYPE } : { id: id.id, type: TaxCategories.TYPE }
	}


	type(): TaxCategoryType {
		return TaxCategories.TYPE
	}


	parse(payload: any): TaxCategory | TaxCategory[] {
		return super.parse(payload)
	}

}


export default TaxCategories

export type { TaxCategory, TaxCategoryCreate, TaxCategoryUpdate, TaxCategoryType }
