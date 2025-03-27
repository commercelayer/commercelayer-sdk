
import { expect, test, beforeAll, describe } from 'vitest'
import { CommerceLayerClient, Customer, customers } from '../src'
import { sleep, sortObjectFields } from '../src/util'
import { checkParam, getClient, handleError, interceptRequest, TestData } from '../test/common'
import { isResourceType } from '../src/common'
import { ObjectType } from '../src/types'


let cl: CommerceLayerClient


beforeAll(async () => { cl = await getClient() })


describe('SDK suite', () => {

	test('util.sleep', async () => {

		const ms = 2000

		const start = Date.now()
		await sleep(ms)
		const stop = Date.now()

		const delay = stop - start

		expect(delay).toBeGreaterThanOrEqual(ms - 10)
		expect(delay).toBeLessThan(ms + 50)

	})


	test('util.sortObjectFields', async () => {

		const obj: ObjectType = {
			beta: 'beta',
			delta: 'delta',
			alfa: 'alfa',
			gamma: 'gamma'			
		}

		const exp: ObjectType = {
			alfa: 'alfa',
			beta: 'beta',
			gamma: 'gamma',
			delta: 'delta'
		}

		const sorted = sortObjectFields(obj)

		expect(sorted).toEqual(exp)

	})


	test('common.type', async () => {

		const customer: Customer = {
			id: TestData.id,
			type: 'customers',
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
			email: 'user@test.org',
			status: 'prospect'
		}

		expect(isResourceType(customer)).toBeTruthy()

	})


	test('loadBalancer.optimization', async () => {

		const cl = await getClient()

    cl.addRequestInterceptor((request) => {
			const url = new URL(request.url)
			checkParam(url, 'page[number]', 1)
      return interceptRequest()
    })

    await customers.list({})
      .catch(handleError)
      .finally(() => cl.removeInterceptor('request'))
    
  })

})
