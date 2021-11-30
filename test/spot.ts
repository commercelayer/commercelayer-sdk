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

	const shipment = await cl.shipments.retrieve(shipmentId, { include: ['available_shipping_methods' ] })
	const available = shipment.available_shipping_methods

	if (available && available.length > 0) {

		const shipmentUpdate: ShipmentUpdate = {
			id: shipmentId,
			shipping_method: cl.shipping_methods.relationship(available[0].id),
		}

		const shipmentUpdated = await cl.shipments.update(shipmentUpdate)

		console.log(shipmentUpdated)

	}

})()