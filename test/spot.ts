/* eslint-disable no-console */
// import commercelayer from '../lib/cjs'
import { inspect } from 'util'
import commercelayer from '../src'
import getToken from './token'


(async () => {

	const organization = process.env.CL_SDK_ORGANIZATION || ''
	const auth = await getToken('integration')
	const accessToken = auth? auth.accessToken : ''

	const cl = commercelayer({
		organization,
		accessToken,
		timeout: 5000,
	})

	const s = await cl.customers.list({
		include: ['orders', 'orders.market'],
		filters: {
			'orders_market_name_eq': 'USA'
		}
	})

	console.log(inspect(s, false, null, true))

})()