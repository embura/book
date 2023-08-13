import { DeleteBook } from '@domain/repositories/book'
import { BookContracts } from '@domain/contracts'

export class DeleteBookUsecase implements BookContracts.DeleteBook {
  constructor(private readonly deleteBookRepository: DeleteBook.Delete) {}

  async execute(input: BookContracts.BookId): Promise<void> {
    await this.deleteBookRepository.delete(input)
  }
}
