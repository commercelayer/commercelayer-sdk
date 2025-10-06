
import { expect, test, beforeAll, describe } from 'vitest'
import { organization, domain } from '../test/common'
import { CommerceLayer, type CommerceLayerBundle } from '../src/bundle'
import getToken from '../test/token'


let cl: CommerceLayerBundle


beforeAll(async () => {
	const token = await getToken('integration')
	if (token === null) throw new Error('Unable to get access token')
	const accessToken = token.accessToken
	cl = CommerceLayer({ organization, accessToken, domain })
})


describe('SDK:bundle suite', () => {

	test('bundle.client', async () => {
		
		const customers = await cl.customers.list()
		expect(customers).toBeDefined()
		expect(customers.length).toBeGreaterThan(0)

		const first = customers.first()
		expect(first).toBeDefined()
		expect(first?.id).toBeDefined()
		expect(first?.type).toBe('customers')

		const customer = await cl.customers.retrieve(first?.id || '')
		expect(customer).toBeDefined()
		expect(customer.id).toBe(first?.id)
		
	})

})
