
import { inspect } from 'util'
import commercelayer, { Tag } from '../src/index'
import getToken from './token'


(async () => {

	const auth = await getToken('integration')
	const accessToken = auth ? auth.accessToken : ''
	const organization = process.env.CL_SDK_ORGANIZATION || 'sdk-test-org'

	const cl = commercelayer({
		organization,
		accessToken
	})

	try {

		let tags = await cl.tags.list()
		console.log(inspect(tags, false, null, true))
		const tag = tags.first()

		tags = await cl.customers.tags('OqzZhVzyaQ')
		console.log(inspect(tags, false, null, true))

		let customer = await cl.customers.update({
			id: 'OqzZhVzyaQ',
			tags: [ cl.tags.relationship(tag as Tag) ]
		}, {
			include: ['tags']
		})
		console.log(inspect(customer, false, null, true))

		customer = await cl.customers.update({
			id: 'OqzZhVzyaQ',
			tags: [ cl.tags.relationship(null) ]
		}, {
			include: ['tags']
		})
		console.log(inspect(customer, false, null, true))



	} catch (error: any) {
		console.log(inspect(error, false, null, true))
		console.log(error.message)
	}

})()
