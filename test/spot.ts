/* eslint-disable no-console */
// import commercelayer from '../lib/cjs'
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

	const rrr = cl.addRawResponseReader({ headers: true })

	const customers = await cl.customers.list({ pageSize: 1 })

	console.log(rrr.rawResponse)
	console.log(rrr.headers)

})()