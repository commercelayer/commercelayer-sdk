import { ApiResource, Resource, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { Market } from './markets'
import type { PromotionRule } from './promotion_rules'
import type { OrderAmountPromotionRule } from './order_amount_promotion_rules'
import type { SkuListPromotionRule } from './sku_list_promotion_rules'
import type { CouponCodesPromotionRule } from './coupon_codes_promotion_rules'
import type { Coupon } from './coupons'
import type { SkuList } from './sku_lists'
import type { Attachment } from './attachments'
import type { Event } from './events'
import type { Tag } from './tags'
import type { Version } from './versions'


type PromotionRel = ResourceRel & { type: typeof Promotions.TYPE }


interface Promotion extends Resource {
	
	name?: string
	currency_code?: string
	starts_at?: string
	expires_at?: string
	total_usage_limit?: number
	total_usage_count?: number
	active?: boolean

	market?: Market
	promotion_rules?: PromotionRule[]
	order_amount_promotion_rule?: OrderAmountPromotionRule
	sku_list_promotion_rule?: SkuListPromotionRule
	coupon_codes_promotion_rule?: CouponCodesPromotionRule
	coupons?: Coupon[]
	sku_list?: SkuList
	attachments?: Attachment[]
	events?: Event[]
	tags?: Tag[]
	versions?: Version[]

}


class Promotions extends ApiResource {

	static readonly TYPE: 'promotions' = 'promotions' as const
	// static readonly PATH = 'promotions'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Promotion>> {
		return this.resources.list<Promotion>({ type: Promotions.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Promotion> {
		return this.resources.retrieve<Promotion>({ type: Promotions.TYPE, id }, params, options)
	}

	async market(promotionId: string | Promotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Market> {
		const _promotionId = (promotionId as Promotion).id || promotionId as string
		return this.resources.fetch<Market>({ type: 'markets' }, `promotions/${_promotionId}/market`, params, options) as unknown as Market
	}

	async order_amount_promotion_rule(promotionId: string | Promotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<OrderAmountPromotionRule> {
		const _promotionId = (promotionId as Promotion).id || promotionId as string
		return this.resources.fetch<OrderAmountPromotionRule>({ type: 'order_amount_promotion_rules' }, `promotions/${_promotionId}/order_amount_promotion_rule`, params, options) as unknown as OrderAmountPromotionRule
	}

	async sku_list_promotion_rule(promotionId: string | Promotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuListPromotionRule> {
		const _promotionId = (promotionId as Promotion).id || promotionId as string
		return this.resources.fetch<SkuListPromotionRule>({ type: 'sku_list_promotion_rules' }, `promotions/${_promotionId}/sku_list_promotion_rule`, params, options) as unknown as SkuListPromotionRule
	}

	async coupon_codes_promotion_rule(promotionId: string | Promotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CouponCodesPromotionRule> {
		const _promotionId = (promotionId as Promotion).id || promotionId as string
		return this.resources.fetch<CouponCodesPromotionRule>({ type: 'coupon_codes_promotion_rules' }, `promotions/${_promotionId}/coupon_codes_promotion_rule`, params, options) as unknown as CouponCodesPromotionRule
	}

	async coupons(promotionId: string | Promotion, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Coupon>> {
		const _promotionId = (promotionId as Promotion).id || promotionId as string
		return this.resources.fetch<Coupon>({ type: 'coupons' }, `promotions/${_promotionId}/coupons`, params, options) as unknown as ListResponse<Coupon>
	}

	async sku_list(promotionId: string | Promotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuList> {
		const _promotionId = (promotionId as Promotion).id || promotionId as string
		return this.resources.fetch<SkuList>({ type: 'sku_lists' }, `promotions/${_promotionId}/sku_list`, params, options) as unknown as SkuList
	}

	async attachments(promotionId: string | Promotion, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _promotionId = (promotionId as Promotion).id || promotionId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `promotions/${_promotionId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async events(promotionId: string | Promotion, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _promotionId = (promotionId as Promotion).id || promotionId as string
		return this.resources.fetch<Event>({ type: 'events' }, `promotions/${_promotionId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async tags(promotionId: string | Promotion, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Tag>> {
		const _promotionId = (promotionId as Promotion).id || promotionId as string
		return this.resources.fetch<Tag>({ type: 'tags' }, `promotions/${_promotionId}/tags`, params, options) as unknown as ListResponse<Tag>
	}

	async versions(promotionId: string | Promotion, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _promotionId = (promotionId as Promotion).id || promotionId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `promotions/${_promotionId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isPromotion(resource: any): resource is Promotion {
		return resource.type && (resource.type === Promotions.TYPE)
	}


	relationship(id: string | ResourceId | null): PromotionRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: Promotions.TYPE } : { id: id.id, type: Promotions.TYPE }
	}


	type(): string {
		return Promotions.TYPE
	}

}


export default Promotions

export { Promotion }
