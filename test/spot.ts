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

	const s = await cl.skus.list({
		include: ['prices'],
		filters: {
			'code_in': ''
		},
		pageSize: 25
	})

	console.log(inspect(s, false, null, true))

})()