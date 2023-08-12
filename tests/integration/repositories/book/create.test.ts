import { Collection, MongoClient } from 'mongodb'
import { TestingModule } from '@nestjs/testing'

import { infra } from '@infra/common/ioc'
import { MongoDbProvider } from '@infra/providers/mongoDb'

import { createIntegrationDependencies } from '@tests/helpers/createIntegrationDependencies'
import { resetMongoCollection } from '@tests/helpers/resetMongoCollection'
import { CreateBook } from '@domain/repositories/book'
import { makeBook } from '@tests/factories/book'

describe('Create Book Repository', () => {
  let sut: CreateBook.Create
  let dependencies: TestingModule
  let mongoConnection: MongoClient
  let mongoCollection: Collection<CreateBook.Input.CreateBookInput>

  beforeAll(async () => {
    dependencies = await createIntegrationDependencies().compile()

    const mongoProvider = dependencies.get<MongoDbProvider>(
      infra.providers.mongo
    )
    mongoConnection = await mongoProvider.getConnection()

    mongoCollection = dependencies.get<
      Collection<CreateBook.Input.CreateBookInput>
    >(infra.collections.book)
  })

  beforeEach(async () => {
    dependencies = await createIntegrationDependencies().compile()

    sut = dependencies.get(infra.repositories.book.create)
  })

  afterEach(async () => {
    await resetMongoCollection(mongoCollection)
  })

  afterAll(async () => {
    await mongoConnection.close()
    await dependencies.close()
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  describe('Happy path', () => {
    it('should createbook', async () => {
      const book = makeBook({})

      await sut.create(book)

      const result = await mongoCollection.find().toArray()
      expect(result).toHaveLength(1)

      expect(result[0]?.title).toBe(book.title)
      expect(result[0]?.author).toBe(book.author)
      expect(result[0]?.isRented).toBe(book.isRented)
      expect(result[0]?.description).toBe(book.description)
    })
  })
})
