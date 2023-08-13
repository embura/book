export const domain = {
  usecases: {
    book: {
      create: Symbol.for('CreateBookUsecase'),
      get: Symbol.for('GetBookUsecase'),
      update: Symbol.for('UpdateBookUsecase'),
      delete: Symbol.for('DeleteBookUsecase'),
      rent: Symbol.for('RentBookUsecase')
    },
    rentBook: {
      rent: Symbol.for('RentBookUsecase')
    }
  }
} as const
