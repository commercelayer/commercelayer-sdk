
import { expect, test, beforeAll, afterAll, describe } from 'vitest'
import { CommerceLayerClient, customers, ErrorObj } from '../lib'
import { ErrorType } from '../lib/error'
import { getClient } from '../test/common'
import { DBG } from '../lib/common'


let cl: CommerceLayerClient


beforeAll(async () => { cl = await getClient({}) })

afterAll(() => { cl.removeInterceptors() })


describe('SDK:error suite', () => {

	test('ApiError', async () => {
		try {
			await customers.retrieve('fake-id')
		} catch (error) {
			expect(cl.isApiError(error)).toBeTruthy()
			expect(error.status).toBe(404)
		}
	})


	test('ApiError.first', async () => {
		try {
			await customers.create({ email: '' })
		} catch (error) {
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
		} catch (error) {
			expect(error.type).toBe(ErrorType.RESPONSE)
			expect(interceptor).toBeTruthy()
		}

	})


	test('ApiError.type', async () => {
		try {
			cl.config({ domain: 'fake.domain.xx', accessToken: 'fake-access-token' })
			DBG.verbose = true
			await customers.list({ pageSize: 1})
		} catch (error) {
			expect(error.type).toEqual(ErrorType.CLIENT)
		} finally {
			DBG.verbose = false
		}
	})

})
