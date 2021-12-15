import commercelayer, { ShipmentUpdate } from '../lib/cjs'
import { getIntegrationToken } from '@commercelayer/js-auth'


(async () => {

	const organization = process.env.CL_SDK_ORGANIZATION || ''
	const accessToken = process.env.CL_SDK_ACCESS_TOKEN || ''

	const cl = commercelayer({
		organization,
		accessToken,
	})

	const shipmentId = 'edJBCJOzLy'

	const shipment = await cl.shipments.retrieve(shipmentId, { include: ['available_shipping_methods' ], fields: { shipments: ['number', 'status', 'currency_code'] } })
	
	console.log(shipment)

})()