import { ApiResource } from '../resource'
import type { Resource, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Market } from './markets'
import type { Attachment } from './attachments'
import type { Version } from './versions'


type OrderValidationRuleType = 'order_validation_rules'
type OrderValidationRuleRel = ResourceRel & { type: OrderValidationRuleType }


export type OrderValidationRuleSort = Pick<OrderValidationRule, 'id'> & ResourceSort
// export type OrderValidationRuleFilter = Pick<OrderValidationRule, 'id'> & ResourceFilter


interface OrderValidationRule extends Resource {
	
	readonly type: OrderValidationRuleType


	market?: Market | null
	attachments?: Attachment[] | null
	versions?: Version[] | null

}


class OrderValidationRules extends ApiResource<OrderValidationRule> {

	static readonly TYPE: OrderValidationRuleType = 'order_validation_rules' as const

	async market(orderValidationRuleId: string | OrderValidationRule, params?: QueryParamsRetrieve<Market>, options?: ResourcesConfig): Promise<Market> {
		const _orderValidationRuleId = (orderValidationRuleId as OrderValidationRule).id || orderValidationRuleId as string
		return this.resources.fetch<Market>({ type: 'markets' }, `order_validation_rules/${_orderValidationRuleId}/market`, params, options) as unknown as Market
	}

	async attachments(orderValidationRuleId: string | OrderValidationRule, params?: QueryParamsList<Attachment>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _orderValidationRuleId = (orderValidationRuleId as OrderValidationRule).id || orderValidationRuleId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `order_validation_rules/${_orderValidationRuleId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async versions(orderValidationRuleId: string | OrderValidationRule, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _orderValidationRuleId = (orderValidationRuleId as OrderValidationRule).id || orderValidationRuleId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `order_validation_rules/${_orderValidationRuleId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	isOrderValidationRule(resource: any): resource is OrderValidationRule {
		return resource.type && (resource.type === OrderValidationRules.TYPE)
	}


	relationship(id: string | ResourceId | null): OrderValidationRuleRel {
		return super.relationshipOneToOne<OrderValidationRuleRel>(id)
	}

	relationshipToMany(...ids: string[]): OrderValidationRuleRel[] {
		return super.relationshipOneToMany<OrderValidationRuleRel>(...ids)
	}


	type(): OrderValidationRuleType {
		return OrderValidationRules.TYPE
	}

}


export default OrderValidationRules

export type { OrderValidationRule, OrderValidationRuleType }
