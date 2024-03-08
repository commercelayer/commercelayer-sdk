
import commercelayer from '../lib/esm'
import { inspect } from 'util'
import getToken from './token'
import { error } from 'console'


(async () => {

	const auth = await getToken('integration')
	const accessToken = auth ? auth.accessToken : ''
	const organization = process.env.CL_SDK_ORGANIZATION || 'sdk-test-org'

	const cl = commercelayer({
		organization,
		accessToken
	})

	try {

		fetch("http://httpstat.us/429")
    .then(res => {
		console.log('RESPONSE')
        console.log(res)
    }).catch(err => {
		console.log('ERROR')
        console.log(err)
    });
	
	} catch (error: any) {
		console.log(inspect(error, false, null, true))
		console.log(error.message)
	}

})()
