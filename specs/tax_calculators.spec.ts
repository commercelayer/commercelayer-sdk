/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.7.1
 **/

import { CommerceLayerClient } from '../src'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getClient, TestData, CommonData, handleError, interceptRequest, checkCommon, checkCommonData, checkCommonParamsList, checkCommonParams } from '../test/common'



let cl: CommerceLayerClient


beforeAll(async () => { cl = await getClient() })


describe('TaxCalculators resource', () => {

  const resourceType = 'tax_calculators'


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

})
