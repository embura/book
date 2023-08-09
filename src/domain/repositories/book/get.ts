import { BookId, CreateBookInput } from '@domain/contracts/book'
import { Book } from '@domain/models/book'

export namespace GetBook {

  export namespace Input {
    export type GetBookInput = Pick<BookId, 'id'> & Partial<CreateBookInput>
  }

  export interface Get {
    get(input: Input.GetBookInput): Promise<Book.Description | undefined>
  }
}
