import { ListBook } from '@domain/repositories/book'
import { BookContracts } from '@domain/contracts'
import { NotFound } from '@domain/errors'
import { ListBooksOutput } from '@domain/contracts/book'

export class ListBooksUsecase implements BookContracts.ListBook {
  constructor(private readonly listBookRepository: ListBook.List) {}

  async execute(input: ListBook.Input.ListBookInput): Promise<ListBooksOutput> {
    const books = await this.listBookRepository.list(input)

    if (!books.length) {
      throw new NotFound(`Books not found`)
    }

    return books
  }
}
