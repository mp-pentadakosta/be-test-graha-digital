import {
  Controller,
  Get,
  HttpCode,
  UseGuards,
  Request,
  Put,
  Body,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../core/dto/jwt-auth.guard';
import { UserService } from '../services/user/user.service';
import { Roles } from 'src/core/roles.decorator';
import { RolesGuard } from '../core/roles.guard';
import { Role } from '@prisma/client';
import { ProfileReqDto } from '../dto/profile.dto';
import { UpdatePasswordReqDto } from '../dto/auth.dto';

@ApiTags('User Controller')
@ApiBearerAuth('access-token')
@Controller('profile')
export class ProfileController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.USER, Role.ADMIN)
  @HttpCode(200)
  async getUser(@Request() req: any) {
    return this.userService.getUser(req.user.id);
  }

  @Put('update')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.USER, Role.ADMIN)
  @HttpCode(200)
  async editUserProfile(@Request() req: any, @Body() data: ProfileReqDto) {
    return this.userService.editUserProfile(req.user.id, data);
  }

  @Put('update/password')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.USER, Role.ADMIN)
  @HttpCode(200)
  async updatePassword(
    @Request() req: any,
    @Body() body: UpdatePasswordReqDto,
  ) {
    return this.userService.updatePassword(req.user.id, body);
  }
}
