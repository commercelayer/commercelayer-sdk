import { handleError, initConfig } from './util'
import commercelayer, { customers, initCommerceLayer } from '../src'


; (async () => {

	const config = await initConfig()
	// const cl = commercelayer(config)

	try {

    initCommerceLayer(config)

    const res = await customers.list()
    console.log(res)
		

	} catch (error: any) {
		handleError(error, true)
	}

})()
