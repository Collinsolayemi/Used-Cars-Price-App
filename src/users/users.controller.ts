import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Query,
  Patch,
  Delete,
  NotFoundException,
  UseGuards,
  HttpCode,
  HttpStatus,
  Req,
} from '@nestjs/common';

import { CreateUserDto } from './dtos/create-user-dto';
import { UserUpdateDto } from './dtos/update-user-dto';
import { UsersService } from './users.service';
import { Serialise } from '../interceptors/serialise.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from '../auth/auth.service';
//import { CurrentUser } from './decorators/current-user-decorator';
import { AuthGuard } from '../guards/auth.guard';
import { User } from './users.entity';
import session, { Session } from 'express-session';

@Controller('/auth')
@Serialise(UserDto) //custom interceptor
export class UsersController {
  constructor(private usersService: UsersService) { }
  

  // @HttpCode(HttpStatus.CREATED)
  // @Post('/signup')
  // async createUser(@Body() body: CreateUserDto) {
  //   //const user = await this.authService.signUp(body);
  //   return 'signup successful'
  // }

  @HttpCode(HttpStatus.OK)
  @Post('/whoami')
  whoami() {}

  @HttpCode(HttpStatus.OK)
  @Get()
  getAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  async getUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(parseInt(id));

    //check if user does not exist
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }
  @HttpCode(HttpStatus.OK)
  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UserUpdateDto) {
    return this.usersService.update(parseInt(id), body);
  }

  @HttpCode(204)
  @Delete('/:id')
  remove(@Param() id: string) {
    return this.usersService.remove(id);
  }
}
