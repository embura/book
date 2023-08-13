import { RentBook } from '@domain/models/rentBook'

export namespace CreateRentBook {
  export namespace Input {
    export type CreateRentBookInput = RentBook.Common
  }

  export interface Create {
    create(input: Input.CreateRentBookInput): Promise<void>
  }
}
