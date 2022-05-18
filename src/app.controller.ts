import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt.guard';

@Controller()
@ApiTags('Hello World')
@ApiCookieAuth()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOkResponse({ schema: { example: 'Hello World!' } })
  getHello(): string {
    return this.appService.getHello();
  }
}
