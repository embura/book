import { Book } from '@domain/models'
import { Usecase } from './common'

export type OmitToUpdate = 'updatedAt' | 'createdAt';

export type OmitToCreate = 'id' | OmitToUpdate;

export type CreateBookInput = Omit<Book.Description, OmitToCreate>

export type BookId = Pick<Book.WithId, 'id'>

export type UpdateBookInput = BookId & Partial<Omit<Book.Description, OmitToUpdate>>

export type CreateBook = Usecase<CreateBookInput, void>

export type UpdateBook = Usecase<UpdateBookInput, void>

export type ListBookInput = Partial<Pick<Book.Common, 'title'>>

export type ListBook = Usecase<ListBookInput, Book.Description[]>


export type GetBook = Usecase<BookId, Book.Description>

export type DeleteBook = Usecase<BookId, void>

