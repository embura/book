import { domain } from '@domain/common/ioc'
import { infra } from '@infra/common/ioc'
import { BookController } from '@infra/controllers/private/book'
import { CreateBookUsecase, RentBookUsecase } from '@domain/usecases/book'
import { TestingModule } from '@nestjs/testing'
import { Collection, MongoClient, ObjectId } from 'mongodb'
import { createIntegrationDependencies } from '@tests/helpers/createIntegrationDependencies'
import { MongoDbProvider } from '@infra/providers/mongoDb'
import { resetMongoCollection } from '@tests/helpers/resetMongoCollection'
import { CreateRentBookDocument } from '@infra/repositories/rentBook'
import { makeBook, makeRentBook } from '@tests/factories'
import { CreateBook } from '@domain/repositories/book'

describe('Create Book controller', () => {
  let sut: BookController
  let rentBookUsecase: RentBookUsecase
  let createBookUsecase: CreateBookUsecase
  let app: TestingModule
  let mongoConnection: MongoClient
  let mongoCollection: Collection<CreateRentBookDocument>
  let mongoCollectiontBook: Collection<CreateBook.Input.CreateBookInput>

  beforeEach(async () => {
    app = await createIntegrationDependencies().compile()

    sut = app.get<BookController>(BookController)

    rentBookUsecase = app.get<RentBookUsecase>(domain.usecases.rentBook.rent)
    createBookUsecase = app.get<CreateBookUsecase>(domain.usecases.book.create)
  })

  beforeAll(async () => {
    app = await createIntegrationDependencies().compile()

    const mongoProvider = app.get<MongoDbProvider>(infra.providers.mongo)
    mongoConnection = await mongoProvider.getConnection()

    mongoCollection = app.get<Collection<CreateRentBookDocument>>(
      infra.collections.rent
    )

    mongoCollectiontBook = app.get<
      Collection<CreateBook.Input.CreateBookInput>
    >(infra.collections.book)
  })

  afterEach(async () => {
    await resetMongoCollection(mongoCollection)
    await resetMongoCollection(mongoCollectiontBook)
  })

  afterAll(async () => {
    await mongoConnection.close()
    await app.close()
  })

  describe('Happy path', () => {
    it('Should call createBookUsecase', async () => {
      const { id, ...rest } = makeBook({ title: 'Book Create Test 1' })

      const { bookId, userId } = makeRentBook({ bookId: id })

      const spyCreate = jest.spyOn(rentBookUsecase, 'execute')

      await mongoCollectiontBook.insertOne({ ...rest, _id: new ObjectId(id) })

      await sut.rent(bookId, { userId })

      expect(spyCreate).toHaveBeenCalled()
    })

    it('Should create a rent book', async () => {
      const { id, ...rest } = makeBook({ title: 'Book Create Test 1' })
      const { bookId, userId } = makeRentBook({ bookId: id })

      await mongoCollectiontBook.insertOne({ ...rest, _id: new ObjectId(id) })

      await sut.rent(bookId, { userId })

      const result = await mongoCollection.findOne({
        bookId: new ObjectId(bookId)
      })

      expect(result?.bookId.toString()).toBe(bookId)
      expect(result?.userId).toBe(userId)
    })
  })
})
