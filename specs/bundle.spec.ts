
import { expect, test, beforeAll, describe } from 'vitest'
import CommerceLayerClient from '../lib/bundle'
import { getClient } from '../test/common'


let cl: CommerceLayerClient


beforeAll(async () => { cl = await getClient() })


describe('SDK:bundle suite', () => {

	test('bundle.???', async () => {
		
		// expect(sdkError).toBeTruthy()
	})

})
