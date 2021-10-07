/* eslint-disable no-console */
import CommerceLayer from './src'
import { inspect } from 'util'




async function test() {

	const cl = CommerceLayer({
		organization: 'sdk-test-org',
		accessToken: 'eyJhbGciOiJIUzUxMiJ9.eyJvcmdhbml6YXRpb24iOnsiaWQiOiJ3UlBwRUZPRWxSIiwic2x1ZyI6InNkay10ZXN0LW9yZyJ9LCJhcHBsaWNhdGlvbiI6eyJpZCI6InpNbERtaUJheE0iLCJraW5kIjoiY2xpIiwicHVibGljIjpmYWxzZX0sInRlc3QiOnRydWUsImV4cCI6MTYzMzU0MDU3OSwicmFuZCI6MC41Nzk3MTkyODE3NDM2NjM3fQ.6yixcWBJJlWlXYCMz7EXRHJW6LSm0XkGpxKX8dDQD8XyvH_95Ru8N2ohTgokZY1GKlzxjUDH2pHzK-pqlOUVaw'
	})


	const reader = cl.addRawResponseReader()

	cl.customers.retrieve('QgPyhaNVdk').then(() => {
		console.log(inspect(reader, false, null, true))
	})
	.catch(error => {
		if (cl.isApiError(error)) console.log(error)
		else console.log('ERRORE')
	})

	cl.removeRawResponseReader(reader)

}


test()
