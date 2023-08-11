import { Collection } from 'mongodb'

export const resetMongoCollection = async (collection: Collection<any>) => {
  await collection.deleteMany({})
}
