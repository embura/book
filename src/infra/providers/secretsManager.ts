import {
  SecretsManagerClient as AwsSecretsManagerClient,
  SecretsManagerClientConfig
} from '@aws-sdk/client-secrets-manager'

export class SecretsManagerClient {
  private instance?: AwsSecretsManagerClient

  connect(region?: string): this {
    const configurations: SecretsManagerClientConfig = {
      region
    }

    if (process.env['AWS_PROXY']) {
      configurations.endpoint = process.env['AWS_PROXY']
      configurations.region = 'us-east-1'
      configurations.credentials = {
        accessKeyId: 'test',
        secretAccessKey: 'test'
      }
    }

    const client = new AwsSecretsManagerClient(configurations)

    this.instance = client
    return this
  }

  get connection() {
    if (!this.instance) {
      this.connect()
    }

    return this.instance as AwsSecretsManagerClient
  }
}
