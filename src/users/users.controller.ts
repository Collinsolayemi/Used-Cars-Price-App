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
import { CurrentUser } from './decorators/current-user-decorator';
import { AuthGuard } from '../guards/auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt/dist';

@Controller('/auth')
@Serialise(UserDto) //custom interceptor
export class UsersController {
  constructor(private usersService: UsersService, private jwt: JwtService) {}

  //To get the currently signed in user
  @HttpCode(HttpStatus.OK)
  @Get('/whoami')
  //@UseGuards(new AuthGuard())
  async whoami(@CurrentUser() user: any) {
    return user
  }

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

