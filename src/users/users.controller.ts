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
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';

import { CreateUserDto } from './dtos/create-user-dto';
import { UserUpdateDto } from './dtos/update-user-dto';
import { UsersService } from './users.service';
import { Serialise } from 'src/interceptors/serialise.interceptor';
import { UserDto } from './dtos/user.dto';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    this.usersService.create(body.email, body.password);
  }

  @Get()
  getAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  //@UseInterceptors(new SerialiseInterceptor(UserDto))
  @Serialise(UserDto) //custom interceptor
  @Get('/:id')
  async getUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(parseInt(id));

    //check if user does not exist
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UserUpdateDto) {
    return this.usersService.update(parseInt(id), body);
  }

  @Delete('/:id')
  remove(@Param() id: string) {
    return this.usersService.remove(id);
  }
}
