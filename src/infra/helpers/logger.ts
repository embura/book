import pino from 'pino'

export const makeLogger = (requestId: string) => {
  return pino({
    level: process.env['LOG_LEVEL'] ?? 'info',
    mixin() {
      return {
        requestId
      }
    }
  })
}
