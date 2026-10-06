import type { Fetch } from '@runtime/fetch'
import { denormalize, normalize } from '@runtime/jsonapi'
import { beforeEach, describe, expect, test } from 'vitest'
import { CommerceLayer, type Order, type OrderUpdate, orders } from '../src/single-client'
import { API_VERSION } from '../test/common'

const config = { organization: 'test-org', accessToken: 'fake-token', apiVersion: API_VERSION } as const

const META = { created_with_version: '2026-09' }

// Fake fetch returning a crafted JSON:API document, optionally capturing the
// outgoing request so its body can be asserted.
const fakeFetch = (body: unknown, capture?: (url: URL, init?: RequestInit) => void): Fetch =>
  ((url: URL, init?: RequestInit) => {
    capture?.(url, init)
    return Promise.resolve({
      ok: true,
      status: 200,
      body: {},
      json: () => Promise.resolve(body),
    } as unknown as Response)
  }) as Fetch

const orderDoc = (meta?: Record<string, string>) => ({
  data: {
    id: 'ORD123',
    type: 'orders',
    attributes: { number: '1234', status: 'draft', metadata: { mine: 'user-written' } },
    ...(meta ? { meta } : {}),
  },
})

describe('SDK:resource meta', () => {
  describe('denormalize', () => {
    test('keeps a resource-level meta under `meta`', () => {
      const res = denormalize(orderDoc(META)) as Order
      expect(res.meta).toEqual(META)
      expect(res.meta?.created_with_version).toBe('2026-09')
    })

    test('adds no `meta` key when the API sends none', () => {
      const res = denormalize(orderDoc()) as Order
      expect('meta' in res).toBe(false)
    })

    test('keeps `meta` separate from the user-writable `metadata` attribute', () => {
      const res = denormalize(orderDoc(META)) as Order
      expect(res.meta).toEqual(META)
      expect(res.metadata).toEqual({ mine: 'user-written' })
    })

    test('keeps each list element’s own meta, and not the document-level meta', () => {
      const res = denormalize({
        data: [
          { id: 'A', type: 'orders', attributes: {}, meta: { created_with_version: '2026-01' } },
          { id: 'B', type: 'orders', attributes: {} },
        ],
        // Document-level meta describes the list, not any one resource.
        meta: { record_count: 2, page_count: 1 },
      }) as Order[]

      expect(res[0]?.meta).toEqual({ created_with_version: '2026-01' })
      expect('meta' in (res[1] as object)).toBe(false)
    })

    test('keeps meta on included resources', () => {
      const res = denormalize({
        data: {
          id: 'ORD123',
          type: 'orders',
          attributes: {},
          relationships: { customer: { data: { type: 'customers', id: 'CUS1' } } },
        },
        included: [{ id: 'CUS1', type: 'customers', attributes: {}, meta: { created_with_version: '2025-11' } }],
      }) as Order

      expect((res.customer as { meta?: unknown } | null | undefined)?.meta).toEqual({
        created_with_version: '2025-11',
      })
    })
  })

  describe('normalize', () => {
    test('never sends `meta` back as an attribute', () => {
      const retrieved = denormalize(orderDoc(META)) as Order
      const normalized = normalize({ ...retrieved, reference: 'changed' } as unknown as OrderUpdate & {
        type: 'orders'
      })

      expect(normalized.attributes).not.toHaveProperty('meta')
      expect(normalized.attributes).toHaveProperty('reference', 'changed')
      // `metadata` is a real attribute and must still round-trip.
      expect(normalized.attributes).toHaveProperty('metadata', { mine: 'user-written' })
    })
  })

  describe('through the client', () => {
    beforeEach(() => {
      CommerceLayer(config)
    })

    test('retrieve exposes meta.created_with_version', async () => {
      const order = await orders.retrieve('ORD123', {}, { fetch: fakeFetch(orderDoc(META)) })
      expect(order.meta?.created_with_version).toBe('2026-09')
    })

    test('a retrieved resource passed straight to update() does not send meta', async () => {
      const order = await orders.retrieve('ORD123', {}, { fetch: fakeFetch(orderDoc(META)) })

      let sent: Record<string, unknown> | undefined
      await orders.update(
        { ...order, reference: 'changed' } as unknown as OrderUpdate,
        {},
        {
          fetch: fakeFetch(orderDoc(META), (_url, init) => {
            sent = JSON.parse(String(init?.body))
          }),
        },
      )

      const attributes = (sent?.data as { attributes?: Record<string, unknown> })?.attributes
      expect(attributes).toBeDefined()
      expect(attributes).not.toHaveProperty('meta')
      expect(attributes).toHaveProperty('reference', 'changed')
    })
  })
})
