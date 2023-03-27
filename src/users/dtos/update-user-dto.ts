import { IsString, IsEmail, IsOptional } from 'class-validator';

export class UserUpdateDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  password: string;
}
