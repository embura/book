import { Module } from '@nestjs/common'

import { infra } from '@infra/common/ioc'
import { DatabaseModule } from './common/database.module'
import { CollectionsModule } from './common/collections.module'
import {
  MongoCreateBookRepository,
  MongoGetBookRepository
} from '@infra/repositories/book'
import { MongoUpdateBookRepository } from '@infra/repositories/book/update'

@Module({
  imports: [CollectionsModule, DatabaseModule],
  providers: [
    {
      provide: infra.repositories.book.create,
      useFactory: (collection) => new MongoCreateBookRepository(collection),
      inject: [infra.collections.book]
    },
    {
      provide: infra.repositories.book.get,
      useFactory: (collection) => new MongoGetBookRepository(collection),
      inject: [infra.collections.book]
    },
    {
      provide: infra.repositories.book.update,
      useFactory: (collection) => new MongoUpdateBookRepository(collection),
      inject: [infra.collections.book]
    }
  ],
  exports: [
    infra.repositories.book.create,
    infra.repositories.book.get,
    infra.repositories.book.update
  ]
})
export class BookRepositoriesModule {}
