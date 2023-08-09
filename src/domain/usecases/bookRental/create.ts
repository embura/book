import { CreateBookRental } from '@domain/repositories/bookRental/create'
import { BookRentalContracts } from '@domain/contracts'

export class CreateRentalBookUsecase implements BookRentalContracts.CreateRentalBook
{
  constructor(
    private readonly createBookRepository: CreateBookRental.Create
  ) {}

  async execute(input: BookRentalContracts.CreateBookRentalInput): Promise<void> {
    
    await this.createBookRepository.create(input)
  }
}
