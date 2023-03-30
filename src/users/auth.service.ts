import { BadRequestException } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { UsersService } from './users.service';
import { randomBytes, scrypt } from 'crypto';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signUp(email: string, password: string) {
    //check if email is in use
    const users = await this.userService.find(email);
    if (users.length) {
      throw new BadRequestException('Email is in use');
    }

    //HASH PASSWORD
    //generate a salt
    //hash password and salt together
    //join the hash and salt result together

    //create a new user and save it
    //return the user
  }

  signIn() {}
}
