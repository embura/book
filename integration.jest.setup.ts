import { config } from 'dotenv'
import 'reflect-metadata'
import { createMongoDbContainer } from './tests/helpers/createMongoDbContainer'

export default async () => {
  try {
    config({
      path: '.env'
    })

    const { container: mongoContainer } = await createMongoDbContainer()

    // @ts-ignore
    global.mongoContainer = mongoContainer
  } catch (error) {
    console.error(error)
    throw error
  }
}
