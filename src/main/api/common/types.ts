import { INestApplicationContext } from '@nestjs/common'
import {
  APIGatewayProxyEventV2,
  Context,
  APIGatewayProxyStructuredResultV2,
  ALBEvent
} from 'aws-lambda'

export type SupportedEvents = APIGatewayProxyEventV2 | ALBEvent

export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

interface Parameters {
  [key: string]: string | undefined
}

export interface Request {
  path: string
  method: HTTPMethod
  body?: string
  query?: Parameters
  headers?: Parameters
}

export type Runner = (
  app: INestApplicationContext,
  request: Request
) => Promise<APIGatewayProxyStructuredResultV2>

export type AppExecutor = (
  request: Request,
  context: Context
) => Promise<APIGatewayProxyStructuredResultV2>

export type MakeAppExecutor = (runner: Runner, module: any) => AppExecutor

export const isApiGatewayEvent = (
  event: SupportedEvents
): event is APIGatewayProxyEventV2 => {
  return (event as APIGatewayProxyEventV2).routeKey !== undefined
}
