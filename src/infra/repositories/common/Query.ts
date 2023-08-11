import { Book } from '@domain/models'
import { Filter } from 'mongodb'

export class BookQuery {
  static valueQuery<T extends keyof Book.Description>(
    value: Partial<Book.Description>,
    key: T
  ): Filter<Book.Description> {
    const valueFromKey = value[key]

    return valueFromKey ? { [key]: valueFromKey } : {}
  }
}
