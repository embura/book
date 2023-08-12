import { ExceptionFilter, Catch, ArgumentsHost, Logger } from '@nestjs/common'
import { Request, Response } from 'express'
import { errorStatusCode } from '../helpers/errorHandler'
import { ZodError } from 'zod'

@Catch(Error)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name)

  catch(exception: Error, host: ArgumentsHost) {
    if (host.getType() !== 'http') {
      throw exception
    }

    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status = errorStatusCode(exception)
    const message = status !== 500 ? exception.message : 'Internal server error'

    this.logger.error(exception)

    const isZodError = exception.constructor === ZodError

    response.status(status).send({
      message: isZodError ? JSON.parse(message ?? '{}') : message,
      timestamp: new Date().toISOString(),
      path: request.url
    })
  }
}
