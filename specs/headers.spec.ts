
import { CommerceLayerClient } from '../src'
import { getClient, TestData, CommonData, handleError, interceptRequest, checkCommon, checkCommonData, checkCommonParamsList, checkCommonParams, currentAccessToken, randomValue } from '../test/common'



let cl: CommerceLayerClient


beforeAll(async () => { cl = await getClient(true) })


describe('Test headers', () => {

	it('Request headers', async () => {

		const testHeaderValue = 'test-value'
		const params = { fields: { addresses: CommonData.paramsFields } }

		const intId = cl.addRequestInterceptor((config) => {
			expect(config.headers).toBeDefined()
			if (config.headers) expect(config.headers['test-header']).toBe(testHeaderValue)
			return interceptRequest()
		})

		await cl.application.retrieve(params, { ...CommonData.options, headers: { 'test-header': testHeaderValue } } )
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))

	})


	it('Response headers', async () => {

		const params = { fields: { addresses: CommonData.paramsFields } }

		const reader = cl.addRawResponseReader({ headers: true })

		await cl.application.retrieve(params, CommonData.options)
		
		expect(reader.headers).not.toBeUndefined()
		expect(reader.headers?.['x-ratelimit-limit']).not.toBeUndefined()
		
		cl.removeRawResponseReader(reader)

	})


})
