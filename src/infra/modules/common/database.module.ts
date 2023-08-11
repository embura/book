import { Module } from '@nestjs/common'

import { infra } from '@infra/common/ioc'

import { MongoModule } from './mongo.module'
import { MongoDbProvider } from '@infra/providers/mongoDb'
import { MongoClient } from 'mongodb'

@Module({
  imports: [MongoModule],
  providers: [
    {
      provide: infra.providers.client,
      useFactory: (mongoProvider: MongoDbProvider) => {
        return mongoProvider.getConnection()
      },
      inject: [infra.providers.mongo]
    },
    {
      provide: infra.providers.database,
      useFactory: (mongoProvider: MongoClient, mongoDatabaseName: string) => {
        return mongoProvider.db(mongoDatabaseName)
      },
      inject: [infra.providers.client, infra.environment.database.name]
    }
  ],
  exports: [
    infra.providers.database,
    infra.providers.client
  ]
})
export class DatabaseModule { }
