import {
  Addresses,
  Customers
} from './api'
import { CommerceLayerInitConfig } from './commercelayer'
import { ApiResourceAdapter } from './resource'


export const addresses = new Addresses()
export const customers = new Customers()



export const initCommerceLayer = (config: CommerceLayerInitConfig): void => {
  ApiResourceAdapter.init(config)
}