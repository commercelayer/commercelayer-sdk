import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Sku, SkuType } from './skus'
import type { Attachment } from './attachments'
import type { Version } from './versions'
import type { AvalaraAccount, AvalaraAccountType } from './avalara_accounts'
import type { StripeTaxAccount, StripeTaxAccountType } from './stripe_tax_accounts'
import type { VertexAccount, VertexAccountType } from './vertex_accounts'
import type { TaxjarAccount, TaxjarAccountType } from './taxjar_accounts'
import type { ManualTaxCalculator, ManualTaxCalculatorType } from './manual_tax_calculators'
import type { ExternalTaxCalculator, ExternalTaxCalculatorType } from './external_tax_calculators'


type TaxCategoryType = 'tax_categories'
type TaxCategoryRel = ResourceRel & { type: TaxCategoryType }
type SkuRel = ResourceRel & { type: SkuType }
type AvalaraAccountRel = ResourceRel & { type: AvalaraAccountType }
type StripeTaxAccountRel = ResourceRel & { type: StripeTaxAccountType }
type VertexAccountRel = ResourceRel & { type: VertexAccountType }
type TaxjarAccountRel = ResourceRel & { type: TaxjarAccountType }
type ManualTaxCalculatorRel = ResourceRel & { type: ManualTaxCalculatorType }
type ExternalTaxCalculatorRel = ResourceRel & { type: ExternalTaxCalculatorType }


export type TaxCategorySort = Pick<TaxCategory, 'id' | 'code'> & ResourceSort
// export type TaxCategoryFilter = Pick<TaxCategory, 'id' | 'code'> & ResourceFilter


interface TaxCategory extends Resource {
	
	readonly type: TaxCategoryType

	/** 
	 * The tax category identifier code, specific for a particular tax calculator.
	 * @example ```"31000"```
	 */
	code: string
	/** 
	 * The code of the associated SKU.
	 * @example ```"TSHIRTMM000000FFFFFFXLXX"```
	 */
	sku_code?: string | null

	sku?: Sku | null
	tax_calculator?: AvalaraAccount | StripeTaxAccount | VertexAccount | TaxjarAccount | ManualTaxCalculator | ExternalTaxCalculator | null
	attachments?: Attachment[] | null
	versions?: Version[] | null

}


interface TaxCategoryCreate extends ResourceCreate {
	
	/** 
	 * The tax category identifier code, specific for a particular tax calculator.
	 * @example ```"31000"```
	 */
	code: string
	/** 
	 * The code of the associated SKU.
	 * @example ```"TSHIRTMM000000FFFFFFXLXX"```
	 */
	sku_code?: string | null

	sku: SkuRel
	tax_calculator: AvalaraAccountRel | StripeTaxAccountRel | VertexAccountRel | TaxjarAccountRel | ManualTaxCalculatorRel | ExternalTaxCalculatorRel

}


interface TaxCategoryUpdate extends ResourceUpdate {
	
	/** 
	 * The tax category identifier code, specific for a particular tax calculator.
	 * @example ```"31000"```
	 */
	code?: string | null
	/** 
	 * The code of the associated SKU.
	 * @example ```"TSHIRTMM000000FFFFFFXLXX"```
	 */
	sku_code?: string | null

	sku?: SkuRel | null

}


class TaxCategories extends ApiResource<TaxCategory> {

	static readonly TYPE: TaxCategoryType = 'tax_categories' as const

	async create(resource: TaxCategoryCreate, params?: QueryParamsRetrieve<TaxCategory>, options?: ResourcesConfig): Promise<TaxCategory> {
		return this.resources.create<TaxCategoryCreate, TaxCategory>({ ...resource, type: TaxCategories.TYPE }, params, options)
	}

	async update(resource: TaxCategoryUpdate, params?: QueryParamsRetrieve<TaxCategory>, options?: ResourcesConfig): Promise<TaxCategory> {
		return this.resources.update<TaxCategoryUpdate, TaxCategory>({ ...resource, type: TaxCategories.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: TaxCategories.TYPE } : id, options)
	}

	async sku(taxCategoryId: string | TaxCategory, params?: QueryParamsRetrieve<Sku>, options?: ResourcesConfig): Promise<Sku> {
		const _taxCategoryId = (taxCategoryId as TaxCategory).id || taxCategoryId as string
		return this.resources.fetch<Sku>({ type: 'skus' }, `tax_categories/${_taxCategoryId}/sku`, params, options) as unknown as Sku
	}

	async attachments(taxCategoryId: string | TaxCategory, params?: QueryParamsList<Attachment>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _taxCategoryId = (taxCategoryId as TaxCategory).id || taxCategoryId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `tax_categories/${_taxCategoryId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async versions(taxCategoryId: string | TaxCategory, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _taxCategoryId = (taxCategoryId as TaxCategory).id || taxCategoryId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `tax_categories/${_taxCategoryId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	isTaxCategory(resource: any): resource is TaxCategory {
		return resource.type && (resource.type === TaxCategories.TYPE)
	}


	relationship(id: string | ResourceId | null): TaxCategoryRel {
		return super.relationshipOneToOne<TaxCategoryRel>(id)
	}

	relationshipToMany(...ids: string[]): TaxCategoryRel[] {
		return super.relationshipOneToMany<TaxCategoryRel>(...ids)
	}


	type(): TaxCategoryType {
		return TaxCategories.TYPE
	}

}


export default TaxCategories

export type { TaxCategory, TaxCategoryCreate, TaxCategoryUpdate, TaxCategoryType }
