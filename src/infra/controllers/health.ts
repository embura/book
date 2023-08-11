import { Controller, Get } from '@nestjs/common'

import { routes } from '@infra/common/baseRoutes'

@Controller(routes.health)
export class HealthController {
  @Get()
  getHealth() {
    return { status: 'OK' }
  }
}
