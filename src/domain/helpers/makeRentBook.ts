import { Book, RentBook } from '@domain/models'
import { CreateRentBook } from '@domain/repositories/rentBook/create'

export const RENT_DAYS = 7

export const makeRentBookToCreate = (
  bookId: Book.Description['id'],
  userId: RentBook.WithId['userId'],
  rentDays = RENT_DAYS
): CreateRentBook.Input.CreateRentBookInput => {
  const today = new Date()
  const startDate = today

  const endDate = today
  endDate.setDate(today.getDate() + rentDays)

  return {
    bookId,
    isRented: true,
    createdAt: today,
    updatedAt: today,
    startDate,
    endDate,
    userId
  }
}
