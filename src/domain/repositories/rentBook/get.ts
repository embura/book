import { RentBook as RentBookModel } from '@domain/models/rentBook'

export namespace GetRentBook {
  export namespace Input {
    export type GetRentBookInput = {
      bookId: string
      isRented: boolean
    }
  }

  export interface Get {
    get(input: Input.GetRentBookInput): Promise<RentBookModel.WithId | null>
  }
}
