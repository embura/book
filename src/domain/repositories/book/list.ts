import { ListBooksOutput } from '@domain/contracts/book'

export namespace ListBook {
  export namespace Input {
    export interface ListBookInput {
      search?: string
      itemPerPage: number
      pageNumber: number
    }
  }

  export interface List {
    list(input: Input.ListBookInput): Promise<ListBooksOutput>
  }
}
