import { GetBook } from '@domain/repositories/book'
import { BookContracts } from '@domain/contracts'
import { Book } from '@domain/models/book'
import { NotFound } from '@domain/errors'

export class GetBooksUsecase implements BookContracts.GetBook {
  constructor(private readonly getBookRepository: GetBook.Get) {}

  async execute(input: BookContracts.BookId): Promise<Book.Description | null> {
    const book = await this.getBookRepository.get(input)

    if (!book) {
      throw new NotFound(`Book not found bookId: ${input.id}`)
    }

    return book
  }
}
