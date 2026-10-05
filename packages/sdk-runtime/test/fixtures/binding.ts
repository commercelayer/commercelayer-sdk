/**
 * Fixture Target binding, used by this package's own ts:check and tests.
 *
 * The Runtime must not name one of its consumers to typecheck itself, and it
 * cannot point at a real package's `gen/binding.ts` because the drift check
 * wipes `gen/` before regenerating.
 *
 * The shape mirrors a real catalogue: a literal resource-type union and field
 * maps keyed by those literals, never index signatures. Modelling it loosely
 * changes how the Runtime's generic mapped types resolve and produces errors no
 * real binding hits.
 */
import type { TargetBinding } from '../../src/binding'

export type ResourceTypeLock = 'fixtures' | 'fixture_items'
export type ResourceFields = {
  fixtures: { id: string; reference: string; name: string }
  fixture_items: { id: string; reference: string; quantity: number }
}
export type ResourceSortFields = {
  fixtures: { id: string; name: string }
  fixture_items: { id: string; quantity: number }
}

export const resourceList: readonly ResourceTypeLock[] = ['fixtures', 'fixture_items']

export const binding = {
  subdomain: undefined,
  name: 'fixture',
  sdkVersion: '0.0.0',
  schemaVersion: 'latest',
  supportedVersions: [] as const,
  resourceList,
  getResources: (sort?: boolean) => (sort ? [...resourceList].sort() : resourceList),
} as const satisfies TargetBinding
