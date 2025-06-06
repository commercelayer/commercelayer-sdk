/**
 * ©2025 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen
 **/

import { CommerceLayerClient, Order } from '../../src'
import { isDeepStrictEqual } from 'node:util'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getClient, TestData, CommonData, handleError, interceptRequest, checkCommon, checkCommonData, checkCommonParamsList, checkCommonParams, currentAccessToken, randomValue } from '../../test/common'



let cl: CommerceLayerClient


beforeAll(async () => { cl = await getClient() })


describe('Orders resource', () => {

  const resourceType = 'orders'
  const resourcePath = 'orders'


  /* spec.create.start */
  it(resourceType + '.create', async () => {

    const createAttributes = {
			market: cl.markets.relationship(TestData.id),
			customer: cl.customers.relationship(TestData.id),
			shipping_address: cl.addresses.relationship(TestData.id),
			billing_address: cl.addresses.relationship(TestData.id),
			store: cl.stores.relationship(TestData.id),
			payment_method: cl.payment_methods.relationship(TestData.id),
			payment_source: cl.adyen_payments.relationship(TestData.id),
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
      expect(cl[resourcePath].isOrder(data.data)).toBeTruthy()
      return interceptRequest()
    })

    await cl[resourcePath].create(resData, params, CommonData.options)
      .then((res: Order) =>  expect(res).not.toBeNull())
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
      .then((res: Order) =>  expect(res).not.toBeNull())
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
      .then((res: Order) =>  expect(res).not.toBeNull())
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
    expect(cl[resourcePath].isOrder(resource)).toBeTruthy()

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

    const res = cl[resourcePath].parse(payload) as Order

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
	

	/* relationship.customer start */
	it(resourceType + '.customer', async () => {
	
		const id = TestData.id
		const params = { fields: { customers: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'customer')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await cl[resourcePath].customer(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.customer stop */
	

	/* relationship.shipping_address start */
	it(resourceType + '.shipping_address', async () => {
	
		const id = TestData.id
		const params = { fields: { addresses: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'shipping_address')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await cl[resourcePath].shipping_address(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.shipping_address stop */
	

	/* relationship.billing_address start */
	it(resourceType + '.billing_address', async () => {
	
		const id = TestData.id
		const params = { fields: { addresses: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'billing_address')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await cl[resourcePath].billing_address(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.billing_address stop */
	

	/* relationship.store start */
	it(resourceType + '.store', async () => {
	
		const id = TestData.id
		const params = { fields: { stores: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'store')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await cl[resourcePath].store(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.store stop */
	

	/* relationship.default_shipping_method start */
	it(resourceType + '.default_shipping_method', async () => {
	
		const id = TestData.id
		const params = { fields: { shipping_methods: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'default_shipping_method')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await cl[resourcePath].default_shipping_method(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.default_shipping_method stop */
	

	/* relationship.default_payment_method start */
	it(resourceType + '.default_payment_method', async () => {
	
		const id = TestData.id
		const params = { fields: { payment_methods: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'default_payment_method')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await cl[resourcePath].default_payment_method(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.default_payment_method stop */
	

	/* relationship.available_payment_methods start */
	it(resourceType + '.available_payment_methods', async () => {
	
		const id = TestData.id
		const params = { fields: { payment_methods: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'available_payment_methods')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await cl[resourcePath].available_payment_methods(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.available_payment_methods stop */
	

	/* relationship.available_customer_payment_sources start */
	it(resourceType + '.available_customer_payment_sources', async () => {
	
		const id = TestData.id
		const params = { fields: { customer_payment_sources: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'available_customer_payment_sources')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await cl[resourcePath].available_customer_payment_sources(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.available_customer_payment_sources stop */
	

	/* relationship.available_free_skus start */
	it(resourceType + '.available_free_skus', async () => {
	
		const id = TestData.id
		const params = { fields: { skus: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'available_free_skus')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await cl[resourcePath].available_free_skus(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.available_free_skus stop */
	

	/* relationship.available_free_bundles start */
	it(resourceType + '.available_free_bundles', async () => {
	
		const id = TestData.id
		const params = { fields: { bundles: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'available_free_bundles')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await cl[resourcePath].available_free_bundles(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.available_free_bundles stop */
	

	/* relationship.payment_method start */
	it(resourceType + '.payment_method', async () => {
	
		const id = TestData.id
		const params = { fields: { payment_methods: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'payment_method')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await cl[resourcePath].payment_method(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.payment_method stop */
	

	/* relationship.discount_engine_item start */
	it(resourceType + '.discount_engine_item', async () => {
	
		const id = TestData.id
		const params = { fields: { discount_engine_items: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'discount_engine_item')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await cl[resourcePath].discount_engine_item(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.discount_engine_item stop */
	

	/* relationship.line_items start */
	it(resourceType + '.line_items', async () => {
	
		const id = TestData.id
		const params = { fields: { line_items: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'line_items')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await cl[resourcePath].line_items(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.line_items stop */
	

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
	

	/* relationship.shipments start */
	it(resourceType + '.shipments', async () => {
	
		const id = TestData.id
		const params = { fields: { shipments: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'shipments')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await cl[resourcePath].shipments(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.shipments stop */
	

	/* relationship.payment_options start */
	it(resourceType + '.payment_options', async () => {
	
		const id = TestData.id
		const params = { fields: { payment_options: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'payment_options')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await cl[resourcePath].payment_options(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.payment_options stop */
	

	/* relationship.authorizations start */
	it(resourceType + '.authorizations', async () => {
	
		const id = TestData.id
		const params = { fields: { authorizations: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'authorizations')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await cl[resourcePath].authorizations(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.authorizations stop */
	

	/* relationship.captures start */
	it(resourceType + '.captures', async () => {
	
		const id = TestData.id
		const params = { fields: { captures: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'captures')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await cl[resourcePath].captures(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.captures stop */
	

	/* relationship.voids start */
	it(resourceType + '.voids', async () => {
	
		const id = TestData.id
		const params = { fields: { voids: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'voids')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await cl[resourcePath].voids(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.voids stop */
	

	/* relationship.refunds start */
	it(resourceType + '.refunds', async () => {
	
		const id = TestData.id
		const params = { fields: { refunds: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'refunds')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await cl[resourcePath].refunds(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.refunds stop */
	

	/* relationship.returns start */
	it(resourceType + '.returns', async () => {
	
		const id = TestData.id
		const params = { fields: { returns: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'returns')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await cl[resourcePath].returns(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.returns stop */
	

	/* relationship.order_subscription start */
	it(resourceType + '.order_subscription', async () => {
	
		const id = TestData.id
		const params = { fields: { order_subscriptions: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'order_subscription')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await cl[resourcePath].order_subscription(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.order_subscription stop */
	

	/* relationship.order_subscriptions start */
	it(resourceType + '.order_subscriptions', async () => {
	
		const id = TestData.id
		const params = { fields: { order_subscriptions: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'order_subscriptions')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await cl[resourcePath].order_subscriptions(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.order_subscriptions stop */
	

	/* relationship.order_factories start */
	it(resourceType + '.order_factories', async () => {
	
		const id = TestData.id
		const params = { fields: { order_factories: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'order_factories')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await cl[resourcePath].order_factories(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.order_factories stop */
	

	/* relationship.order_copies start */
	it(resourceType + '.order_copies', async () => {
	
		const id = TestData.id
		const params = { fields: { order_copies: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'order_copies')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await cl[resourcePath].order_copies(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.order_copies stop */
	

	/* relationship.recurring_order_copies start */
	it(resourceType + '.recurring_order_copies', async () => {
	
		const id = TestData.id
		const params = { fields: { recurring_order_copies: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'recurring_order_copies')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await cl[resourcePath].recurring_order_copies(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.recurring_order_copies stop */
	

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
	

	/* relationship.links start */
	it(resourceType + '.links', async () => {
	
		const id = TestData.id
		const params = { fields: { links: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'links')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await cl[resourcePath].links(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.links stop */
	

	/* relationship.resource_errors start */
	it(resourceType + '.resource_errors', async () => {
	
		const id = TestData.id
		const params = { fields: { resource_errors: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'resource_errors')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await cl[resourcePath].resource_errors(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.resource_errors stop */
	

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
	
  

	/* trigger._archive start */
	it(resourceType + '._archive', async () => {
	
		let triggerAttr = '_archive'
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
	
		await cl[resourcePath]._archive(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* trigger._archive stop */
	

	/* trigger._unarchive start */
	it(resourceType + '._unarchive', async () => {
	
		let triggerAttr = '_unarchive'
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
	
		await cl[resourcePath]._unarchive(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* trigger._unarchive stop */
	

	/* trigger._pending start */
	it(resourceType + '._pending', async () => {
	
		let triggerAttr = '_pending'
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
	
		await cl[resourcePath]._pending(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* trigger._pending stop */
	

	/* trigger._place start */
	it(resourceType + '._place', async () => {
	
		let triggerAttr = '_place'
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
	
		await cl[resourcePath]._place(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* trigger._place stop */
	

	/* trigger._cancel start */
	it(resourceType + '._cancel', async () => {
	
		let triggerAttr = '_cancel'
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
	
		await cl[resourcePath]._cancel(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* trigger._cancel stop */
	

	/* trigger._approve start */
	it(resourceType + '._approve', async () => {
	
		let triggerAttr = '_approve'
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
	
		await cl[resourcePath]._approve(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* trigger._approve stop */
	

	/* trigger._approve_and_capture start */
	it(resourceType + '._approve_and_capture', async () => {
	
		let triggerAttr = '_approve_and_capture'
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
	
		await cl[resourcePath]._approve_and_capture(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* trigger._approve_and_capture stop */
	

	/* trigger._authorize start */
	it(resourceType + '._authorize', async () => {
	
		let triggerAttr = '_authorize'
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
	
		await cl[resourcePath]._authorize(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* trigger._authorize stop */
	

	/* trigger._authorization_amount_cents start */
	it(resourceType + '._authorization_amount_cents', async () => {
	
		let triggerAttr = '_authorization_amount_cents'
		if (!triggerAttr.startsWith('_')) triggerAttr = `_${triggerAttr}`
	
		const triggerValue = randomValue('integer')
		const attributes = { [triggerAttr]: triggerValue }
	  const id = TestData.id
	
		const intId = cl.addRequestInterceptor((request) => {
			const data = JSON.parse(String(request.options.body))
			expect(request.options.method).toBe('PATCH')
			checkCommon(request, resourcePath, id, currentAccessToken)
			checkCommonData(data, resourceType, attributes, id)
			return interceptRequest()
		})
	
		await cl[resourcePath]._authorization_amount_cents(id, triggerValue, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* trigger._authorization_amount_cents stop */
	

	/* trigger._capture start */
	it(resourceType + '._capture', async () => {
	
		let triggerAttr = '_capture'
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
	
		await cl[resourcePath]._capture(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* trigger._capture stop */
	

	/* trigger._refund start */
	it(resourceType + '._refund', async () => {
	
		let triggerAttr = '_refund'
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
	
		await cl[resourcePath]._refund(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* trigger._refund stop */
	

	/* trigger._fulfill start */
	it(resourceType + '._fulfill', async () => {
	
		let triggerAttr = '_fulfill'
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
	
		await cl[resourcePath]._fulfill(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* trigger._fulfill stop */
	

	/* trigger._update_taxes start */
	it(resourceType + '._update_taxes', async () => {
	
		let triggerAttr = '_update_taxes'
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
	
		await cl[resourcePath]._update_taxes(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* trigger._update_taxes stop */
	

	/* trigger._nullify_payment_source start */
	it(resourceType + '._nullify_payment_source', async () => {
	
		let triggerAttr = '_nullify_payment_source'
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
	
		await cl[resourcePath]._nullify_payment_source(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* trigger._nullify_payment_source stop */
	

	/* trigger._fix_payment_source start */
	it(resourceType + '._fix_payment_source', async () => {
	
		let triggerAttr = '_fix_payment_source'
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
	
		await cl[resourcePath]._fix_payment_source(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* trigger._fix_payment_source stop */
	

	/* trigger._billing_address_clone_id start */
	it(resourceType + '._billing_address_clone_id', async () => {
	
		let triggerAttr = '_billing_address_clone_id'
		if (!triggerAttr.startsWith('_')) triggerAttr = `_${triggerAttr}`
	
		const triggerValue = randomValue('string')
		const attributes = { [triggerAttr]: triggerValue }
	  const id = TestData.id
	
		const intId = cl.addRequestInterceptor((request) => {
			const data = JSON.parse(String(request.options.body))
			expect(request.options.method).toBe('PATCH')
			checkCommon(request, resourcePath, id, currentAccessToken)
			checkCommonData(data, resourceType, attributes, id)
			return interceptRequest()
		})
	
		await cl[resourcePath]._billing_address_clone_id(id, triggerValue, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* trigger._billing_address_clone_id stop */
	

	/* trigger._shipping_address_clone_id start */
	it(resourceType + '._shipping_address_clone_id', async () => {
	
		let triggerAttr = '_shipping_address_clone_id'
		if (!triggerAttr.startsWith('_')) triggerAttr = `_${triggerAttr}`
	
		const triggerValue = randomValue('string')
		const attributes = { [triggerAttr]: triggerValue }
	  const id = TestData.id
	
		const intId = cl.addRequestInterceptor((request) => {
			const data = JSON.parse(String(request.options.body))
			expect(request.options.method).toBe('PATCH')
			checkCommon(request, resourcePath, id, currentAccessToken)
			checkCommonData(data, resourceType, attributes, id)
			return interceptRequest()
		})
	
		await cl[resourcePath]._shipping_address_clone_id(id, triggerValue, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* trigger._shipping_address_clone_id stop */
	

	/* trigger._customer_payment_source_id start */
	it(resourceType + '._customer_payment_source_id', async () => {
	
		let triggerAttr = '_customer_payment_source_id'
		if (!triggerAttr.startsWith('_')) triggerAttr = `_${triggerAttr}`
	
		const triggerValue = randomValue('string')
		const attributes = { [triggerAttr]: triggerValue }
	  const id = TestData.id
	
		const intId = cl.addRequestInterceptor((request) => {
			const data = JSON.parse(String(request.options.body))
			expect(request.options.method).toBe('PATCH')
			checkCommon(request, resourcePath, id, currentAccessToken)
			checkCommonData(data, resourceType, attributes, id)
			return interceptRequest()
		})
	
		await cl[resourcePath]._customer_payment_source_id(id, triggerValue, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* trigger._customer_payment_source_id stop */
	

	/* trigger._shipping_address_same_as_billing start */
	it(resourceType + '._shipping_address_same_as_billing', async () => {
	
		let triggerAttr = '_shipping_address_same_as_billing'
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
	
		await cl[resourcePath]._shipping_address_same_as_billing(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* trigger._shipping_address_same_as_billing stop */
	

	/* trigger._billing_address_same_as_shipping start */
	it(resourceType + '._billing_address_same_as_shipping', async () => {
	
		let triggerAttr = '_billing_address_same_as_shipping'
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
	
		await cl[resourcePath]._billing_address_same_as_shipping(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* trigger._billing_address_same_as_shipping stop */
	

	/* trigger._commit_invoice start */
	it(resourceType + '._commit_invoice', async () => {
	
		let triggerAttr = '_commit_invoice'
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
	
		await cl[resourcePath]._commit_invoice(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* trigger._commit_invoice stop */
	

	/* trigger._refund_invoice start */
	it(resourceType + '._refund_invoice', async () => {
	
		let triggerAttr = '_refund_invoice'
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
	
		await cl[resourcePath]._refund_invoice(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* trigger._refund_invoice stop */
	

	/* trigger._save_payment_source_to_customer_wallet start */
	it(resourceType + '._save_payment_source_to_customer_wallet', async () => {
	
		let triggerAttr = '_save_payment_source_to_customer_wallet'
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
	
		await cl[resourcePath]._save_payment_source_to_customer_wallet(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* trigger._save_payment_source_to_customer_wallet stop */
	

	/* trigger._save_shipping_address_to_customer_address_book start */
	it(resourceType + '._save_shipping_address_to_customer_address_book', async () => {
	
		let triggerAttr = '_save_shipping_address_to_customer_address_book'
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
	
		await cl[resourcePath]._save_shipping_address_to_customer_address_book(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* trigger._save_shipping_address_to_customer_address_book stop */
	

	/* trigger._save_billing_address_to_customer_address_book start */
	it(resourceType + '._save_billing_address_to_customer_address_book', async () => {
	
		let triggerAttr = '_save_billing_address_to_customer_address_book'
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
	
		await cl[resourcePath]._save_billing_address_to_customer_address_book(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* trigger._save_billing_address_to_customer_address_book stop */
	

	/* trigger._refresh start */
	it(resourceType + '._refresh', async () => {
	
		let triggerAttr = '_refresh'
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
	
		await cl[resourcePath]._refresh(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* trigger._refresh stop */
	

	/* trigger._validate start */
	it(resourceType + '._validate', async () => {
	
		let triggerAttr = '_validate'
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
	
		await cl[resourcePath]._validate(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* trigger._validate stop */
	

	/* trigger._create_subscriptions start */
	it(resourceType + '._create_subscriptions', async () => {
	
		let triggerAttr = '_create_subscriptions'
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
	
		await cl[resourcePath]._create_subscriptions(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* trigger._create_subscriptions stop */
	

	/* trigger._start_editing start */
	it(resourceType + '._start_editing', async () => {
	
		let triggerAttr = '_start_editing'
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
	
		await cl[resourcePath]._start_editing(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* trigger._start_editing stop */
	

	/* trigger._stop_editing start */
	it(resourceType + '._stop_editing', async () => {
	
		let triggerAttr = '_stop_editing'
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
	
		await cl[resourcePath]._stop_editing(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* trigger._stop_editing stop */
	

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
	

	/* trigger._add_tags start */
	it(resourceType + '._add_tags', async () => {
	
		let triggerAttr = '_add_tags'
		if (!triggerAttr.startsWith('_')) triggerAttr = `_${triggerAttr}`
	
		const triggerValue = randomValue('string')
		const attributes = { [triggerAttr]: triggerValue }
	  const id = TestData.id
	
		const intId = cl.addRequestInterceptor((request) => {
			const data = JSON.parse(String(request.options.body))
			expect(request.options.method).toBe('PATCH')
			checkCommon(request, resourcePath, id, currentAccessToken)
			checkCommonData(data, resourceType, attributes, id)
			return interceptRequest()
		})
	
		await cl[resourcePath]._add_tags(id, triggerValue, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* trigger._add_tags stop */
	

	/* trigger._remove_tags start */
	it(resourceType + '._remove_tags', async () => {
	
		let triggerAttr = '_remove_tags'
		if (!triggerAttr.startsWith('_')) triggerAttr = `_${triggerAttr}`
	
		const triggerValue = randomValue('string')
		const attributes = { [triggerAttr]: triggerValue }
	  const id = TestData.id
	
		const intId = cl.addRequestInterceptor((request) => {
			const data = JSON.parse(String(request.options.body))
			expect(request.options.method).toBe('PATCH')
			checkCommon(request, resourcePath, id, currentAccessToken)
			checkCommonData(data, resourceType, attributes, id)
			return interceptRequest()
		})
	
		await cl[resourcePath]._remove_tags(id, triggerValue, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* trigger._remove_tags stop */
	
})
