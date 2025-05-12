import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddTodoListDto {
  @ApiProperty({ description: 'Title' })
  @IsNotEmpty({ message: `Title is required` })
  @IsString({ message: `Title must be a string` })
  title: string;
  @ApiProperty({ description: 'Description' })
  @IsString({ message: `Description must be a string` })
  @IsOptional()
  description?: string;
}

export class UpdateTodoListDto {
  @ApiProperty({ description: 'Status' })
  @IsNotEmpty({ message: `Status is required` })
  @IsBoolean({ message: `Status must be a boolean` })
  status: boolean;
}
