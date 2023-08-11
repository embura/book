import { MongoClient } from 'mongodb'

export class MongoDbProvider {
  private connection?: MongoClient

  constructor(private readonly url: string, private readonly caFile?: string) {}

  private async connect(): Promise<void> {
    const connection = await MongoClient.connect(this.url, {
      tlsCAFile:
        this.caFile && this.caFile !== 'local' ? this.caFile : undefined,
      socketTimeoutMS: 5000,
      connectTimeoutMS: 5000,
      serverSelectionTimeoutMS: 10000,
      maxIdleTimeMS: 15000,
      maxPoolSize: 50,
      minPoolSize: 5
    })

    this.connection = connection
  }

  async getConnection() {
    if (!this.connection) {
      await this.connect()
    }

    return this.connection as MongoClient
  }
}
