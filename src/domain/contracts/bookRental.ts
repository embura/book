import { RentBook as RentBookModel } from '@domain/models/rentBook'
import { Usecase } from './common'

export type OmitToCreate = 'updatedAt' | 'createdAt' | 'userId'

export type RentBookInput = Pick<RentBookModel.Common, 'bookId' | 'userId'>

export type RentBook = Usecase<RentBookInput, void>
