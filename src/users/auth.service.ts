import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { CreateUserDto } from './dtos/create-user-dto';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  //Sign up user
  async signUp(email: string, password: string) {
    //check if email is in use
    const users = await this.userService.find(email);

    if (users.length) {
      throw new BadRequestException('Email is in use');
    }

    //HASH PASSWORD
    //generate a salt
    const salt = randomBytes(8).toString('hex');

    //hash password and salt together
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    //join the hash and salt result together
    const result = salt + '.' + hash.toString('hex');

    //create a new user and save it
    const user = await this.userService.create(email, result);

    //return the user
    return user;
  }

  //sign in user
  async signIn(email: string, password: string): Promise<CreateUserDto> {
    const [user] = await this.userService.find(email);

    //Check if there is no user with input credentials
    if (!user) {
      throw new NotFoundException('User not found');
    }

    //compaare stored password with input password
    const [salt, storedHash] = user.password.split('.');
    console.log(salt, 'space', storedHash);

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      //wrong credentials
      throw new BadRequestException('bad password');
    }
    //user sign up successfully
    return user;
  }
}
