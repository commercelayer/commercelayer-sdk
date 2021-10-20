/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.7.3
 **/

import { ApiResource, Resource, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList } from '../query'

import { Market } from './markets'


type OrderValidationRuleRel = ResourceId & { type: typeof OrderValidationRules.TYPE }


interface OrderValidationRule extends Resource {
	
	market?: Market

}


class OrderValidationRules extends ApiResource {

	static readonly TYPE: 'order_validation_rules' = 'order_validation_rules'
	// static readonly PATH = 'order_validation_rules'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<OrderValidationRule>> {
		return this.resources.list({ type: OrderValidationRules.TYPE }, params, options)
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isOrderValidationRule(resource: any): resource is OrderValidationRule {
		return resource.type && (resource.type === OrderValidationRules.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(OrderValidationRules.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(OrderValidationRules.TYPE)
	}
	*/

	relationship(id: string | ResourceId): OrderValidationRuleRel {
		return (typeof id === 'string') ? { id, type: OrderValidationRules.TYPE } : {id: id.id, type: OrderValidationRules.TYPE }
	}

	type(): string {
		return OrderValidationRules.TYPE
	}

}


export default OrderValidationRules

export { OrderValidationRule }
