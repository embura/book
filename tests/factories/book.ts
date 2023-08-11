import { Book } from '@domain/models/book'
import { faker } from '@faker-js/faker'

export const makeBook = ({
    isRented = false,
    hasAudio = true,
    author,
    title,
    description,
    gender
}: Partial<Book.Description>): Book.Description => ({
    id: faker.datatype.uuid(),
    title: title ?? faker.definitions.title,
    author: author ?? faker.name.fullName(),
    createdAt: new Date(),
    updatedAt: new Date(),
    description: description ?? faker.lorem.paragraphs(2),
    gender: gender ?? faker.word.adjective(),
    hasAudio,
    isRented
})
