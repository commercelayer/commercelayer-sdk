import commercelayer from '../lib/cjs'



(async () => {

	const organization = process.env.CL_SDK_ORGANIZATION || ''
	const accessToken = process.env.CL_SDK_ACCESS_TOKEN || ''

	const cl = commercelayer({
		organization,
		accessToken,
	})

	cl.orders
		.list({
			fields: {
				orders: [
					"id",
					"autorefresh",
					"status",
					"number",
					"guest",
					"language_code",
					"terms_url",
					"privacy_url",
					"return_url",
					"line_items",
				],
				line_items: ["item_type"],
			},
			include: ["line_items"],
		})
		.catch((err) => {
			Object.keys(err).forEach((k) => console.log(k, err[k]))
			return err
		})

})()
