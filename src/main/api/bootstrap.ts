import 'reflect-metadata'
import pino from 'pino'
import 'newrelic'
import tracer from 'cls-rtracer'
import { NestFactory } from '@nestjs/core'
import { AppModule } from '@infra/modules/app.module'

async function bootstrap() {
  const logger = pino({
    mixin: () => ({
      requestId: tracer.id()
    })
  })

  const app = await NestFactory.create(AppModule, {
    logger: {
      error: (message) => logger.error(message),
      log: (message) => logger.info(message),
      warn: (message) => logger.warn(message)
    }
  })

  await app.listen(3000)
}
bootstrap()
