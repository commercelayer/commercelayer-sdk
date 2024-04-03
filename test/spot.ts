import { handleError, init } from './util'



	; (async () => {

		const cl = await init()

		try {

			const res = await cl.orders.list({'fields': ['number']})
			console.log(res)


		} catch (error: any) {
			handleError(error)
		}

	})()
