import { Collection, ObjectId } from 'mongodb'

import { CreateRentBook } from '@domain/repositories/rentBook/create'
import { RentBook } from '@domain/models'

type CreateRentBookDocument = { bookId: ObjectId } & Omit<
  RentBook.Common,
  'bookId'
>

export class MongoCreateRentBookRepository implements CreateRentBook.Create {
  constructor(
    private readonly collection: Collection<CreateRentBookDocument>
  ) {}

  async create({ bookId, ...input }: RentBook.Common): Promise<void> {
    await this.collection.insertOne({
      ...input,
      bookId: new ObjectId(bookId)
    })
  }
}
