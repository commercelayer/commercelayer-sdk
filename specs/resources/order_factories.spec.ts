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


describe('OrderFactories resource', () => {

  const resourceType = 'order_factories'


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
    expect(cl[resourceType].isOrderFactory(resource)).toBeTruthy()

    const relId = cl[resourceType].relationship(TestData.id)
    expect(isEqual(relId, { id: TestData.id, type: resourceType}))

    const relResId = cl[resourceType].relationship({ id: TestData.id, type: resourceType })
    expect(isEqual(relResId, { id: TestData.id, type: resourceType}))

    const type = cl[resourceType].type()
    expect(type).toBe(resourceType)

  })
  /* spec.type.stop */

  

	it(resourceType + '.source_order', async () => {
	
		const id = TestData.id
		const params = { fields: { orders: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((config) => {
			expect(config.method).toBe('get')
			checkCommon(config, resourceType, id, currentAccessToken, 'source_order')
			checkCommonParams(config, params)
			return interceptRequest()
		})
	
		await cl[resourceType].source_order(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	

	it(resourceType + '.target_order', async () => {
	
		const id = TestData.id
		const params = { fields: { orders: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((config) => {
			expect(config.method).toBe('get')
			checkCommon(config, resourceType, id, currentAccessToken, 'target_order')
			checkCommonParams(config, params)
			return interceptRequest()
		})
	
		await cl[resourceType].target_order(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request', intId))
	
	})
	

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
	
})