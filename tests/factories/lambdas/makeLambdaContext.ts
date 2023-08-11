import { Context } from 'aws-lambda'

export const makeLambdaContext = (): Context => ({
  awsRequestId: 'test',
  callbackWaitsForEmptyEventLoop: true,
  functionName: 'saveAntifraud',
  functionVersion: '1.0',
  invokedFunctionArn: 'arn::saveAntifraud',
  memoryLimitInMB: '128',
  logGroupName: 'saveAntifraud',
  logStreamName: 'saveAntifraud',
  getRemainingTimeInMillis: () => 5000,
  done: jest.fn(),
  fail: jest.fn(),
  succeed: jest.fn()
})
