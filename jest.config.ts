import { pathsToModuleNameMapper } from 'ts-jest'
import { compilerOptions } from './tsconfig.json'
import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  rootDir: '.',
  clearMocks: true,
  collectCoverage: false,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/domain/repositories/index.ts',
    '!<rootDir>/src/infra/dto/**',
    '!<rootDir>/src/infra/common/index.ts',
    '!<rootDir>/src/infra/apps/*.ts',
    '!<rootDir>/src/infra/dtos/*.ts',
    '!<rootDir>/src/infra/env/*.ts',
    '!<rootDir>/src/**/base*.ts',
    '!<rootDir>/src/main/ioc/*',
  ],
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  roots: ['<rootDir>/src/', '<rootDir>/tests/'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.(spec|test).ts'],
  setupFilesAfterEnv: ['./jest.setup.ts'],
  globalSetup: './integration.jest.setup.ts',
  globalTeardown: './integration.jest.teardown.ts',
  testResultsProcessor: 'jest-sonar-reporter',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/'
  })
}

export default config
