import { Collection, ObjectId } from 'mongodb'

import { GetBook } from '@domain/repositories/book'
import { BookId } from '@domain/contracts/book'
import { Book } from '@domain/models'

export class MongoGetBookRepository implements GetBook.Get {
  constructor(private readonly collection: Collection<Book.Description>) {}
  async get({ id }: BookId): Promise<Book.Description | null> {
    const book = await this.collection.findOne({ _id: new ObjectId(id) })

    if (!book) {
      return null
    }

    return book
  }
}
