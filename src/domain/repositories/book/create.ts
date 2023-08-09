import { Book } from '@domain/models/book'

export namespace CreateBook {

  export namespace Input {
    export type CreateBookInput = Omit<Book.Description, 'id'>
  }
  export interface Create {
    create(input: Input.CreateBookInput): Promise<Book.Description>
  }
}
