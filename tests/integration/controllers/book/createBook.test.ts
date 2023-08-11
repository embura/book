import { domain } from '@domain/common/ioc'
import { infra } from '@infra/common/ioc'
import { BookController } from '@infra/controllers/private/book'
import { CreateBookUsecase } from '@domain/usecases/book'
import { TestingModule } from '@nestjs/testing'
import { Collection, MongoClient } from 'mongodb'
import { createIntegrationDependencies } from '@tests/helpers/createIntegrationDependencies'
import { MongoDbProvider } from '@infra/providers/mongoDb'
import { resetMongoCollection } from '@tests/helpers/resetMongoCollection'
import { CreateBook as CreateBookDTO } from '@infra/dto/http'
import { CreateBook } from '@domain/repositories/book'


describe('Create Book controller', () => {
  let sut: BookController
  let createBookUsecase: CreateBookUsecase
  let app: TestingModule
  let mongoConnection: MongoClient
  let mongoCollection: Collection<CreateBook.Input.CreateBookInput>

  beforeEach(async () => {
    app = await createIntegrationDependencies().compile()

    sut = app.get<BookController>(BookController)

    createBookUsecase = app.get<CreateBookUsecase>(
      domain.usecases.book.create
    )
  })

  beforeAll(async () => {
    app = await createIntegrationDependencies().compile()

    const mongoProvider = app.get<MongoDbProvider>(infra.providers.mongo)
    mongoConnection = await mongoProvider.getConnection()

    mongoCollection = app.get<Collection<CreateBook.Input.CreateBookInput>>(
      infra.collections.book
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
      const book: CreateBookDTO = {
          title: 'Book Create Test 1',
          description: 'description',
          isRented: false,
          author: 'author',
          gender: 'gender',
          hasAudio: false
      }

      const spyCreate = jest.spyOn(createBookUsecase, 'execute')

      await sut.create(book)

      expect(spyCreate).toHaveBeenCalled()
    })

    it('Should create a book', async () => {
      const book: CreateBookDTO = {
        title: 'Book Create Test 2',
        description: 'description',
        isRented: false,
        author: 'author',
        gender: 'gender',
        hasAudio: false
      }

      await sut.create(book)

      const result = await mongoCollection.findOne({
        title: 'Book Create Test 2'
      })

      expect(result).not.toBe(null)
      expect(result).toHaveProperty('_id')
    })
  })
})
