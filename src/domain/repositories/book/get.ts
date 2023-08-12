import { BookId } from '@domain/contracts/book'
import { Book } from '@domain/models/book'

export namespace GetBook {

  export interface Get {
    get(input: BookId): Promise<Book.Description | null>
  }
}
