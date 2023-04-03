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

	const c = await cl.customers.count()
	console.log('customers: ' + c)

	const customers = await cl.customers.list()
	console.log(inspect(customers, false, null, true))

})()