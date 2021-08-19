/* eslint-disable no-console */
import CommerceLayer from './src/commercelayer'
import { sleep } from './src/util'



async function test() {

	const cl = CommerceLayer({
		organization: 'sdk-test-org',
		accessToken: 'eyJhbGciOiJIUzUxMiJ9.eyJvcmdhbml6YXRpb24iOnsiaWQiOiJ3UlBwRUZPRWxSIiwic2x1ZyI6InNkay10ZXN0LW9yZyJ9LCJhcHBsaWNhdGlvbiI6eyJpZCI6InpNbERtaUJheE0iLCJraW5kIjoiY2xpIiwicHVibGljIjpmYWxzZX0sInRlc3QiOnRydWUsImV4cCI6MTYyOTM3MDQ4OCwicmFuZCI6MC4yODk2OTM5ODEzMDA1Nn0.F_VMbdxnMcTmwm91YylY8DTPomtPVYjTjMCbTgvAWfRF_a0_eXmH8AE0MI7r_ailLC7hptVn_ehkoqBg8LNrHA'
	})


	const customers = await cl.customers.list({
		pageSize: 2,
		pageNumber: 3,
	})
	if (customers) {
		console.log(customers[0])
		console.log('pageCount: ' + customers.meta.pageCount)
		console.log('recordCount: ' + customers.meta.recordCount)
		console.log('currentPage: ' + customers.meta.currentPage)
		console.log('recordsPerPage: ' + customers.meta.recordsPerPage)
	}

	if (customers) process.exit()


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

	/*
	cl.customers.create({
		email: 'user@server.com',
		customer_group: cl.customer_groups.relationship('id')
	})
	*/


}


test()
