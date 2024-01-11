
import commercelayer, { CommerceLayerStatic, SdkError } from '../src/index'


(async () => {

	enum ErrorType {
		CLIENT 		= 'client',		// Error instantiating the client
		REQUEST 	= 'request',	// Error preparing API request
		RESPONSE 	= 'response',	// Error response from API
		CANCEL 		= 'cancel',		// Forced request abort using interceptor
		PARSE 		= 'parse',		// Error parsing API resource
		GENERIC 	= 'generic',	// Other not specified errors
	}

	const values = Object.values(ErrorType)

	const err = {
		name: 'SdkError',
		type: 'cancel'
	}

	console.log(CommerceLayerStatic.isSdkError(err))

})()
