/* eslint-disable no-console */
// import commercelayer from '../lib/cjs'
import { inspect } from 'util'
import commercelayer from '../src'
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
		const list = await cl.customers.list()
		if (list.length > 0) {
			const id = list[0].id
			for (let i = 0; i < 1000; i++) {
				const c = await cl.customers.retrieve(id)
			}
		}
	} catch (error: any) {
		console.log(inspect(error, false, null, true))
		console.log(error.message)
	}

})()
