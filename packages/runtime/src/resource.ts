import { type ResourceTypeLock, resourceList } from '#registry'
import ApiClient, { type ApiClientInitConfig, type Method } from './client'
import config from './config'
import Debug from './debug'
import { SdkError } from './error'
import { type DocWithData, denormalize, normalize } from './jsonapi'
import type { QueryFilter, QueryParams, QueryParamsList, QueryParamsRetrieve } from './query'
import { generateQueryStringParams, isParamsList } from './query'
import type { ObjectType } from './types'

const debug = Debug('resource')

type ResourceNull = { id: null } & ResourceType
type ResourceRel = ResourceId | ResourceNull

type Metadata = ObjectType

interface ResourceType {
  readonly type: ResourceTypeLock
}

interface ResourceId extends ResourceType {
  readonly id: string
}

interface ResourceBase {
  reference?: string | null
  reference_origin?: string | null
  metadata?: Metadata
}

interface Resource extends ResourceBase, ResourceId {
  readonly created_at: string
  readonly updated_at: string
}

interface ResourceCreate extends ResourceBase {}

interface ResourceUpdate extends ResourceBase {
  readonly id: string
}

type PageCursor = { readonly before?: string; readonly after?: string }

// Flat, non-discriminated (mirrors the poc-js-sdk shape). The offset fields are
// always present so the historical `meta.*` interface keeps resolving as
// `number` — they're `NaN` on cursor-paginated responses. `cursor` is present
// only on cursor-paginated responses (e.g. `event_stores`), parsed from the
// response `links`; its presence is how you tell the two pagination styles apart.
type ListMeta = {
  readonly pageCount: number
  readonly recordCount: number
  readonly currentPage: number
  readonly recordsPerPage: number
  readonly cursor?: {
    readonly prev?: PageCursor
    readonly next?: PageCursor
  }
}

class ListResponse<R extends Resource = Resource> extends Array<R> {
  readonly meta: ListMeta

  constructor(meta: ListMeta, data: R[]) {
    super(...(data || []))
    this.meta = meta
  }

  first(): R | undefined {
    return this.length ? this[0] : undefined
  }

  last(): R | undefined {
    return this.length ? this[this.length - 1] : undefined
  }

  get(index: number): R | undefined {
    return this.length && index >= 0 ? this[index] : undefined
  }

  hasNextPage(): boolean {
    return this.meta.currentPage < this.meta.pageCount
  }

  hasPrevPage(): boolean {
    return this.meta.currentPage > 1
  }

  getRecordCount(): number {
    return this.meta.recordCount
  }

  getPageCount(): number {
    return this.meta.pageCount
  }

  get recordCount(): number {
    return this.meta.recordCount
  }

  get pageCount(): number {
    return this.meta.pageCount
  }
}

type ResponseLinks = { next?: string; prev?: string } | undefined

const parseCursorLink = (url?: string): PageCursor | undefined => {
  if (!url) return undefined
  let params: URLSearchParams
  try {
    params = new URL(url).searchParams
  } catch {
    return undefined
  }
  const after = params.get('page[after]') ?? undefined
  const before = params.get('page[before]') ?? undefined
  return after != null || before != null ? { before, after } : undefined
}

// Builds the list meta. The pagination style is decided by the presence of
// `meta.page_count`: offset collections always return it (even for a single
// page), whereas cursor collections (e.g. `event_stores`) never do — they carry
// `page[after]`/`page[before]` cursors in `links` instead, and only when further
// pages exist. So a single-page cursor response (no `links`) still gets a
// `cursor` (with no prev/next), which is how callers detect cursor pagination.
const buildListMeta = <R extends Resource>(
  res: DocWithData,
  links: ResponseLinks,
  params?: QueryParamsList<R>,
): ListMeta => {
  const recordsPerPage = params?.pageSize || config.default.pageSize

  if (res.meta?.page_count == null) {
    return {
      // Offset fields aren't applicable to cursor pagination; kept as NaN so the
      // shared `meta.*` interface still resolves (see ListMeta).
      pageCount: NaN,
      recordCount: NaN,
      currentPage: NaN,
      recordsPerPage,
      cursor: {
        prev: parseCursorLink(links?.prev),
        next: parseCursorLink(links?.next),
      },
    }
  }

  return {
    pageCount: Number(res.meta?.page_count),
    recordCount: Number(res.meta?.record_count),
    currentPage: params?.pageNumber || config.default.pageNumber,
    recordsPerPage,
  }
}

export type {
  ListMeta,
  ListResponse,
  Metadata,
  Resource,
  ResourceCreate,
  ResourceId,
  ResourceRel,
  ResourceType,
  ResourceUpdate,
}

export type ResourceSort = Pick<Resource, 'id' | 'reference' | 'reference_origin' | 'created_at' | 'updated_at'>
export type ResourceFilter = Pick<
  Resource,
  'id' | 'reference' | 'reference_origin' | 'metadata' | 'created_at' | 'updated_at'
>

// Resource adapters local configuration
// biome-ignore lint/complexity/noBannedTypes: left as placeholder
type ResourceAdapterConfig = {
  // xyz?: boolean
}

export type ResourcesInitConfig = ResourceAdapterConfig & ApiClientInitConfig
export type ResourcesConfig = Partial<ResourcesInitConfig>

class ApiResourceAdapter {
  private static adapter: ResourceAdapter

  private constructor() {}

  static init(config: ResourcesInitConfig): ResourceAdapter {
    ApiResourceAdapter.adapter = new ResourceAdapter(config)
    debug('resource adapter initialized')
    return ApiResourceAdapter.get()
  }

  static get(config?: ResourcesInitConfig): ResourceAdapter {
    if (config) return ApiResourceAdapter.init(config)
    else {
      if (ApiResourceAdapter.adapter) return ApiResourceAdapter.adapter
      else throw new SdkError({ message: 'Commerce Layer not initialized' })
    }
  }

  static config(config: ResourcesConfig): void {
    ApiResourceAdapter.get().config(config)
  }
}

class ResourceAdapter {
  readonly #client: ApiClient

  readonly #config: ResourceAdapterConfig = {}

  constructor(config: ResourcesInitConfig) {
    this.#client = ApiClient.create(config)
    this.localConfig(config)
  }

  private localConfig(config: ResourceAdapterConfig): void {
    Object.assign(this.#config, config)
  }

  config(config: ResourcesConfig): this {
    debug('config %o', config)

    // ResourceAdapter config
    this.localConfig(config)
    // Client config
    this.#client.config(config)

    return this
  }

  get client(): Readonly<ApiClient> {
    return this.#client
  }

  async singleton<R extends Resource>(
    resource: ResourceType,
    params?: QueryParamsRetrieve<R>,
    options?: ResourcesConfig,
    path?: string,
  ): Promise<R> {
    debug('singleton: %o, %O, %O', resource, params || {}, options || {})

    const queryParams = generateQueryStringParams(params, resource)
    if (options?.params) Object.assign(queryParams, options?.params)

    const res = await this.#client.request('GET', `${path || resource.type}`, undefined, {
      ...options,
      params: queryParams,
    })
    const r = denormalize<R>(res as DocWithData) as R

    return r
  }

  async retrieve<R extends Resource>(
    resource: ResourceId,
    params?: QueryParamsRetrieve<R>,
    options?: ResourcesConfig,
  ): Promise<R> {
    debug('retrieve: %o, %O, %O', resource, params || {}, options || {})

    const queryParams = generateQueryStringParams(params, resource)
    if (options?.params) Object.assign(queryParams, options?.params)

    const res = await this.#client.request('GET', `${resource.type}/${resource.id}`, undefined, {
      ...options,
      params: queryParams,
    })
    const r = denormalize<R>(res as DocWithData) as R

    return r
  }

  async list<R extends Resource>(
    resource: ResourceType,
    params?: QueryParamsList<R>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<R>> {
    debug('list: %o, %O, %O', resource, params || {}, options || {})

    const queryParams = generateQueryStringParams(params, resource)
    if (options?.params) Object.assign(queryParams, options?.params)

    // Load balancer performance optimization — skipped for cursor pagination,
    // which must not be mixed with an implicit page[number].
    const usesCursor = queryParams['page[after]'] != null || queryParams['page[before]'] != null
    if (!usesCursor && !queryParams['page[number]']) queryParams['page[number]'] = '1'

    const res = await this.#client.request('GET', `${resource.type}`, undefined, { ...options, params: queryParams })
    const links: ResponseLinks = res.links
    const r = denormalize<R>(res as DocWithData) as R[]

    return new ListResponse(buildListMeta<R>(res as DocWithData, links, params), r)
  }

  async create<C extends ResourceCreate, R extends Resource>(
    resource: C & ResourceType,
    params?: QueryParamsRetrieve<R>,
    options?: ResourcesConfig,
  ): Promise<R> {
    debug('create: %o, %O, %O', resource, params || {}, options || {})

    const queryParams = generateQueryStringParams<R>(params, resource)
    if (options?.params) Object.assign(queryParams, options?.params)

    const data = normalize(resource)
    const res = await this.#client.request('POST', resource.type, data, { ...options, params: queryParams })
    const r = denormalize<R>(res as DocWithData) as R

    return r
  }

  async update<U extends ResourceUpdate, R extends Resource>(
    resource: U & ResourceId,
    params?: QueryParamsRetrieve<R>,
    options?: ResourcesConfig,
  ): Promise<R> {
    debug('update: %o, %O, %O', resource, params || {}, options || {})

    const queryParams = generateQueryStringParams<R>(params, resource)
    if (options?.params) Object.assign(queryParams, options?.params)

    const data = normalize(resource)
    const res = await this.#client.request('PATCH', `${resource.type}/${resource.id}`, data, {
      ...options,
      params: queryParams,
    })
    const r = denormalize<R>(res as DocWithData) as R

    return r
  }

  async delete(resource: ResourceId, options?: ResourcesConfig): Promise<void> {
    debug('delete: %o, %O', resource, options || {})
    await this.#client.request('DELETE', `${resource.type}/${resource.id}`, undefined, options)
  }

  /**
   * Calls a non-CRUD endpoint hosted at a sub-path of a resource, e.g.
   * `POST memberships/:id/resend`. These endpoints are not described by the
   * public resources schema, so they are declared in a target config and
   * emitted from it — see docs/adr/0005.
   */
  async action(
    cmd: Extract<Method, 'POST' | 'PATCH'>,
    path: string,
    payload?: any,
    options?: ResourcesConfig,
  ): Promise<void> {
    debug('action: %o %o, %O', cmd, path, options || {})

    const queryParams = {}
    if (options?.params) Object.assign(queryParams, options.params)

    const data = payload && isResourceId(payload) ? normalize(payload) : payload

    await this.#client.request(cmd, path, data, { ...options, params: queryParams })
  }

  async fetch<R extends Resource>(
    resource: string | ResourceType,
    path: string,
    params?: QueryParams<R>,
    options?: ResourcesConfig,
  ): Promise<R | ListResponse<R>> {
    debug('fetch: %o, %O, %O', path, params || {}, options || {})

    const queryParams = generateQueryStringParams<R>(params, resource)
    if (options?.params) Object.assign(queryParams, options?.params)

    const res = await this.#client.request('GET', path, undefined, { ...options, params: queryParams })
    const links: ResponseLinks = res.links
    const r = denormalize<R>(res as DocWithData)

    if (Array.isArray(r)) {
      const p = params as QueryParamsList<R>
      return new ListResponse(buildListMeta<R>(res as DocWithData, links, p), r)
    } else return r
  }
}

abstract class ApiResourceBase<R extends Resource> {
  static readonly TYPE: ResourceTypeLock
  readonly #resources?: ResourceAdapter

  constructor(adapter?: ResourceAdapter) {
    debug('new resource instance: %s', this.type())
    if (adapter) this.#resources = adapter
  }

  protected get resources(): ResourceAdapter {
    return this.#resources || ApiResourceAdapter.get()
  }

  /**
   * Returns a copy of this resource instance bound to a specific
   * `ResourceAdapter`. Used by the bundle client so each client instance
   * routes requests through its own adapter (its own access token) instead
   * of the process-global static adapter. Resource classes are type-only
   * exports, so we clone via `this.constructor` rather than referencing the
   * class directly.
   */
  withAdapter(adapter: ResourceAdapter): this {
    return new (this.constructor as new (adapter?: ResourceAdapter) => this)(adapter)
  }

  abstract relationship(id: string | ResourceId | null): ResourceRel

  protected relationshipOneToOne<RR extends ResourceRel>(id: string | ResourceId | null): RR {
    return (id === null || typeof id === 'string' ? { id, type: this.type() } : { id: id.id, type: this.type() }) as RR
  }

  protected relationshipOneToMany<RR extends ResourceRel>(...ids: string[]): RR[] {
    return (
      ids === null || ids.length === 0 || ids[0] === null
        ? [{ id: null, type: this.type() }]
        : ids.map((id) => {
            return { id, type: this.type() }
          })
    ) as RR[]
  }

  abstract type(): ResourceTypeLock

  protected path(): string {
    return this.type()
  }

  // reference, reference_origin and metadata attributes are always updatable
  async update(resource: ResourceUpdate, params?: QueryParamsRetrieve<R>, options?: ResourcesConfig): Promise<R> {
    return this.resources.update<ResourceUpdate, R>({ ...resource, type: this.type() }, params, options)
  }
}

abstract class ApiResource<R extends Resource> extends ApiResourceBase<R> {
  async retrieve(id: string | ResourceId, params?: QueryParamsRetrieve<R>, options?: ResourcesConfig): Promise<R> {
    const resId = typeof id === 'string' ? { type: this.type(), id } : id
    if (!resId.id) throw new SdkError({ message: 'Resource id cannot be blank' })
    return this.resources.retrieve<R>(resId, params, options)
  }

  async list(params?: QueryParamsList<R>, options?: ResourcesConfig): Promise<ListResponse<R>> {
    return this.resources.list<R>({ type: this.type() }, params, options)
  }

  async count(filter?: QueryFilter | QueryParamsList<R>, options?: ResourcesConfig): Promise<number> {
    const params: QueryParamsList<R> = {
      filters: isParamsList<R>(filter) ? filter.filters : filter,
      pageNumber: 1,
      pageSize: 1,
    }
    const response = await this.list(params, options)
    return Promise.resolve(response.meta.recordCount)
  }
}

abstract class ApiSingleton<R extends Resource> extends ApiResourceBase<R> {
  async retrieve(params?: QueryParamsRetrieve<R>, options?: ResourcesConfig): Promise<R> {
    return this.resources.singleton<R>({ type: this.type() }, params, options, this.path())
  }
}

export { ApiResource, ApiResourceAdapter, ApiSingleton, type ResourceAdapter }

export const isResourceId = (resource: any): resource is ResourceId => {
  return resource?.type && resource.id && resourceList.includes(resource.type as ResourceTypeLock)
}

export const isResourceType = (resource: any): resource is ResourceType => {
  return resource?.type && resourceList.includes(resource.type as ResourceTypeLock)
}
