import { Collection, Filter } from 'mongodb'

import { ListBook } from '@domain/repositories/book'
import { Book } from '@domain/models'
import { makePagination } from '@infra/helpers/makePagination'
import { createBookSchema } from '@infra/dto/database/book'
import { ListBooksOutput } from '@domain/contracts/book'

export class MongoListBookRepository implements ListBook.List {
  constructor(private readonly collection: Collection<Book.Description>) {}
  async list({
    search,
    pageNumber,
    itemPerPage
  }: ListBook.Input.ListBookInput): Promise<ListBooksOutput> {
    const { limit, skip } = makePagination(pageNumber, itemPerPage)

    const filter: Filter<Book.Description> = {
      $or: [{ title: { $regex: search } }, { description: { $regex: search } }]
    }
    const books = await this.collection
      .find(filter)
      .skip(skip)
      .limit(limit)
      .map((book) => {
        const { _id: id, title, author, gender } = createBookSchema.parse(book)
        return {
          title,
          author,
          gender,
          id
        }
      })
      .toArray()

    return books
  }
}
