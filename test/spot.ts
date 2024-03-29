import { handleError, init } from './util';



	; (async () => {

		const cl = await init()

		try {

			const res = await cl.orders.list({ fields: ['adjustment_amount_cents']})
			await cl.orders.create({'adjustment_taxable': true}, {fields: ['approved_at']})
			console.log(res)


		} catch (error: any) {
			handleError(error)
		}

	})()
