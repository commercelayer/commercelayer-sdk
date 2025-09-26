/**
 * ©2025 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen
 **/

import { expect, test, beforeAll, describe } from 'vitest'
import { CommerceLayerClient, FixedPricePromotion, fixed_price_promotions, markets, order_amount_promotion_rules, sku_list_promotion_rules, coupon_codes_promotion_rules, custom_promotion_rules, sku_lists, tags } from '../../lib'
import { isDeepStrictEqual } from 'node:util'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getClient, TestData, CommonData, handleError, interceptRequest, checkCommon, checkCommonData, checkCommonParamsList, checkCommonParams, currentAccessToken, randomValue } from '../../test/common'



let cl: CommerceLayerClient


beforeAll(async () => { cl = await getClient() })


describe('FixedPricePromotions resource', () => {

  const resourceType = 'fixed_price_promotions'
  const resourcePath = 'fixed_price_promotions'


  /* spec.create.start */
  test(resourceType + '.create', async () => {

    const createAttributes = {
			name: randomValue('string', 'name'),
			starts_at: randomValue('string', 'starts_at'),
			expires_at: randomValue('string', 'expires_at'),
			fixed_amount_cents: randomValue('integer', 'fixed_amount_cents'),
			market: markets.relationship(TestData.id),
			order_amount_promotion_rule: order_amount_promotion_rules.relationship(TestData.id),
			sku_list_promotion_rule: sku_list_promotion_rules.relationship(TestData.id),
			coupon_codes_promotion_rule: coupon_codes_promotion_rules.relationship(TestData.id),
			custom_promotion_rule: custom_promotion_rules.relationship(TestData.id),
			sku_list: sku_lists.relationship(TestData.id),
			tags: [ tags.relationship(TestData.id) ],
		}

    const attributes = { ...createAttributes, reference: TestData.reference }
    const params = { fields: { [resourceType]: CommonData.paramsFields } }
    const resData = attributes

    cl.addRequestInterceptor((request) => {
      const data = JSON.parse(String(request.options.body))
      expect(request.options.method).toBe('POST')
      checkCommon(request, resourcePath)
      checkCommonData(data, resourceType, attributes)
      expect(fixed_price_promotions.isFixedPricePromotion(data.data)).toBeTruthy()
      return interceptRequest()
    })

    await fixed_price_promotions.create(resData, params, CommonData.options)
      .then((res: FixedPricePromotion) =>  expect(res).not.toBeNull())
      .catch(handleError)
      .finally(() => cl.removeInterceptor('request'))

  })
  /* spec.create.stop */


  /* spec.retrieve.start */
  test(resourceType + '.retrieve', async () => {

    const id = TestData.id
    const params = { fields: {[resourceType]: CommonData.paramsFields } }

    cl.addRequestInterceptor((request) => {
      expect(request.options.method).toBe('GET')
      checkCommon(request, resourcePath, id, currentAccessToken)
      checkCommonParams(request, params)
      return interceptRequest()
    })

    await fixed_price_promotions.retrieve(id, params, CommonData.options)
      .then((res: FixedPricePromotion) =>  expect(res).not.toBeNull())
      .catch(handleError)
      .finally(() => cl.removeInterceptor('request'))

  })
  /* spec.retrieve.stop */


  /* spec.update.start */
  test(resourceType + '.update', async () => {

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

    await fixed_price_promotions.update(resData, params, CommonData.options)
      .then((res: FixedPricePromotion) =>  expect(res).not.toBeNull())
      .catch(handleError)
      .finally(() => cl.removeInterceptor('request'))

  })
  /* spec.update.stop */


  /* spec.delete.start */
  test(resourceType + '.delete', async () => {

    const id = TestData.id

    cl.addRequestInterceptor((request) => {
      expect(request.options.method).toBe('DELETE')
      checkCommon(request, resourcePath, id, currentAccessToken)
      return interceptRequest()
    })

    await fixed_price_promotions.delete(id, CommonData.options)
      .catch(handleError)
      .finally(() => cl.removeInterceptor('request'))

  })
  /* spec.delete.stop */


  /* spec.list.start */
  test(resourceType + '.list', async () => {

    const params = CommonData.paramsList

    cl.addRequestInterceptor((request) => {
      expect(request.options.method).toBe('GET')
      checkCommon(request, resourcePath)
      checkCommonParamsList(request, params)
      return interceptRequest()
    })

    await fixed_price_promotions.list(params, CommonData.options)
      .catch(handleError)
      .finally(() => cl.removeInterceptor('request'))
    
  })
  /* spec.list.stop */


  /* spec.type.start */
  test(resourceType + '.type', async () => {

    const resource = { id: TestData.id, type: resourceType }
    expect(fixed_price_promotions.isFixedPricePromotion(resource)).toBeTruthy()

    const type = fixed_price_promotions.type()
    expect(type).toBe(resourceType)

  })
  /* spec.type.stop */


  /* spec.relationship.start */
  test(resourceType + '.relationship', async () => {

    const relId = fixed_price_promotions.relationship(TestData.id)
    expect(isDeepStrictEqual(relId, { id: TestData.id, type: resourceType}))

    const relResId = fixed_price_promotions.relationship({ id: TestData.id, type: resourceType })
    expect(isDeepStrictEqual(relResId, { id: TestData.id, type: resourceType}))

  })
  /* spec.relationship.stop */


  /* spec.parse.start */
  /*
  test(resourceType + '.parse', async () => {

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

    const res = fixed_price_promotions.parse(payload) as FixedPricePromotion

    expect(res.type).toBe(resourceType)
    expect(res.reference).toBe(reference)

  })
  */
  /* spec.parse.stop */


  /* spec.instance start */
	test(resourceType + '.instance', async () => {
    expect(fixed_price_promotions)
		expect(fixed_price_promotions.type()).toBe(resourceType)
	})
	/* spec.instance stop */

  

	
	/* relationship.market start */
	test(resourceType + '.market', async () => {
	
		const id = TestData.id
		const params = { fields: { markets: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'market')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await fixed_price_promotions.market(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.market stop */
	

	
	/* relationship.order_amount_promotion_rule start */
	test(resourceType + '.order_amount_promotion_rule', async () => {
	
		const id = TestData.id
		const params = { fields: { order_amount_promotion_rules: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'order_amount_promotion_rule')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await fixed_price_promotions.order_amount_promotion_rule(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.order_amount_promotion_rule stop */
	

	
	/* relationship.sku_list_promotion_rule start */
	test(resourceType + '.sku_list_promotion_rule', async () => {
	
		const id = TestData.id
		const params = { fields: { sku_list_promotion_rules: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'sku_list_promotion_rule')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await fixed_price_promotions.sku_list_promotion_rule(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.sku_list_promotion_rule stop */
	

	
	/* relationship.coupon_codes_promotion_rule start */
	test(resourceType + '.coupon_codes_promotion_rule', async () => {
	
		const id = TestData.id
		const params = { fields: { coupon_codes_promotion_rules: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'coupon_codes_promotion_rule')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await fixed_price_promotions.coupon_codes_promotion_rule(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.coupon_codes_promotion_rule stop */
	

	
	/* relationship.custom_promotion_rule start */
	test(resourceType + '.custom_promotion_rule', async () => {
	
		const id = TestData.id
		const params = { fields: { custom_promotion_rules: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'custom_promotion_rule')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await fixed_price_promotions.custom_promotion_rule(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.custom_promotion_rule stop */
	

	
	/* relationship.sku_list start */
	test(resourceType + '.sku_list', async () => {
	
		const id = TestData.id
		const params = { fields: { sku_lists: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'sku_list')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await fixed_price_promotions.sku_list(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.sku_list stop */
	

	
	/* relationship.coupons start */
	test(resourceType + '.coupons', async () => {
	
		const id = TestData.id
		const params = { fields: { coupons: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'coupons')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await fixed_price_promotions.coupons(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.coupons stop */
	

	
	/* relationship.attachments start */
	test(resourceType + '.attachments', async () => {
	
		const id = TestData.id
		const params = { fields: { attachments: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'attachments')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await fixed_price_promotions.attachments(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.attachments stop */
	

	
	/* relationship.events start */
	test(resourceType + '.events', async () => {
	
		const id = TestData.id
		const params = { fields: { events: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'events')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await fixed_price_promotions.events(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.events stop */
	

	
	/* relationship.tags start */
	test(resourceType + '.tags', async () => {
	
		const id = TestData.id
		const params = { fields: { tags: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'tags')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await fixed_price_promotions.tags(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.tags stop */
	

	
	/* relationship.versions start */
	test(resourceType + '.versions', async () => {
	
		const id = TestData.id
		const params = { fields: { versions: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'versions')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await fixed_price_promotions.versions(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.versions stop */
	

	
	/* relationship.event_stores start */
	test(resourceType + '.event_stores', async () => {
	
		const id = TestData.id
		const params = { fields: { event_stores: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'event_stores')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await fixed_price_promotions.event_stores(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.event_stores stop */
	

	
	/* relationship.skus start */
	test(resourceType + '.skus', async () => {
	
		const id = TestData.id
		const params = { fields: { skus: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'skus')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await fixed_price_promotions.skus(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.skus stop */
	
  

	
	/* trigger._disable start */
	test(resourceType + '._disable', async () => {
	
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
	
		await fixed_price_promotions._disable(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* trigger._disable stop */
	

	
	/* trigger._enable start */
	test(resourceType + '._enable', async () => {
	
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
	
		await fixed_price_promotions._enable(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* trigger._enable stop */
	

	
	/* trigger._add_tags start */
	test(resourceType + '._add_tags', async () => {
	
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
	
		await fixed_price_promotions._add_tags(id, triggerValue, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* trigger._add_tags stop */
	

	
	/* trigger._remove_tags start */
	test(resourceType + '._remove_tags', async () => {
	
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
	
		await fixed_price_promotions._remove_tags(id, triggerValue, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* trigger._remove_tags stop */
	
})
