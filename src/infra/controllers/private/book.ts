import { routes } from '@infra/common/baseRoutes'
import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common'

import { domain } from '@domain/common/ioc'
import { BookContracts, RentBookContracts } from '@domain/contracts'
import { CreateBook, RentBook, createBookSchema, rentBookSchema } from '@infra/dto/http'
import { ObjectId } from 'mongodb'
import { InvalidBookId } from '@domain/errors'

@Controller(routes.privateBookV1)
export class BookController {
  constructor(
    @Inject(domain.usecases.book.create)
    private readonly createBookUsecase: BookContracts.CreateBook,
    @Inject(domain.usecases.book.get)
    private readonly getBookUsecase: BookContracts.GetBook,
    @Inject(domain.usecases.rentBook.rent)
    private readonly rentBookUsecase: RentBookContracts.RentBook
  ) // @Inject(domain.usecases.book.delete)
  // private readonly deleteBookRepository: BookContracts.DeleteBook,
  // @Inject(domain.usecases.book.deleteBook)
  // private readonly deleteBookRepository: BookRentalContracts.CreateBookRentalInput,
  {}

  @Post()
  async create(@Body() body: CreateBook) {
    const bookToCreate = createBookSchema.parse(body)

    return await this.createBookUsecase.execute(bookToCreate)
  }

  @Get('/:id')
  async get(@Param() id: string) {
    if (!ObjectId.isValid(id)) {
      throw new InvalidBookId(`Invalid book Id ${JSON.stringify(id)}`)
    }

    return await this.getBookUsecase.execute({ id })
  }

  @Post('/:id/rent')
  async rent(@Param('id') id: string, @Body() body: RentBook) {
    if (!ObjectId.isValid(id)) {
      throw new InvalidBookId(`Invalid book Id ${JSON.stringify(id)}`)
    }

    const bookToRent = rentBookSchema.parse(body)

    return await this.rentBookUsecase.execute({
      bookId: id,
      userId: bookToRent.userId
    })
  }
}
