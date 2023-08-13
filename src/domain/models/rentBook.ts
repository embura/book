export namespace RentBook {
  export interface Common {
    bookId: string
    userId: string
    startDate: Date
    endDate: Date
    isRented: boolean
    createdAt: Date
    updatedAt: Date
  }

  export interface WithId extends Common {
    id: string
  }
}
