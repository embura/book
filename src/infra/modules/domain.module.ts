import { Module } from '@nestjs/common'

import { domain } from '@domain/common/ioc'
import { infra } from '@infra/common/ioc'

import { DatabaseModule } from './common/database.module'

import { BookRepositoriesModule } from './book.repositories.module'
import { CreateBookUsecase } from '@domain/usecases/book/createBook'

@Module({
  imports: [BookRepositoriesModule, DatabaseModule],
  providers: [
    {
      provide: domain.usecases.book.create,
      useFactory: (createBookRepository) =>
        new CreateBookUsecase(createBookRepository),
      inject: [infra.repositories.book.create]
    }
  ],
  exports: [domain.usecases.book.create]
})
export class DomainModule {}
