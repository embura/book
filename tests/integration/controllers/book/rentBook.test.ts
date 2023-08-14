import { domain } from '@domain/common/ioc'
import { infra } from '@infra/common/ioc'
import { BookController } from '@infra/controllers/private/book'
import { RentBookUsecase } from '@domain/usecases/book'
import { TestingModule } from '@nestjs/testing'
import { Collection, MongoClient } from 'mongodb'
import { createIntegrationDependencies } from '@tests/helpers/createIntegrationDependencies'
import { MongoDbProvider } from '@infra/providers/mongoDb'
import { resetMongoCollection } from '@tests/helpers/resetMongoCollection'
import { CreateBook as CreateBookDTO } from '@infra/dto/http'
import { CreateRentBookDocument } from '@infra/repositories/rentBook'
import { makeRentBook } from '@tests/factories'

describe('Create Book controller', () => {
  let sut: BookController
  let rentBookUsecase: RentBookUsecase
  let app: TestingModule
  let mongoConnection: MongoClient
  let mongoCollection: Collection<CreateRentBookDocument>

  beforeEach(async () => {
    app = await createIntegrationDependencies().compile()

    sut = app.get<BookController>(BookController)

    rentBookUsecase = app.get<RentBookUsecase>(domain.usecases.rentBook.rent)
  })

  beforeAll(async () => {
    app = await createIntegrationDependencies().compile()

    const mongoProvider = app.get<MongoDbProvider>(infra.providers.mongo)
    mongoConnection = await mongoProvider.getConnection()

    mongoCollection = app.get<Collection<CreateRentBookDocument>>(
      infra.collections.rent
    )
  })

  afterEach(async () => {
    await resetMongoCollection(mongoCollection)
  })

  afterAll(async () => {
    await mongoConnection.close()
    await app.close()
  })

  describe('Happy path', () => {
    it('Should call createBookUsecase', async () => {
      const { bookId, userId } = makeRentBook({})

      const spyCreate = jest.spyOn(rentBookUsecase, 'execute')

      await sut.rent(bookId, { userId })

      expect(spyCreate).toHaveBeenCalled()
    })

    it('Should create a book', async () => {
      const { bookId, userId } = makeRentBook({})
      await sut.rent(bookId, { userId })

      const result = await mongoCollection.findOne({
        title: 'Book Create Test 2'
      })

      expect(result).not.toBe(null)
      expect(result).toHaveProperty('_id')
    })
  })
})
