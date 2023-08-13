import { Collection, ObjectId } from 'mongodb'

import { RentBook } from '@domain/models'
import { GetRentBook } from '@domain/repositories/rentBook/get'
import { rentBookSchema } from '@infra/dto/database/rentBook'

type  RentBookDocument = Omit<RentBook.WithId, 'bookId'> & { bookId: ObjectId}

export class MongoGetRentBookRepository implements GetRentBook.Get {
  constructor(private readonly collection: Collection<RentBookDocument>) {}

  async get(
    input: GetRentBook.Input.GetRentBookInput
  ): Promise<RentBook.WithId | null> {

    const book = await this.collection.findOne({
      bookId: new ObjectId(input.bookId),
      isRented: input.isRented
    })

    if (!book) {
      return null
    }

    const { _id, bookId, ...rest } = book

    return {
      ...rest,
      id: _id.toString(),
      bookId:  bookId.toString()
    }
  }
}
