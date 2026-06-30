import { describe, expect, test } from 'vitest'
import { application, CommerceLayer } from '../src'
import { API_SCHEMA_VERSION } from '../src/commercelayer'
import { handleError, interceptRequest } from '../test/common'

const baseConfig = { organization: 'test-org', accessToken: 'fake-token' } as const

const isUnifiedBuild = API_SCHEMA_VERSION !== 'latest'

describe('API schema version in request URL', () => {
  test('unified builds embed the build target as a path segment; legacy stays unversioned', async () => {
    const client = CommerceLayer(baseConfig)
    const expected = isUnifiedBuild ? `/api/${API_SCHEMA_VERSION}/application` : '/api/application'
    client.addRequestInterceptor((request) => {
      expect(request.url.pathname).toBe(expected)
      return interceptRequest()
    })
    await application
      .retrieve({})
      .catch(handleError)
      .finally(() => client.removeInterceptor('request'))
  })
})
