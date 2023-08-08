import { Book } from '@domain/models/book'
import { Usecase } from './common'

export type OmitToCreate = 'updatedAt' | 'createdAt';

export type CreateBookInput  = Omit<Book.Common, OmitToCreate>

export type CreateBook = Usecase<CreateBookInput, void>

export type UpdateBookInput  = Omit<Book.Description, OmitToCreate>

export type UpdateBook = Usecase<Partial<UpdateBookInput>, void>

export interface ListBookInput {
  title?: Book.Common['title']
}

export type ListBook = Usecase<ListBookInput, Book.WithId[]>

export type GetBook = Usecase<Pick<Book.WithId, 'id'>, Book.Description>

export type DeleteBook = Usecase<Pick<Book.WithId, 'id'>, void>

