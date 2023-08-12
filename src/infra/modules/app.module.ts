import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'

import { SecretsModule } from './common/secrets.module'
import { DatabaseModule } from './common/database.module'
import { MongoModule } from './common/mongo.module'
import { DomainModule } from './domain.module'
import { HealthController } from '../controllers/health'
import { LoginController } from '../controllers/public'
import { AuthMiddleware } from '@infra/middleware/auth.middleware'
import { BookRepositoriesModule } from './book.repositories.module'
import { BookController } from '@infra/controllers/private/book'

@Module({
  imports: [
    SecretsModule.forRootAsync(),
    MongoModule,
    DatabaseModule,
    BookRepositoriesModule,
    DomainModule
  ],
  controllers: [HealthController, LoginController, BookController]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    const proxy = consumer.apply(AuthMiddleware)
    proxy.forRoutes({
      method: RequestMethod.ALL,
      path: '/api/private/*'
    })
  }
}
