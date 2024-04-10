import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { OrderSubscription } from './order_subscriptions'
import type { Adjustment } from './adjustments'
import type { Bundle } from './bundles'
import type { Sku } from './skus'
import type { LineItem } from './line_items'


type OrderSubscriptionItemRel = ResourceRel & { type: typeof OrderSubscriptionItems.TYPE }
type OrderSubscriptionRel = ResourceRel & { type: 'order_subscriptions' }
type AdjustmentRel = ResourceRel & { type: 'adjustments' }
type BundleRel = ResourceRel & { type: 'bundles' }
type SkuRel = ResourceRel & { type: 'skus' }


interface OrderSubscriptionItem extends Resource {
	
	sku_code?: string
	bundle_code?: string
	quantity?: number
	unit_amount_cents?: number
	unit_amount_float?: number
	formatted_unit_amount?: string
	total_amount_cents?: number
	total_amount_float?: number
	formatted_total_amount?: string

	order_subscription?: OrderSubscription
	item?: Adjustment | Bundle | Sku
	sku?: Sku
	bundle?: Bundle
	adjustment?: Adjustment
	source_line_item?: LineItem

}


interface OrderSubscriptionItemCreate extends ResourceCreate {
	
	sku_code?: string
	bundle_code?: string
	quantity: number
	unit_amount_cents?: number

	order_subscription: OrderSubscriptionRel
	item: AdjustmentRel | BundleRel | SkuRel
	sku?: SkuRel
	bundle?: BundleRel
	adjustment?: AdjustmentRel

}


interface OrderSubscriptionItemUpdate extends ResourceUpdate {
	
	sku_code?: string
	bundle_code?: string
	quantity?: number
	unit_amount_cents?: number
	
}


class OrderSubscriptionItems extends ApiResource {

	static readonly TYPE: 'order_subscription_items' = 'order_subscription_items' as const
	// static readonly PATH = 'order_subscription_items'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<OrderSubscriptionItem>> {
		return this.resources.list<OrderSubscriptionItem>({ type: OrderSubscriptionItems.TYPE }, params, options)
	}

	async create(resource: OrderSubscriptionItemCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<OrderSubscriptionItem> {
		return this.resources.create<OrderSubscriptionItemCreate, OrderSubscriptionItem>({ ...resource, type: OrderSubscriptionItems.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<OrderSubscriptionItem> {
		return this.resources.retrieve<OrderSubscriptionItem>({ type: OrderSubscriptionItems.TYPE, id }, params, options)
	}

	async update(resource: OrderSubscriptionItemUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<OrderSubscriptionItem> {
		return this.resources.update<OrderSubscriptionItemUpdate, OrderSubscriptionItem>({ ...resource, type: OrderSubscriptionItems.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: OrderSubscriptionItems.TYPE, id }, options)
	}

	async order_subscription(orderSubscriptionItemId: string | OrderSubscriptionItem, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<OrderSubscription> {
		const _orderSubscriptionItemId = (orderSubscriptionItemId as OrderSubscriptionItem).id || orderSubscriptionItemId as string
		return this.resources.fetch<OrderSubscription>({ type: 'order_subscriptions' }, `order_subscription_items/${_orderSubscriptionItemId}/order_subscription`, params, options) as unknown as OrderSubscription
	}

	async source_line_item(orderSubscriptionItemId: string | OrderSubscriptionItem, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<LineItem> {
		const _orderSubscriptionItemId = (orderSubscriptionItemId as OrderSubscriptionItem).id || orderSubscriptionItemId as string
		return this.resources.fetch<LineItem>({ type: 'line_items' }, `order_subscription_items/${_orderSubscriptionItemId}/source_line_item`, params, options) as unknown as LineItem
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isOrderSubscriptionItem(resource: any): resource is OrderSubscriptionItem {
		return resource.type && (resource.type === OrderSubscriptionItems.TYPE)
	}


	relationship(id: string | ResourceId | null): OrderSubscriptionItemRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: OrderSubscriptionItems.TYPE } : { id: id.id, type: OrderSubscriptionItems.TYPE }
	}


	type(): string {
		return OrderSubscriptionItems.TYPE
	}

}


export default OrderSubscriptionItems

export { OrderSubscriptionItem, OrderSubscriptionItemCreate, OrderSubscriptionItemUpdate }
