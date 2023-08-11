import type { Config } from '@jest/types'
import DefaultConfig from './jest.config'

const config: Config.InitialOptions = {
  ...DefaultConfig,
  testMatch: ['**/tests/**/*.test.ts'],
  globalSetup: './integration.jest.setup.ts',
  globalTeardown: './integration.jest.setup.ts'
}

export default config
