import { routes } from '@infra/common/baseRoutes'
import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common'

import { domain } from '@domain/common/ioc'
import { BookContracts } from '@domain/contracts'
import { CreateBook, createBookSchema } from '@infra/dto/http'
import { ObjectId } from 'mongodb'
import { InvalidBookId } from '@domain/errors'

@Controller(routes.privateBookV1)
export class BookController {
  constructor(
    @Inject(domain.usecases.book.create)
    private readonly createBookRepository: BookContracts.CreateBook,
    @Inject(domain.usecases.book.get)
    private readonly getBookRepository: BookContracts.GetBook // @Inject(domain.usecases.book.update) // private readonly updateBookRepository: BookContracts.UpdateBook, // @Inject(domain.usecases.book.delete) // private readonly deleteBookRepository: BookContracts.DeleteBook, // @Inject(domain.usecases.book.deleteBook) // private readonly deleteBookRepository: BookRentalContracts.CreateBookRentalInput,
  ) {}

  @Post()
  async create(@Body() body: CreateBook) {
    const bookToCreate = createBookSchema.parse(body)

    return await this.createBookRepository.execute(bookToCreate)
  }

  @Get('/:id')
  async get(@Param() id: string) {
    if (!ObjectId.isValid(id)) {
      throw new InvalidBookId(`Invalid book Id ${JSON.stringify(id)}`)
    }

    console.warn({ id })

    return await this.getBookRepository.execute({ id })
  }
}
