import { ErrorType } from '@runtime/error'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { type CommerceLayerSingleClient, customers, type ErrorObj } from '../src/single-client'
import { getClient, IS_UNIFIED_BUILD } from '../test/common'

// import { DBG } from '../src/common'

let cl: CommerceLayerSingleClient

beforeAll(async () => {
  cl = await getClient({})
})

afterAll(() => {
  cl.removeInterceptors()
})

describe('SDK:error suite', () => {
  test('ApiError', async () => {
    try {
      await customers.retrieve('fake-id')
    } catch (error: any) {
      expect(cl.isApiError(error)).toBeTruthy()
      expect(error.status).toBe(404)
    }
  })

  test.skipIf(IS_UNIFIED_BUILD)('ApiError.first', async () => {
    try {
      await customers.create({ email: '' })
    } catch (error: any) {
      expect(error.first()).not.toBeUndefined()
    }
  })

  test('ErrorInterceptor.response', async () => {
    let interceptor = false

    cl.addResponseInterceptor(undefined, (error: ErrorObj): ErrorObj => {
      expect(error).toBeDefined()
      expect(error.request).toBeDefined()
      expect(error.request?.method).toBe('POST')
      interceptor = true
      return error
    })

    try {
      await customers.create({ email: '' })
    } catch (error: any) {
      expect(error.type).toBe(ErrorType.RESPONSE)
      expect(interceptor).toBeTruthy()
    }
  })

  test('ApiError.type', async () => {
    try {
      cl.config({ domain: 'fake.domain.xx', accessToken: 'fake-access-token' })
      // DBG.verbose = true
      await customers.list({ pageSize: 1 })
    } catch (error: any) {
      expect(error.type).toEqual(ErrorType.CLIENT)
    } finally {
      // DBG.verbose = false
    }
  })
})
