import { ListBook } from '@domain/repositories/book'
import { BookContracts } from '@domain/contracts'
import { Book } from '@domain/models/book'

export class ListBooksUsecase implements BookContracts.ListBook
{
  constructor(
    private readonly listBookRepository: ListBook.List
  ) {}

  async execute(input: ListBook.Input.ListBookInput): Promise<Book.Description[]> {
    return this.listBookRepository.list(input)
  }
}
