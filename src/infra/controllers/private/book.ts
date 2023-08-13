import { routes } from '@infra/common/baseRoutes'
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put
} from '@nestjs/common'

import { domain } from '@domain/common/ioc'
import { BookContracts, RentBookContracts } from '@domain/contracts'
import {
  CreateBook,
  RentBook,
  UpdateBook,
  createBookSchema,
  rentBookWithIdSchema,
  updateBookWhithIdSchema
} from '@infra/dto/http'
import { objectIdSchema } from '@infra/dto/database/mongo'

@Controller(routes.privateBookV1)
export class BookController {
  constructor(
    @Inject(domain.usecases.book.create)
    private readonly createBookUsecase: BookContracts.CreateBook,
    @Inject(domain.usecases.book.get)
    private readonly getBookUsecase: BookContracts.GetBook,
    @Inject(domain.usecases.book.update)
    private readonly updateBookUsecase: BookContracts.UpdateBook,
    @Inject(domain.usecases.book.delete)
    private readonly deleteBookUsecase: BookContracts.DeleteBook,
    @Inject(domain.usecases.rentBook.rent)
    private readonly rentBookUsecase: RentBookContracts.RentBook
  ) {}

  @Post()
  async create(@Body() body: CreateBook) {
    const bookToCreate = createBookSchema.parse(body)

    return await this.createBookUsecase.execute(bookToCreate)
  }

  @Get('/:id')
  async get(@Param('id') id: string) {
    const validId = objectIdSchema.parse({ id })

    return await this.getBookUsecase.execute(validId)
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() body: UpdateBook) {
    const bookToUpdate = updateBookWhithIdSchema.parse({ ...body, id })

    return await this.updateBookUsecase.execute(bookToUpdate)
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    const validId = objectIdSchema.parse({ id })
    return await this.deleteBookUsecase.execute(validId)
  }

  @Post('/:id/rent')
  async rent(@Param('id') bookId: string, @Body() body: RentBook) {
    const bookToRent = rentBookWithIdSchema.parse({ ...body, bookId })

    return await this.rentBookUsecase.execute({
      bookId,
      userId: bookToRent.userId
    })
  }
}
