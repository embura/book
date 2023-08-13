import { mock } from 'jest-mock-extended'

import { CreateRentBook, GetRentBook } from '@domain/repositories/rentBook'
import { CreateBook, GetBook } from '@domain/repositories/book'

import { RentBookUsecase } from '@domain/usecases/book'

import { makeBook, makeRentBook } from '@tests/factories'

const makeSut = () => {
  const createRentBookRepository = mock<CreateRentBook.Create>()
  const getRentBookRepository = mock<GetRentBook.Get>()
  const getBookRepository = mock<GetBook.Get>()

  const createBookRepository = mock<CreateBook.Create>()

  const sut = new RentBookUsecase(
    createRentBookRepository,
    getRentBookRepository,
    getBookRepository
  )

  return {
    sut,
    createRentBookRepository,
    createBookRepository,
    getRentBookRepository,
    getBookRepository
  }
}

describe('Rent Book', () => {
  jest.useFakeTimers({ now: new Date('2023-08-13') })

  describe('not rented', () => {
    it('should create a not rentet book', async () => {
      const {
        sut,
        createRentBookRepository,
        createBookRepository,
        getBookRepository
      } = makeSut()

      const book = makeBook({})
      const rentBook = makeRentBook({ bookId: book.id })

      jest.spyOn(getBookRepository, 'get').mockResolvedValue(book)

      await createBookRepository.create(book)
      await createRentBookRepository.create(rentBook)

      await sut.execute({ bookId: rentBook.bookId, userId: rentBook.userId })

      expect(createBookRepository.create).toBeCalledWith(book)
      expect(createRentBookRepository.create).toBeCalledWith(rentBook)
    })
  })
})
