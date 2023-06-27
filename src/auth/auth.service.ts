import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { UsersService } from '../users/users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { SignUpDto, SigninDto } from '../users/dtos/auth.dto';
import { User } from 'src/users/entiites/users.entity';
import { JwtService } from '@nestjs/jwt/dist';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private userService: UsersService,
    private jwt: JwtService,
  ) {}

  //creating a function for the token
  async signToken(args: { id: number; email: string }) {
    const payLoad = args;

    return this.jwt.signAsync(payLoad, { secret: process.env.JWT });
  }

  //Sign up user
  async signUp(SignUpDto: SignUpDto): Promise<User> {
    //check if email is in use
    const users = await this.userRepository.findOne({
      where: { email: SignUpDto.email },
    });

    //check if user exists
    if (users) {
      throw new BadRequestException(
        'This email is already in use, please log in or try again with another email address.',
      );
    }

    //HASH PASSWORD
    //generate a salt
    const salt = randomBytes(8).toString('hex');

    //hash password and salt together
    const hash = (await scrypt(SignUpDto.password, salt, 32)) as Buffer;

    //join the hash and salt result together
    const result = salt + '.' + hash.toString('hex');
    SignUpDto.password = result;

    //create a new user and save it
    const user = await this.userRepository.create(SignUpDto);
    const newUser = await this.userRepository.save(user);
    //const user = await this.userService.create(SignUpDto.email,  result);

    return newUser;
  }

  //sign in user
  async signIn(SigninDto: SigninDto) {
    const { email, password } = SigninDto;
    const [user] = await this.userService.find(email);

    //Check if there is no user with input credentials
    if (!user) {
      throw new NotFoundException('User not found');
    }

    //compaare stored password with input password
    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      //wrong credentials
      throw new BadRequestException('bad password');
    }

    //Issue a jwt and send to the user
    const token = await this.signToken({ id: user.id, email: user.email });
    //Excluding the password field from the response body
    const { password: pass, ...others } = user;
    return { token, ...others };
  }
}
