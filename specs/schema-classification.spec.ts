import { describe, expect, test } from 'vitest'
import apiSchema from '../gen/schema'

const FIXTURE = 'test/fixtures/public/classification.json'

describe('Schema classification by target version', () => {
  test('default target = latest: includes everything, marks older-only as deprecated', () => {
    const schema = apiSchema.parse(FIXTURE)

    // Latest in fixture is 2026-05; targetVersion = latest.
    expect(schema.version).toBe('2026-05')

    // Resource present at latest → included normally.
    expect(schema.resources.agnostic_resources).toBeDefined()
    expect(schema.resources.agnostic_resources?.deprecated).toBeUndefined()

    // Resource only in 2017-08 → @deprecated (kept in surface).
    expect(schema.resources.legacy_resources).toBeDefined()
    expect(schema.resources.legacy_resources?.deprecated).toBe(true)

    // Resource only in 2026-05 → included normally (target IS latest).
    expect(schema.resources.future_resources).toBeDefined()
    expect(schema.resources.future_resources?.deprecated).toBeUndefined()

    // Fields on the agnostic resource.
    const comp = schema.resources.agnostic_resources?.components.AgnosticResource
    expect(comp?.attributes.always_field?.deprecated).toBeUndefined()
    expect(comp?.attributes.legacy_field?.deprecated).toBe(true)
    expect(comp?.attributes.legacy_field?.deprecatedSince).toBe('2017-08')
    // future_field's version array includes the target latest, so it's included normally.
    expect(comp?.attributes.future_field?.deprecated).toBeUndefined()
    expect(comp?.attributes.spanning_field?.deprecated).toBeUndefined()
  })

  test('target = 2017-08: legacy is current, future is excluded', () => {
    const schema = apiSchema.parse(FIXTURE, { apiVersion: '2017-08' })

    expect(schema.version).toBe('2017-08')

    // Spans both → included.
    expect(schema.resources.agnostic_resources).toBeDefined()
    expect(schema.resources.agnostic_resources?.deprecated).toBeUndefined()

    // Only in 2017-08 → current at target → included normally (NOT deprecated).
    expect(schema.resources.legacy_resources).toBeDefined()
    expect(schema.resources.legacy_resources?.deprecated).toBeUndefined()

    // Only in 2026-05 → newer than target → excluded entirely.
    expect(schema.resources.future_resources).toBeUndefined()

    // Fields when target=2017-08:
    const comp = schema.resources.agnostic_resources?.components.AgnosticResource
    expect(comp?.attributes.always_field?.deprecated).toBeUndefined()
    // legacy_field is in 2017-08 → matches target → included normally.
    expect(comp?.attributes.legacy_field?.deprecated).toBeUndefined()
    // future_field is in 2026-05 only → excluded from output.
    expect(comp?.attributes.future_field).toBeUndefined()
    expect(comp?.attributes.spanning_field?.deprecated).toBeUndefined()
  })

  test('relationship targeting an excluded resource → object[] fallback', () => {
    // target=2017-08 → future_resource is excluded entirely. Various rels in
    // `agnostic_resource` point at it.
    const schema = apiSchema.parse(FIXTURE, { apiVersion: '2017-08' })
    const comp = schema.resources.agnostic_resources?.components.AgnosticResource

    // `future_rel` has its own versions=["2026-05"] → own classification is
    // 'exclude' → dropped from the component entirely.
    expect(comp?.relationships.future_rel).toBeUndefined()

    // `legacy_rel` has versions=["2017-08"] → matches target → not deprecated.
    expect(comp?.relationships.legacy_rel?.deprecated).toBe(false)

    // `always_to_future` has no own versions → not excluded itself; but its
    // target (future_resource) IS excluded → flagged for the `object[]`
    // fallback renderer path.
    expect(comp?.relationships.always_to_future).toBeDefined()
    expect(comp?.relationships.always_to_future?.deprecated).toBe(true)
    expect(comp?.relationships.always_to_future?.targetExcluded).toBe(true)

    // `always_to_legacy` points at legacy_resource (which is current at this
    // target). The rel itself has no versions and the target is included →
    // not deprecated, not excluded; proper-type path.
    expect(comp?.relationships.always_to_legacy).toBeDefined()
    expect(comp?.relationships.always_to_legacy?.deprecated).toBe(false)
    expect(comp?.relationships.always_to_legacy?.targetExcluded).toBeUndefined()
  })

  test('deprecated relationship (own legacy versions) keeps proper typing', () => {
    // target=2026-05 → `legacy_rel` is own-deprecated (versions=["2017-08"]).
    // Its target (LegacyResource) is also deprecated but still in the SDK.
    // Expected: rel is included with deprecated=true, targetExcluded undefined
    // (the renderer will emit the proper LegacyResource type).
    const schema = apiSchema.parse(FIXTURE)
    const comp = schema.resources.agnostic_resources?.components.AgnosticResource
    expect(comp?.relationships.legacy_rel).toBeDefined()
    expect(comp?.relationships.legacy_rel?.deprecated).toBe(true)
    expect(comp?.relationships.legacy_rel?.targetExcluded).toBeUndefined()
    expect(comp?.relationships.legacy_rel?.deprecatedSince).toBe('2017-08')
  })

  test('invalid --api-version throws', () => {
    expect(() => apiSchema.parse(FIXTURE, { apiVersion: '1999-01' })).toThrow(/not in the supported set/)
  })
})
