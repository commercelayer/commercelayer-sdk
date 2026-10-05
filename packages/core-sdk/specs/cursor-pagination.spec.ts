import type { Fetch } from '@runtime/fetch'
import { beforeEach, describe, expect, test } from 'vitest'
import { CommerceLayer, skus } from '../src/single-client'

const config = { organization: 'test-org', accessToken: 'fake-token' } as const

// Minimal fake fetch: captures the requested URL and returns a crafted
// JSON:API document so both the request query string and the response-meta
// parsing can be asserted without hitting the network.
const fakeFetch = (body: unknown, capture?: (url: URL) => void): Fetch =>
  ((url: URL) => {
    capture?.(url)
    return Promise.resolve({
      ok: true,
      status: 200,
      body: {},
      json: () => Promise.resolve(body),
    } as unknown as Response)
  }) as Fetch

const cursorBody = (nextUrl: string) => ({
  data: [{ id: '1234567891234-0', type: 'event_stores', attributes: { resource_type: 'skus', event: 'update' } }],
  meta: {},
  links: { next: nextUrl },
})

// Single-page cursor response: empty meta, no `links` (nothing before/after).
const cursorSinglePageBody = () => ({
  data: [{ id: '1234567891234-0', type: 'event_stores', attributes: { resource_type: 'skus', event: 'update' } }],
  meta: {},
})

const offsetBody = () => ({
  data: [{ id: 'SKU1', type: 'skus', attributes: { code: 'TSHIRT' } }],
  meta: { record_count: 42, page_count: 5, page_number: 2, page_size: 10 },
})

beforeEach(() => {
  CommerceLayer(config)
})

describe('cursor pagination — request', () => {
  test('emits page[after]/page[before] and suppresses the implicit page[number]=1', async () => {
    let captured: URL | undefined
    await skus
      .list(
        { pageAfter: 'CUR_AFTER', pageBefore: 'CUR_BEFORE', pageSize: 10 },
        {
          fetch: fakeFetch(offsetBody(), (u) => {
            captured = u
          }),
        },
      )
      .catch(() => {})

    expect(captured?.searchParams.get('page[after]')).toBe('CUR_AFTER')
    expect(captured?.searchParams.get('page[before]')).toBe('CUR_BEFORE')
    expect(captured?.searchParams.get('page[size]')).toBe('10')
    expect(captured?.searchParams.has('page[number]')).toBe(false)
  })

  test('offset list() still injects page[number]=1 when absent', async () => {
    let captured: URL | undefined
    await skus
      .list(
        {},
        {
          fetch: fakeFetch(offsetBody(), (u) => {
            captured = u
          }),
        },
      )
      .catch(() => {})
    expect(captured?.searchParams.get('page[number]')).toBe('1')
    expect(captured?.searchParams.has('page[after]')).toBe(false)
  })
})

describe('cursor pagination — response meta', () => {
  test('cursor response parses links.next into meta.cursor', async () => {
    const next =
      'https://test-org.commercelayer.io/api/skus/xYZkjABcde/event_stores?page[after]=CURSOR123&page[size]=10'
    const list = await skus.event_stores('xYZkjABcde', { pageSize: 10 }, { fetch: fakeFetch(cursorBody(next)) })

    // cursor pagination is detected by the presence of meta.cursor — no narrowing
    expect(list.meta.cursor).toBeDefined()
    expect(list.meta.cursor?.next?.after).toBe('CURSOR123')
    expect(list.meta.cursor?.next?.before).toBeUndefined()
    expect(list.meta.cursor?.prev).toBeUndefined()
    expect(list.meta.recordsPerPage).toBe(10)
    // the offset interface still resolves; values are NaN/false in cursor mode
    expect(list.hasNextPage()).toBe(false)
    expect(list.hasPrevPage()).toBe(false)
    expect(Number.isNaN(list.meta.recordCount)).toBe(true)
    expect(Number.isNaN(list.pageCount)).toBe(true)
    expect(Number.isNaN(list.recordCount)).toBe(true)
  })

  test('single-page cursor response (no links) still exposes meta.cursor', async () => {
    const list = await skus.event_stores('xYZkjABcde', { pageSize: 25 }, { fetch: fakeFetch(cursorSinglePageBody()) })

    expect(list.meta.cursor).toBeDefined()
    expect(list.meta.cursor?.next).toBeUndefined()
    expect(list.meta.cursor?.prev).toBeUndefined()
    expect(list.hasNextPage()).toBe(false)
  })

  test('offset response builds offset meta and working accessors', async () => {
    const list = await skus.list({ pageNumber: 2, pageSize: 10 }, { fetch: fakeFetch(offsetBody()) })

    expect(list.meta.cursor).toBeUndefined()
    // the historical meta.* interface resolves directly, no narrowing
    expect(list.meta.pageCount).toBe(5)
    expect(list.meta.recordCount).toBe(42)
    expect(list.meta.currentPage).toBe(2)
    expect(list.pageCount).toBe(5)
    expect(list.recordCount).toBe(42)
    expect(list.hasNextPage()).toBe(true)
    expect(list.hasPrevPage()).toBe(true)
  })
})
