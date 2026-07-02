import { beforeAll, describe, expect, test } from 'vitest'
import { application, type CommerceLayerClient } from '../src/single-client'
import { CommonData, getClient, handleError, IS_UNIFIED_BUILD, interceptRequest } from '../test/common'

let cl: CommerceLayerClient

beforeAll(async () => {
  cl = await getClient({ timeout: 15000 })
})

describe('Test headers', () => {
  test('Request headers', async () => {
    const testHeaderValue = 'test-value'
    const params = { fields: { addresses: CommonData.paramsFields } }
    const options = {
      ...CommonData.options,
      headers: {
        'test-header': testHeaderValue,
        'Content-Type': 'application/json',
      },
    }

    const _intId = cl.addRequestInterceptor((request) => {
      const requestOptionsHeaders = request.options.headers as Record<string, string>
      expect(requestOptionsHeaders).toBeDefined()
      if (requestOptionsHeaders) {
        expect(requestOptionsHeaders['test-header']).toBe(testHeaderValue)
        expect(requestOptionsHeaders['Content-Type']).toBe('application/vnd.api+json')
      }
      return interceptRequest()
    })

    await application
      .retrieve(params, options)
      .catch(handleError)
      .finally(() => cl.removeInterceptor('request'))
  })

  test.skipIf(IS_UNIFIED_BUILD)('Response headers', async () => {
    const params = { fields: { addresses: CommonData.paramsFields } }

    const reader = cl.addRawResponseReader({ headers: true })

    await application.retrieve(params, CommonData.options)

    expect(reader.headers).not.toBeUndefined()
    expect(reader.headers?.['x-ratelimit-limit']).not.toBeUndefined()

    cl.removeRawResponseReader()
  })
})
