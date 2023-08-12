import { BookRental } from '@domain/models/bookRental'
import { Usecase } from './common'

export type OmitToCreate = 'updatedAt' | 'createdAt'

export type CreateBookRentalInput = Omit<BookRental.Common, OmitToCreate>

export type CreateRentalBook = Usecase<CreateBookRentalInput, void>
