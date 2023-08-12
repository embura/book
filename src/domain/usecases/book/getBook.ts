import { GetBook } from '@domain/repositories/book'
import { BookContracts } from '@domain/contracts'
import { Book } from '@domain/models/book'

export class GetBooksUsecase implements BookContracts.GetBook {
  constructor(private readonly getBookRepository: GetBook.Get) {}

  async execute(input: BookContracts.BookId): Promise<Book.Description | null> {
    return this.getBookRepository.get(input)
  }
}
