import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Matches,
  MinLength,
} from 'class-validator';

export class ProfileReqDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber({}, { message: 'Invalid ID' })
  id?: number;
  @ApiProperty()
  @IsNotEmpty({ message: 'Full Name is required' })
  fullName: string;
  @ApiProperty()
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid Email' })
  email: string;
  @ApiProperty()
  @IsNotEmpty({ message: 'Phone Number is required' })
  @MinLength(11, { message: 'Phone Number must be at least 11 characters' })
  @Matches(/^[0-9]*$/, {
    message: 'Phone Number must be numeric',
  })
  phoneNumber: string;
  @ApiProperty()
  @IsOptional()
  password?: string;
  @ApiProperty()
  @IsOptional()
  address: string;
  @ApiProperty()
  @IsNotEmpty({ message: 'Date of Birth is required' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Date of Birth must be in the format YYYY-MM-DD',
  })
  dob: string;
  @ApiProperty()
  @IsOptional()
  avatar: string;
}
