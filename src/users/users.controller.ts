import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Query,
  Patch,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user-dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    this.usersService.create(body.email, body.password);
  }

  @Get()
  getAllUsers() {}

  @Get('/:id')
  getUser(@Param('id') id: string) {
    return this.usersService.findOne(parseInt(id));
  }

  @Patch()
  update() {}
}
