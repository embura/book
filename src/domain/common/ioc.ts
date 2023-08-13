export const domain = {
  usecases: {
    book: {
      create: Symbol.for('CreateBookUsecase'),
      get: Symbol.for('GetBookUsecase'),
      list: Symbol.for('ListBookUsecase'),
      update: Symbol.for('UpdateBookUsecase'),
      delete: Symbol.for('DeleteBookUsecase'),
    },
    rentBook: {
      rent: Symbol.for('RentBookUsecase')
    }
  }
} as const
