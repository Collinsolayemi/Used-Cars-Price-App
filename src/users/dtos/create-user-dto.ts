import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

import { Headers } from '@nestjs/common';

export class CreateUserDto {
  @IsOptional()
  id?: number;

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsString()
  @Length(3, 20, { message: 'password must be between 3 and 20 characters' })
  password: string;

  
}
