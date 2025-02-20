
import { expect, test, beforeAll } from 'vitest'
import { CommerceLayerClient, CommerceLayerStatic } from '../src'
import { OPEN_API_SCHEMA_VERSION } from '../src/commercelayer'
import { getClient, organization } from '../test/common'


let cl: CommerceLayerClient


beforeAll(async () => { cl = await getClient() })


describe('SDK:static suite', () => {

	test('static.SdkError', async () => {
		const sdkError = CommerceLayerStatic.isSdkError({ message: 'SdkError', name: 'SdkError', type: 'request' })
		expect(sdkError).toBeTruthy()
	})


	test('static.ApiError', async () => {
		const apiError = CommerceLayerStatic.isApiError({ message: 'ApiError', name: 'ApiError', type: 'response' })
		expect(apiError).toBeTruthy()
	})


	test('static.resources', async () => {
		const resources = CommerceLayerStatic.resources()
		expect(Array.isArray(resources)).toBeTruthy()
	})


	test('static.init', async () => {
		const client = CommerceLayerStatic.init({ organization: organization, accessToken: 'fake-access-token' })
		expect(client).not.toBeNull()
	})

	test('static.schema', async () => {
		const sver = CommerceLayerStatic.schemaVersion
		expect(sver).toBe(OPEN_API_SCHEMA_VERSION)
	})

})
