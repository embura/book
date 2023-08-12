import { Logger } from 'pino'
import { ZodError } from 'zod'
import { HttpStatus } from '@nestjs/common'

import {
  MissingData,
  NotFound,
  Forbidden
} from '@domain/errors'
import { InvalidTokenJWT } from '@domain/errors/InvalidTokenError'

interface Response {
  statusCode: HttpStatus
  body: string
  headers: { [header: string]: string | number | boolean }
}

export const makeErrorBody = (error: Error, statusCode: number) => {
  if (statusCode === 500) {
    return JSON.stringify({
      message: 'Internal server error'
    })
  }

  return JSON.stringify({
    reason: error.name,
    message: error.message.normalize()
  })
}

export const errorStatusCode = (error: unknown): HttpStatus => {
  if (!(error instanceof Error)) {
    return HttpStatus.INTERNAL_SERVER_ERROR
  }

  switch (error.constructor) {
    case MissingData:
      return HttpStatus.BAD_REQUEST
    case ZodError:
      return HttpStatus.BAD_REQUEST
    case NotFound:
      return HttpStatus.NOT_FOUND
    case Forbidden:
      return HttpStatus.FORBIDDEN
    case InvalidTokenJWT:
      return HttpStatus.BAD_REQUEST;
    default:
      return HttpStatus.INTERNAL_SERVER_ERROR
  }
}

export const errorHandler = (
  error: unknown,
  logger: Logger,
  requestId: string
): Response => {
  const statusCode = errorStatusCode(error)

  logger.error(error)

  if (!(error instanceof Error)) {
    return {
      statusCode,
      body: 'Unknown error',
      headers: {
        'Trace-Id': requestId
      }
    }
  }

  return {
    statusCode,
    body: makeErrorBody(error, statusCode),
    headers: {
      'Trace-Id': requestId
    }
  }
}
