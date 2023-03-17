import { ApiResource, Resource, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Market } from './markets'
import type { Attachment } from './attachments'


type OrderValidationRuleType = 'order_validation_rules'
type OrderValidationRuleRel = ResourceRel & { type: OrderValidationRuleType }


interface OrderValidationRule extends Resource {
	
	readonly type: OrderValidationRuleType


	market?: Market
	attachments?: Attachment[]

}


class OrderValidationRules extends ApiResource<OrderValidationRule> {

	static readonly TYPE: OrderValidationRuleType = 'order_validation_rules' as const

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<OrderValidationRule>> {
		return this.resources.list<OrderValidationRule>({ type: OrderValidationRules.TYPE }, params, options)
	}

	async market(orderValidationRuleId: string | OrderValidationRule, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Market> {
		const _orderValidationRuleId = (orderValidationRuleId as OrderValidationRule).id || orderValidationRuleId as string
		return this.resources.fetch<Market>({ type: 'markets' }, `order_validation_rules/${_orderValidationRuleId}/market`, params, options) as unknown as Market
	}

	async attachments(orderValidationRuleId: string | OrderValidationRule, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _orderValidationRuleId = (orderValidationRuleId as OrderValidationRule).id || orderValidationRuleId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `order_validation_rules/${_orderValidationRuleId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}


	isOrderValidationRule(resource: any): resource is OrderValidationRule {
		return resource.type && (resource.type === OrderValidationRules.TYPE)
	}


	relationship(id: string | ResourceId | null): OrderValidationRuleRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: OrderValidationRules.TYPE } : { id: id.id, type: OrderValidationRules.TYPE }
	}


	type(): OrderValidationRuleType {
		return OrderValidationRules.TYPE
	}

}


export default OrderValidationRules

export type { OrderValidationRule, OrderValidationRuleType }
