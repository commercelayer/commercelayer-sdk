/* eslint-disable no-console */
// import commercelayer from '../lib/cjs'
import commercelayer, { ErrorObj, RequestObj, ResponseObj } from '../lib/cjs'
import getToken from './token'


const requestInterceptor = (request: RequestObj): RequestObj => {
	console.log('INSIDE REQUEST INTERCEPTOR')
	// console.log(request)
	return request
}

const responseInterceptor = (response: ResponseObj): ResponseObj => {
	console.log('INSIDE RESPONSE INTERCEPTOR')
	console.log(response)
	return response
}

const errorInterceptor = (error: ErrorObj): ErrorObj => {
	console.log('INSIDE RESPONSE INTERCEPTOR')
	console.log(error)
	return error
}



(async () => {

	const organization = process.env.CL_SDK_ORGANIZATION || ''
	const auth = await getToken('integration')
	const accessToken = auth? auth.accessToken+'x' : ''

	const cl = commercelayer({
		organization,
		accessToken,
		timeout: 5000,
	})

	const rrr = cl.addRawResponseReader({ headers: true })
	const reqInt = cl.addRequestInterceptor(requestInterceptor)
	cl.addResponseInterceptor(responseInterceptor, errorInterceptor)

	const customers = await cl.customers.list({ pageSize: 1 }).catch(error => console.log(error.message))

	cl.removeInterceptor('request', reqInt)

	console.log(customers)
	console.log(rrr.rawResponse)
	console.log(rrr.headers)

})()
