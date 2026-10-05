/**
 * ##__COPYRIGHT__##
 **/
import type { TargetBinding } from '@runtime/binding'
import { getResources, resourceList } from './enum'
import { SDK_VERSION } from './version'

// Type-level maps cannot be injected, so they are re-exported here and reached
// through the same `#registry` alias as the value binding below.
export type { ResourceFields, ResourceSortFields, ResourceTypeLock } from './enum'

/**
 * This target's binding. Every field comes from the Target config or the parsed
 * schema — edit `sdk.config.ts`, not this file.
 */
export const binding = {
  subdomain: ##__BINDING_SUBDOMAIN__##,
  name: '##__BINDING_NAME__##',
  sdkVersion: SDK_VERSION,
  schemaVersion: '##__BINDING_SCHEMA_VERSION__##',
  supportedVersions: [##__BINDING_SUPPORTED_VERSIONS__##] as const,
  resourceList,
  getResources,
} as const satisfies TargetBinding

/** The API versions this build accepts as `apiVersion`; `never` on legacy schemas. */
export type ApiVersion = (typeof binding.supportedVersions)[number]
