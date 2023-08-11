import { z } from 'zod'
import { GetSecretValueCommand } from '@aws-sdk/client-secrets-manager'

import { SecretsManagerClient } from '@infra/providers/secretsManager'

const secretSchema = z.object({
  MONGO_URL: z.string().optional(),
  MONGO_DB_NAME: z.string(),
  MONGO_BOOK_COLLECTION: z.string()
})

type Secrets = z.infer<typeof secretSchema>

export const getSecrets = async (): Promise<Secrets> => {
  if (
    process.env['NODE_ENV'] !== 'production' &&
    process.env['NODE_ENV'] !== 'homologation'
  ) {
    return {
      MONGO_DB_NAME: 'book',
      MONGO_BOOK_COLLECTION: 'book'
    }
  }

  const secretsManager = new SecretsManagerClient().connect()

  const secretId = process.env['SECRET_ID']

  if (!secretId) {
    throw new Error('SECRET_ID is not defined')
  }

  const command = new GetSecretValueCommand({ SecretId: secretId })

  const { SecretString } = await secretsManager.connection.send(command)

  if (!SecretString) {
    throw new Error('Secret not found')
  }

  const secretObject = JSON.parse(SecretString)

  return secretSchema.parse({
    ...secretObject,
    MONGO_DB_NAME: process.env['MONGO_DB_NAME'],
    MONGO_BOOK_COLLECTION: process.env['MONGO_BOOK_COLLECTION']
  })
}
