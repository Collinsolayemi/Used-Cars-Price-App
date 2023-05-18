import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dtos/create-user-dto';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';



@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //Signup routes
  @HttpCode(HttpStatus.CREATED)
  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    const user = await this.authService.signUp(body);
    return user;
  }

  //Signin route handler
  @HttpCode(HttpStatus.OK)
  @Post('/signin')
  async getUsers(@Body() body: CreateUserDto) {
    const newUser = await this.authService.signIn(body);
    return newUser;
  }

  //signout route hnadler
  @HttpCode(HttpStatus.OK)
  @Post('/signout')
  signOut() {
    // session.userId = null;
  }
}
