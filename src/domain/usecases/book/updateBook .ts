import {  UpdateBook } from '@domain/repositories/book'
import { BookContracts } from '@domain/contracts'

export class UpdateBookUsecase implements BookContracts.UpdateBook {
  constructor(
    private readonly updateBookRepository: UpdateBook.Update
  ) { }

  async execute(input: UpdateBook.Input.UpdateBookInput): Promise<void> {
    await this.updateBookRepository.update(input)
  }
}
