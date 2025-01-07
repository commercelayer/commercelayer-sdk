/**
 * ©2025 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen
 **/

import { CommerceLayerClient, LineItem } from '../../src'
import isEqual from 'lodash.isequal'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getClient, TestData, CommonData, handleError, interceptRequest, checkCommon, checkCommonData, checkCommonParamsList, checkCommonParams, currentAccessToken, randomValue } from '../../test/common'



let cl: CommerceLayerClient


beforeAll(async () => { cl = await getClient() })


describe('LineItems resource', () => {

  const resourceType = 'line_items'
  const resourcePath = 'line_items'


  /* spec.create.start */
  it(resourceType + '.create', async () => {

    const createAttributes = {
			quantity: randomValue('integer', 'quantity'),
			order: cl.orders.relationship(TestData.id),
			item: cl.skus.relationship(TestData.id),
			tags: [ cl.tags.relationship(TestData.id) ],
		}

    const attributes = { ...createAttributes, reference: TestData.reference }
    const params = { fields: { [resourceType]: CommonData.paramsFields } }
    const resData = attributes

    cl.addRequestInterceptor((request) => {
      const data = JSON.parse(String(request.options.body))
      expect(request.options.method).toBe('POST')
      checkCommon(request, resourcePath)
      checkCommonData(data, resourceType, attributes)
      expect(cl[resourcePath].isLineItem(data.data)).toBeTruthy()
      return interceptRequest()
    })

    await cl[resourcePath].create(resData, params, CommonData.options)
      .then((res: LineItem) =>  expect(res).not.toBeNull())
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
      .then((res: LineItem) =>  expect(res).not.toBeNull())
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
      .then((res: LineItem) =>  expect(res).not.toBeNull())
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
    expect(cl[resourcePath].isLineItem(resource)).toBeTruthy()

    const type = cl[resourcePath].type()
    expect(type).toBe(resourceType)

  })
  /* spec.type.stop */


  /* spec.relationship.start */
  it(resourceType + '.relationship', async () => {

    const relId = cl[resourcePath].relationship(TestData.id)
    expect(isEqual(relId, { id: TestData.id, type: resourceType}))

    const relResId = cl[resourcePath].relationship({ id: TestData.id, type: resourceType })
    expect(isEqual(relResId, { id: TestData.id, type: resourceType}))

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

    const res = cl[resourcePath].parse(payload) as LineItem

    expect(res.type).toBe(resourceType)
    expect(res.reference).toBe(reference)

  })
  */
  /* spec.parse.stop */

  

	/* relationship.order start */
	it(resourceType + '.order', async () => {
	
		const id = TestData.id
		const params = { fields: { orders: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'order')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await cl[resourcePath].order(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.order stop */
	

	/* relationship.line_item_options start */
	it(resourceType + '.line_item_options', async () => {
	
		const id = TestData.id
		const params = { fields: { line_item_options: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'line_item_options')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await cl[resourcePath].line_item_options(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.line_item_options stop */
	

	/* relationship.return_line_items start */
	it(resourceType + '.return_line_items', async () => {
	
		const id = TestData.id
		const params = { fields: { return_line_items: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'return_line_items')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await cl[resourcePath].return_line_items(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.return_line_items stop */
	

	/* relationship.stock_reservations start */
	it(resourceType + '.stock_reservations', async () => {
	
		const id = TestData.id
		const params = { fields: { stock_reservations: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'stock_reservations')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await cl[resourcePath].stock_reservations(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.stock_reservations stop */
	

	/* relationship.stock_line_items start */
	it(resourceType + '.stock_line_items', async () => {
	
		const id = TestData.id
		const params = { fields: { stock_line_items: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'stock_line_items')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await cl[resourcePath].stock_line_items(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.stock_line_items stop */
	

	/* relationship.stock_transfers start */
	it(resourceType + '.stock_transfers', async () => {
	
		const id = TestData.id
		const params = { fields: { stock_transfers: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'stock_transfers')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await cl[resourcePath].stock_transfers(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.stock_transfers stop */
	

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
	

	/* relationship.events start */
	it(resourceType + '.events', async () => {
	
		const id = TestData.id
		const params = { fields: { events: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'events')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await cl[resourcePath].events(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.events stop */
	

	/* relationship.tags start */
	it(resourceType + '.tags', async () => {
	
		const id = TestData.id
		const params = { fields: { tags: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'tags')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await cl[resourcePath].tags(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.tags stop */
	
  

	/* trigger._external_price start */
	it(resourceType + '._external_price', async () => {
	
		let triggerAttr = '_external_price'
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
	
		await cl[resourcePath]._external_price(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* trigger._external_price stop */
	

	/* trigger._reserve_stock start */
	it(resourceType + '._reserve_stock', async () => {
	
		let triggerAttr = '_reserve_stock'
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
	
		await cl[resourcePath]._reserve_stock(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* trigger._reserve_stock stop */
	

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
