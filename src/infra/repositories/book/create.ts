import { Collection } from 'mongodb'

import { CreateBook } from '@domain/repositories/book'

export class MongoCreateBookRepository implements CreateBook.Create {
  constructor(
    private readonly collection: Collection<CreateBook.Input.CreateBookInput>
  ) {}

  async create(input: CreateBook.Input.CreateBookInput): Promise<void> {
    await this.collection.insertOne(input)
  }
}
