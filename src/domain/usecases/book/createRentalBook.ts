import { CreateBookRental } from '@domain/repositories/bookRental/create'
import { GetBook, UpdateBook } from '@domain/repositories/book'
import { BookRentalContracts } from '@domain/contracts'
import { NotFound } from '@domain/errors';

export class CreateRentalBookUsecase implements BookRentalContracts.CreateRentalBook {
  constructor(
    private readonly createBookRentalRepository: CreateBookRental.Create,
    private readonly getBookRepository: GetBook.Get,
    private readonly updateBookRepository: UpdateBook.Update
  ) { }

  async execute(input: BookRentalContracts.CreateBookRentalInput): Promise<void> {
    const book = await this.getBookRepository.get({ id: input.bookId,  isRented: false });

    if (!book) {
      throw new NotFound(`Book not found bookId: ${input.bookId}`)
    }

    // TODO: criar transacion para fazer update book e create bookRental

    await this.updateBookRepository.update({
      id: input.bookId,
      isRented: true
    })


    await this.createBookRentalRepository.create(input)
  }
}
