import { AppModule } from '@infra/modules/app.module'
import { NestFactory } from '@nestjs/core'
import { SupportedEvents } from './common'
import { configure } from '@vendia/serverless-express'
import { APIGatewayProxyStructuredResultV2 } from 'aws-lambda'
import { Logger } from 'pino'
import { HttpExceptionFilter } from '@infra/common/httpFilter'

type Handler = typeof configure<
  SupportedEvents,
  APIGatewayProxyStructuredResultV2
>

type ReturnedType = ReturnType<Handler>

export const makeApp = async (logger: Logger): Promise<ReturnedType> => {
  const app = await NestFactory.create(AppModule, {
    logger: {
      error: (message) => logger.error(message),
      log: (message) => logger.info(message),
      warn: (message) => logger.warn(message)
    },
    abortOnError: false
  })

  app.useGlobalFilters(new HttpExceptionFilter())

  await app.init()

  const expressApp = app.getHttpAdapter().getInstance()

  return configure<SupportedEvents, APIGatewayProxyStructuredResultV2>({
    app: expressApp
  })
}
