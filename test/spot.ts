
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

		const payload = `
    {
	    "data": {
        "id": "AbcdEfgHiL",
        "meta": {
          "mode": "test",
          "organization_id": "myOrgId"
        },
        "type": "customers2",
        "links": {
          "self": "https://sdk2-test-org.commercelayer.io/api/customers/AbcdEfgHiL"
        },
        "attributes": {
          "metadata": {},
          "reference": "ref_test",
          "created_at": "2023-10-01T05:53:29.296Z",
          "updated_at": "2023-10-10T08:52:13.251Z"
        }
      }
    }
    `

	const c = cl.customers.parse(payload, { ignoreSlug: true })
	console.log('----------')
	console.log(c)

	} catch (error: any) {
		console.log(inspect(error, false, null, true))
		console.log(error.message)
	}

})()
