
import { CommerceLayerClient, Customer } from '../src'
import { sleep } from '../src/util'
import { getClient, TestData } from '../test/common'
import { isResourceType } from '../src/common'


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

		expect(delay).toBeGreaterThanOrEqual(ms)
		expect(delay).toBeLessThan(ms + 50)

	})


	it('common.type', async () => {

		const customer: Customer = {
			id: TestData.id,
			type: 'customers',
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString()
		}

		expect(isResourceType(customer)).toBeTruthy()

	})

})
