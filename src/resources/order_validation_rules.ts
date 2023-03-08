import { ApiResource, Resource, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { Market } from './markets'
import type { Attachment } from './attachments'


type OrderValidationRuleRel = ResourceRel & { type: typeof OrderValidationRules.TYPE }


interface OrderValidationRule extends Resource {
	
	market?: Market
	attachments?: Attachment[]

}


class OrderValidationRules extends ApiResource {

	static readonly TYPE: 'order_validation_rules' = 'order_validation_rules' as const
	// static readonly PATH = 'order_validation_rules'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<OrderValidationRule>> {
		return this.resources.list<OrderValidationRule>({ type: OrderValidationRules.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<OrderValidationRule> {
		return this.resources.retrieve<OrderValidationRule>({ type: OrderValidationRules.TYPE, id }, params, options)
	}

	async market(orderValidationRuleId: string | OrderValidationRule, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Market> {
		const _orderValidationRuleId = (orderValidationRuleId as OrderValidationRule).id || orderValidationRuleId as string
		return this.resources.fetch<Market>({ type: 'markets' }, `order_validation_rules/${_orderValidationRuleId}/market`, params, options) as unknown as Market
	}

	async attachments(orderValidationRuleId: string | OrderValidationRule, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _orderValidationRuleId = (orderValidationRuleId as OrderValidationRule).id || orderValidationRuleId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `order_validation_rules/${_orderValidationRuleId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isOrderValidationRule(resource: any): resource is OrderValidationRule {
		return resource.type && (resource.type === OrderValidationRules.TYPE)
	}


	relationship(id: string | ResourceId | null): OrderValidationRuleRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: OrderValidationRules.TYPE } : { id: id.id, type: OrderValidationRules.TYPE }
	}


	type(): string {
		return OrderValidationRules.TYPE
	}

}


export default OrderValidationRules

export { OrderValidationRule }
