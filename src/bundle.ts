import { CommerceLayerClient, CommerceLayerInitConfig } from './commercelayer'


class CommerceLayerBundle extends CommerceLayerClient {

  // ##__CL_RESOURCES_DEF_START__##
	// ##__CL_RESOURCES_DEF_TEMPLATE:: ##__TAB__#####__RESOURCE_TYPE__##?: api.##__RESOURCE_CLASS__##
	// ##__CL_RESOURCES_DEF_STOP__##

  protected constructor(config: CommerceLayerInitConfig) {

		super(config)

		// ##__CL_RESOURCES_INIT_START__##
		// ##__CL_RESOURCES_INIT_TEMPLATE:: ##__TAB__####__TAB__##this.##__RESOURCE_TYPE__## = new api.##__RESOURCE_CLASS__##(this.#adapter)
		// ##__CL_RESOURCES_INIT_STOP__##

	}

  // ##__CL_RESOURCES_LEAZY_LOADING_START__##
	// ##__CL_RESOURCES_LEAZY_LOADING_TEMPLATE:: ##__TAB__##get ##__RESOURCE_TYPE__##(): api.##__RESOURCE_CLASS__## { return this.###__RESOURCE_TYPE__## || (this.###__RESOURCE_TYPE__## = new api.##__RESOURCE_CLASS__##(this.#adapter)) }
	// ##__CL_RESOURCES_LEAZY_LOADING_STOP__##

}


export default CommerceLayerBundle
