
import { CommerceLayerClient } from '../src'
import { getClient, CommonData, handleError, interceptRequest } from '../test/common'



let cl: CommerceLayerClient


beforeAll(async () => { cl = await getClient({ timeout: 15000 }) })


describe('Test headers', () => {

	it('Request headers', async () => {

		const testHeaderValue = 'test-value'
		const params = { fields: { addresses: CommonData.paramsFields } }
		const options = {
			...CommonData.options,
			headers: {
				'test-header': testHeaderValue,
				'Content-Type': 'application/json'
			}
		}

		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.headers).toBeDefined()
			if (request.options.headers) {
				expect(request.options.headers['test-header']).toBe(testHeaderValue)
				expect(request.options.headers['Content-Type']).toBe('application/vnd.api+json')
			}
			return interceptRequest()
		})

		await cl.application.retrieve(params, options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))

	})


	it('Response headers', async () => {

		const params = { fields: { addresses: CommonData.paramsFields } }

		const reader = cl.addRawResponseReader({ headers: true })

		await cl.application.retrieve(params, CommonData.options)

		expect(reader.headers).not.toBeUndefined()
		expect(reader.headers?.['x-ratelimit-limit']).not.toBeUndefined()

		cl.removeRawResponseReader()

	})

})
