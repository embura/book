import { Collection, ObjectId } from 'mongodb'

import { Book } from '@domain/models'
import { NotFound } from '@domain/errors'
import { DeleteBook } from '@domain/repositories/book'
import { BookId } from '@domain/contracts/book'

export class MongoDeleteBookRepository implements DeleteBook.Delete {
  constructor(private readonly collection: Collection<Book.Description>) {}

  async delete(input: BookId): Promise<void> {
    const deleteResult = await this.collection.deleteOne({
      _id: new ObjectId(input.id)
    })

    if (deleteResult.deletedCount === 0) {
      throw new NotFound(`book not found ${input.id} ${JSON.stringify(input)}`)
    }
  }
}
