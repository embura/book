import { Book } from '@domain/models/book'
import { Usecase } from './common'

export type OmitToCreateOrUpdate = 'id' | 'updatedAt' | 'createdAt';

export type CreateOrUpdateBookInput  = Omit<Book.Description, OmitToCreateOrUpdate>

export type CreateBook = Usecase<CreateOrUpdateBookInput, void>

export type UpdateBook = Usecase<Partial<CreateOrUpdateBookInput>, void>

export type ListBookInput =  Partial<Pick<Book.Common, 'title'>>

export type ListBook = Usecase<ListBookInput, Book.Description[]>

export type BookId = Pick<Book.WithId, 'id'>

export type GetBook = Usecase<BookId, Book.Description>

export type DeleteBook = Usecase<BookId, void>

