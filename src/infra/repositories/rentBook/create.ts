import { Collection, ObjectId } from 'mongodb'

import { CreateRentBook } from '@domain/repositories/rentBook/create'

type CreateRentBookDocument = { bookId: ObjectId } & Omit<
  CreateRentBook.Input.CreateRentBookInput,
  'bookId'
>

export class MongoCreateRentBookRepository implements CreateRentBook.Create {
  constructor(
    private readonly collection: Collection<CreateRentBookDocument>
  ) {}

  async create({
    bookId,
    ...input
  }: CreateRentBook.Input.CreateRentBookInput): Promise<void> {

    await this.collection.insertOne({
      ...input,
      bookId: new ObjectId(bookId)
    })
  }
}
