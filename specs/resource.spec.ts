
import { CommerceLayerClient } from '../src'
import { getClient } from '../test/common'



let cl: CommerceLayerClient


beforeAll(async () => {
	cl = await getClient()
	cl.config({
		organization: process.env.CL_SDK_ORGANIZATION || 'sdk-test-org',
		accessToken: process.env.CL_SDK_ACCESS_TOKEN
	})
})


describe('Resource suite', () => {

	it('resource.relationship.delete', async () => {

		const customerOptions = { fields: ['email', 'customer_group'], include: ['customer_group'] }

		const customers = await cl.customers.list({ pageSize: 1, ...customerOptions })
		const customer = customers[0]
		expect(customer.id).not.toBeNull()

		const customerGroups = await cl.customer_groups.list({ pageSize: 1, fields: ['name'] })
		const customerGroup = customerGroups[0]
		expect(customerGroup.id).not.toBeNull()

		let c = await cl.customers.update({
			id: customer.id,
			customer_group: cl.customer_groups.relationship(customerGroup)
		}, customerOptions)
		expect(c.customer_group.id).toEqual(customerGroup.id)

		c = await cl.customers.update({
			id: customer.id,
			customer_group: cl.customer_groups.relationship(null)
		}, customerOptions)
		expect(c.customer_group).toBeNull()

	})

})
