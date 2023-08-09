import { CreateBook } from '@domain/repositories/book/create'
import { BookContracts } from '@domain/contracts'

export class CreateBookUsecase implements BookContracts.CreateBook
{
  constructor(
    private readonly createBookRepository: CreateBook.Create
  ) {}

  async execute(input: CreateBook.Input.CreateBookInput): Promise<void> {
    await this.createBookRepository.create(input)
  }
}
