/* eslint-disable no-console */
import { inspect } from 'util'
import CommerceLayer, { RequestObj } from './src'
import axios from 'axios'




async function test() {

	const cl = CommerceLayer({
		organization: process.env.CL_CLI_ORGANIZATION || 'sdk-test-org',
		accessToken: process.env.CL_CLI_ACCESS_TOKEN || 'eyJhbGciOiJIUzUxMiJ9.eyJvcmdhbml6YXRpb24iOnsiaWQiOiJ3UlBwRUZPRWxSIiwic2x1ZyI6InNkay10ZXN0LW9yZyJ9LCJhcHBsaWNhdGlvbiI6eyJpZCI6InpNbERtaUJheE0iLCJraW5kIjoiY2xpIiwicHVibGljIjpmYWxzZX0sInRlc3QiOnRydWUsImV4cCI6MTYzMzU0MDU3OSwicmFuZCI6MC41Nzk3MTkyODE3NDM2NjM3fQ.6yixcWBJJlWlXYCMz7EXRHJW6LSm0XkGpxKX8dDQD8XyvH_95Ru8N2ohTgokZY1GKlzxjUDH2pHzK-pqlOUVaw'
	})

	class InterruptRequest extends Error {
		interrupted: boolean = true
		constructor(message: string) {
			super(message)
			super.name = 'InterruptRequest'
		}
	}

	const ri = cl.addRequestInterceptor((request: RequestObj): RequestObj => {
		throw new axios.Cancel('TEST-CANCEL')
		return request
	})

	cl.customers.create({ email: 'testinvlude03@sdk-test.org', customer_group: cl.customer_groups.relationship('BpaEahjYpN')}, { include: ['customer_group'], fields: {customers: ['email', 'customer_group'], customer_groups: ['name']} })
	.then(console.log)
	.catch(error => {
		console.log(error)
	})

}


test()
