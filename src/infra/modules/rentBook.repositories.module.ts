import { Module } from '@nestjs/common'

import { infra } from '@infra/common/ioc'
import { DatabaseModule } from './common/database.module'
import { CollectionsModule } from './common/collections.module'
import {
  MongoCreateRentBookRepository,
  MongoGetRentBookRepository
} from '@infra/repositories/rentBook'

@Module({
  imports: [CollectionsModule, DatabaseModule],
  providers: [
    {
      provide: infra.repositories.rentBook.create,
      useFactory: (collection) => new MongoCreateRentBookRepository(collection),
      inject: [infra.collections.rent]
    },
    {
      provide: infra.repositories.rentBook.get,
      useFactory: (collection) => new MongoGetRentBookRepository(collection),
      inject: [infra.collections.rent]
    }
  ],
  exports: [infra.repositories.rentBook.create, infra.repositories.rentBook.get]
})
export class RentBookRepositoriesModule {}
