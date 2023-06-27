import { AuthService } from './auth.service';
import { SignUpDto, SigninDto } from 'src/users/dtos/auth.dto';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //Signup routes
  @HttpCode(HttpStatus.CREATED)
  @Post('/signup')
  async createUser(@Body() body: SignUpDto) {
    const user = await this.authService.signUp(body);
    return user;
  }

  //Signin route handler
  @HttpCode(HttpStatus.OK)
  @Post('/signin')
  async getUsers(@Body() body: SigninDto) {
    const newUser = await this.authService.signIn(body);
    return newUser;
  }
}
