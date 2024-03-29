
import { CommerceLayerInitConfig, customersClient } from '../lib/index'
import { handleError, init, initConfig } from './util'



  ; (async () => {

    const config: CommerceLayerInitConfig = await initConfig()
    const customers = customersClient(config)
   // const cl = await init()

    try {

      const start = Date.now()
      const res = await customers.list()
      console.log(res)
      console.log(Date.now() - start)

    } catch (error: any) {
      handleError(error)
    }

  })()
