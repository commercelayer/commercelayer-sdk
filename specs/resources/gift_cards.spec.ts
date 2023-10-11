/**
 * ©2023 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen
 **/

import { CommerceLayerClient, GiftCard } from '../../src'
import { isEqual } from 'lodash'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getClient, TestData, CommonData, handleError, interceptRequest, checkCommon, checkCommonData, checkCommonParamsList, checkCommonParams, currentAccessToken, randomValue } from '../../test/common'



let cl: CommerceLayerClient


beforeAll(async () => { cl = await getClient() })


describe('GiftCards resource', () => {

  const resourceType = 'gift_cards'


  /* spec.create.start */
  it(resourceType + '.create', async () => {

    const createAttributes = {
			balance_cents: randomValue('integer', 'balance_cents'),
			market: cl.markets.relationship(TestData.id),
			gift_card_recipient: cl.gift_card_recipients.relationship(TestData.id),
			tags: [ cl.tags.relationship(TestData.id) ],
		}

    const attributes = { ...createAttributes, reference: TestData.reference }
    const params = { fields: { [resourceType]: CommonData.paramsFields } }
    const resData = attributes

    const intId = cl.addRequestInterceptor((config) => {
      expect(config.method).toBe('post')
      checkCommon(config, resourceType)
      checkCommonData(config, resourceType, attributes)
      expect(cl[resourceType].isGiftCard(config.data.data)).toBeTruthy()
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
    expect(cl[resourceType].isGiftCard(resource)).toBeTruthy()

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
          "self": "/api/${resourceType}/AbcdEfgHiL"
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

    const res = cl[resourceType].parse(payload) as GiftCard

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
	

	/* relationship.gift_card_recipient start */
	it(resourceType + '.gift_card_recipient', async () => {
	
		const id = TestData.id
		const params = { fields: { gift_card_recipients: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((config) => {
			expect(config.method).toBe('get')
			checkCommon(config, resourceType, id, currentAccessToken, 'gift_card_recipient')
			checkCommonParams(config, params)
			return interceptRequest()
		})
	
		await cl[resourceType].gift_card_recipient(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* relationship.gift_card_recipient stop */
	

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
	
  

	/* trigger._purchase start */
	it(resourceType + '._purchase', async () => {
	
		let triggerAttr = '_purchase'
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
	
		await cl[resourceType]._purchase(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* trigger._purchase stop */
	

	/* trigger._activate start */
	it(resourceType + '._activate', async () => {
	
		let triggerAttr = '_activate'
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
	
		await cl[resourceType]._activate(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* trigger._activate stop */
	

	/* trigger._deactivate start */
	it(resourceType + '._deactivate', async () => {
	
		let triggerAttr = '_deactivate'
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
	
		await cl[resourceType]._deactivate(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* trigger._deactivate stop */
	

	/* trigger._balance_change_cents start */
	it(resourceType + '._balance_change_cents', async () => {
	
		let triggerAttr = '_balance_change_cents'
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
	
		await cl[resourceType]._balance_change_cents(id, triggerValue, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* trigger._balance_change_cents stop */
	
})
