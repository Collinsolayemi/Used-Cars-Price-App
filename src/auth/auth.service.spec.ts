import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/entiites/users.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/auth.dto';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUserService: Partial<UsersService>;

  beforeEach(async () => {
    //creating a fake user service
    const users: User[] = [];
    fakeUserService = {
      find: (email: string) => {
        const filterUser = users.filter((user) => user.email === email);
        return Promise.resolve(filterUser);
      },
      create: (createUser: CreateUserDto) => {
        const user = {
          id: Math.floor(Math.random() * 9999),
          email: createUser.email,
          password: createUser.password,
        } as User;
        users.push(user);
        return Promise.resolve(user);
      },
    };
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUserService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('should create a new user with a salt and hash password', async () => {
    // const user = await service.signUp('asdf@asdf.com', 'asdf');
    const user = await service.signUp(createUser);
    expect(user.password).not.toEqual('asdf');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if user signs up with email that is in use', async () => {
    await service.signUp('asdf@asdf.com', 'asdf');
    await expect(service.signUp('asdf@asdf.com', 'asdf')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('throws if signin is called with an unused email', async () => {
    await expect(
      service.signIn('asdflkj@asdlfkj.com', 'passdflkj'),
    ).rejects.toThrow(NotFoundException);
  });

  it('throws if an invalid password is provided', async () => {
    await service.signUp('laskdjf@alskdfj.com', 'password');
    await expect(service.signIn('laskdjf@alskdfj.com', 'asdf')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should return a user if the user password is correct', async () => {
    await service.signUp('asdf@asdf.com', 'asdf');
    const user = await service.signIn('asdf@asdf.com', 'asdf');
    expect(user).toBeDefined();
  });
});
