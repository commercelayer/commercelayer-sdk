/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.7.1
 **/

import { CommerceLayerClient } from '../src'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getClient, TestData, CommonData, handleError, interceptRequest, checkCommon, checkCommonData, checkCommonParamsList, checkCommonParams } from '../test/common'



let cl: CommerceLayerClient


beforeAll(async () => { cl = await getClient() })


describe('Applications resource', () => {

  const resourceType = 'application'


  /* spec.singleton.start */
  it(resourceType + '.list', async () => {

    const params = { fields: { application: CommonData.paramsFields } }

    const intId = cl.addRequestInterceptor((config) => {
      expect(config.method).toBe('get')
      checkCommon(config, resourceType)
      checkCommonParams(config, params)
      return interceptRequest()
    })

    await cl[resourceType].retrieve(params, CommonData.options)
      .catch(handleError)
      .finally(() => cl.removeInterceptor('request', intId))
    
  })
  /* spec.singleton.stop */

})
