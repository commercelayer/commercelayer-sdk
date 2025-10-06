
import { expect, test, beforeAll, describe } from 'vitest'
import { application, CommerceLayerClient } from '../src'
import { getClient, CommonData, handleError, interceptRequest } from '../test/common'



let cl: CommerceLayerClient


beforeAll(async () => { cl = await getClient({ timeout: 15000 }) })


describe('Test headers', () => {

	test('Request headers', async () => {

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
			const requestOptionsHeaders = request.options.headers as Record<string, string>
			expect(requestOptionsHeaders).toBeDefined()
			if (requestOptionsHeaders) {
				expect(requestOptionsHeaders['test-header']).toBe(testHeaderValue)
				expect(requestOptionsHeaders['Content-Type']).toBe('application/vnd.api+json')
			}
			return interceptRequest()
		})

		await application.retrieve(params, options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))

	})


	test('Response headers', async () => {

		const params = { fields: { addresses: CommonData.paramsFields } }

		const reader = cl.addRawResponseReader({ headers: true })

		await application.retrieve(params, CommonData.options)

		expect(reader.headers).not.toBeUndefined()
		expect(reader.headers?.['x-ratelimit-limit']).not.toBeUndefined()

		cl.removeRawResponseReader()

	})

})
