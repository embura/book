import { BookContracts } from '@domain/contracts'
import { Book } from '@domain/models/book'

export namespace DeleteBook {
  export interface Delete {
    delete(input: BookContracts.BookId): Promise<void>
  }
}
