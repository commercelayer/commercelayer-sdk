/**
 * ©2023 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen
 **/

import { CommerceLayerClient } from '../../src'
import { isEqual } from 'lodash'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getClient, TestData, CommonData, handleError, interceptRequest, checkCommon, checkCommonData, checkCommonParamsList, checkCommonParams, currentAccessToken, randomValue } from '../../test/common'



let cl: CommerceLayerClient


beforeAll(async () => { cl = await getClient() })


describe('Returns resource', () => {

  const resourceType = 'returns'


  /* spec.create.start */
  it(resourceType + '.create', async () => {

    const createAttributes = {
			order: cl.orders.relationship(TestData.id),
			stock_location: cl.stock_locations.relationship(TestData.id),
			tags: [ cl.tags.relationship(TestData.id) ],
		}

    const attributes = { ...createAttributes, reference: TestData.reference }
    const params = { fields: { [resourceType]: CommonData.paramsFields } }
    const resData = attributes

    const intId = cl.addRequestInterceptor((config) => {
      expect(config.method).toBe('post')
      checkCommon(config, resourceType)
      checkCommonData(config, resourceType, attributes)
      expect(cl[resourceType].isReturn(config.data.data)).toBeTruthy()
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
    expect(cl[resourceType].isReturn(resource)).toBeTruthy()

    const relId = cl[resourceType].relationship(TestData.id)
    expect(isEqual(relId, { id: TestData.id, type: resourceType}))

    const relResId = cl[resourceType].relationship({ id: TestData.id, type: resourceType })
    expect(isEqual(relResId, { id: TestData.id, type: resourceType}))

    const type = cl[resourceType].type()
    expect(type).toBe(resourceType)

  })
  /* spec.type.stop */

  

	/* relationship.order start */
	it(resourceType + '.order', async () => {
	
		const id = TestData.id
		const params = { fields: { orders: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((config) => {
			expect(config.method).toBe('get')
			checkCommon(config, resourceType, id, currentAccessToken, 'order')
			checkCommonParams(config, params)
			return interceptRequest()
		})
	
		await cl[resourceType].order(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* relationship.order stop */
	

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
	

	/* relationship.stock_location start */
	it(resourceType + '.stock_location', async () => {
	
		const id = TestData.id
		const params = { fields: { stock_locations: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((config) => {
			expect(config.method).toBe('get')
			checkCommon(config, resourceType, id, currentAccessToken, 'stock_location')
			checkCommonParams(config, params)
			return interceptRequest()
		})
	
		await cl[resourceType].stock_location(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* relationship.stock_location stop */
	

	/* relationship.origin_address start */
	it(resourceType + '.origin_address', async () => {
	
		const id = TestData.id
		const params = { fields: { addresses: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((config) => {
			expect(config.method).toBe('get')
			checkCommon(config, resourceType, id, currentAccessToken, 'origin_address')
			checkCommonParams(config, params)
			return interceptRequest()
		})
	
		await cl[resourceType].origin_address(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* relationship.origin_address stop */
	

	/* relationship.destination_address start */
	it(resourceType + '.destination_address', async () => {
	
		const id = TestData.id
		const params = { fields: { addresses: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((config) => {
			expect(config.method).toBe('get')
			checkCommon(config, resourceType, id, currentAccessToken, 'destination_address')
			checkCommonParams(config, params)
			return interceptRequest()
		})
	
		await cl[resourceType].destination_address(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* relationship.destination_address stop */
	

	/* relationship.return_line_items start */
	it(resourceType + '.return_line_items', async () => {
	
		const id = TestData.id
		const params = { fields: { return_line_items: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((config) => {
			expect(config.method).toBe('get')
			checkCommon(config, resourceType, id, currentAccessToken, 'return_line_items')
			checkCommonParams(config, params)
			return interceptRequest()
		})
	
		await cl[resourceType].return_line_items(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* relationship.return_line_items stop */
	

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
	
  

	/* trigger._request start */
	it(resourceType + '._request', async () => {
	
		let triggerAttr = '_request'
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
	
		await cl[resourceType]._request(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* trigger._request stop */
	

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
	

	/* trigger._ship start */
	it(resourceType + '._ship', async () => {
	
		let triggerAttr = '_ship'
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
	
		await cl[resourceType]._ship(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* trigger._ship stop */
	

	/* trigger._reject start */
	it(resourceType + '._reject', async () => {
	
		let triggerAttr = '_reject'
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
	
		await cl[resourceType]._reject(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* trigger._reject stop */
	

	/* trigger._receive start */
	it(resourceType + '._receive', async () => {
	
		let triggerAttr = '_receive'
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
	
		await cl[resourceType]._receive(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* trigger._receive stop */
	

	/* trigger._restock start */
	it(resourceType + '._restock', async () => {
	
		let triggerAttr = '_restock'
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
	
		await cl[resourceType]._restock(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* trigger._restock stop */
	

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
	
})
