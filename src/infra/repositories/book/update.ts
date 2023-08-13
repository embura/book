import { Collection, ObjectId } from 'mongodb'

import { UpdateBook } from '@domain/repositories/book'
import { UpdateBookInput } from '@domain/contracts/book'
import { Book } from '@domain/models'
import { NotFound } from '@domain/errors'

export class MongoUpdateBookRepository implements UpdateBook.Update {
  constructor(private readonly collection: Collection<Book.Description>) {}

  async update(input: UpdateBookInput): Promise<void> {
    const updateResult = await this.collection.updateOne(
      { _id: new ObjectId(input.id) },
      {
        $set: { ...input, updatedAt: new Date() }
      }
    )

    if (updateResult.modifiedCount === 0) {
      throw new NotFound(
        `could not update, book not found ${input.id} ${JSON.stringify(input)}`
      )
    }
  }
}
