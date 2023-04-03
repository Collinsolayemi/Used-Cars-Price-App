import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  id?: number;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
