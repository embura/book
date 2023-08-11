import { GenericContainer } from 'testcontainers'

export async function createMongoDbContainer() {
  try {
    const container = await new GenericContainer('mongo')
      .withExposedPorts(27017)
      .start()

    process.env[
      'MONGO_URL'
    ] = `mongodb://${container.getHost()}:${container.getMappedPort(27017)}`

    return { container }
  } catch (error) {
    console.log(error)
    throw error
  }
}
