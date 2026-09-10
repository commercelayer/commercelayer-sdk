import Debug from '@runtime/debug'
import type { ResourceAdapter } from '@runtime/resource'
import * as api from './api'
import { type CommerceLayerInitConfig, ##__CLIENT_BASE__## } from '../src/commercelayer'

const debug = Debug('bundle')

class ##__CLIENT_CLASS__## extends ##__CLIENT_BASE__## {
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

  static get(config?: CommerceLayerInitConfig): ##__CLIENT_CLASS__## {
    if (config) return (##__CLIENT_CLASS__##.cl = new ##__CLIENT_CLASS__##(config))
    else if (!##__CLIENT_CLASS__##.cl) throw new Error('##__CLIENT_FACTORY__## bundle client not initialized')
    return ##__CLIENT_CLASS__##.cl as ##__CLIENT_CLASS__##
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

function ##__CLIENT_FACTORY__##(config: CommerceLayerInitConfig): ##__CLIENT_CLASS__## {
  return ##__CLIENT_CLASS__##.get(config)
}

// ##__IF_BUNDLE_ALIAS__##
/**
 * @deprecated Renamed to `##__CLIENT_CLASS__##`. This alias is kept for
 * backwards compatibility and will be removed in a future major.
 */
type ##__BUNDLE_ALIAS__## = ##__CLIENT_CLASS__##
// ##__END_IF_BUNDLE_ALIAS__##

export default ##__CLIENT_FACTORY__##
export { ##__CLIENT_FACTORY__##, type ##__CLIENT_CLASS__## }
// ##__IF_BUNDLE_ALIAS__##
export type { ##__BUNDLE_ALIAS__## }
// ##__END_IF_BUNDLE_ALIAS__##
