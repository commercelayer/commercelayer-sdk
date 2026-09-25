/**
 * © Commerce Layer Inc.
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
  subdomain: undefined,
  name: 'core',
  sdkVersion: SDK_VERSION,
  schemaVersion: '2026-05',
  supportedVersions: ['2017-08', '2026-05'] as const,
  resourceList,
  getResources,
} as const satisfies TargetBinding

/** The API versions this build accepts as `apiVersion`; `never` on legacy schemas. */
export type ApiVersion = (typeof binding.supportedVersions)[number]
