import { NestFactory } from '@nestjs/core'
import { makeLogger } from '@infra/helpers/logger'

export const makeApp = async (module: any, requestId: string) => {
  const logger = makeLogger(requestId)
  try {
    const app = await NestFactory.createApplicationContext(module, {
      logger: false
    })

    return {
      app,
      logger
    }
  } catch (error) {
    logger.error(error, 'Error creating app')
    throw error
  }
}
