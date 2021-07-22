import CommerceLayer from './src/commercelayer'
import { inspect } from 'util'
import { update } from 'lodash'



async function test() {

	const cl = CommerceLayer({
		organization: 'sdk-test-org',
		accessToken: 'eyJhbGciOiJIUzUxMiJ9.eyJvcmdhbml6YXRpb24iOnsiaWQiOiJ3UlBwRUZPRWxSIiwic2x1ZyI6InNkay10ZXN0LW9yZyJ9LCJhcHBsaWNhdGlvbiI6eyJpZCI6InpNbERtaUJheE0iLCJraW5kIjoiY2xpIiwicHVibGljIjpmYWxzZX0sInRlc3QiOnRydWUsImV4cCI6MTYyNjg5Mzk1MCwicmFuZCI6MC4yMTg1OTk5MjI0MzQyNzM2fQ.7FNRwsbHNoDhTRvoD3TIt1ZpylxtUj9jgc1y5jG2T57r8d0Av1BIKPuPMECTumStyoxf2TKnDQJQn1NEuSYdDQ'
	})

/*	
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
	}).catch(error => console.log(error.errors))
*/
	//console.log(orders)
	//console.log('----------------------------------------')
	
//	const o = await cl.orders.retrieve(orders[0].id)

	//console.log(o)
	//console.log('----------------------------------------')
/*
	const o2 = await cl.orders.update({
		id: o.id,
		reference: 'UPDATED_' + Date.now()
	})

	const o3 = await cl.orders.retrieve(o2.id)
*/
	//console.log(o3)
	//console.log('----------------------------------------')

	const out = await cl.orders.rawList({type:'orders'}).catch(console.log)

	if (out) console.log(out)

}


test()
