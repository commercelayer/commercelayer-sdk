/* eslint-disable no-console */
import CommerceLayer from './src/commercelayer'
import { sleep } from './src/util'



async function test() {

	const cl = CommerceLayer({
		organization: 'sdk-test-org',
		accessToken: 'eyJhbGciOiJIUzUxMiJ9.eyJvcmdhbml6YXRpb24iOnsiaWQiOiJ3UlBwRUZPRWxSIiwic2x1ZyI6InNkay10ZXN0LW9yZyJ9LCJhcHBsaWNhdGlvbiI6eyJpZCI6InpNbERtaUJheE0iLCJraW5kIjoiY2xpIiwicHVibGljIjpmYWxzZX0sInRlc3QiOnRydWUsImV4cCI6MTYyNzA0MTg1MiwicmFuZCI6MC45MzQ5NzE4NzU3NDIxODIyfQ.U2aVHg37FKMiaeWXIEmYxZBcZMXxMfmrwzO6I1obsfhsCBRvKLrgBgUWoWZm3GIh7l3EfIjQKhnthhl28DlfLg'
	})


	// LIST
	console.log('>>>> Operation: orders.list')
	const orders = await cl.orders.list({
		fields: {
			orders: ['id', 'number', 'status', 'market'],
			markets: ['number', 'name']
		},
		include: ['market'],
		pageSize: 2,
		pageNumber: 3,
		sort: {number: 'asc'},
		filters: {
			number_gt: '11660772'
		}
	}).catch(err => {
		if (cl.isApiError(err)) console.log(err.errors)
	})

	if (!orders) process.exit()

	if (orders) { console.log(orders); console.log('----------------------------------------') }
	

	// RETRIEVE
	console.log('>>>> Operation: orders.retrieve')
	const o = await cl.orders.retrieve(orders[0].id, { fields: { orders: ['reference', 'updated_at'] }})

	if (o) { console.log(o); console.log('----------------------------------------') }


	// UPDATE
	console.log('>>>> Operation: orders.update')
	const o2 = await cl.orders.update({
		id: o.id,
		reference: 'UPDATED_' + Date.now()
	})
	console.log('Order updated')

	const o3 = await cl.orders.retrieve(o2.id, { fields: { orders: ['reference', 'updated_at'] }})

	if (o3) { console.log(o3); console.log('----------------------------------------') }


	// CUSTOMER
	console.log('>>>> Operation: customer.create')
	const c = await cl.customers.create({ email: 'user1@test-sdk.com' })
	console.log(c)
	console.log('customer created: ' + c.id)
	console.log('>>>> Operation: customer.delete')
	await cl.customers.delete(c.id)
	console.log('customer deleted: ' + c.id)
	await sleep(3000)
	const c1 = await cl.customers.retrieve(c.id).catch(err => { if (cl.isApiError(err)) console.log(err.errors) } )
	if (c1) console.log(c1)
	console.log('----------------------------------------')


}


test()
