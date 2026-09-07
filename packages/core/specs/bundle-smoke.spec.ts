import { describe, expect, test } from 'vitest'
import { CommerceLayer } from '../src' // default entry === the bundle client
import { handleError, interceptRequest } from '../test/common'

// Smoke coverage for the DEFAULT entry (the bundle). The exhaustive
// per-resource request machinery is covered once via single-client; here we
// only prove the bundle's lazy accessors return working, correctly-bound
// instances for a representative regular resource (`orders`) and a singleton
// (`organization`), across the main verbs. Network-free (interceptor cancels).

const config = { organization: 'smoke-org', accessToken: 'smoke-token' } as const

const expectBoundRequest = (request: { url: URL; options: { method?: string; headers?: unknown } }, method: string) => {
  expect(request.options.method).toBe(method)
  expect(request.url.hostname).toContain('smoke-org')
  const headers = request.options.headers as Record<string, string>
  expect(headers.Authorization).toBe('Bearer smoke-token')
}

describe('Bundle default-entry smoke', () => {
  test('accessor returns a stable, correctly-typed bound instance', () => {
    const cl = CommerceLayer(config)
    expect(cl.orders).toBe(cl.orders) // cached per client instance
    expect(cl.orders.type()).toBe('orders')
    expect(cl.organization.type()).toBe('organizations')
  })

  test('regular resource: list → GET /orders', async () => {
    const cl = CommerceLayer(config)
    cl.addRequestInterceptor((request) => {
      expectBoundRequest(request, 'GET')
      expect(request.url.pathname.endsWith('/orders')).toBe(true)
      return interceptRequest()
    })
    await cl.orders
      .list()
      .catch(handleError)
      .finally(() => cl.removeInterceptor('request'))
  })

  test('regular resource: retrieve → GET /orders/:id', async () => {
    const cl = CommerceLayer(config)
    cl.addRequestInterceptor((request) => {
      expectBoundRequest(request, 'GET')
      expect(request.url.pathname.endsWith('/orders/ord-1')).toBe(true)
      return interceptRequest()
    })
    await cl.orders
      .retrieve('ord-1')
      .catch(handleError)
      .finally(() => cl.removeInterceptor('request'))
  })

  test('regular resource: create → POST /orders', async () => {
    const cl = CommerceLayer(config)
    cl.addRequestInterceptor((request) => {
      expectBoundRequest(request, 'POST')
      expect(request.url.pathname.endsWith('/orders')).toBe(true)
      return interceptRequest()
    })
    await cl.orders
      .create({ reference: 'smoke' })
      .catch(handleError)
      .finally(() => cl.removeInterceptor('request'))
  })

  test('singleton: retrieve → GET /organization', async () => {
    const cl = CommerceLayer(config)
    cl.addRequestInterceptor((request) => {
      expectBoundRequest(request, 'GET')
      expect(request.url.pathname.endsWith('/organization')).toBe(true)
      return interceptRequest()
    })
    await cl.organization
      .retrieve()
      .catch(handleError)
      .finally(() => cl.removeInterceptor('request'))
  })
})
