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


import { UsersService } from './users.service';
import { Serialise } from '../interceptors/serialise.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { UpdateDto } from './dtos/auth.dto';

@Controller('/auth')
@Serialise(UserDto) //custom interceptor
export class UsersController {
  constructor(private usersService: UsersService) {}

  //To get the currently signed in user
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('my-profile')
  async myProfile(@Req() req) {
    return req.user;
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
  updateUser(@Param('id') id: string, @Body() body: UpdateDto) {
    return this.usersService.update(parseInt(id), body);
  }

  @HttpCode(204)
  @Delete('/:id')
  remove(@Param() id: string) {
    return this.usersService.remove(id);
  }
}
