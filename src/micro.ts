import ResourceAdapter, { apiResourceAdapter, type ResourcesInitConfig } from "./resource"
import * as api from './api'


type InitParamType = ResourceAdapter | ResourcesInitConfig

const initParam = (init: InitParamType): ResourceAdapter => {
  return (init instanceof ResourceAdapter)? init : apiResourceAdapter(init)
}


// ##__API_RESOURCES_MICRO_CLIENTS_START__##
/**
 * ©2024 Commerce Layer Inc.
 **/
// ##__API_RESOURCES_MICRO_CLIENTS_STOP__##
