import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Market, MarketType } from './markets'
import type { Attachment } from './attachments'


type BillingInfoValidationRuleType = 'billing_info_validation_rules'
type BillingInfoValidationRuleRel = ResourceRel & { type: BillingInfoValidationRuleType }
type MarketRel = ResourceRel & { type: MarketType }


interface BillingInfoValidationRule extends Resource {
	
	readonly type: BillingInfoValidationRuleType


	market?: Market
	attachments?: Attachment[]

}


interface BillingInfoValidationRuleCreate extends ResourceCreate {
	
	market: MarketRel

}


interface BillingInfoValidationRuleUpdate extends ResourceUpdate {
	
	market?: MarketRel

}


class BillingInfoValidationRules extends ApiResource<BillingInfoValidationRule> {

	static readonly TYPE: BillingInfoValidationRuleType = 'billing_info_validation_rules' as const
	// static readonly PATH = 'billing_info_validation_rules'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<BillingInfoValidationRule>> {
		return this.resources.list<BillingInfoValidationRule>({ type: BillingInfoValidationRules.TYPE }, params, options)
	}

	async create(resource: BillingInfoValidationRuleCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<BillingInfoValidationRule> {
		return this.resources.create<BillingInfoValidationRuleCreate, BillingInfoValidationRule>({ ...resource, type: BillingInfoValidationRules.TYPE }, params, options)
	}

	async update(resource: BillingInfoValidationRuleUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<BillingInfoValidationRule> {
		return this.resources.update<BillingInfoValidationRuleUpdate, BillingInfoValidationRule>({ ...resource, type: BillingInfoValidationRules.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: BillingInfoValidationRules.TYPE } : id, options)
	}

	async market(billingInfoValidationRuleId: string | BillingInfoValidationRule, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Market> {
		const _billingInfoValidationRuleId = (billingInfoValidationRuleId as BillingInfoValidationRule).id || billingInfoValidationRuleId as string
		return this.resources.fetch<Market>({ type: 'markets' }, `billing_info_validation_rules/${_billingInfoValidationRuleId}/market`, params, options) as unknown as Market
	}

	async attachments(billingInfoValidationRuleId: string | BillingInfoValidationRule, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _billingInfoValidationRuleId = (billingInfoValidationRuleId as BillingInfoValidationRule).id || billingInfoValidationRuleId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `billing_info_validation_rules/${_billingInfoValidationRuleId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}


	isBillingInfoValidationRule(resource: any): resource is BillingInfoValidationRule {
		return resource.type && (resource.type === BillingInfoValidationRules.TYPE)
	}


	relationship(id: string | ResourceId | null): BillingInfoValidationRuleRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: BillingInfoValidationRules.TYPE } : { id: id.id, type: BillingInfoValidationRules.TYPE }
	}


	type(): BillingInfoValidationRuleType {
		return BillingInfoValidationRules.TYPE
	}

}


export default BillingInfoValidationRules

export type { BillingInfoValidationRule, BillingInfoValidationRuleCreate, BillingInfoValidationRuleUpdate, BillingInfoValidationRuleType }
