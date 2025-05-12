import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class LoginReqDto {
  @ApiProperty({ description: 'Phone Number' })
  @IsNotEmpty({ message: `Phone number can't be empty` })
  phoneNumber: string;
  @ApiProperty({ description: 'Password' })
  @IsNotEmpty({ message: `Password can't be empty` })
  @MinLength(8)
  password: string;
}

export class RegisterReqDto {
  @ApiProperty({ description: 'Phone Number' })
  @IsNotEmpty()
  phoneNumber: string;
  @ApiProperty({ description: 'Password' })
  @IsNotEmpty()
  @MinLength(8)
  password: string;
  @ApiProperty({ description: 'Full name' })
  @IsNotEmpty()
  fullName: string;
  @ApiProperty({ description: 'Email' })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class UpdatePasswordReqDto {
  @ApiProperty({ description: 'Old Password' })
  @IsNotEmpty()
  oldPassword: string;
  @ApiProperty({ description: 'New Password' })
  @IsNotEmpty()
  @MinLength(8)
  newPassword: string;
}

export class SessionDto {
  accessToken: string;
  refreshToken: string;
}
