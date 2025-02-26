
import { expect, test, beforeAll, describe } from 'vitest'
import { CommerceLayerClient, Customer } from '../src'
import { ListResponse } from '../src/resource'
import { getClient } from '../test/common'


let cl: CommerceLayerClient
let customers: ListResponse<Customer>
let tempId: string


beforeAll(async () => {
	cl = await getClient({})
	customers = await cl.customers.list({ pageSize: 1})
})


describe('SDK:resource suite', () => {

	test('resource.first', async () => {
		const first = customers.first()
		expect(first?.id).not.toBeUndefined()
	})


	test('resource.last', async () => {
		const first = customers.first()
		const last = customers.last()
		expect(last?.id).not.toBeUndefined()
		expect(first).toEqual(last)
	})


	test('resource.get', async () => {
		const customer = customers.get(0)
		expect(customer?.id).not.toBeUndefined()
	})


	test('resource.retrieve', async () => {
		const id = customers.first()?.id as string
		const customer = await cl.customers.retrieve(id)
		expect(customer.id).toEqual(id)
	})


	test('resource.update', async () => {
		const id = customers.first()?.id as string
		const reference = String(Date.now())
		const customer = await cl.customers.update({ id, reference })
		expect(customer.reference).toEqual(reference)
	})


	test('resource.singleton', async () => {
		const application = await cl.application.retrieve()
		expect(application.id).not.toBeNull()
		expect(application.id).not.toBeUndefined()
	})


	test('resource.create', async () => {
		const email = 'spec@sdk-test.org'
		const customer = await cl.customers.create({ email })
		expect(customer.id).not.toBeUndefined()
		expect(customer.email).toEqual(email)
		tempId = customer.id
	})


	test('resource.delete', async () => {
		await cl.customers.delete(tempId)
		try {
			await cl.customers.retrieve(tempId)
		} catch (error) {
			expect(error.code).toEqual("404")
			expect(error.status).toEqual(404)
		}
	})


	test('resource.fetch', async () => {
		const id = customers.first()?.id as string
		const orders = await cl.customers.orders(id)
		expect(orders.length).toBeGreaterThan(0)
		const customer = await cl.orders.customer(orders.first()?.id as string)
		expect(customer.id).toEqual(id)
	})


	/*
	test('resource.relationship.delete', async () => {

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
	*/

})
