/**
 * ©2025 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen
 **/

import { CommerceLayerClient, Sku } from '../../src'
import { isDeepStrictEqual } from 'node:util'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getClient, TestData, CommonData, handleError, interceptRequest, checkCommon, checkCommonData, checkCommonParamsList, checkCommonParams, currentAccessToken, randomValue } from '../../test/common'



let cl: CommerceLayerClient


beforeAll(async () => { cl = await getClient() })


describe('Skus resource', () => {

  const resourceType = 'skus'
  const resourcePath = 'skus'


  /* spec.create.start */
  it(resourceType + '.create', async () => {

    const createAttributes = {
			code: randomValue('string', 'code'),
			name: randomValue('string', 'name'),
			shipping_category: cl.shipping_categories.relationship(TestData.id),
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
      expect(cl[resourcePath].isSku(data.data)).toBeTruthy()
      return interceptRequest()
    })

    await cl[resourcePath].create(resData, params, CommonData.options)
      .then((res: Sku) =>  expect(res).not.toBeNull())
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
      .then((res: Sku) =>  expect(res).not.toBeNull())
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
      .then((res: Sku) =>  expect(res).not.toBeNull())
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
    expect(cl[resourcePath].isSku(resource)).toBeTruthy()

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

    const res = cl[resourcePath].parse(payload) as Sku

    expect(res.type).toBe(resourceType)
    expect(res.reference).toBe(reference)

  })
  */
  /* spec.parse.stop */

  

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
	

	/* relationship.prices start */
	it(resourceType + '.prices', async () => {
	
		const id = TestData.id
		const params = { fields: { prices: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'prices')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await cl[resourcePath].prices(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.prices stop */
	

	/* relationship.stock_items start */
	it(resourceType + '.stock_items', async () => {
	
		const id = TestData.id
		const params = { fields: { stock_items: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'stock_items')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await cl[resourcePath].stock_items(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.stock_items stop */
	

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
	

	/* relationship.delivery_lead_times start */
	it(resourceType + '.delivery_lead_times', async () => {
	
		const id = TestData.id
		const params = { fields: { delivery_lead_times: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'delivery_lead_times')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await cl[resourcePath].delivery_lead_times(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.delivery_lead_times stop */
	

	/* relationship.sku_options start */
	it(resourceType + '.sku_options', async () => {
	
		const id = TestData.id
		const params = { fields: { sku_options: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'sku_options')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await cl[resourcePath].sku_options(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.sku_options stop */
	

	/* relationship.sku_list_items start */
	it(resourceType + '.sku_list_items', async () => {
	
		const id = TestData.id
		const params = { fields: { sku_list_items: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'sku_list_items')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await cl[resourcePath].sku_list_items(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.sku_list_items stop */
	

	/* relationship.sku_lists start */
	it(resourceType + '.sku_lists', async () => {
	
		const id = TestData.id
		const params = { fields: { sku_lists: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'sku_lists')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await cl[resourcePath].sku_lists(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.sku_lists stop */
	

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
	

	/* relationship.jwt_customer start */
	it(resourceType + '.jwt_customer', async () => {
	
		const id = TestData.id
		const params = { fields: { customers: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'jwt_customer')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await cl[resourcePath].jwt_customer(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.jwt_customer stop */
	

	/* relationship.jwt_markets start */
	it(resourceType + '.jwt_markets', async () => {
	
		const id = TestData.id
		const params = { fields: { markets: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'jwt_markets')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await cl[resourcePath].jwt_markets(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.jwt_markets stop */
	

	/* relationship.jwt_stock_locations start */
	it(resourceType + '.jwt_stock_locations', async () => {
	
		const id = TestData.id
		const params = { fields: { stock_locations: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'jwt_stock_locations')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await cl[resourcePath].jwt_stock_locations(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.jwt_stock_locations stop */
	
  
})
