import { RentBook } from '@domain/models'
import { Book } from '@domain/models/book'
import { faker } from '@faker-js/faker'
import { ObjectId } from 'mongodb'

export const makeBook = ({
  hasAudio = true,
  author,
  title,
  description,
  gender
}: Partial<Book.Description>): Book.Description => ({
  id: new ObjectId().toString(),
  title: title ?? faker.definitions.title,
  author: author ?? faker.name.fullName(),
  createdAt: new Date(),
  updatedAt: new Date(),
  description: description ?? faker.lorem.paragraphs(2),
  gender: gender ?? faker.word.adjective(),
  hasAudio
})

export const makeRentBook = ({
  bookId,
  createdAt,
  endDate,
  isRented,
  startDate,
  updatedAt,
  userId
}: Partial<RentBook.Common>): RentBook.Common => ({
  bookId: bookId ?? faker.database.mongodbObjectId().toString(),
  userId: userId ?? faker.datatype.uuid(),
  endDate: endDate ?? new Date(),
  startDate: startDate ?? new Date(),
  createdAt: createdAt ?? new Date(),
  updatedAt: updatedAt ?? new Date(),
  isRented: isRented ?? faker.datatype.boolean()
})
