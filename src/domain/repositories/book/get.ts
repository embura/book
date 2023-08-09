import { Book } from '@domain/models/book'

export namespace GetBook {

  export namespace Input {
    export type GetBookInput = Pick<Book.WithId, 'id'>
  }

  export interface Get {
    list(input: Input.GetBookInput): Promise<Book.Description>
  }
}
