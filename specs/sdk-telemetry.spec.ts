import { describe, expect, test } from 'vitest'
import { application, CommerceLayer, SDK_VERSION } from '../src'
import { handleError, interceptRequest } from '../test/common'

const CLIENT_HEADER = 'X-CL-SDK'
const baseConfig = { organization: 'test-org', accessToken: 'fake-token' } as const

describe('SDK client identification header', () => {
  test('sends `js/<version>` by default', async () => {
    const client = CommerceLayer(baseConfig)
    client.addRequestInterceptor((request) => {
      const headers = request.options.headers as Record<string, string>
      expect(headers[CLIENT_HEADER]).toBe(`js/${SDK_VERSION}`)
      return interceptRequest()
    })
    await application
      .retrieve({})
      .catch(handleError)
      .finally(() => client.removeInterceptor('request'))
  })

  test('omits the header when `telemetry: false`', async () => {
    const client = CommerceLayer({ ...baseConfig, telemetry: false })
    client.addRequestInterceptor((request) => {
      const headers = request.options.headers as Record<string, string>
      expect(headers[CLIENT_HEADER]).toBeUndefined()
      return interceptRequest()
    })
    await application
      .retrieve({})
      .catch(handleError)
      .finally(() => client.removeInterceptor('request'))
  })

  test('ignores customer overrides (SDK value wins)', async () => {
    const client = CommerceLayer(baseConfig)
    client.addRequestInterceptor((request) => {
      const headers = request.options.headers as Record<string, string>
      expect(headers[CLIENT_HEADER]).toBe(`js/${SDK_VERSION}`)
      return interceptRequest()
    })
    await application
      .retrieve({}, { headers: { [CLIENT_HEADER]: 'spoofed/9.9.9' } })
      .catch(handleError)
      .finally(() => client.removeInterceptor('request'))
  })
})
