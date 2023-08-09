import { UpdateBookInput } from '@domain/contracts/book'

export namespace UpdateBook {

  export interface Update {
    update(input: UpdateBookInput): Promise<void>
  }
}
