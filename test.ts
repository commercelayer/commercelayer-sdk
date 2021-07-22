/* eslint-disable no-console */
import CommerceLayer from './src/commercelayer'



async function test() {

	const cl = CommerceLayer({
		organization: 'sdk-test-org',
		accessToken: 'eyJhbGciOiJIUzUxMiJ9.eyJvcmdhbml6YXRpb24iOnsiaWQiOiJ3UlBwRUZPRWxSIiwic2x1ZyI6InNkay10ZXN0LW9yZyJ9LCJhcHBsaWNhdGlvbiI6eyJpZCI6InpNbERtaUJheE0iLCJraW5kIjoiY2xpIiwicHVibGljIjpmYWxzZX0sInRlc3QiOnRydWUsImV4cCI6MTYyNjk1NTYyMywicmFuZCI6MC40NzY4MDcxMjc2MTMyMzA2fQ.uf6YbXsoYLCJAfzJzIeCdjhaq4fkwHUFng-Wop1TPtRZAxJoQFEEaQGMyfZAhH6teNd0jdOs0pE2dtUkgMzDEQ'
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

}


test()
