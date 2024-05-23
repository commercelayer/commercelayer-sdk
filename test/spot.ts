import { handleError, init } from './util'



async function customFetch(input: string | URL | Request, init?: RequestInit) {
	console.log('CUSTOM FETCH START')
	const res = await global.fetch(input, init)
	console.log('CUSTOM_FETCH STOP')
	return res
}


; (async () => {

	const cl = await init()

	try {

		cl.config({ fetch: customFetch })

		const res = await cl.orders.list({ 'fields': ['number'] })
		console.log(res)


	} catch (error: any) {
		handleError(error, true)
	}

})()
