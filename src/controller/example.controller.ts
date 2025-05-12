import {
  Controller,
  HttpCode,
  UseGuards,
  Get,
  Query,
  Param,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../core/dto/jwt-auth.guard';
import { Roles } from 'src/core/roles.decorator';
import { RolesGuard } from '../core/roles.guard';
import { Role } from '@prisma/client';
import { ExampleService } from '../services/example/example.service';

@ApiTags('Example Controller')
@ApiBearerAuth('access-token')
@Controller('example')
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @Get('')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.USER, Role.ADMIN)
  @HttpCode(200)
  async getData(@Query('page') page: number, @Query('limit') limit: number) {
    if (!page) page = 1;
    if (!limit) limit = 10;
    return this.exampleService.getExample(page, limit);
  }

  @Get('search')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.USER, Role.ADMIN)
  @HttpCode(200)
  async getSearch(@Query('search') search: string) {
    return this.exampleService.getSearch(search);
  }

  @Get('detail/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.USER, Role.ADMIN)
  @HttpCode(200)
  async getDetail(@Param('id') id: number) {
    return this.exampleService.getDetail(id);
  }
}
