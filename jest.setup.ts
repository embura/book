import 'dotenv/config'
import 'reflect-metadata'

jest.setTimeout(90000)

process.env['NODE_ENV'] = 'testing'
process.env['LOG_LEVEL'] = 'silent'
