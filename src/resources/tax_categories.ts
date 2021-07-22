/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.3.0
 * Generation date: 21-07-2021
 **/

import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, DocWithData, ResourceId } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { Sku } from './skus'
import { TaxCalculator } from './tax_calculators'
import { Attachment } from './attachments'


type SkuRel = ResourceId & { type: 'skus' }
type TaxCalculatorRel = ResourceId & { type: 'tax_calculators' }


interface TaxCategory extends Resource {
	
	code?: string
	sku_code?: string

	sku?: Sku
	tax_calculator?: TaxCalculator
	attachments?: Attachment[]

}


interface TaxCategoryCreate extends ResourceCreate {
	
	code: string
	sku_code?: string

	sku?: SkuRel
	tax_calculator?: TaxCalculatorRel

}


interface TaxCategoryUpdate extends ResourceUpdate {
	
	code?: string
	sku_code?: string

	sku?: SkuRel

}


class TaxCategories extends ApiResource {

	static readonly TYPE: 'tax_categories' = 'tax_categories'
	// static readonly PATH = 'tax_categories'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<TaxCategory[] | DocWithData<TaxCategory>> {
		return this.resources.list({ type: TaxCategories.TYPE }, params, options)
	}

	async create(resource: TaxCategoryCreate, options?: ResourcesConfig): Promise<TaxCategory | DocWithData<TaxCategory>> {
		return this.resources.create(Object.assign(resource, { type: TaxCategories.TYPE }) , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<TaxCategory | DocWithData<TaxCategory>> {
		return this.resources.retrieve<TaxCategory>({ type: TaxCategories.TYPE, id }, params, options)
	}

	async update(resource: TaxCategoryUpdate, options?: ResourcesConfig): Promise<TaxCategory | DocWithData<TaxCategory>> {
		return this.resources.update({ ...resource, type: TaxCategories.TYPE }, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		this.resources.delete({ type: TaxCategories.TYPE, id }, options)
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isTaxCategory(resource: any): resource is TaxCategory {
		return resource.type && (resource.type === TaxCategories.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(TaxCategories.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(TaxCategories.TYPE)
	}
	*/

	relationship(id: string): ResourceId & { type: typeof TaxCategories.TYPE } {
		return { id, type: TaxCategories.TYPE }
	}

}


export default TaxCategories

export { TaxCategory, TaxCategoryCreate, TaxCategoryUpdate }
