import Debug from '@runtime/debug'
import type { ResourceAdapter } from '@runtime/resource'
import * as api from './api'
import { type CommerceLayerInitConfig, CommerceLayerSingleClient } from '../src/commercelayer'

const debug = Debug('bundle')

class CommerceLayerClient extends CommerceLayerSingleClient {
  // ##__CL_RESOURCES_DEF_START__##
  // ##__CL_RESOURCES_DEF_TEMPLATE:: ##__TAB__#####__RESOURCE_TYPE__##?: api.##__RESOURCE_CLASS__##
  // ##__CL_RESOURCES_DEF_STOP__##

  public constructor(config: CommerceLayerInitConfig) {
    super(config)
    debug('new commercelayer bundle instance %O', config)

    // ##__CL_RESOURCES_INIT_START__##
    // ##__CL_RESOURCES_INIT_TEMPLATE:: ##__TAB__####__TAB__##this.##__RESOURCE_TYPE__## = new api.##__RESOURCE_CLASS__##(this.#adapter)
    // ##__CL_RESOURCES_INIT_STOP__##
  }

  static get(config?: CommerceLayerInitConfig): CommerceLayerClient {
    if (config) return (CommerceLayerClient.cl = new CommerceLayerClient(config))
    else if (!CommerceLayerClient.cl) throw new Error('CommerceLayer bundle client not initialized')
    return CommerceLayerClient.cl as CommerceLayerClient
  }

  // Bundle clients are isolated: route this instance's requests, config and
  // interceptors through the adapter built for it, not the process-global
  // static one. The resource accessors below bind to this same adapter.
  protected override get adapter(): ResourceAdapter {
    return this.instanceAdapter
  }

  // ##__CL_RESOURCES_LAZY_LOADING_START__##
  // ##__CL_RESOURCES_LAZY_LOADING_TEMPLATE:: ##__TAB__##get ##__RESOURCE_TYPE__##(): api.##__RESOURCE_CLASS__## { return this.###__RESOURCE_TYPE__## || (this.###__RESOURCE_TYPE__## = api.##__RESOURCE_TYPE__##.withAdapter(this.adapter)) }
  // ##__CL_RESOURCES_LAZY_LOADING_STOP__##

  // ##__CL_RESOURCES_ACCESSORS_ONLY_START__##
  // ##__CL_RESOURCES_ACCESSORS_ONLY_TEMPLATE:: ##__TAB__##get ##__RESOURCE_TYPE__##(): api.##__RESOURCE_CLASS__## { return api.##__RESOURCE_TYPE__## }
  // ##__CL_RESOURCES_ACCESSORS_ONLY_STOP__##
}

function CommerceLayer(config: CommerceLayerInitConfig): CommerceLayerClient {
  return CommerceLayerClient.get(config)
}

/**
 * @deprecated Renamed to `CommerceLayerClient`. This alias is kept for
 * backwards compatibility and will be removed in a future major.
 */
type CommerceLayerBundle = CommerceLayerClient

export default CommerceLayer
export { CommerceLayer, type CommerceLayerBundle, type CommerceLayerClient }
