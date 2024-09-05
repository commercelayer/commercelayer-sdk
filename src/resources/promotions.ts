import { ApiResource } from '../resource'
import type { Resource, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Attachment } from './attachments'
import type { CouponCodesPromotionRule } from './coupon_codes_promotion_rules'
import type { Coupon } from './coupons'
import type { CustomPromotionRule } from './custom_promotion_rules'
import type { Event } from './events'
import type { Market } from './markets'
import type { OrderAmountPromotionRule } from './order_amount_promotion_rules'
import type { SkuList } from './sku_lists'
import type { SkuListPromotionRule } from './sku_list_promotion_rules'
import type { Tag } from './tags'
import type { Version } from './versions'
import type { PromotionRule } from './promotion_rules'


type PromotionType = 'promotions'
type PromotionRel = ResourceRel & { type: PromotionType }


export type PromotionSort = Pick<Promotion, 'id' | 'currency_code' | 'disabled_at' | 'exclusive' | 'expires_at' | 'name' | 'priority' | 'starts_at' | 'total_usage_count' | 'total_usage_limit'> & ResourceSort
// export type PromotionFilter = Pick<Promotion, 'id' | 'currency_code' | 'disabled_at' | 'expires_at' | 'name' | 'priority' | 'starts_at' | 'total_usage_count' | 'total_usage_limit'> & ResourceFilter


interface Promotion extends Resource {
	
	readonly type: PromotionType

	/** 
	 * Indicates if the promotion is active (enabled and not expired).
	 * @example ```"true"```
	 */
	active?: boolean | null
	/** 
	 * The international 3-letter currency code as defined by the ISO 4217 standard.
	 * @example ```"EUR"```
	 */
	currency_code?: string | null
	/** 
	 * Time at which this resource was disabled.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	disabled_at?: string | null
	/** 
	 * Indicates if the promotion will be applied exclusively, based on its priority score.
	 * @example ```"true"```
	 */
	exclusive?: boolean | null
	/** 
	 * The expiration date/time of this promotion (must be after starts_at).
	 * @example ```"2018-01-02T12:00:00.000Z"```
	 */
	expires_at: string
	/** 
	 * The promotion's internal name.
	 * @example ```"Personal promotion"```
	 */
	name: string
	/** 
	 * The priority assigned to the promotion (lower means higher priority).
	 * @example ```"2"```
	 */
	priority?: number | null
	/** 
	 * The activation date/time of this promotion.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	starts_at: string
	/** 
	 * The promotion status. One of 'disabled', 'expired', 'pending', 'active', or 'inactive'.
	 * @example ```"pending"```
	 */
	status?: 'disabled' | 'expired' | 'pending' | 'active' | 'inactive' | null
	/** 
	 * The number of times this promotion has been applied.
	 * @example ```"2"```
	 */
	total_usage_count?: number | null
	/** 
	 * The total number of times this promotion can be applied. When 'null' it means promotion can be applied infinite times.
	 * @example ```"5"```
	 */
	total_usage_limit?: number | null

	attachments?: Attachment[] | null
	coupon_codes_promotion_rule?: CouponCodesPromotionRule | null
	coupons?: Coupon[] | null
	custom_promotion_rule?: CustomPromotionRule | null
	events?: Event[] | null
	market?: Market | null
	order_amount_promotion_rule?: OrderAmountPromotionRule | null
	promotion_rules?: PromotionRule[] | null
	sku_list?: SkuList | null
	sku_list_promotion_rule?: SkuListPromotionRule | null
	tags?: Tag[] | null
	versions?: Version[] | null

}


class Promotions extends ApiResource<Promotion> {

	static readonly TYPE: PromotionType = 'promotions' as const

	async attachments(promotionId: string | Promotion, params?: QueryParamsList<Attachment>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _promotionId = (promotionId as Promotion).id || promotionId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `promotions/${_promotionId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async coupon_codes_promotion_rule(promotionId: string | Promotion, params?: QueryParamsRetrieve<CouponCodesPromotionRule>, options?: ResourcesConfig): Promise<CouponCodesPromotionRule> {
		const _promotionId = (promotionId as Promotion).id || promotionId as string
		return this.resources.fetch<CouponCodesPromotionRule>({ type: 'coupon_codes_promotion_rules' }, `promotions/${_promotionId}/coupon_codes_promotion_rule`, params, options) as unknown as CouponCodesPromotionRule
	}

	async coupons(promotionId: string | Promotion, params?: QueryParamsList<Coupon>, options?: ResourcesConfig): Promise<ListResponse<Coupon>> {
		const _promotionId = (promotionId as Promotion).id || promotionId as string
		return this.resources.fetch<Coupon>({ type: 'coupons' }, `promotions/${_promotionId}/coupons`, params, options) as unknown as ListResponse<Coupon>
	}

	async custom_promotion_rule(promotionId: string | Promotion, params?: QueryParamsRetrieve<CustomPromotionRule>, options?: ResourcesConfig): Promise<CustomPromotionRule> {
		const _promotionId = (promotionId as Promotion).id || promotionId as string
		return this.resources.fetch<CustomPromotionRule>({ type: 'custom_promotion_rules' }, `promotions/${_promotionId}/custom_promotion_rule`, params, options) as unknown as CustomPromotionRule
	}

	async events(promotionId: string | Promotion, params?: QueryParamsList<Event>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _promotionId = (promotionId as Promotion).id || promotionId as string
		return this.resources.fetch<Event>({ type: 'events' }, `promotions/${_promotionId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async market(promotionId: string | Promotion, params?: QueryParamsRetrieve<Market>, options?: ResourcesConfig): Promise<Market> {
		const _promotionId = (promotionId as Promotion).id || promotionId as string
		return this.resources.fetch<Market>({ type: 'markets' }, `promotions/${_promotionId}/market`, params, options) as unknown as Market
	}

	async order_amount_promotion_rule(promotionId: string | Promotion, params?: QueryParamsRetrieve<OrderAmountPromotionRule>, options?: ResourcesConfig): Promise<OrderAmountPromotionRule> {
		const _promotionId = (promotionId as Promotion).id || promotionId as string
		return this.resources.fetch<OrderAmountPromotionRule>({ type: 'order_amount_promotion_rules' }, `promotions/${_promotionId}/order_amount_promotion_rule`, params, options) as unknown as OrderAmountPromotionRule
	}

	async sku_list(promotionId: string | Promotion, params?: QueryParamsRetrieve<SkuList>, options?: ResourcesConfig): Promise<SkuList> {
		const _promotionId = (promotionId as Promotion).id || promotionId as string
		return this.resources.fetch<SkuList>({ type: 'sku_lists' }, `promotions/${_promotionId}/sku_list`, params, options) as unknown as SkuList
	}

	async sku_list_promotion_rule(promotionId: string | Promotion, params?: QueryParamsRetrieve<SkuListPromotionRule>, options?: ResourcesConfig): Promise<SkuListPromotionRule> {
		const _promotionId = (promotionId as Promotion).id || promotionId as string
		return this.resources.fetch<SkuListPromotionRule>({ type: 'sku_list_promotion_rules' }, `promotions/${_promotionId}/sku_list_promotion_rule`, params, options) as unknown as SkuListPromotionRule
	}

	async tags(promotionId: string | Promotion, params?: QueryParamsList<Tag>, options?: ResourcesConfig): Promise<ListResponse<Tag>> {
		const _promotionId = (promotionId as Promotion).id || promotionId as string
		return this.resources.fetch<Tag>({ type: 'tags' }, `promotions/${_promotionId}/tags`, params, options) as unknown as ListResponse<Tag>
	}

	async versions(promotionId: string | Promotion, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _promotionId = (promotionId as Promotion).id || promotionId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `promotions/${_promotionId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	isPromotion(resource: any): resource is Promotion {
		return resource.type && (resource.type === Promotions.TYPE)
	}


	relationship(id: string | ResourceId | null): PromotionRel {
		return super.relationshipOneToOne<PromotionRel>(id)
	}

	relationshipToMany(...ids: string[]): PromotionRel[] {
		return super.relationshipOneToMany<PromotionRel>(...ids)
	}


	type(): PromotionType {
		return Promotions.TYPE
	}

}


export default Promotions

export type { Promotion, PromotionType }
