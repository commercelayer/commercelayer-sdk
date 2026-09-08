import Debug from '@runtime/debug'
import { type ApiError, isApiError } from '@runtime/error'
import type {
  ErrorInterceptor,
  HeadersObj,
  InterceptorManager,
  InterceptorType,
  RawResponseReader,
  RequestInterceptor,
  ResponseInterceptor,
  ResponseObj,
} from '@runtime/interceptor'
import { ApiResourceAdapter, type ResourceAdapter, type ResourcesInitConfig } from '@runtime/resource'
// import * as api from '../gen/api'
import { getResources } from '../gen/enum'
import { API_SCHEMA_VERSION, API_SUPPORTED_VERSIONS, type ApiVersion, SDK_VERSION } from '../gen/version'

const debug = Debug('commercelayer')

export { API_SCHEMA_VERSION, API_SUPPORTED_VERSIONS, type ApiVersion, SDK_VERSION }

// SDK local configuration
type SdkConfig = {
  /** Set to `false` to omit the `X-CL-SDK` request header that identifies the SDK and its version. Defaults to `true`. */
  telemetry?: boolean
}

/**
 * The `apiVersion` init option, conditioned on how the SDK was generated:
 * - **Version-aware (unified) builds** — {@link API_SUPPORTED_VERSIONS} is
 *   non-empty — **require** `apiVersion`. The chosen value becomes a URL path
 *   segment (`/api/2026-05/orders`), keeping requests aligned with the version
 *   the types were generated for.
 * - **Legacy builds** — empty {@link API_SUPPORTED_VERSIONS}, so {@link ApiVersion}
 *   is `never` — take **no** `apiVersion` argument. The API is unversioned
 *   (`/api/orders`).
 */
type ApiVersionConfig = [ApiVersion] extends [never] ? { apiVersion?: never } : { apiVersion: ApiVersion }

type CommerceLayerInitConfig = SdkConfig & ApiVersionConfig & ResourcesInitConfig
type CommerceLayerConfig = Partial<CommerceLayerInitConfig>

class CommerceLayerSingleClient {
  readonly apiSchemaVersion = API_SCHEMA_VERSION
  readonly apiSupportedVersions = API_SUPPORTED_VERSIONS

  protected static cl: CommerceLayerSingleClient

  static get(config?: CommerceLayerInitConfig): CommerceLayerSingleClient {
    if (config) return (CommerceLayerSingleClient.cl = new CommerceLayerSingleClient(config))
    else if (!CommerceLayerSingleClient.cl) throw new Error('CommerceLayer client not initialized')
    return CommerceLayerSingleClient.cl
  }

  // The ResourceAdapter created for this specific client instance. Every
  // `CommerceLayer(config)` call builds a fresh adapter (its own ApiClient
  // with its own access token). The bundle client reads this so two clients
  // stay isolated; see the `adapter` seam below.
  protected readonly instanceAdapter: ResourceAdapter

  protected constructor(config: CommerceLayerInitConfig) {
    debug('new commercelayer instance %O', config)

    // `init` builds a new adapter AND sets the process-global static one.
    // We keep the return value so the bundle can bind resources to this
    // exact adapter; the static assignment stays for the plain SDK, whose
    // directly-imported resource singletons resolve through it.
    this.instanceAdapter = ApiResourceAdapter.init(config)
  }

  // Adapter seam. The base (plain SDK) reports the process-global static
  // adapter so `config()` and the getters below stay in sync with the
  // directly-imported resource singletons — unchanged behaviour. The bundle
  // overrides this to return its own `instanceAdapter`, isolating clients.
  protected get adapter(): ResourceAdapter {
    return ApiResourceAdapter.get()
  }

  get currentOrganization(): string {
    return this.adapter.client?.currentOrganization
  }
  get currentAccessToken(): string {
    return this.adapter.client?.currentAccessToken
  }
  /** The API version pinned via `apiVersion`, or `undefined` when requests are unversioned. */
  get currentApiVersion(): string | undefined {
    return this.adapter.client?.currentApiVersion
  }
  private get interceptors(): InterceptorManager {
    return this.adapter.client?.interceptors
  }

  private localConfig(_config: Partial<SdkConfig>): void {
    // if (config.abc) this.abc = config.abc
  }

  config(config: CommerceLayerConfig): this {
    debug('config %o', config)

    // CommerceLayer config
    this.localConfig(config)
    // ResourceAdapter config
    this.adapter.config(config)

    return this
  }

  resources(sort?: boolean): readonly string[] {
    return getResources(sort)
  }

  isApiError(error: any): error is ApiError {
    return isApiError(error)
  }

  addRequestInterceptor(onSuccess?: RequestInterceptor, onFailure?: ErrorInterceptor): number {
    this.interceptors.request = { onSuccess, onFailure }
    return 1
  }

  addResponseInterceptor(onSuccess?: ResponseInterceptor, onFailure?: ErrorInterceptor): number {
    this.interceptors.response = { onSuccess, onFailure }
    return 1
  }

  removeInterceptor(type: InterceptorType, _id: number = 1): void {
    this.interceptors[type] = undefined
  }

  removeInterceptors(): void {
    this.removeInterceptor('request')
    this.removeInterceptor('response')
    this.removeRawResponseReader()
  }

  addRawResponseReader(options?: { headers: boolean }): RawResponseReader {
    const reader: RawResponseReader = {
      id: 0,
      rawResponse: undefined,
      headers: undefined,
      ok: true,
    }

    async function rawResponseInterceptor(response: ResponseObj): Promise<ResponseObj> {
      reader.rawResponse = await response
        ?.clone()
        .json()
        .catch(() => {})
      reader.ok = response.ok
      if (options?.headers) {
        const ho: HeadersObj = {}
        response.headers.forEach((value, key) => {
          ho[key] = value
        })
        reader.headers = ho
      }
      return response
    }

    /* const interceptor = */ this.interceptors.rawReader = {
      onSuccess: rawResponseInterceptor,
      onFailure: rawResponseInterceptor,
    }
    reader.id = 1 // interceptor

    return reader
  }

  removeRawResponseReader(/* reader: number | RawResponseReader */): void {
    /*
		const id = (typeof reader === 'number') ? reader : reader?.id
		if (id && (id >= 0)) this.removeInterceptor('response', id)
		*/
    this.interceptors.rawReader = undefined
  }
}

const CommerceLayer = (config: CommerceLayerInitConfig): CommerceLayerSingleClient => {
  return CommerceLayerSingleClient.get(config)
}

export default CommerceLayer
export type { CommerceLayerConfig, CommerceLayerInitConfig }
export { CommerceLayer, CommerceLayerSingleClient }
