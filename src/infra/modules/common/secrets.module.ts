import { Module, DynamicModule, Global } from '@nestjs/common'

import { infra } from '@infra/common/ioc'
import { getSecrets } from '@infra/helpers/getSecrets'

@Global()
@Module({})
export class SecretsModule {
  static async forRootAsync(): Promise<DynamicModule> {
    const secrets = await getSecrets()

    return {
      module: SecretsModule,
      providers: [
        {
          provide: infra.environment.database.url,
          useValue: process.env['MONGO_URL'] ?? secrets.MONGO_URL
        },
        {
          provide: infra.environment.database.caFile,
          useValue: process.env['MONGO_CA_FILE']
        },
        {
          provide: infra.environment.database.name,
          useValue: secrets.MONGO_DB_NAME
        },
        {
          provide: infra.environment.database.collectionsName.book,
          useValue: secrets.MONGO_BOOK_COLLECTION
        },
        {
          provide: infra.environment.database.collectionsName.rent,
          useValue: secrets.MONGO_RENT_BOOK_COLLECTION
        }
      ],
      exports: [
        infra.environment.database.url,
        infra.environment.database.caFile,
        infra.environment.database.name,
        infra.environment.database.collectionsName.book,
        infra.environment.database.collectionsName.rent
      ]
    }
  }
}
