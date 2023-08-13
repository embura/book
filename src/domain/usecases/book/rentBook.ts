import { CreateRentBook } from '@domain/repositories/rentBook/create'
import { GetRentBook } from '@domain/repositories/rentBook/get'
import { GetBook } from '@domain/repositories/book'
import { RentBookContracts } from '@domain/contracts'
import { NotFound, RentedBook } from '@domain/errors'
import { makeRentBookToCreate } from '@domain/helpers/makeRentBook'

export class RentBookUsecase implements RentBookContracts.RentBook {
  constructor(
    private readonly createBookRentalRepository: CreateRentBook.Create,
    private readonly getBookRentalRepository: GetRentBook.Get,
    private readonly getBookRepository: GetBook.Get
  ) {}

  async execute({
    bookId,
    userId
  }: RentBookContracts.RentBookInput): Promise<void> {
    const [book, rentedBook] = await Promise.all([
      this.getBookRepository.get({ id: bookId }),
      this.getBookRentalRepository.get({
        bookId,
        isRented: true
      })
    ])


    if (!book) {
      throw new NotFound(`Book not found bookId: ${bookId}`)
    }

    if (rentedBook) {
      throw new RentedBook(`book is rented bookId: ${bookId}`)
    }

    const bookToCreate = makeRentBookToCreate(book.id, userId)

    await this.createBookRentalRepository.create(bookToCreate)
  }
}
