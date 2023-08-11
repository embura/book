import type { Config } from '@jest/types'
import DefaultConfig from './jest.config'

const config: Config.InitialOptions = {
  ...DefaultConfig,
  testMatch: ['**/tests/**/*.spec.ts'],
  globalSetup: undefined,
  globalTeardown: undefined
}

export default config
