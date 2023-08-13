import { Module } from '@nestjs/common'

import { infra } from '@infra/common/ioc'
import { DatabaseModule } from './common/database.module'
import { CollectionsModule } from './common/collections.module'
import {
  MongoCreateBookRepository,
  MongoDeleteBookRepository,
  MongoGetBookRepository,
  MongoUpdateBookRepository,
  MongoListBookRepository
} from '@infra/repositories/book'

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
    },
    {
      provide: infra.repositories.book.delete,
      useFactory: (collection) => new MongoDeleteBookRepository(collection),
      inject: [infra.collections.book]
    },
    {
      provide: infra.repositories.book.list,
      useFactory: (collection) => new MongoListBookRepository(collection),
      inject: [infra.collections.book]
    }
  ],
  exports: [
    infra.repositories.book.create,
    infra.repositories.book.get,
    infra.repositories.book.list,
    infra.repositories.book.update,
    infra.repositories.book.delete
  ]
})
export class BookRepositoriesModule {}
