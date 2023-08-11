import { GenericContainer, Wait } from 'testcontainers'

export async function createLocalStackContainer() {
  try {
    const container = await new GenericContainer('localstack/localstack:0.13.3')
      .withExposedPorts(4566)
      .withWaitStrategy(Wait.forLogMessage('Ready.'))
      .withEnv('SERVICES', 'kinesis,secretsmanager')
      .start()

    process.env[
      'AWS_PROXY'
    ] = `http://${container.getHost()}:${container.getMappedPort(4566)}`

    return { container }
  } catch (error) {
    console.log(error)
    throw error
  }
}
