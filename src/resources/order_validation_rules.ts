import { ApiResource, Resource, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import { QueryParamsList, QueryParamsRetrieve } from '../query'

import { Market } from './markets'


type OrderValidationRuleRel = ResourceRel & { type: typeof OrderValidationRules.TYPE }


interface OrderValidationRule extends Resource {
	
	market?: Market

}


class OrderValidationRules extends ApiResource {

	static readonly TYPE: 'order_validation_rules' = 'order_validation_rules'
	// static readonly PATH = 'order_validation_rules'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<OrderValidationRule>> {
		return this.resources.list({ type: OrderValidationRules.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<OrderValidationRule> {
		return this.resources.retrieve<OrderValidationRule>({ type: OrderValidationRules.TYPE, id }, params, options)
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
