import type { QueryParamsList, QueryParamsRetrieve } from '@runtime/query'
import type {
  ListResponse,
  Resource,
  ResourceCreate,
  ResourceId,
  ResourceRel,
  ResourceSort,
  /* ResourceFilter */ ResourcesConfig,
  ResourceUpdate,
} from '@runtime/resource'
import { ApiResource } from '@runtime/resource'
import type { TransferOwnershipDataType } from '../../src/actions'
import type { ApiCredential } from './api_credentials'
import type { Membership } from './memberships'
import type { Permission } from './permissions'
import type { Role } from './roles'

type OrganizationType = 'organizations'
type OrganizationRel = ResourceRel & { type: OrganizationType }

export type OrganizationSort = Pick<Organization, 'id' | 'name' | 'slug' | 'domain'> & ResourceSort
// export type OrganizationFilter = Pick<Organization, 'id' | 'name' | 'slug' | 'domain' | 'contrast_color' | 'region'> & ResourceFilter

/**
 * The Organization object is returned as part of the response body of each successful list, retrieve, create or update API call to the /api/organizations endpoint.
 *
 * @link https://docs.commercelayer.io/provisioning-api-reference/organizations/object
 */
interface Organization extends Resource {
  readonly type: OrganizationType

  /**
   * The organization's internal name.
   * @example ```"The Blue Brand"```
   */
  name: string
  /**
   * The organization's slug name.
   * @example ```"the-blue-brand"```
   */
  slug: string
  /**
   * The organization's domain.
   * @example ```"the-blue-brand.commercelayer.io"```
   */
  domain: string
  /**
   * The organization's support phone.
   * @example ```"+01 30800857"```
   */
  support_phone?: string | null
  /**
   * The organization's support email.
   * @example ```"support@bluebrand.com"```
   */
  support_email?: string | null
  /**
   * The URL to the organization's logo.
   * @example ```"https://bluebrand.com/img/logo.svg"```
   */
  logo_url?: string | null
  /**
   * The URL to the organization's favicon.
   * @example ```"https://bluebrand.com/img/favicon.ico"```
   */
  favicon_url?: string | null
  /**
   * The organization's primary color.
   * @example ```"#C8984E"```
   */
  primary_color?: string | null
  /**
   * The organization's contrast color. Format is HEX (starts with `#` and is followed by six letters and/or numbers).
   * @example ```"#FFFFCC"```
   */
  contrast_color?: string | null
  /**
   * The organization's Google Tag Manager ID.
   * @example ```"GTM-5FJXX6"```
   */
  gtm_id?: string | null
  /**
   * The organization's Google Tag Manager ID for test.
   * @example ```"GTM-5FJXX7"```
   */
  gtm_id_test?: string | null
  /**
   * The region where the organization is located. The default value is `eu-west-1`.
   * @example ```"eu-west-1"```
   */
  region?: string | null
  /**
   * Indicates if the organization can switch to live mode.
   */
  can_switch_live: boolean
  /**
   * Information about the current subscription such as the plan type, limits, and subscription totals counter.
   * @example ```{"plan_type":"growth","limits":{"markets":5,"skus":10000,"organizations":2,"memberships":5},"totals":{"organizations":1,"markets":0,"memberships":2,"skus":0}}```
   */
  subscription_info: Record<string, any>
  /**
   * The organization's configuration.
   * @example ```{"mfe":{"language":"it-IT","default":{"links":{"cart":"https://cart.example.com/:order_id?accessToken=:access_token","checkout":"https://checkout.example.com/:order_id?accessToken=:access_token","identity":"https://example.com/login","microstore":"https://example.com/microstore/?accessToken=:access_token","my_account":"https://example.com/my-custom-account?accessToken=:access_token"},"checkout":{"optional_billing_info":false,"thankyou_page":"https://example.com/thanks/:lang/:order_id","billing_countries":[{"value":"ES","label":"Espana"},{"value":"IT","label":"Italia"},{"value":"US","label":"Unites States of America"}],"shipping_countries":[{"value":"ES","label":"Espana"},{"value":"IT","label":"Italia"},{"value":"US","label":"Unites States of America"}],"billing_states":{"FR":[{"value":"PA","label":"Paris"},{"value":"LY","label":"Lyon"},{"value":"NI","label":"Nice"},{"value":"MA","label":"Marseille"},{"value":"BO","label":"Bordeaux"}]},"shipping_states":{"FR":[{"value":"PA","label":"Paris"},{"value":"LY","label":"Lyon"},{"value":"NI","label":"Nice"},{"value":"MA","label":"Marseille"},{"value":"BO","label":"Bordeaux"}]},"default_country":"US"},"urls":{"privacy":"https://example.com/privacy/:lang","terms":"https://example.com/terms/:lang"}},"market:id:ZKcv13rT":{"links":{"cart":"https://example.com/custom-cart/:order_id?accessToken=:access_token"},"checkout":{"thankyou_page":"https://example.com/thanks/:order_id"}}},"well-known":{"shopping":{"catalog_mcp_url":"https://catalog-mcp.example.com/mcp","client_id":"abc123example","locale_scopes":{"it-IT":{"id":"ZKcv13rT"},"en-US":{"id":"ZKcv13rT"}},"ui":{"domain":"","csp":{"resourceDomains":["https://data.commercelayer.app","https://cdn.brand.com"],"baseUriDomains":[],"connectDomains":[],"frameDomains":[]}}}}}```
   */
  config?: Record<string, any> | null
  /**
   * Enables the redirect on the new Auth API.
   * @example ```true```
   */
  api_auth_redirect: boolean
  /**
   * Enables fragment caching for resources with related directive.
   */
  api_fragment_caching_enabled?: boolean | null
  /**
   * Enables the rules engine for flex promotions and price list rules.
   */
  api_rules_engine: boolean
  /**
   * The fallback maximum number of conditions within a rules payload on a ruleable object, default is {API_RULES_ENGINE_MAX_CONDITIONS_SIZE}.
   * @example ```150```
   */
  api_rules_engine_max_conditions_size: number
  /**
   * The fallback maximum number of rules within a rules payload on a ruleable object, default is {API_RULES_ENGINE_MAX_RULES_SIZE}.
   * @example ```15```
   */
  api_rules_engine_max_rules_size: number
  /**
   * Forces the usage of the new Authentication API.
   * @example ```true```
   */
  api_new_auth: boolean
  /**
   * Enables the purge of cached single resources when list is purged.
   */
  api_purge_single_resource: boolean
  /**
   * The maximum length for the regular expressions, default is {API_MAX_REGEX_LENGTH}.
   * @example ```5000```
   */
  api_max_regex_length: number
  /**
   * Indicates if AVS checking will be enforced during payment workflow by passing specific attributes, default is {ADDRESSES_AVS_CHECK}.
   * @example ```true```
   */
  addresses_avs_check: boolean
  /**
   * Indicates if the phone attribute is required for addresses, default is {ADDRESSES_PHONE_REQUIRED}.
   * @example ```true```
   */
  addresses_phone_required: boolean
  /**
   * Indicates if a sales channel application without customer can read and update just guest orders.
   * @example ```true```
   */
  orders_sales_channel_guest_only: boolean
  /**
   * The minimum lapse in fraction of seconds to be observed between two consecutive shipments rebuilt. If shipments rebuilt is triggered within the minimum lapse, the update is performed, but no rebuilt is done.
   */
  orders_min_rebuild_shipments_lapse: number
  /**
   * The minimum lapse in fraction of seconds to be observed between two consecutive order refreshes. If refresh is triggered within the minimum lapse, the update is performed, but no order refresh is done.
   */
  orders_min_refresh_lapse: number
  /**
   * The maximum number line items allowed for a test order before disabling the autorefresh option.
   * @example ```50```
   */
  orders_autorefresh_cutoff_test: number
  /**
   * The maximum number line items allowed for a live order before disabling the autorefresh option.
   * @example ```500```
   */
  orders_autorefresh_cutoff_live: number
  /**
   * Enables orders number editing as a string in test (for enterprise plans only).
   */
  orders_number_editable_test: boolean
  /**
   * Enables orders number editing as a string in live (for enterprise plans only).
   */
  orders_number_editable_live: boolean
  /**
   * Enables to use the order number as payment reference on supported gateways.
   * @example ```true```
   */
  orders_number_as_reference: boolean
  /**
   * Enables raising of API errors in case the provided coupon code is invalid, default is {ORDERS_INVALID_COUPON_ERRORS}.
   * @example ```true```
   */
  orders_invalid_coupon_errors: boolean
  /**
   * Enables raising of API errors in case the provided gift card code is invalid, default is {ORDERS_INVALID_GIFT_CARD_ERRORS}.
   * @example ```true```
   */
  orders_invalid_gift_card_errors: boolean
  /**
   * Enables the validation of the generated stock line items and stock transfers before placing the order, default is {ORDERS_VALIDATE_SHIPPING_STOCK}.
   */
  orders_validate_shipping_stock: boolean
  /**
   * The maximum number of SKUs allowed for bundles, default is {BUNDLES_MAX_ITEMS_COUNT}.
   * @example ```10```
   */
  bundles_max_items_count: number
  /**
   * The minimum length for coupon code, default is {COUPONS_MIN_CODE_LENGTH}.
   * @example ```8```
   */
  coupons_min_code_length: number
  /**
   * The maximum length for coupon code, default is {COUPONS_MAX_CODE_LENGTH}.
   * @example ```40```
   */
  coupons_max_code_length: number
  /**
   * Enables matching the gift card code by its exact value, instead of by its first charachters, default is {GIFT_CARDS_EXACT_CODE_MATCHING}.
   */
  gift_cards_exact_code_matching: boolean
  /**
   * The minimum length for gift card code, default is {GIFT_CARDS_MIN_CODE_LENGTH}.
   * @example ```8```
   */
  gift_cards_min_code_length: number
  /**
   * The maximum length for gift card code, default is {GIFT_CARDS_MAX_CODE_LENGTH}.
   * @example ```40```
   */
  gift_cards_max_code_length: number
  /**
   * The maximum number of concurrent cleanups allowed for your organization, default is {CLEANUPS_MAX_CONCURRENT_COUNT}.
   * @example ```10```
   */
  cleanups_max_concurrent_count: number
  /**
   * The maximum number of concurrent exports allowed for your organization, default is {EXPORTS_MAX_CONCURRENT_COUNT}.
   * @example ```10```
   */
  exports_max_concurrent_count: number
  /**
   * The maximum number of concurrent imports allowed for your organization, default is {IMPORTS_MAX_CONCURRENT_COUNT}.
   * @example ```10```
   */
  imports_max_concurrent_count: number
  /**
   * Enables purging of cached resources upon succeeded imports.
   * @example ```true```
   */
  imports_purge_cache: boolean
  /**
   * Disables the interruption of the import in case its errors exceeds the 10% threshold, default is {IMPORTS_SKIP_ERRORS}.
   */
  imports_skip_errors: boolean
  /**
   * The maximum number for stock locations cutoff, default is {INVENTORY_MODELS_MAX_STOCK_LOCATIONS_CUTOFF}.
   * @example ```10```
   */
  inventory_models_max_stock_locations_cutoff: number
  /**
   * The maximum number of active concurrent promotions allowed for your organization, default is {PROMOTIONS_MAX_CONCURRENT_COUNT}.
   * @example ```10```
   */
  promotions_max_concurrent_count: number
  /**
   * The maximum number of conditions within a rules payload on a promotion object, default is {PROMOTIONS_MAX_CONDITIONS_SIZE}.
   * @example ```150```
   */
  promotions_max_conditions_size: number
  /**
   * The maximum number of rules within a rules payload on a promotion object, default is {PROMOTIONS_MAX_RULES_SIZE}.
   * @example ```15```
   */
  promotions_max_rules_size: number
  /**
   * The maximum number of conditions within a rules payload on a price list object, default is {PRICE_LISTS_MAX_CONDITIONS_SIZE}.
   * @example ```150```
   */
  price_lists_max_conditions_size: number
  /**
   * The maximum number of rules within a rules payload on a price list object, default is {PRICE_LISTS_MAX_RULES_SIZE}.
   * @example ```15```
   */
  price_lists_max_rules_size: number
  /**
   * Enables triggering of webhooks during imports, default is {IMPORTS_TRIGGER_WEBHOOKS}.
   * @example ```"false"```
   */
  imports_trigger_webhooks: number
  /**
   * Enables the use of an external discount engine in place of the standard one, default is {DISCOUNT_ENGINES_ENABLED}.
   */
  discount_engines_enabled: boolean
  /**
   * Enables raising of API errors in case of discount engine failure, default is {DISCOUNT_ENGINES_ERRORS}.
   */
  discount_engines_errors: boolean
  /**
   * The maximum length for the tag name, default is {TAGS_MAX_NAME_LENGTH}.
   * @example ```25```
   */
  tags_max_name_length: number
  /**
   * The maximum allowed number of tags for each resource, default is {TAGS_MAX_ALLOWED_NUMBER}.
   * @example ```10```
   */
  tags_max_allowed_number: number
  /**
   * Enables raising of API errors in case of tax calculation failure, default is {TAX_CALCULATORS_ERRORS}.
   */
  tax_calculators_errors: boolean
  /**
   * Enables raising of API errors in case of external promotion failure, default is {EXTERNAL_PROMOTIONS_ERRORS}.
   */
  external_promotions_errors: boolean
  /**
   * Enables raising of API errors in case of external price failure, default is {EXTERNAL_PRICES_ERRORS}.
   * @example ```true```
   */
  external_prices_errors: boolean
  /**
   * Enables the Sku discovery by similarity search.
   */
  skus_discovery?: boolean | null
  /**
   * Enables the creation of the authorization when the gateway event is received, even if there is no reference on Commerce Layer.
   */
  payment_gateways_transaction_on_event?: boolean | null
  /**
   * Enables blocking a new refund (or compensation) on a capture while an earlier async refund on the same capture is still unresolved.
   */
  refunds_check_for_pending?: boolean | null

  memberships?: Membership[] | null
  roles?: Role[] | null
  permissions?: Permission[] | null
  api_credentials?: ApiCredential[] | null
}

interface OrganizationCreate extends ResourceCreate {
  /**
   * The organization's internal name.
   * @example ```"The Blue Brand"```
   */
  name: string
  /**
   * The organization's support phone.
   * @example ```"+01 30800857"```
   */
  support_phone?: string | null
  /**
   * The organization's support email.
   * @example ```"support@bluebrand.com"```
   */
  support_email?: string | null
  /**
   * The URL to the organization's logo.
   * @example ```"https://bluebrand.com/img/logo.svg"```
   */
  logo_url?: string | null
  /**
   * The URL to the organization's favicon.
   * @example ```"https://bluebrand.com/img/favicon.ico"```
   */
  favicon_url?: string | null
  /**
   * The organization's primary color.
   * @example ```"#C8984E"```
   */
  primary_color?: string | null
  /**
   * The organization's contrast color. Format is HEX (starts with `#` and is followed by six letters and/or numbers).
   * @example ```"#FFFFCC"```
   */
  contrast_color?: string | null
  /**
   * The organization's Google Tag Manager ID.
   * @example ```"GTM-5FJXX6"```
   */
  gtm_id?: string | null
  /**
   * The organization's Google Tag Manager ID for test.
   * @example ```"GTM-5FJXX7"```
   */
  gtm_id_test?: string | null
  /**
   * The region where the organization is located. The default value is `eu-west-1`.
   * @example ```"eu-west-1"```
   */
  region?: string | null
  /**
   * The organization's configuration.
   * @example ```{"mfe":{"language":"it-IT","default":{"links":{"cart":"https://cart.example.com/:order_id?accessToken=:access_token","checkout":"https://checkout.example.com/:order_id?accessToken=:access_token","identity":"https://example.com/login","microstore":"https://example.com/microstore/?accessToken=:access_token","my_account":"https://example.com/my-custom-account?accessToken=:access_token"},"checkout":{"optional_billing_info":false,"thankyou_page":"https://example.com/thanks/:lang/:order_id","billing_countries":[{"value":"ES","label":"Espana"},{"value":"IT","label":"Italia"},{"value":"US","label":"Unites States of America"}],"shipping_countries":[{"value":"ES","label":"Espana"},{"value":"IT","label":"Italia"},{"value":"US","label":"Unites States of America"}],"billing_states":{"FR":[{"value":"PA","label":"Paris"},{"value":"LY","label":"Lyon"},{"value":"NI","label":"Nice"},{"value":"MA","label":"Marseille"},{"value":"BO","label":"Bordeaux"}]},"shipping_states":{"FR":[{"value":"PA","label":"Paris"},{"value":"LY","label":"Lyon"},{"value":"NI","label":"Nice"},{"value":"MA","label":"Marseille"},{"value":"BO","label":"Bordeaux"}]},"default_country":"US"},"urls":{"privacy":"https://example.com/privacy/:lang","terms":"https://example.com/terms/:lang"}},"market:id:ZKcv13rT":{"links":{"cart":"https://example.com/custom-cart/:order_id?accessToken=:access_token"},"checkout":{"thankyou_page":"https://example.com/thanks/:order_id"}}},"well-known":{"shopping":{"catalog_mcp_url":"https://catalog-mcp.example.com/mcp","client_id":"abc123example","locale_scopes":{"it-IT":{"id":"ZKcv13rT"},"en-US":{"id":"ZKcv13rT"}},"ui":{"domain":"","csp":{"resourceDomains":["https://data.commercelayer.app","https://cdn.brand.com"],"baseUriDomains":[],"connectDomains":[],"frameDomains":[]}}}}}```
   */
  config?: Record<string, any> | null
}

interface OrganizationUpdate extends ResourceUpdate {
  /**
   * The organization's internal name.
   * @example ```"The Blue Brand"```
   */
  name?: string | null
  /**
   * The organization's support phone.
   * @example ```"+01 30800857"```
   */
  support_phone?: string | null
  /**
   * The organization's support email.
   * @example ```"support@bluebrand.com"```
   */
  support_email?: string | null
  /**
   * The URL to the organization's logo.
   * @example ```"https://bluebrand.com/img/logo.svg"```
   */
  logo_url?: string | null
  /**
   * The URL to the organization's favicon.
   * @example ```"https://bluebrand.com/img/favicon.ico"```
   */
  favicon_url?: string | null
  /**
   * The organization's primary color.
   * @example ```"#C8984E"```
   */
  primary_color?: string | null
  /**
   * The organization's contrast color. Format is HEX (starts with `#` and is followed by six letters and/or numbers).
   * @example ```"#FFFFCC"```
   */
  contrast_color?: string | null
  /**
   * The organization's Google Tag Manager ID.
   * @example ```"GTM-5FJXX6"```
   */
  gtm_id?: string | null
  /**
   * The organization's Google Tag Manager ID for test.
   * @example ```"GTM-5FJXX7"```
   */
  gtm_id_test?: string | null
  /**
   * The organization's configuration.
   * @example ```{"mfe":{"language":"it-IT","default":{"links":{"cart":"https://cart.example.com/:order_id?accessToken=:access_token","checkout":"https://checkout.example.com/:order_id?accessToken=:access_token","identity":"https://example.com/login","microstore":"https://example.com/microstore/?accessToken=:access_token","my_account":"https://example.com/my-custom-account?accessToken=:access_token"},"checkout":{"optional_billing_info":false,"thankyou_page":"https://example.com/thanks/:lang/:order_id","billing_countries":[{"value":"ES","label":"Espana"},{"value":"IT","label":"Italia"},{"value":"US","label":"Unites States of America"}],"shipping_countries":[{"value":"ES","label":"Espana"},{"value":"IT","label":"Italia"},{"value":"US","label":"Unites States of America"}],"billing_states":{"FR":[{"value":"PA","label":"Paris"},{"value":"LY","label":"Lyon"},{"value":"NI","label":"Nice"},{"value":"MA","label":"Marseille"},{"value":"BO","label":"Bordeaux"}]},"shipping_states":{"FR":[{"value":"PA","label":"Paris"},{"value":"LY","label":"Lyon"},{"value":"NI","label":"Nice"},{"value":"MA","label":"Marseille"},{"value":"BO","label":"Bordeaux"}]},"default_country":"US"},"urls":{"privacy":"https://example.com/privacy/:lang","terms":"https://example.com/terms/:lang"}},"market:id:ZKcv13rT":{"links":{"cart":"https://example.com/custom-cart/:order_id?accessToken=:access_token"},"checkout":{"thankyou_page":"https://example.com/thanks/:order_id"}}},"well-known":{"shopping":{"catalog_mcp_url":"https://catalog-mcp.example.com/mcp","client_id":"abc123example","locale_scopes":{"it-IT":{"id":"ZKcv13rT"},"en-US":{"id":"ZKcv13rT"}},"ui":{"domain":"","csp":{"resourceDomains":["https://data.commercelayer.app","https://cdn.brand.com"],"baseUriDomains":[],"connectDomains":[],"frameDomains":[]}}}}}```
   */
  config?: Record<string, any> | null
}

class Organizations extends ApiResource<Organization> {
  static readonly TYPE: OrganizationType = 'organizations' as const

  async create(
    resource: OrganizationCreate,
    params?: QueryParamsRetrieve<Organization>,
    options?: ResourcesConfig,
  ): Promise<Organization> {
    return this.resources.create<OrganizationCreate, Organization>(
      { ...resource, type: Organizations.TYPE },
      params,
      options,
    )
  }

  async update(
    resource: OrganizationUpdate,
    params?: QueryParamsRetrieve<Organization>,
    options?: ResourcesConfig,
  ): Promise<Organization> {
    return this.resources.update<OrganizationUpdate, Organization>(
      { ...resource, type: Organizations.TYPE },
      params,
      options,
    )
  }

  async memberships(
    organizationId: string | Organization,
    params?: QueryParamsList<Membership>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<Membership>> {
    const _organizationId = (organizationId as Organization).id || (organizationId as string)
    return this.resources.fetch<Membership>(
      { type: 'memberships' },
      `organizations/${_organizationId}/memberships`,
      params,
      options,
    ) as unknown as ListResponse<Membership>
  }

  async roles(
    organizationId: string | Organization,
    params?: QueryParamsList<Role>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<Role>> {
    const _organizationId = (organizationId as Organization).id || (organizationId as string)
    return this.resources.fetch<Role>(
      { type: 'roles' },
      `organizations/${_organizationId}/roles`,
      params,
      options,
    ) as unknown as ListResponse<Role>
  }

  async permissions(
    organizationId: string | Organization,
    params?: QueryParamsList<Permission>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<Permission>> {
    const _organizationId = (organizationId as Organization).id || (organizationId as string)
    return this.resources.fetch<Permission>(
      { type: 'permissions' },
      `organizations/${_organizationId}/permissions`,
      params,
      options,
    ) as unknown as ListResponse<Permission>
  }

  async api_credentials(
    organizationId: string | Organization,
    params?: QueryParamsList<ApiCredential>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<ApiCredential>> {
    const _organizationId = (organizationId as Organization).id || (organizationId as string)
    return this.resources.fetch<ApiCredential>(
      { type: 'api_credentials' },
      `organizations/${_organizationId}/api_credentials`,
      params,
      options,
    ) as unknown as ListResponse<ApiCredential>
  }

  async transfer_ownership(
    organizationId: string | Organization,
    payload: TransferOwnershipDataType,
    options?: ResourcesConfig,
  ): Promise<void> {
    const _organizationId = (organizationId as Organization).id || (organizationId as string)
    await this.resources.action('PATCH', `organizations/${_organizationId}/transfer_ownership`, { ...payload }, options)
  }

  isOrganization(resource: any): resource is Organization {
    return resource.type && resource.type === Organizations.TYPE
  }

  relationship(id: string | ResourceId | null): OrganizationRel {
    return super.relationshipOneToOne<OrganizationRel>(id)
  }

  relationshipToMany(...ids: string[]): OrganizationRel[] {
    return super.relationshipOneToMany<OrganizationRel>(...ids)
  }

  type(): OrganizationType {
    return Organizations.TYPE
  }
}

const instance = new Organizations()
export default instance

export type { Organization, OrganizationCreate, Organizations, OrganizationType, OrganizationUpdate }
