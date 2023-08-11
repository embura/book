import { Test, TestingModuleBuilder } from '@nestjs/testing'
import { AppModule } from '@infra/modules/app.module'

export const createIntegrationDependencies = (): TestingModuleBuilder => {
  const moduleRef = Test.createTestingModule({
    imports: [AppModule]
  })

  return moduleRef
}
