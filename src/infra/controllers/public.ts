import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Headers
} from '@nestjs/common'

import { routes } from '@infra/common/baseRoutes'

@Controller(routes.login)
export class LoginController {
  constructor() {}

  @Post('validate')
  @HttpCode(HttpStatus.OK)
  login() {
    console.log('LoginController')
  }
}
