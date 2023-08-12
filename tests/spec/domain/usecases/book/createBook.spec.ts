import { mock } from 'jest-mock-extended'

import { CreateBook } from '@domain/repositories/book/create'
import { CreateBookUsecase } from '@domain/usecases/book'

import { makeBook } from '@tests/factories'

const makeSut = () => {
  const createBookRepository = mock<CreateBook.Create>()

  const sut = new CreateBookUsecase(createBookRepository)

  return { sut, createBookRepository }
}

describe('Create Book', () => {
  jest.useFakeTimers({ now: new Date('2023-01-25') })

  describe('not rented', () => {
    it('should create a not rentet book', async () => {
      const { sut, createBookRepository } = makeSut()
      const book = makeBook({})

      await sut.execute(book)

      expect(createBookRepository.create).toBeCalledWith(book)
    })
  })
})
