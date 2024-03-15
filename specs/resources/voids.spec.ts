/**
 * ©2024 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen
 **/

import { CommerceLayerClient, Void } from '../../src'
import { isEqual } from 'lodash'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getClient, TestData, CommonData, handleError, interceptRequest, checkCommon, checkCommonData, checkCommonParamsList, checkCommonParams, currentAccessToken, randomValue } from '../../test/common'



let cl: CommerceLayerClient


beforeAll(async () => { cl = await getClient() })


describe('Voids resource', () => {

  const resourceType = 'voids'


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
    expect(cl[resourceType].isVoid(resource)).toBeTruthy()

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

    const res = cl[resourceType].parse(payload) as Void

    expect(res.type).toBe(resourceType)
    expect(res.reference).toBe(reference)

  })
  /* spec.parse.stop */

  

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
	

	/* relationship.reference_authorization start */
	it(resourceType + '.reference_authorization', async () => {
	
		const id = TestData.id
		const params = { fields: { authorizations: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((config) => {
			expect(config.method).toBe('get')
			checkCommon(config, resourceType, id, currentAccessToken, 'reference_authorization')
			checkCommonParams(config, params)
			return interceptRequest()
		})
	
		await cl[resourceType].reference_authorization(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	/* relationship.reference_authorization stop */
	
  
})
