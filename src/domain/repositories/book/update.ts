import { CreateOrUpdateBookInput } from '@domain/contracts/book'

export namespace UpdateBook {

  export namespace Input {
    export type UpdateBookInput = Partial<CreateOrUpdateBookInput>
  }

  export interface Update {
    update(input: Input.UpdateBookInput): Promise<void>
  }
}
