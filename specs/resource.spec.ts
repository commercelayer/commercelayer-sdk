
import { CommerceLayerClient, Customer } from '../src'
import { ListResponse } from '../src/resource'
import { getClient } from '../test/common'


let cl: CommerceLayerClient
let customers: ListResponse<Customer>
let tempId: string


beforeAll(async () => {
	cl = await getClient(true)
	customers = await cl.customers.list({ pageSize: 1})
})


describe('SDK:resource suite', () => {

	it('resource.first', async () => {
		const first = customers.first()
		expect(first.id).not.toBeUndefined()
	})


	it('resource.last', async () => {
		const first = customers.first()
		const last = customers.last()
		expect(last.id).not.toBeUndefined()
		expect(first).toEqual(last)
	})


	it('resource.get', async () => {
		const customer = customers.get(0)
		expect(customer.id).not.toBeUndefined()
	})


	it('resource.retrieve', async () => {
		const id = customers.first().id
		const customer = await cl.customers.retrieve(id)
		expect(customer.id).toEqual(id)
	})


	it('resource.update', async () => {
		const id = customers.first().id
		const reference = String(Date.now())
		const customer = await cl.customers.update({ id, reference })
		expect(customer.reference).toEqual(reference)
	})


	it('resource.singleton', async () => {
		const application = await cl.application.retrieve()
		expect(application.id).not.toBeNull()
		expect(application.id).not.toBeUndefined()
	})


	it('resource.create', async () => {
		const email = 'spec@sdk-test.org'
		const customer = await cl.customers.create({ email })
		expect(customer.id).not.toBeUndefined()
		expect(customer.email).toEqual(email)
		tempId = customer.id
	})


	it('resource.delete', async () => {
		await cl.customers.delete(tempId)
		try {
			await cl.customers.retrieve(tempId)
		} catch (error) {
			expect(error.code).toEqual("404")
			expect(error.status).toEqual(404)
		}
	})


	it('resource.fetch', async () => {
		const id = customers.first().id
		const orders = await cl.customers.orders(id)
		expect(orders.length).toBeGreaterThan(0)
		const customer = await cl.orders.customer(orders.first().id)
		expect(customer.id).toEqual(id)
	})

})
