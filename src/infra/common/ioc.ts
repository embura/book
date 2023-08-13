export const infra = {
  environment: {
    database: {
      name: Symbol.for('databaseName'),
      caFile: Symbol.for('databaseCaFile'),
      url: Symbol.for('databaseUrl'),
      collectionsName: {
        book: Symbol.for('bookCollectionName'),
        rent: Symbol.for('rentbookCollectionName')
      }
    }
  },
  collections: {
    book: Symbol.for('bookCollection'),
    rent: Symbol.for('rentBookCollection')
  },
  providers: {
    mongo: Symbol.for('mongo'),
    client: Symbol.for('mongoClient'),
    database: Symbol.for('database')
  },
  repositories: {
    book: {
      create: Symbol.for('createBookRepository'),
      get: Symbol.for('getBookRepository'),
      update: Symbol.for('udpateBookRepository'),
      delete: Symbol.for('deleteBookRepository')
    },
    rentBook:{
      create: Symbol.for('createRentBookRepository'),
      get: Symbol.for('getRentBookRepository'),

    }
  }
} as const
