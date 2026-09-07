import { type ApiError, isApiError, isSdkError, type SdkError } from '@runtime/error'
import { isTokenExpired } from '@runtime/util'
import type { ResourceTypeLock } from '../gen/enum'
import {
  getResources,
  getSingletons,
  isCreatable,
  isDeletable,
  isSingleton,
  isTaggable,
  isUpdatable,
} from '../gen/enum'
import { API_SCHEMA_VERSION } from './commercelayer'

/* Static functions */
export const CommerceLayerStatic = {
  resources: (sort?: boolean): readonly string[] => {
    return getResources(sort)
  },

  singletons: (sort?: boolean): readonly string[] => {
    return getSingletons(sort)
  },

  isSingleton: (resource: ResourceTypeLock): boolean => {
    return isSingleton(resource)
  },

  isCreatable: (resource: ResourceTypeLock): boolean => {
    return isCreatable(resource)
  },

  isUpdatable: (resource: ResourceTypeLock): boolean => {
    return isUpdatable(resource)
  },

  isDeletable: (resource: ResourceTypeLock): boolean => {
    return isDeletable(resource)
  },

  isTaggable: (resource: ResourceTypeLock): boolean => {
    return isTaggable(resource)
  },

  isSdkError: (error: unknown): error is SdkError => {
    return isSdkError(error)
  },

  isApiError: (error: unknown): error is ApiError => {
    return isApiError(error)
  },

  isTokenExpired: (token: string): boolean => {
    return isTokenExpired(token)
  },

  get schemaVersion(): string {
    return API_SCHEMA_VERSION
  },
}
