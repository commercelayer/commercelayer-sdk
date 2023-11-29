import { packageInfo } from '../src/util'
import commercelayer from '../src/index'


(async () => {

	console.log(packageInfo(['version', 'dependencies.axios'], { nestedName: true }))

	const cl = commercelayer({
		organization: 'org',
		accessToken: 'at',
		userAgent: 'PLUTO'
	})

	cl.config({userAgent: 'PIPPO'})

	cl.addresses.retrieve('id', undefined, { userAgent: 'PAPERINA'})

})()
