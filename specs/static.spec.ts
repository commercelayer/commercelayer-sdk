
import { expect, test, beforeAll, describe } from 'vitest'
import { CommerceLayerClient, CommerceLayerStatic, OPEN_API_SCHEMA_VERSION } from '../src'
import { getClient } from '../test/common'


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
		expect(resources.length).toBeGreaterThan(0)
	})


	test('static.singletons', async () => {
		const singletons = CommerceLayerStatic.singletons()
		expect(Array.isArray(singletons)).toBeTruthy()
		expect(singletons.length).toBeGreaterThan(0)
	})


	/*
	test('static.init', async () => {
		const client = CommerceLayerStatic.init({ organization: organization, accessToken: 'fake-access-token' })
		expect(client).not.toBeNull()
	})
		*/

	test('static.schema', async () => {
		const sver = CommerceLayerStatic.schemaVersion
		expect(sver).toBe(OPEN_API_SCHEMA_VERSION)
	})

})
