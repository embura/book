import { UpdateBook } from '@domain/repositories/book'
import { BookContracts } from '@domain/contracts'
import { UpdateBookInput } from '@domain/contracts/book'

export class UpdateBookUsecase implements BookContracts.UpdateBook {
  constructor(
    private readonly updateBookRepository: UpdateBook.Update
  ) { }

  async execute(input: UpdateBookInput): Promise<void> {
    await this.updateBookRepository.update(input)
  }
}
