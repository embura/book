import { BookContracts } from '@domain/contracts'

export namespace DeleteBook {
  export interface Delete {
    delete(input: BookContracts.BookId): Promise<void>
  }
}
