import { ClientSession } from 'mongodb'

export abstract class AbstractMongoTransaction {
  session: ClientSession | undefined = undefined
}
