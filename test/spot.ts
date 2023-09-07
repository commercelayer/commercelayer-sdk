/* eslint-disable no-console */
import commercelayer from '../lib/cjs'
import { inspect } from 'util'
// import commercelayer from '../src'
import getToken from './token'


(async () => {

	const organization = process.env.CL_SDK_ORGANIZATION || ''
	const auth = await getToken('integration')
	const accessToken = auth ? auth.accessToken : ''

	const cl = commercelayer({
		organization,
		accessToken,
		timeout: 5000,
	})

	try {

		const rr = cl.addRawResponseReader({ headers: true })
		for (let i = 1; i <= 100; i++) {
			const customers = await cl.customers.list()
			const headers = rr.headers
			console.log(i + ' ----------------------------------------')
			console.log(headers)
		}

		cl.removeRawResponseReader(rr)

	} catch (error: any) {
		console.log(inspect(error, false, null, true))
		console.log(error.message)
	}

})()
