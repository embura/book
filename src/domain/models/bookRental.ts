export namespace BookRental {

    export interface Common {
        bookId: string
        userId: string
        startDate: Date
        endDate: Date
        createdAt: Date,
        updatedAt: Date
    }

    export interface  WithId extends Common {
        id: string
    }

}