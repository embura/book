import { BookRental } from '@domain/models/bookRental'

export namespace CreateBookRental {

    export namespace Input {
        export type CreateBookRentalInput = Omit<BookRental.Common, 'id' | 'updatedAt' | 'createdAt'>
    }

    export interface Create {
        create(input: Input.CreateBookRentalInput): Promise<void>
    }
}
