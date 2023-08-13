import { Module } from '@nestjs/common'

import { domain } from '@domain/common/ioc'
import { infra } from '@infra/common/ioc'

import { DatabaseModule } from './common/database.module'

import { BookRepositoriesModule } from './book.repositories.module'
import { CreateBookUsecase } from '@domain/usecases/book/createBook'
import { GetBooksUsecase, RentBookUsecase } from '@domain/usecases/book'
import { RentBookRepositoriesModule } from './rentBook.repositories.module'

@Module({
  imports: [DatabaseModule, BookRepositoriesModule, RentBookRepositoriesModule],
  providers: [
    {
      provide: domain.usecases.book.create,
      useFactory: (createBookRepository) =>
        new CreateBookUsecase(createBookRepository),
      inject: [infra.repositories.book.create]
    },
    {
      provide: domain.usecases.book.get,
      useFactory: (getBookRepository) => new GetBooksUsecase(getBookRepository),
      inject: [infra.repositories.book.get]
    },
    {
      provide: domain.usecases.rentBook.rent,
      useFactory: (
        createBookRepository,
        getRentBookRepository,
        getBookRepository
      ) =>
        new RentBookUsecase(
          createBookRepository,
          getRentBookRepository,
          getBookRepository
        ),
      inject: [
        infra.repositories.rentBook.create,
        infra.repositories.rentBook.get,
        infra.repositories.book.get
      ]
    }
  ],
  exports: [
    domain.usecases.book.create,
    domain.usecases.book.get,
    domain.usecases.rentBook.rent
  ]
})
export class DomainModule {}
