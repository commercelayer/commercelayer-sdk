import { describe, expect, test } from 'vitest'
import { CommerceLayer } from '../src/bundle'
import { handleError, interceptRequest } from '../test/common'

// Regression test for the singleton bug: two bundle clients created with
// different tokens must stay isolated. Previously every client funneled
// through the process-global static adapter (and shared module-singleton
// resource instances), so the last-created client's token/org won for all.

const config1 = { organization: 'org-one', accessToken: 'token-one' } as const
const config2 = { organization: 'org-two', accessToken: 'token-two' } as const

describe('Bundle client isolation', () => {
  test('each client reports its own organization', () => {
    const client1 = CommerceLayer(config1)
    const client2 = CommerceLayer(config2)

    // With the singleton bug both would report 'org-two' (last created wins).
    expect(client1.currentOrganization).toBe('org-one')
    expect(client2.currentOrganization).toBe('org-two')
  })

  test('each client reports its own access token', () => {
    const client1 = CommerceLayer(config1)
    const client2 = CommerceLayer(config2)

    expect(client1.currentAccessToken).toBe('token-one')
    expect(client2.currentAccessToken).toBe('token-two')
  })

  test('each client routes requests through its own token and org', async () => {
    const client1 = CommerceLayer(config1)
    const client2 = CommerceLayer(config2)

    client1.addRequestInterceptor((request) => {
      const headers = request.options.headers as Record<string, string>
      expect(headers.Authorization).toBe('Bearer token-one')
      expect(request.url.hostname).toContain('org-one')
      return interceptRequest()
    })
    client2.addRequestInterceptor((request) => {
      const headers = request.options.headers as Record<string, string>
      expect(headers.Authorization).toBe('Bearer token-two')
      expect(request.url.hostname).toContain('org-two')
      return interceptRequest()
    })

    await client1.organization
      .retrieve()
      .catch(handleError)
      .finally(() => client1.removeInterceptor('request'))
    await client2.organization
      .retrieve()
      .catch(handleError)
      .finally(() => client2.removeInterceptor('request'))
  })

  test('interceptor on one client does not leak into the other', async () => {
    const client1 = CommerceLayer(config1)
    const client2 = CommerceLayer(config2)

    let client1InterceptorCalls = 0
    let client2InterceptorCalls = 0
    client1.addRequestInterceptor((_request) => {
      client1InterceptorCalls += 1
      return interceptRequest()
    })
    // client2 cancels via its own interceptor (avoids a real network call).
    client2.addRequestInterceptor((_request) => {
      client2InterceptorCalls += 1
      return interceptRequest()
    })

    // A request from client2 must only trigger client2's interceptor.
    await client2.organization
      .retrieve()
      .catch(handleError)
      .finally(() => {
        client1.removeInterceptor('request')
        client2.removeInterceptor('request')
      })

    expect(client1InterceptorCalls).toBe(0)
    expect(client2InterceptorCalls).toBe(1)
  })
})
