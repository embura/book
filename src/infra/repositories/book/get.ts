import { Collection, ObjectId } from 'mongodb'

import { GetBook } from '@domain/repositories/book'
import { BookId } from '@domain/contracts/book'
import { Book } from '@domain/models'

export class MongoGetBookRepository implements GetBook.Get {
  constructor(private readonly collection: Collection<Book.Description>) {}
  async get(input: BookId): Promise<Book.Description | null> {
    const book = await this.collection.findOne({ _id: new ObjectId(input.id) })

    if (!book) {
      return null
    }

    const { _id, ...rest } = book

    return {
      ...rest,
      id: _id.toString()
    }
  }
}
