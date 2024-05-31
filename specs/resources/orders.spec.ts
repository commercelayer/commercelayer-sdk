/**
 * ©2024 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen
 **/

import { CommerceLayerClient, Order } from '../../src'
import { isEqual } from 'lodash'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getClient, TestData, CommonData, handleError, interceptRequest, checkCommon, checkCommonData, checkCommonParamsList, checkCommonParams, currentAccessToken, randomValue } from '../../test/common'



let cl: CommerceLayerClient


beforeAll(async () => { cl = await getClient() })


describe('Orders resource', () => {

  const resourceType = 'orders'


  /* spec.create.start */
  it(resourceType + '.create', async () => {

    const createAttributes = {
			market: cl.markets.relationship(TestData.id),
			customer: cl.customers.relationship(TestData.id),
			shipping_address: cl.addresses.relationship(TestData.id),
			billing_address: cl.addresses.relationship(TestData.id),
			payment_method: cl.payment_methods.relationship(TestData.id),
			payment_source: cl.adyen_payments.relationship(TestData.id),
			tags: [ cl.tags.relationship(TestData.id) ],
		}

    const attributes = { ...createAttributes, reference: TestData.reference }
    const params = { fields: { [resourceType]: CommonData.paramsFields } }
    const resData = attributes

    const intId = cl.addRequestInterceptor((config) => {
      expect(config.method).toBe('post')
      checkCommon(config, resourceType)
      checkCommonData(config, resourceType, attributes)
      expect(cl[resourceType].isOrder(config.data.data)).toBeTruthy()
      return interceptRequest()
    })

    await cl[resourceType].create(resData, params, CommonData.options)
      .catch(handleError)
      .finally(() => cl.removeInterceptor('request', intId))

  })
  /* spec.create.stop */


  /* spec.retrieve.start */
  it(resourceType + '.retrieve', async () => {

    const id = TestData.id
    const params = { fields: {[resourceType]: CommonData.paramsFields } }

    const intId = cl.addRequestInterceptor((config) => {
      expect(config.method).toBe('get')
      checkCommon(config, resourceType, id, currentAccessToken)
      checkCommonParams(config, params)
     return interceptRequest()
    })

    await cl[resourceType].retrieve(id, params, CommonData.options)
      .catch(handleError)
      .finally(() => cl.removeInterceptor('request', intId))

  })
  /* spec.retrieve.stop */


  /* spec.update.start */
  it(resourceType + '.update', async () => {

    const attributes = { reference_origin: TestData.reference_origin, metadata: TestData.metadata }
    const params = { fields: { [resourceType]: CommonData.paramsFields } }
    const resData = { id: TestData.id, ...attributes}

    const intId = cl.addRequestInterceptor((config) => {
      expect(config.method).toBe('patch')
      checkCommon(config, resourceType, resData.id, currentAccessToken)
      checkCommonData(config, resourceType, attributes, resData.id)
      return interceptRequest()
    })

    await cl[resourceType].update(resData, params, CommonData.options)
      .catch(handleError)
      .finally(() => cl.removeInterceptor('request', intId))

  })
  /* spec.update.stop */


  /* spec.delete.start */
  it(resourceType + '.delete', async () => {

    const id = TestData.id

    const intId = cl.addRequestInterceptor((config) => {
      expect(config.method).toBe('delete')
      checkCommon(config, resourceType, id, currentAccessToken)
      return interceptRequest()
    })

    await cl[resourceType].delete(id, CommonData.options)
      .catch(handleError)
      .finally(() => cl.removeInterceptor('request', intId))

  })
  /* spec.delete.stop */


  /* spec.list.start */
  it(resourceType + '.list', async () => {

    const params = CommonData.paramsList

    const intId = cl.addRequestInterceptor((config) => {
      expect(config.method).toBe('get')
      checkCommon(config, resourceType)
      checkCommonParamsList(config, params)
      return interceptRequest()
    })

    await cl[resourceType].list(params, CommonData.options)
      .catch(handleError)
      .finally(() => cl.removeInterceptor('request', intId))
    
  })
  /* spec.list.stop */


  /* spec.type.start */
  it(resourceType + '.type', async () => {

    const resource = { id: TestData.id, type: resourceType }
    expect(cl[resourceType].isOrder(resource)).toBeTruthy()

    const type = cl[resourceType].type()
    expect(type).toBe(resourceType)

  })
  /* spec.type.stop */


  /* spec.relationship.start */
  it(resourceType + '.relationship', async () => {

    const relId = cl[resourceType].relationship(TestData.id)
    expect(isEqual(relId, { id: TestData.id, type: resourceType}))

    const relResId = cl[resourceType].relationship({ id: TestData.id, type: resourceType })
    expect(isEqual(relResId, { id: TestData.id, type: resourceType}))

  })
  /* spec.relationship.stop */


  /* spec.parse.start */
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

    const res = cl[resourceType].parse(payload) as Order

    expect(res.type).toBe(resourceType)
    expect(res.reference).toBe(reference)

  })
  /* spec.parse.stop */

  

	/* relationship.market start */
	it(resourceType + '.market', async () => {
	
		const id = TestData.id
		const params = { fields: { markets: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((config) => {
			expect(config.method).toBe('get')
			checkCommon(config, resourceType, id, currentAccessToken, 'market')
			checkCommonParams(config, params)
			return interceptRequest()
		})
	
		await cl[resourceType].market(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* relationship.market stop */
	

	/* relationship.customer start */
	it(resourceType + '.customer', async () => {
	
		const id = TestData.id
		const params = { fields: { customers: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((config) => {
			expect(config.method).toBe('get')
			checkCommon(config, resourceType, id, currentAccessToken, 'customer')
			checkCommonParams(config, params)
			return interceptRequest()
		})
	
		await cl[resourceType].customer(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* relationship.customer stop */
	

	/* relationship.shipping_address start */
	it(resourceType + '.shipping_address', async () => {
	
		const id = TestData.id
		const params = { fields: { addresses: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((config) => {
			expect(config.method).toBe('get')
			checkCommon(config, resourceType, id, currentAccessToken, 'shipping_address')
			checkCommonParams(config, params)
			return interceptRequest()
		})
	
		await cl[resourceType].shipping_address(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* relationship.shipping_address stop */
	

	/* relationship.billing_address start */
	it(resourceType + '.billing_address', async () => {
	
		const id = TestData.id
		const params = { fields: { addresses: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((config) => {
			expect(config.method).toBe('get')
			checkCommon(config, resourceType, id, currentAccessToken, 'billing_address')
			checkCommonParams(config, params)
			return interceptRequest()
		})
	
		await cl[resourceType].billing_address(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* relationship.billing_address stop */
	

	/* relationship.available_payment_methods start */
	it(resourceType + '.available_payment_methods', async () => {
	
		const id = TestData.id
		const params = { fields: { payment_methods: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((config) => {
			expect(config.method).toBe('get')
			checkCommon(config, resourceType, id, currentAccessToken, 'available_payment_methods')
			checkCommonParams(config, params)
			return interceptRequest()
		})
	
		await cl[resourceType].available_payment_methods(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* relationship.available_payment_methods stop */
	

	/* relationship.available_customer_payment_sources start */
	it(resourceType + '.available_customer_payment_sources', async () => {
	
		const id = TestData.id
		const params = { fields: { customer_payment_sources: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((config) => {
			expect(config.method).toBe('get')
			checkCommon(config, resourceType, id, currentAccessToken, 'available_customer_payment_sources')
			checkCommonParams(config, params)
			return interceptRequest()
		})
	
		await cl[resourceType].available_customer_payment_sources(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* relationship.available_customer_payment_sources stop */
	

	/* relationship.available_free_skus start */
	it(resourceType + '.available_free_skus', async () => {
	
		const id = TestData.id
		const params = { fields: { skus: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((config) => {
			expect(config.method).toBe('get')
			checkCommon(config, resourceType, id, currentAccessToken, 'available_free_skus')
			checkCommonParams(config, params)
			return interceptRequest()
		})
	
		await cl[resourceType].available_free_skus(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* relationship.available_free_skus stop */
	

	/* relationship.available_free_bundles start */
	it(resourceType + '.available_free_bundles', async () => {
	
		const id = TestData.id
		const params = { fields: { bundles: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((config) => {
			expect(config.method).toBe('get')
			checkCommon(config, resourceType, id, currentAccessToken, 'available_free_bundles')
			checkCommonParams(config, params)
			return interceptRequest()
		})
	
		await cl[resourceType].available_free_bundles(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* relationship.available_free_bundles stop */
	

	/* relationship.payment_method start */
	it(resourceType + '.payment_method', async () => {
	
		const id = TestData.id
		const params = { fields: { payment_methods: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((config) => {
			expect(config.method).toBe('get')
			checkCommon(config, resourceType, id, currentAccessToken, 'payment_method')
			checkCommonParams(config, params)
			return interceptRequest()
		})
	
		await cl[resourceType].payment_method(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* relationship.payment_method stop */
	

	/* relationship.line_items start */
	it(resourceType + '.line_items', async () => {
	
		const id = TestData.id
		const params = { fields: { line_items: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((config) => {
			expect(config.method).toBe('get')
			checkCommon(config, resourceType, id, currentAccessToken, 'line_items')
			checkCommonParams(config, params)
			return interceptRequest()
		})
	
		await cl[resourceType].line_items(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* relationship.line_items stop */
	

	/* relationship.line_item_options start */
	it(resourceType + '.line_item_options', async () => {
	
		const id = TestData.id
		const params = { fields: { line_item_options: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((config) => {
			expect(config.method).toBe('get')
			checkCommon(config, resourceType, id, currentAccessToken, 'line_item_options')
			checkCommonParams(config, params)
			return interceptRequest()
		})
	
		await cl[resourceType].line_item_options(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* relationship.line_item_options stop */
	

	/* relationship.stock_reservations start */
	it(resourceType + '.stock_reservations', async () => {
	
		const id = TestData.id
		const params = { fields: { stock_reservations: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((config) => {
			expect(config.method).toBe('get')
			checkCommon(config, resourceType, id, currentAccessToken, 'stock_reservations')
			checkCommonParams(config, params)
			return interceptRequest()
		})
	
		await cl[resourceType].stock_reservations(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* relationship.stock_reservations stop */
	

	/* relationship.stock_line_items start */
	it(resourceType + '.stock_line_items', async () => {
	
		const id = TestData.id
		const params = { fields: { stock_line_items: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((config) => {
			expect(config.method).toBe('get')
			checkCommon(config, resourceType, id, currentAccessToken, 'stock_line_items')
			checkCommonParams(config, params)
			return interceptRequest()
		})
	
		await cl[resourceType].stock_line_items(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* relationship.stock_line_items stop */
	

	/* relationship.stock_transfers start */
	it(resourceType + '.stock_transfers', async () => {
	
		const id = TestData.id
		const params = { fields: { stock_transfers: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((config) => {
			expect(config.method).toBe('get')
			checkCommon(config, resourceType, id, currentAccessToken, 'stock_transfers')
			checkCommonParams(config, params)
			return interceptRequest()
		})
	
		await cl[resourceType].stock_transfers(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* relationship.stock_transfers stop */
	

	/* relationship.shipments start */
	it(resourceType + '.shipments', async () => {
	
		const id = TestData.id
		const params = { fields: { shipments: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((config) => {
			expect(config.method).toBe('get')
			checkCommon(config, resourceType, id, currentAccessToken, 'shipments')
			checkCommonParams(config, params)
			return interceptRequest()
		})
	
		await cl[resourceType].shipments(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* relationship.shipments stop */
	

	/* relationship.payment_options start */
	it(resourceType + '.payment_options', async () => {
	
		const id = TestData.id
		const params = { fields: { payment_options: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((config) => {
			expect(config.method).toBe('get')
			checkCommon(config, resourceType, id, currentAccessToken, 'payment_options')
			checkCommonParams(config, params)
			return interceptRequest()
		})
	
		await cl[resourceType].payment_options(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* relationship.payment_options stop */
	

	/* relationship.authorizations start */
	it(resourceType + '.authorizations', async () => {
	
		const id = TestData.id
		const params = { fields: { authorizations: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((config) => {
			expect(config.method).toBe('get')
			checkCommon(config, resourceType, id, currentAccessToken, 'authorizations')
			checkCommonParams(config, params)
			return interceptRequest()
		})
	
		await cl[resourceType].authorizations(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* relationship.authorizations stop */
	

	/* relationship.captures start */
	it(resourceType + '.captures', async () => {
	
		const id = TestData.id
		const params = { fields: { captures: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((config) => {
			expect(config.method).toBe('get')
			checkCommon(config, resourceType, id, currentAccessToken, 'captures')
			checkCommonParams(config, params)
			return interceptRequest()
		})
	
		await cl[resourceType].captures(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* relationship.captures stop */
	

	/* relationship.voids start */
	it(resourceType + '.voids', async () => {
	
		const id = TestData.id
		const params = { fields: { voids: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((config) => {
			expect(config.method).toBe('get')
			checkCommon(config, resourceType, id, currentAccessToken, 'voids')
			checkCommonParams(config, params)
			return interceptRequest()
		})
	
		await cl[resourceType].voids(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* relationship.voids stop */
	

	/* relationship.refunds start */
	it(resourceType + '.refunds', async () => {
	
		const id = TestData.id
		const params = { fields: { refunds: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((config) => {
			expect(config.method).toBe('get')
			checkCommon(config, resourceType, id, currentAccessToken, 'refunds')
			checkCommonParams(config, params)
			return interceptRequest()
		})
	
		await cl[resourceType].refunds(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* relationship.refunds stop */
	

	/* relationship.returns start */
	it(resourceType + '.returns', async () => {
	
		const id = TestData.id
		const params = { fields: { returns: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((config) => {
			expect(config.method).toBe('get')
			checkCommon(config, resourceType, id, currentAccessToken, 'returns')
			checkCommonParams(config, params)
			return interceptRequest()
		})
	
		await cl[resourceType].returns(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* relationship.returns stop */
	

	/* relationship.order_subscription start */
	it(resourceType + '.order_subscription', async () => {
	
		const id = TestData.id
		const params = { fields: { order_subscriptions: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((config) => {
			expect(config.method).toBe('get')
			checkCommon(config, resourceType, id, currentAccessToken, 'order_subscription')
			checkCommonParams(config, params)
			return interceptRequest()
		})
	
		await cl[resourceType].order_subscription(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* relationship.order_subscription stop */
	

	/* relationship.order_subscriptions start */
	it(resourceType + '.order_subscriptions', async () => {
	
		const id = TestData.id
		const params = { fields: { order_subscriptions: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((config) => {
			expect(config.method).toBe('get')
			checkCommon(config, resourceType, id, currentAccessToken, 'order_subscriptions')
			checkCommonParams(config, params)
			return interceptRequest()
		})
	
		await cl[resourceType].order_subscriptions(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* relationship.order_subscriptions stop */
	

	/* relationship.order_factories start */
	it(resourceType + '.order_factories', async () => {
	
		const id = TestData.id
		const params = { fields: { order_factories: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((config) => {
			expect(config.method).toBe('get')
			checkCommon(config, resourceType, id, currentAccessToken, 'order_factories')
			checkCommonParams(config, params)
			return interceptRequest()
		})
	
		await cl[resourceType].order_factories(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* relationship.order_factories stop */
	

	/* relationship.order_copies start */
	it(resourceType + '.order_copies', async () => {
	
		const id = TestData.id
		const params = { fields: { order_copies: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((config) => {
			expect(config.method).toBe('get')
			checkCommon(config, resourceType, id, currentAccessToken, 'order_copies')
			checkCommonParams(config, params)
			return interceptRequest()
		})
	
		await cl[resourceType].order_copies(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* relationship.order_copies stop */
	

	/* relationship.recurring_order_copies start */
	it(resourceType + '.recurring_order_copies', async () => {
	
		const id = TestData.id
		const params = { fields: { recurring_order_copies: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((config) => {
			expect(config.method).toBe('get')
			checkCommon(config, resourceType, id, currentAccessToken, 'recurring_order_copies')
			checkCommonParams(config, params)
			return interceptRequest()
		})
	
		await cl[resourceType].recurring_order_copies(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* relationship.recurring_order_copies stop */
	

	/* relationship.attachments start */
	it(resourceType + '.attachments', async () => {
	
		const id = TestData.id
		const params = { fields: { attachments: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((config) => {
			expect(config.method).toBe('get')
			checkCommon(config, resourceType, id, currentAccessToken, 'attachments')
			checkCommonParams(config, params)
			return interceptRequest()
		})
	
		await cl[resourceType].attachments(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* relationship.attachments stop */
	

	/* relationship.resource_errors start */
	it(resourceType + '.resource_errors', async () => {
	
		const id = TestData.id
		const params = { fields: { resource_errors: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((config) => {
			expect(config.method).toBe('get')
			checkCommon(config, resourceType, id, currentAccessToken, 'resource_errors')
			checkCommonParams(config, params)
			return interceptRequest()
		})
	
		await cl[resourceType].resource_errors(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* relationship.resource_errors stop */
	

	/* relationship.events start */
	it(resourceType + '.events', async () => {
	
		const id = TestData.id
		const params = { fields: { events: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((config) => {
			expect(config.method).toBe('get')
			checkCommon(config, resourceType, id, currentAccessToken, 'events')
			checkCommonParams(config, params)
			return interceptRequest()
		})
	
		await cl[resourceType].events(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* relationship.events stop */
	

	/* relationship.tags start */
	it(resourceType + '.tags', async () => {
	
		const id = TestData.id
		const params = { fields: { tags: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((config) => {
			expect(config.method).toBe('get')
			checkCommon(config, resourceType, id, currentAccessToken, 'tags')
			checkCommonParams(config, params)
			return interceptRequest()
		})
	
		await cl[resourceType].tags(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* relationship.tags stop */
	

	/* relationship.versions start */
	it(resourceType + '.versions', async () => {
	
		const id = TestData.id
		const params = { fields: { versions: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((config) => {
			expect(config.method).toBe('get')
			checkCommon(config, resourceType, id, currentAccessToken, 'versions')
			checkCommonParams(config, params)
			return interceptRequest()
		})
	
		await cl[resourceType].versions(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* relationship.versions stop */
	
  

	/* trigger._archive start */
	it(resourceType + '._archive', async () => {
	
		let triggerAttr = '_archive'
		if (!triggerAttr.startsWith('_')) triggerAttr = `_${triggerAttr}`
	
		const triggerValue = true
		const attributes = { [triggerAttr]: triggerValue }
	    const id = TestData.id
	
		const intId = cl.addRequestInterceptor((config) => {
			expect(config.method).toBe('patch')
			checkCommon(config, resourceType, id, currentAccessToken)
			checkCommonData(config, resourceType, attributes, id)
			return interceptRequest()
		})
	
		await cl[resourceType]._archive(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* trigger._archive stop */
	

	/* trigger._unarchive start */
	it(resourceType + '._unarchive', async () => {
	
		let triggerAttr = '_unarchive'
		if (!triggerAttr.startsWith('_')) triggerAttr = `_${triggerAttr}`
	
		const triggerValue = true
		const attributes = { [triggerAttr]: triggerValue }
	    const id = TestData.id
	
		const intId = cl.addRequestInterceptor((config) => {
			expect(config.method).toBe('patch')
			checkCommon(config, resourceType, id, currentAccessToken)
			checkCommonData(config, resourceType, attributes, id)
			return interceptRequest()
		})
	
		await cl[resourceType]._unarchive(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* trigger._unarchive stop */
	

	/* trigger._pending start */
	it(resourceType + '._pending', async () => {
	
		let triggerAttr = '_pending'
		if (!triggerAttr.startsWith('_')) triggerAttr = `_${triggerAttr}`
	
		const triggerValue = true
		const attributes = { [triggerAttr]: triggerValue }
	    const id = TestData.id
	
		const intId = cl.addRequestInterceptor((config) => {
			expect(config.method).toBe('patch')
			checkCommon(config, resourceType, id, currentAccessToken)
			checkCommonData(config, resourceType, attributes, id)
			return interceptRequest()
		})
	
		await cl[resourceType]._pending(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* trigger._pending stop */
	

	/* trigger._place start */
	it(resourceType + '._place', async () => {
	
		let triggerAttr = '_place'
		if (!triggerAttr.startsWith('_')) triggerAttr = `_${triggerAttr}`
	
		const triggerValue = true
		const attributes = { [triggerAttr]: triggerValue }
	    const id = TestData.id
	
		const intId = cl.addRequestInterceptor((config) => {
			expect(config.method).toBe('patch')
			checkCommon(config, resourceType, id, currentAccessToken)
			checkCommonData(config, resourceType, attributes, id)
			return interceptRequest()
		})
	
		await cl[resourceType]._place(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* trigger._place stop */
	

	/* trigger._cancel start */
	it(resourceType + '._cancel', async () => {
	
		let triggerAttr = '_cancel'
		if (!triggerAttr.startsWith('_')) triggerAttr = `_${triggerAttr}`
	
		const triggerValue = true
		const attributes = { [triggerAttr]: triggerValue }
	    const id = TestData.id
	
		const intId = cl.addRequestInterceptor((config) => {
			expect(config.method).toBe('patch')
			checkCommon(config, resourceType, id, currentAccessToken)
			checkCommonData(config, resourceType, attributes, id)
			return interceptRequest()
		})
	
		await cl[resourceType]._cancel(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* trigger._cancel stop */
	

	/* trigger._approve start */
	it(resourceType + '._approve', async () => {
	
		let triggerAttr = '_approve'
		if (!triggerAttr.startsWith('_')) triggerAttr = `_${triggerAttr}`
	
		const triggerValue = true
		const attributes = { [triggerAttr]: triggerValue }
	    const id = TestData.id
	
		const intId = cl.addRequestInterceptor((config) => {
			expect(config.method).toBe('patch')
			checkCommon(config, resourceType, id, currentAccessToken)
			checkCommonData(config, resourceType, attributes, id)
			return interceptRequest()
		})
	
		await cl[resourceType]._approve(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* trigger._approve stop */
	

	/* trigger._approve_and_capture start */
	it(resourceType + '._approve_and_capture', async () => {
	
		let triggerAttr = '_approve_and_capture'
		if (!triggerAttr.startsWith('_')) triggerAttr = `_${triggerAttr}`
	
		const triggerValue = true
		const attributes = { [triggerAttr]: triggerValue }
	    const id = TestData.id
	
		const intId = cl.addRequestInterceptor((config) => {
			expect(config.method).toBe('patch')
			checkCommon(config, resourceType, id, currentAccessToken)
			checkCommonData(config, resourceType, attributes, id)
			return interceptRequest()
		})
	
		await cl[resourceType]._approve_and_capture(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* trigger._approve_and_capture stop */
	

	/* trigger._authorize start */
	it(resourceType + '._authorize', async () => {
	
		let triggerAttr = '_authorize'
		if (!triggerAttr.startsWith('_')) triggerAttr = `_${triggerAttr}`
	
		const triggerValue = true
		const attributes = { [triggerAttr]: triggerValue }
	    const id = TestData.id
	
		const intId = cl.addRequestInterceptor((config) => {
			expect(config.method).toBe('patch')
			checkCommon(config, resourceType, id, currentAccessToken)
			checkCommonData(config, resourceType, attributes, id)
			return interceptRequest()
		})
	
		await cl[resourceType]._authorize(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* trigger._authorize stop */
	

	/* trigger._authorization_amount_cents start */
	it(resourceType + '._authorization_amount_cents', async () => {
	
		let triggerAttr = '_authorization_amount_cents'
		if (!triggerAttr.startsWith('_')) triggerAttr = `_${triggerAttr}`
	
		const triggerValue = randomValue('integer')
		const attributes = { [triggerAttr]: triggerValue }
	    const id = TestData.id
	
		const intId = cl.addRequestInterceptor((config) => {
			expect(config.method).toBe('patch')
			checkCommon(config, resourceType, id, currentAccessToken)
			checkCommonData(config, resourceType, attributes, id)
			return interceptRequest()
		})
	
		await cl[resourceType]._authorization_amount_cents(id, triggerValue, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* trigger._authorization_amount_cents stop */
	

	/* trigger._capture start */
	it(resourceType + '._capture', async () => {
	
		let triggerAttr = '_capture'
		if (!triggerAttr.startsWith('_')) triggerAttr = `_${triggerAttr}`
	
		const triggerValue = true
		const attributes = { [triggerAttr]: triggerValue }
	    const id = TestData.id
	
		const intId = cl.addRequestInterceptor((config) => {
			expect(config.method).toBe('patch')
			checkCommon(config, resourceType, id, currentAccessToken)
			checkCommonData(config, resourceType, attributes, id)
			return interceptRequest()
		})
	
		await cl[resourceType]._capture(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* trigger._capture stop */
	

	/* trigger._refund start */
	it(resourceType + '._refund', async () => {
	
		let triggerAttr = '_refund'
		if (!triggerAttr.startsWith('_')) triggerAttr = `_${triggerAttr}`
	
		const triggerValue = true
		const attributes = { [triggerAttr]: triggerValue }
	    const id = TestData.id
	
		const intId = cl.addRequestInterceptor((config) => {
			expect(config.method).toBe('patch')
			checkCommon(config, resourceType, id, currentAccessToken)
			checkCommonData(config, resourceType, attributes, id)
			return interceptRequest()
		})
	
		await cl[resourceType]._refund(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* trigger._refund stop */
	

	/* trigger._fulfill start */
	it(resourceType + '._fulfill', async () => {
	
		let triggerAttr = '_fulfill'
		if (!triggerAttr.startsWith('_')) triggerAttr = `_${triggerAttr}`
	
		const triggerValue = true
		const attributes = { [triggerAttr]: triggerValue }
	    const id = TestData.id
	
		const intId = cl.addRequestInterceptor((config) => {
			expect(config.method).toBe('patch')
			checkCommon(config, resourceType, id, currentAccessToken)
			checkCommonData(config, resourceType, attributes, id)
			return interceptRequest()
		})
	
		await cl[resourceType]._fulfill(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* trigger._fulfill stop */
	

	/* trigger._update_taxes start */
	it(resourceType + '._update_taxes', async () => {
	
		let triggerAttr = '_update_taxes'
		if (!triggerAttr.startsWith('_')) triggerAttr = `_${triggerAttr}`
	
		const triggerValue = true
		const attributes = { [triggerAttr]: triggerValue }
	    const id = TestData.id
	
		const intId = cl.addRequestInterceptor((config) => {
			expect(config.method).toBe('patch')
			checkCommon(config, resourceType, id, currentAccessToken)
			checkCommonData(config, resourceType, attributes, id)
			return interceptRequest()
		})
	
		await cl[resourceType]._update_taxes(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* trigger._update_taxes stop */
	

	/* trigger._nullify_payment_source start */
	it(resourceType + '._nullify_payment_source', async () => {
	
		let triggerAttr = '_nullify_payment_source'
		if (!triggerAttr.startsWith('_')) triggerAttr = `_${triggerAttr}`
	
		const triggerValue = true
		const attributes = { [triggerAttr]: triggerValue }
	    const id = TestData.id
	
		const intId = cl.addRequestInterceptor((config) => {
			expect(config.method).toBe('patch')
			checkCommon(config, resourceType, id, currentAccessToken)
			checkCommonData(config, resourceType, attributes, id)
			return interceptRequest()
		})
	
		await cl[resourceType]._nullify_payment_source(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* trigger._nullify_payment_source stop */
	

	/* trigger._billing_address_clone_id start */
	it(resourceType + '._billing_address_clone_id', async () => {
	
		let triggerAttr = '_billing_address_clone_id'
		if (!triggerAttr.startsWith('_')) triggerAttr = `_${triggerAttr}`
	
		const triggerValue = randomValue('string')
		const attributes = { [triggerAttr]: triggerValue }
	    const id = TestData.id
	
		const intId = cl.addRequestInterceptor((config) => {
			expect(config.method).toBe('patch')
			checkCommon(config, resourceType, id, currentAccessToken)
			checkCommonData(config, resourceType, attributes, id)
			return interceptRequest()
		})
	
		await cl[resourceType]._billing_address_clone_id(id, triggerValue, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* trigger._billing_address_clone_id stop */
	

	/* trigger._shipping_address_clone_id start */
	it(resourceType + '._shipping_address_clone_id', async () => {
	
		let triggerAttr = '_shipping_address_clone_id'
		if (!triggerAttr.startsWith('_')) triggerAttr = `_${triggerAttr}`
	
		const triggerValue = randomValue('string')
		const attributes = { [triggerAttr]: triggerValue }
	    const id = TestData.id
	
		const intId = cl.addRequestInterceptor((config) => {
			expect(config.method).toBe('patch')
			checkCommon(config, resourceType, id, currentAccessToken)
			checkCommonData(config, resourceType, attributes, id)
			return interceptRequest()
		})
	
		await cl[resourceType]._shipping_address_clone_id(id, triggerValue, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* trigger._shipping_address_clone_id stop */
	

	/* trigger._customer_payment_source_id start */
	it(resourceType + '._customer_payment_source_id', async () => {
	
		let triggerAttr = '_customer_payment_source_id'
		if (!triggerAttr.startsWith('_')) triggerAttr = `_${triggerAttr}`
	
		const triggerValue = randomValue('string')
		const attributes = { [triggerAttr]: triggerValue }
	    const id = TestData.id
	
		const intId = cl.addRequestInterceptor((config) => {
			expect(config.method).toBe('patch')
			checkCommon(config, resourceType, id, currentAccessToken)
			checkCommonData(config, resourceType, attributes, id)
			return interceptRequest()
		})
	
		await cl[resourceType]._customer_payment_source_id(id, triggerValue, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* trigger._customer_payment_source_id stop */
	

	/* trigger._shipping_address_same_as_billing start */
	it(resourceType + '._shipping_address_same_as_billing', async () => {
	
		let triggerAttr = '_shipping_address_same_as_billing'
		if (!triggerAttr.startsWith('_')) triggerAttr = `_${triggerAttr}`
	
		const triggerValue = true
		const attributes = { [triggerAttr]: triggerValue }
	    const id = TestData.id
	
		const intId = cl.addRequestInterceptor((config) => {
			expect(config.method).toBe('patch')
			checkCommon(config, resourceType, id, currentAccessToken)
			checkCommonData(config, resourceType, attributes, id)
			return interceptRequest()
		})
	
		await cl[resourceType]._shipping_address_same_as_billing(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* trigger._shipping_address_same_as_billing stop */
	

	/* trigger._billing_address_same_as_shipping start */
	it(resourceType + '._billing_address_same_as_shipping', async () => {
	
		let triggerAttr = '_billing_address_same_as_shipping'
		if (!triggerAttr.startsWith('_')) triggerAttr = `_${triggerAttr}`
	
		const triggerValue = true
		const attributes = { [triggerAttr]: triggerValue }
	    const id = TestData.id
	
		const intId = cl.addRequestInterceptor((config) => {
			expect(config.method).toBe('patch')
			checkCommon(config, resourceType, id, currentAccessToken)
			checkCommonData(config, resourceType, attributes, id)
			return interceptRequest()
		})
	
		await cl[resourceType]._billing_address_same_as_shipping(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* trigger._billing_address_same_as_shipping stop */
	

	/* trigger._commit_invoice start */
	it(resourceType + '._commit_invoice', async () => {
	
		let triggerAttr = '_commit_invoice'
		if (!triggerAttr.startsWith('_')) triggerAttr = `_${triggerAttr}`
	
		const triggerValue = true
		const attributes = { [triggerAttr]: triggerValue }
	    const id = TestData.id
	
		const intId = cl.addRequestInterceptor((config) => {
			expect(config.method).toBe('patch')
			checkCommon(config, resourceType, id, currentAccessToken)
			checkCommonData(config, resourceType, attributes, id)
			return interceptRequest()
		})
	
		await cl[resourceType]._commit_invoice(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* trigger._commit_invoice stop */
	

	/* trigger._refund_invoice start */
	it(resourceType + '._refund_invoice', async () => {
	
		let triggerAttr = '_refund_invoice'
		if (!triggerAttr.startsWith('_')) triggerAttr = `_${triggerAttr}`
	
		const triggerValue = true
		const attributes = { [triggerAttr]: triggerValue }
	    const id = TestData.id
	
		const intId = cl.addRequestInterceptor((config) => {
			expect(config.method).toBe('patch')
			checkCommon(config, resourceType, id, currentAccessToken)
			checkCommonData(config, resourceType, attributes, id)
			return interceptRequest()
		})
	
		await cl[resourceType]._refund_invoice(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* trigger._refund_invoice stop */
	

	/* trigger._save_payment_source_to_customer_wallet start */
	it(resourceType + '._save_payment_source_to_customer_wallet', async () => {
	
		let triggerAttr = '_save_payment_source_to_customer_wallet'
		if (!triggerAttr.startsWith('_')) triggerAttr = `_${triggerAttr}`
	
		const triggerValue = true
		const attributes = { [triggerAttr]: triggerValue }
	    const id = TestData.id
	
		const intId = cl.addRequestInterceptor((config) => {
			expect(config.method).toBe('patch')
			checkCommon(config, resourceType, id, currentAccessToken)
			checkCommonData(config, resourceType, attributes, id)
			return interceptRequest()
		})
	
		await cl[resourceType]._save_payment_source_to_customer_wallet(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* trigger._save_payment_source_to_customer_wallet stop */
	

	/* trigger._save_shipping_address_to_customer_address_book start */
	it(resourceType + '._save_shipping_address_to_customer_address_book', async () => {
	
		let triggerAttr = '_save_shipping_address_to_customer_address_book'
		if (!triggerAttr.startsWith('_')) triggerAttr = `_${triggerAttr}`
	
		const triggerValue = true
		const attributes = { [triggerAttr]: triggerValue }
	    const id = TestData.id
	
		const intId = cl.addRequestInterceptor((config) => {
			expect(config.method).toBe('patch')
			checkCommon(config, resourceType, id, currentAccessToken)
			checkCommonData(config, resourceType, attributes, id)
			return interceptRequest()
		})
	
		await cl[resourceType]._save_shipping_address_to_customer_address_book(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* trigger._save_shipping_address_to_customer_address_book stop */
	

	/* trigger._save_billing_address_to_customer_address_book start */
	it(resourceType + '._save_billing_address_to_customer_address_book', async () => {
	
		let triggerAttr = '_save_billing_address_to_customer_address_book'
		if (!triggerAttr.startsWith('_')) triggerAttr = `_${triggerAttr}`
	
		const triggerValue = true
		const attributes = { [triggerAttr]: triggerValue }
	    const id = TestData.id
	
		const intId = cl.addRequestInterceptor((config) => {
			expect(config.method).toBe('patch')
			checkCommon(config, resourceType, id, currentAccessToken)
			checkCommonData(config, resourceType, attributes, id)
			return interceptRequest()
		})
	
		await cl[resourceType]._save_billing_address_to_customer_address_book(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* trigger._save_billing_address_to_customer_address_book stop */
	

	/* trigger._refresh start */
	it(resourceType + '._refresh', async () => {
	
		let triggerAttr = '_refresh'
		if (!triggerAttr.startsWith('_')) triggerAttr = `_${triggerAttr}`
	
		const triggerValue = true
		const attributes = { [triggerAttr]: triggerValue }
	    const id = TestData.id
	
		const intId = cl.addRequestInterceptor((config) => {
			expect(config.method).toBe('patch')
			checkCommon(config, resourceType, id, currentAccessToken)
			checkCommonData(config, resourceType, attributes, id)
			return interceptRequest()
		})
	
		await cl[resourceType]._refresh(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* trigger._refresh stop */
	

	/* trigger._validate start */
	it(resourceType + '._validate', async () => {
	
		let triggerAttr = '_validate'
		if (!triggerAttr.startsWith('_')) triggerAttr = `_${triggerAttr}`
	
		const triggerValue = true
		const attributes = { [triggerAttr]: triggerValue }
	    const id = TestData.id
	
		const intId = cl.addRequestInterceptor((config) => {
			expect(config.method).toBe('patch')
			checkCommon(config, resourceType, id, currentAccessToken)
			checkCommonData(config, resourceType, attributes, id)
			return interceptRequest()
		})
	
		await cl[resourceType]._validate(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* trigger._validate stop */
	

	/* trigger._create_subscriptions start */
	it(resourceType + '._create_subscriptions', async () => {
	
		let triggerAttr = '_create_subscriptions'
		if (!triggerAttr.startsWith('_')) triggerAttr = `_${triggerAttr}`
	
		const triggerValue = true
		const attributes = { [triggerAttr]: triggerValue }
	    const id = TestData.id
	
		const intId = cl.addRequestInterceptor((config) => {
			expect(config.method).toBe('patch')
			checkCommon(config, resourceType, id, currentAccessToken)
			checkCommonData(config, resourceType, attributes, id)
			return interceptRequest()
		})
	
		await cl[resourceType]._create_subscriptions(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* trigger._create_subscriptions stop */
	

	/* trigger._start_editing start */
	it(resourceType + '._start_editing', async () => {
	
		let triggerAttr = '_start_editing'
		if (!triggerAttr.startsWith('_')) triggerAttr = `_${triggerAttr}`
	
		const triggerValue = true
		const attributes = { [triggerAttr]: triggerValue }
	    const id = TestData.id
	
		const intId = cl.addRequestInterceptor((config) => {
			expect(config.method).toBe('patch')
			checkCommon(config, resourceType, id, currentAccessToken)
			checkCommonData(config, resourceType, attributes, id)
			return interceptRequest()
		})
	
		await cl[resourceType]._start_editing(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* trigger._start_editing stop */
	

	/* trigger._stop_editing start */
	it(resourceType + '._stop_editing', async () => {
	
		let triggerAttr = '_stop_editing'
		if (!triggerAttr.startsWith('_')) triggerAttr = `_${triggerAttr}`
	
		const triggerValue = true
		const attributes = { [triggerAttr]: triggerValue }
	    const id = TestData.id
	
		const intId = cl.addRequestInterceptor((config) => {
			expect(config.method).toBe('patch')
			checkCommon(config, resourceType, id, currentAccessToken)
			checkCommonData(config, resourceType, attributes, id)
			return interceptRequest()
		})
	
		await cl[resourceType]._stop_editing(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* trigger._stop_editing stop */
	

	/* trigger._reset_circuit start */
	it(resourceType + '._reset_circuit', async () => {
	
		let triggerAttr = '_reset_circuit'
		if (!triggerAttr.startsWith('_')) triggerAttr = `_${triggerAttr}`
	
		const triggerValue = true
		const attributes = { [triggerAttr]: triggerValue }
	    const id = TestData.id
	
		const intId = cl.addRequestInterceptor((config) => {
			expect(config.method).toBe('patch')
			checkCommon(config, resourceType, id, currentAccessToken)
			checkCommonData(config, resourceType, attributes, id)
			return interceptRequest()
		})
	
		await cl[resourceType]._reset_circuit(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* trigger._reset_circuit stop */
	
})
