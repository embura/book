import { NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import jwt_decode from 'jwt-decode'

import { Forbidden } from '@domain/errors/forbidden'
import Pino from 'pino'
const logger = Pino()

export interface Identity {
  userId: string
  providerName: string
  providerType: string
  issuer: null
  primary: string
  dateCreated: string
}

export interface Authorization {
  userId: string
}

const isForbidden = (token: string | undefined): boolean => {
  if (!token) return true

  const { userId } = jwt_decode<Authorization>(token)

  return userId !== 'userTest'
}

export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers

    if (isForbidden(authorization)) {
      logger.warn(`Forbidden: ${JSON.stringify(req.headers)}`)
      next(
        new Forbidden('Forbidden', {
          authorization
        })
      )
    } else {
      next()
    }
  }
}
