import { Module } from '@nestjs/common'

import { infra } from '@infra/common/ioc'
import { DatabaseModule } from './common/database.module'
import { CollectionsModule } from './common/collections.module'
import { MongoCreateBookRepository } from '@infra/repositories/book/create'

@Module({
  imports: [CollectionsModule, DatabaseModule],
  providers: [
    {
      provide: infra.repositories.book.create,
      useFactory: (collection) => new MongoCreateBookRepository(collection),
      inject: [infra.collections.book]
    },
  ],
  exports: [
    infra.repositories.book.create
  ]
})
export class BookRepositoriesModule { }
