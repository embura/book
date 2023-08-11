import 'reflect-metadata'

import { errorHandler } from '@infra/helpers/errorHandler'
import { MakeAppExecutor, Request } from './types'
import { Context } from 'aws-lambda'
import { makeApp } from './makeApp'

export const makeAppExecutor: MakeAppExecutor =
  (runner, module) => async (request: Request, context: Context) => {
    const { app, logger } = await makeApp(module, context.awsRequestId)

    try {
      logger.info({ request }, 'Request received')
      return await runner(app, request)
    } catch (error) {
      return errorHandler(error, logger, context.awsRequestId)
    } finally {
      await app.close()
    }
  }
