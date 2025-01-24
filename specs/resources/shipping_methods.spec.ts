/**
 * ©2025 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen
 **/

import { CommerceLayerClient, ShippingMethod } from '../../src'
import { isDeepStrictEqual } from 'node:util'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getClient, TestData, CommonData, handleError, interceptRequest, checkCommon, checkCommonData, checkCommonParamsList, checkCommonParams, currentAccessToken, randomValue } from '../../test/common'



let cl: CommerceLayerClient


beforeAll(async () => { cl = await getClient() })


describe('ShippingMethods resource', () => {

  const resourceType = 'shipping_methods'
  const resourcePath = 'shipping_methods'


  /* spec.create.start */
  it(resourceType + '.create', async () => {

    const createAttributes = {
			name: randomValue('string', 'name'),
			price_amount_cents: randomValue('integer', 'price_amount_cents'),
			market: cl.markets.relationship(TestData.id),
			shipping_zone: cl.shipping_zones.relationship(TestData.id),
			shipping_category: cl.shipping_categories.relationship(TestData.id),
			stock_location: cl.stock_locations.relationship(TestData.id),
			shipping_method_tiers: [ cl.shipping_method_tiers.relationship(TestData.id) ],
		}

    const attributes = { ...createAttributes, reference: TestData.reference }
    const params = { fields: { [resourceType]: CommonData.paramsFields } }
    const resData = attributes

    cl.addRequestInterceptor((request) => {
      const data = JSON.parse(String(request.options.body))
      expect(request.options.method).toBe('POST')
      checkCommon(request, resourcePath)
      checkCommonData(data, resourceType, attributes)
      expect(cl[resourcePath].isShippingMethod(data.data)).toBeTruthy()
      return interceptRequest()
    })

    await cl[resourcePath].create(resData, params, CommonData.options)
      .then((res: ShippingMethod) =>  expect(res).not.toBeNull())
      .catch(handleError)
      .finally(() => cl.removeInterceptor('request'))

  })
  /* spec.create.stop */


  /* spec.retrieve.start */
  it(resourceType + '.retrieve', async () => {

    const id = TestData.id
    const params = { fields: {[resourceType]: CommonData.paramsFields } }

    cl.addRequestInterceptor((request) => {
      expect(request.options.method).toBe('GET')
      checkCommon(request, resourcePath, id, currentAccessToken)
      checkCommonParams(request, params)
      return interceptRequest()
    })

    await cl[resourcePath].retrieve(id, params, CommonData.options)
      .then((res: ShippingMethod) =>  expect(res).not.toBeNull())
      .catch(handleError)
      .finally(() => cl.removeInterceptor('request'))

  })
  /* spec.retrieve.stop */


  /* spec.update.start */
  it(resourceType + '.update', async () => {

    const attributes = { reference_origin: TestData.reference_origin, metadata: TestData.metadata }
    const params = { fields: { [resourceType]: CommonData.paramsFields } }
    const resData = { id: TestData.id, ...attributes}

    cl.addRequestInterceptor((request) => {
      const data = JSON.parse(String(request.options.body))
      expect(request.options.method).toBe('PATCH')
      checkCommon(request, resourcePath, resData.id, currentAccessToken)
      checkCommonData(data, resourceType, attributes, resData.id)
      return interceptRequest()
    })

    await cl[resourcePath].update(resData, params, CommonData.options)
      .then((res: ShippingMethod) =>  expect(res).not.toBeNull())
      .catch(handleError)
      .finally(() => cl.removeInterceptor('request'))

  })
  /* spec.update.stop */


  /* spec.delete.start */
  it(resourceType + '.delete', async () => {

    const id = TestData.id

    cl.addRequestInterceptor((request) => {
      expect(request.options.method).toBe('DELETE')
      checkCommon(request, resourcePath, id, currentAccessToken)
      return interceptRequest()
    })

    await cl[resourcePath].delete(id, CommonData.options)
      .catch(handleError)
      .finally(() => cl.removeInterceptor('request'))

  })
  /* spec.delete.stop */


  /* spec.list.start */
  it(resourceType + '.list', async () => {

    const params = CommonData.paramsList

    cl.addRequestInterceptor((request) => {
      expect(request.options.method).toBe('GET')
      checkCommon(request, resourcePath)
      checkCommonParamsList(request, params)
      return interceptRequest()
    })

    await cl[resourcePath].list(params, CommonData.options)
      .catch(handleError)
      .finally(() => cl.removeInterceptor('request'))
    
  })
  /* spec.list.stop */


  /* spec.type.start */
  it(resourceType + '.type', async () => {

    const resource = { id: TestData.id, type: resourceType }
    expect(cl[resourcePath].isShippingMethod(resource)).toBeTruthy()

    const type = cl[resourcePath].type()
    expect(type).toBe(resourceType)

  })
  /* spec.type.stop */


  /* spec.relationship.start */
  it(resourceType + '.relationship', async () => {

    const relId = cl[resourcePath].relationship(TestData.id)
    expect(isDeepStrictEqual(relId, { id: TestData.id, type: resourceType}))

    const relResId = cl[resourcePath].relationship({ id: TestData.id, type: resourceType })
    expect(isDeepStrictEqual(relResId, { id: TestData.id, type: resourceType}))

  })
  /* spec.relationship.stop */


  /* spec.parse.start */
  /*
  it(resourceType + '.parse', async () => {

    const reference = 'myReferenceId'

    const payload = `
    {
	    "data": {
        "id": "AbcdEfgHiL",
        "meta": {
          "mode": "test",
          "organization_id": "myOrgId"
        },
        "type": "${resourceType}",
        "links": {
          "self": "https://sdk-test-org.commercelayer.io/api/${resourceType}/AbcdEfgHiL"
        },
        "attributes": {
          "metadata": {},
          "reference": "${reference}",
          "created_at": "2023-10-01T05:53:29.296Z",
          "updated_at": "2023-10-10T08:52:13.251Z"
        }
      }
    }
    `

    const res = cl[resourcePath].parse(payload) as ShippingMethod

    expect(res.type).toBe(resourceType)
    expect(res.reference).toBe(reference)

  })
  */
  /* spec.parse.stop */

  

	/* relationship.market start */
	it(resourceType + '.market', async () => {
	
		const id = TestData.id
		const params = { fields: { markets: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'market')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await cl[resourcePath].market(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.market stop */
	

	/* relationship.shipping_zone start */
	it(resourceType + '.shipping_zone', async () => {
	
		const id = TestData.id
		const params = { fields: { shipping_zones: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'shipping_zone')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await cl[resourcePath].shipping_zone(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.shipping_zone stop */
	

	/* relationship.shipping_category start */
	it(resourceType + '.shipping_category', async () => {
	
		const id = TestData.id
		const params = { fields: { shipping_categories: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'shipping_category')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await cl[resourcePath].shipping_category(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.shipping_category stop */
	

	/* relationship.stock_location start */
	it(resourceType + '.stock_location', async () => {
	
		const id = TestData.id
		const params = { fields: { stock_locations: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'stock_location')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await cl[resourcePath].stock_location(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.stock_location stop */
	

	/* relationship.delivery_lead_time_for_shipment start */
	it(resourceType + '.delivery_lead_time_for_shipment', async () => {
	
		const id = TestData.id
		const params = { fields: { delivery_lead_times: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'delivery_lead_time_for_shipment')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await cl[resourcePath].delivery_lead_time_for_shipment(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.delivery_lead_time_for_shipment stop */
	

	/* relationship.shipping_method_tiers start */
	it(resourceType + '.shipping_method_tiers', async () => {
	
		const id = TestData.id
		const params = { fields: { shipping_method_tiers: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'shipping_method_tiers')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await cl[resourcePath].shipping_method_tiers(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.shipping_method_tiers stop */
	

	/* relationship.shipping_weight_tiers start */
	it(resourceType + '.shipping_weight_tiers', async () => {
	
		const id = TestData.id
		const params = { fields: { shipping_weight_tiers: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'shipping_weight_tiers')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await cl[resourcePath].shipping_weight_tiers(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.shipping_weight_tiers stop */
	

	/* relationship.attachments start */
	it(resourceType + '.attachments', async () => {
	
		const id = TestData.id
		const params = { fields: { attachments: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'attachments')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await cl[resourcePath].attachments(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.attachments stop */
	

	/* relationship.notifications start */
	it(resourceType + '.notifications', async () => {
	
		const id = TestData.id
		const params = { fields: { notifications: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'notifications')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await cl[resourcePath].notifications(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.notifications stop */
	

	/* relationship.versions start */
	it(resourceType + '.versions', async () => {
	
		const id = TestData.id
		const params = { fields: { versions: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'versions')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await cl[resourcePath].versions(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.versions stop */
	
  

	/* trigger._disable start */
	it(resourceType + '._disable', async () => {
	
		let triggerAttr = '_disable'
		if (!triggerAttr.startsWith('_')) triggerAttr = `_${triggerAttr}`
	
		const triggerValue = true
		const attributes = { [triggerAttr]: triggerValue }
	  const id = TestData.id
	
		const intId = cl.addRequestInterceptor((request) => {
			const data = JSON.parse(String(request.options.body))
			expect(request.options.method).toBe('PATCH')
			checkCommon(request, resourcePath, id, currentAccessToken)
			checkCommonData(data, resourceType, attributes, id)
			return interceptRequest()
		})
	
		await cl[resourcePath]._disable(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* trigger._disable stop */
	

	/* trigger._enable start */
	it(resourceType + '._enable', async () => {
	
		let triggerAttr = '_enable'
		if (!triggerAttr.startsWith('_')) triggerAttr = `_${triggerAttr}`
	
		const triggerValue = true
		const attributes = { [triggerAttr]: triggerValue }
	  const id = TestData.id
	
		const intId = cl.addRequestInterceptor((request) => {
			const data = JSON.parse(String(request.options.body))
			expect(request.options.method).toBe('PATCH')
			checkCommon(request, resourcePath, id, currentAccessToken)
			checkCommonData(data, resourceType, attributes, id)
			return interceptRequest()
		})
	
		await cl[resourcePath]._enable(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* trigger._enable stop */
	

	/* trigger._reset_circuit start */
	it(resourceType + '._reset_circuit', async () => {
	
		let triggerAttr = '_reset_circuit'
		if (!triggerAttr.startsWith('_')) triggerAttr = `_${triggerAttr}`
	
		const triggerValue = true
		const attributes = { [triggerAttr]: triggerValue }
	  const id = TestData.id
	
		const intId = cl.addRequestInterceptor((request) => {
			const data = JSON.parse(String(request.options.body))
			expect(request.options.method).toBe('PATCH')
			checkCommon(request, resourcePath, id, currentAccessToken)
			checkCommonData(data, resourceType, attributes, id)
			return interceptRequest()
		})
	
		await cl[resourcePath]._reset_circuit(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* trigger._reset_circuit stop */
	
})
