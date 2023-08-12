import { Book } from '@domain/models/book'

export namespace ListBook {
  export namespace Input {
    export type ListBookInput = Partial<
      Omit<Book.WithId, 'updatedAt' | 'createdAt'>
    >
  }

  export namespace Output {
    export type ListBookOutput = Book.Description[]
  }

  export interface List {
    list(input: Input.ListBookInput): Promise<Output.ListBookOutput>
  }
}
