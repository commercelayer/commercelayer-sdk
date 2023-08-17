
import { CommerceLayerClient, Customer } from '../src'
import { sleep, sortObjectFields } from '../src/util'
import { getClient, TestData } from '../test/common'
import { ObjectType, isResourceType } from '../src/common'


let cl: CommerceLayerClient


// eslint-disable-next-line @typescript-eslint/no-unused-vars
beforeAll(async () => { cl = await getClient() })


describe('SDK suite', () => {

	it('util.sleep', async () => {

		const ms = 2000

		const start = Date.now()
		await sleep(ms)
		const stop = Date.now()

		const delay = stop - start

		expect(delay).toBeGreaterThanOrEqual(ms - 10)
		expect(delay).toBeLessThan(ms + 50)

	})


	it('util.sortObjectFields', async () => {

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


	it('common.type', async () => {

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

})
