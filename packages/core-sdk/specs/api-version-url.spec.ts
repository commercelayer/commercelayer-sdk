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

  describe('per-request overrides keep the client’s domain', () => {
    // A non-default domain is what exposes the bug: with the default one, a
    // lost domain falls back to the same host and every assertion passes.
    const stagingConfig = { ...baseConfig, domain: 'commercelayer.co' } as const
    type RequestOptions = Parameters<typeof application.retrieve>[1]

    // Captured, then asserted after the call: an expectation inside the
    // interceptor would pass vacuously if the interceptor never fired.
    const requestedUrl = async (client: ReturnType<typeof CommerceLayer>, options?: RequestOptions) => {
      let url: URL | undefined
      client.addRequestInterceptor((request) => {
        url = request.url
        return interceptRequest()
      })
      await application
        .retrieve({}, options)
        .catch(handleError)
        .finally(() => client.removeInterceptor('request'))
      expect(url, 'request interceptor did not run').toBeDefined()
      return url as URL
    }

    test('client domain is used for a plain request', async () => {
      const url = await requestedUrl(CommerceLayer(stagingConfig))
      expect(url.host).toBe('test-org.commercelayer.co')
    })

    test('per-request apiVersion keeps the client domain', async () => {
      const url = await requestedUrl(CommerceLayer(stagingConfig), { apiVersion: '2099-03' } as RequestOptions)
      expect(url.host).toBe('test-org.commercelayer.co')
      expect(url.pathname).toBe('/api/2099-03/application')
    })

    test('per-request organization keeps the client domain', async () => {
      const url = await requestedUrl(CommerceLayer(stagingConfig), { organization: 'other-org' } as RequestOptions)
      expect(url.host).toBe('other-org.commercelayer.co')
    })

    test('an explicit per-request domain still wins', async () => {
      const url = await requestedUrl(CommerceLayer(stagingConfig), {
        apiVersion: '2099-03',
        domain: 'commercelayer.io',
      } as RequestOptions)
      expect(url.host).toBe('test-org.commercelayer.io')
    })
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
