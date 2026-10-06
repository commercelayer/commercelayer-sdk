import { describe, expect, test } from 'vitest'
import { application, CommerceLayer } from '../src/single-client'
import { API_VERSION, handleError, interceptRequest } from '../test/common'

// `apiVersion` is required, so every client here passes one. Where a test needs
// a version other than the one the SDK was generated for — to prove the
// configured value is used rather than a default — it uses OTHER_VERSION.
const OTHER_VERSION = '2017-08'
const baseConfig = { organization: 'test-org', accessToken: 'fake-token', apiVersion: API_VERSION } as const

describe('apiVersion in request URL', () => {
  test('the client apiVersion becomes a path segment', async () => {
    const client = CommerceLayer({ ...baseConfig, apiVersion: OTHER_VERSION })
    client.addRequestInterceptor((request) => {
      expect(request.url.pathname).toBe(`/api/${OTHER_VERSION}/application`)
      return interceptRequest()
    })
    await application
      .retrieve({})
      .catch(handleError)
      .finally(() => client.removeInterceptor('request'))
  })

  test('apiVersion can be changed via config()', async () => {
    const client = CommerceLayer(baseConfig)
    client.config({ apiVersion: OTHER_VERSION })
    client.addRequestInterceptor((request) => {
      expect(request.url.pathname).toBe(`/api/${OTHER_VERSION}/application`)
      return interceptRequest()
    })
    await application
      .retrieve({})
      .catch(handleError)
      .finally(() => client.removeInterceptor('request'))
  })

  test('a JavaScript caller that omits apiVersion gets unversioned requests', async () => {
    // The types require apiVersion; untyped callers can still leave it out,
    // and the API then resolves the organization's default version.
    // @ts-expect-error — apiVersion is required
    const client = CommerceLayer({ organization: 'test-org', accessToken: 'fake-token' })
    client.addRequestInterceptor((request) => {
      expect(request.url.pathname).toBe('/api/application')
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
      const url = await requestedUrl(CommerceLayer(stagingConfig), { apiVersion: OTHER_VERSION })
      expect(url.host).toBe('test-org.commercelayer.co')
      expect(url.pathname).toBe(`/api/${OTHER_VERSION}/application`)
    })

    test('per-request organization keeps the client domain', async () => {
      const url = await requestedUrl(CommerceLayer(stagingConfig), { organization: 'other-org' })
      expect(url.host).toBe('other-org.commercelayer.co')
    })

    test('an explicit per-request domain still wins', async () => {
      const url = await requestedUrl(CommerceLayer(stagingConfig), {
        apiVersion: OTHER_VERSION,
        domain: 'commercelayer.io',
      })
      expect(url.host).toBe('test-org.commercelayer.io')
    })
  })
})
