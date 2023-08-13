import { Book } from '@domain/models'
import { Usecase } from './common'
import { string } from 'zod'

export type OmitToUpdate = 'updatedAt' | 'createdAt'

export type OmitToCreate = 'id' | OmitToUpdate

export type CreateBookInput = Omit<Book.Description, OmitToCreate>

export type BookId = Pick<Book.WithId, 'id'>

export type UpdateBookInput = BookId &
  Partial<Omit<Book.Description, OmitToUpdate>>

export type CreateBook = Usecase<CreateBookInput, void>

export type UpdateBook = Usecase<UpdateBookInput, void>

export interface ListBookInput {
  search?: string
  itemPerPage: number
  pageNumber: number
}


type PickListBooksOutput = 'title' | 'author' | 'gender'
export type ListBooksOutput = Pick<Book.Description, PickListBooksOutput>[]

export type ListBook = Usecase<ListBookInput, ListBooksOutput>

export type GetBook = Usecase<BookId, Book.Description | null>

export type DeleteBook = Usecase<BookId, void>
