import { describe, expect, test } from 'vitest'
import type { CommerceLayerInitConfig } from '../src/commercelayer'
import { application, CommerceLayer } from '../src/single-client'
import { handleError, interceptRequest } from '../test/common'

const baseConfig = { organization: 'test-org', accessToken: 'fake-token' } as const

describe('apiVersion in request URL', () => {
  test('omitting apiVersion keeps requests unversioned', async () => {
    const client = CommerceLayer(baseConfig)
    client.addRequestInterceptor((request) => {
      expect(request.url.pathname).toBe('/api/application')
      return interceptRequest()
    })
    await application
      .retrieve({})
      .catch(handleError)
      .finally(() => client.removeInterceptor('request'))
  })

  test('setting apiVersion adds it as a path segment', async () => {
    // On a legacy build `ApiVersion` is `never`, so cast past the public type
    // constraint to exercise the runtime URL logic build-agnostically.
    const client = CommerceLayer({ ...baseConfig, apiVersion: '2099-01' } as CommerceLayerInitConfig)
    client.addRequestInterceptor((request) => {
      expect(request.url.pathname).toBe('/api/2099-01/application')
      return interceptRequest()
    })
    await application
      .retrieve({})
      .catch(handleError)
      .finally(() => client.removeInterceptor('request'))
  })

  test('apiVersion can be changed via config()', async () => {
    const client = CommerceLayer(baseConfig)
    client.config({ apiVersion: '2099-02' } as Partial<CommerceLayerInitConfig>)
    client.addRequestInterceptor((request) => {
      expect(request.url.pathname).toBe('/api/2099-02/application')
      return interceptRequest()
    })
    await application
      .retrieve({})
      .catch(handleError)
      .finally(() => client.removeInterceptor('request'))
  })
})
