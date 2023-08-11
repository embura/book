import { SupportedEvents } from './common'
import { Callback, Context } from 'aws-lambda'
import { makeApp } from './makeApp'
import pino from 'pino'

type Infer<T> = T extends Promise<infer Member> ? Member : T

let app: Infer<ReturnType<typeof makeApp>> | null = null

export const handler = async (
  event: SupportedEvents,
  context: Context,
  callback: Callback
) => {
  const logger = pino({
    mixin: () => ({
      requestId: context.awsRequestId
    })
  })

  try {
    if (!app) {
      app = await makeApp(logger)
    }

    const result = await app(event, context, callback)

    if (!result) {
      return
    }

    Object.assign(result, {
      headers: {
        ...result.headers,
        'trace-id': context.awsRequestId
      }
    })
    return result
  } catch (error) {
    logger.error(error)

    return {
      statusCode: 500,
      body: JSON.stringify({
        message:
          error instanceof Error ? error.message : 'Internal Server Error'
      })
    }
  }
}
