import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { UsersService } from '../users/users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { CreateUserDto } from '../users/dtos/create-user-dto';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  //Sign up user
  async signUp(createUser: CreateUserDto) {
    //check if email is in use
    const users = await this.userService.find(createUser.email);
    
    //check if user exists
    if (users.length > 0) {
      throw new BadRequestException('Email is in use');
    }

    //HASH PASSWORD
    //generate a salt
    const salt = randomBytes(8).toString('hex');

    //hash password and salt together
    const hash = (await scrypt(createUser.password, salt, 32)) as Buffer;

    //join the hash and salt result together
    const result = salt + '.' + hash.toString('hex');
    createUser.password = result

    //create a new user and save it
    const user = await this.userService.create(createUser);
    //const user = await this.userService.create(createUser.email,  result);

    //return the user
    return user;
  }

  //sign in user
  async signIn(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    const [user] = await this.userService.find(createUserDto.email);

    //Check if there is no user with input credentials
    if (!user) {
      throw new NotFoundException('User not found');
    }

    //compaare stored password with input password
    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(createUserDto.password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      //wrong credentials
      throw new BadRequestException('bad password');
    }
    return user;
  }
}
