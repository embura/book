import { Module } from '@nestjs/common'

import { infra } from '@infra/common/ioc'
import { MongoDbProvider } from '@infra/providers/mongoDb'

@Module({
  providers: [
    {
      provide: infra.providers.mongo,
      useFactory: (url, caFile) => new MongoDbProvider(url, caFile),
      inject: [
        infra.environment.database.url,
        infra.environment.database.caFile
      ]
    }
  ],
  exports: [infra.providers.mongo]
})
export class MongoModule {}
