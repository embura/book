import { RentBook } from '@domain/models/rentBook'

export namespace CreateRentBook {
  export interface Create {
    create(input: RentBook.Common): Promise<void>
  }
}
