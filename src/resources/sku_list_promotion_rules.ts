/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.3.0
 * Generation date: 21-07-2021
 **/

import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, DocWithData, ResourceId } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { Promotion } from './promotions'
import { SkuList } from './sku_lists'
import { Sku } from './skus'


type PromotionRel = ResourceId & { type: 'promotions' }
type SkuListRel = ResourceId & { type: 'sku_lists' }


interface SkuListPromotionRule extends Resource {
	
	all_skus?: boolean

	promotion?: Promotion
	sku_list?: SkuList
	skus?: Sku[]

}


interface SkuListPromotionRuleCreate extends ResourceCreate {
	
	all_skus?: boolean

	promotion?: PromotionRel
	sku_list?: SkuListRel

}


interface SkuListPromotionRuleUpdate extends ResourceUpdate {
	
	all_skus?: boolean

	promotion?: PromotionRel
	sku_list?: SkuListRel

}


class SkuListPromotionRules extends ApiResource {

	static readonly TYPE: 'sku_list_promotion_rules' = 'sku_list_promotion_rules'
	// static readonly PATH = 'sku_list_promotion_rules'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<SkuListPromotionRule[] | DocWithData<SkuListPromotionRule>> {
		return this.resources.list({ type: SkuListPromotionRules.TYPE }, params, options)
	}

	async create(resource: SkuListPromotionRuleCreate, options?: ResourcesConfig): Promise<SkuListPromotionRule | DocWithData<SkuListPromotionRule>> {
		return this.resources.create(Object.assign(resource, { type: SkuListPromotionRules.TYPE }) , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuListPromotionRule | DocWithData<SkuListPromotionRule>> {
		return this.resources.retrieve<SkuListPromotionRule>({ type: SkuListPromotionRules.TYPE, id }, params, options)
	}

	async update(resource: SkuListPromotionRuleUpdate, options?: ResourcesConfig): Promise<SkuListPromotionRule | DocWithData<SkuListPromotionRule>> {
		return this.resources.update({ ...resource, type: SkuListPromotionRules.TYPE }, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		this.resources.delete({ type: SkuListPromotionRules.TYPE, id }, options)
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isSkuListPromotionRule(resource: any): resource is SkuListPromotionRule {
		return resource.type && (resource.type === SkuListPromotionRules.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(SkuListPromotionRules.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(SkuListPromotionRules.TYPE)
	}
	*/

	relationship(id: string): ResourceId & { type: typeof SkuListPromotionRules.TYPE } {
		return { id, type: SkuListPromotionRules.TYPE }
	}

}


export default SkuListPromotionRules

export { SkuListPromotionRule, SkuListPromotionRuleCreate, SkuListPromotionRuleUpdate }
