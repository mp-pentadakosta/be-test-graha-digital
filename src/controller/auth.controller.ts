import { Body, Controller, Delete, HttpCode, Param, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services/auth/auth.service';
import { LoginReqDto, RegisterReqDto } from '../dto/auth.dto';
import { JwtAuthGuard } from '../core/dto/jwt-auth.guard';
import { RolesGuard } from '../core/roles.guard';
import { Roles } from '../core/roles.decorator';
import { Role } from '@prisma/client';
import { ProfileReqDto } from '../dto/profile.dto';

@ApiTags('Auth Controller')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginReqDto) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  @HttpCode(200)
  async register(@Body() registerDto: RegisterReqDto) {
    return this.authService.register(registerDto);
  }

  @Post('upsert-user')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.USER, Role.ADMIN)
  @HttpCode(200)
  async addData(@Body() req: ProfileReqDto) {
    return this.authService.upsertUser(req);
  }

  @Delete('delete-user/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.USER, Role.ADMIN)
  @HttpCode(200)
  async deleteData(@Param('id') req: number) {
    return this.authService.delete(req);
  }
}
