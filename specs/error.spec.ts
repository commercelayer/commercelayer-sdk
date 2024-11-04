
import { CommerceLayerClient, ErrorObj } from '../src'
import { ErrorType } from '../src/error'
import { getClient } from '../test/common'


let cl: CommerceLayerClient


beforeAll(async () => { cl = await getClient({}) })


describe('SDK:error suite', () => {

	it('ApiError', async () => {
		try {
			await cl.customers.retrieve('fake-id')
		} catch (error) {
			expect(cl.isApiError(error)).toBeTruthy()
			expect(error.status).toBe(404)
		}
	})


	it('ApiError.first', async () => {
		try {
			await cl.customers.create({ email: '' })
		} catch (error) {
			expect(error.first()).not.toBeUndefined()
		}
	})


	it('ApiError.type', async () => {
		try {
			cl.config({ domain: 'fake.domain.xx', accessToken: 'fake-access-token' })
			await cl.customers.list({ pageSize: 1})
		} catch (error) {
			expect(error.type).toEqual(ErrorType.CLIENT)
		}
	})


	it('ErrorInterceptor.error', async () => {

		cl = await getClient({})

		cl.addResponseInterceptor(undefined, (error: ErrorObj): ErrorObj => {
			expect(error).toBeDefined()
			expect(error.request).toBeDefined()
			return error
		})

		try {
			await cl.customers.create({ email: '' })
		} catch (error) {
			expect(error.type).toBe(ErrorType.RESPONSE)
		}

	})

})
