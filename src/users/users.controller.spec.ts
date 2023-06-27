import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { User } from './entiites/users.entity';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUserService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeAuthService = {
      signIn: (email: string, password: string) => {
        return Promise.resolve({ id: 1, email, password } as User);
      },
      //signUp: () => { }
    };
    fakeUserService = {
      find: (email: string) => {
        return Promise.resolve([{ id: 1, email, password: 'asdf' } as User]);
      },
      findOne: (id: number) => {
        return Promise.resolve({
          id,
          email: 'asdf@gmail.com',
          password: 'asdf',
        } as User);
      },
      // update: () => { }
      // remove: () => { }
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUserService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getUser throws an error if user with given id is not found', async () => {
    fakeUserService.findOne = () => null;
    await expect(controller.getUser('1')).rejects.toThrow(NotFoundException);
  });

  it('getAllUsers return a list of users with given email', async () => {
    const user = await controller.getAllUsers('asdf@asdf');
    expect(user.length).toEqual(1);
    expect(user[0].email).toEqual('asdf@asdf');
  });

  it('getUsers return a single user with the given id', async () => {
    const user = await controller.getUser('1');
    expect(user).toBeDefined();
  });

  it('signIn update session object and return users', async () => {
    const session = { userId: -10 };
    const user = await controller.getUsers(
      { email: 'user@example.com', password: 'password' },
      session,
    );

    // expect(user.id).toEqual(1);
    // expect(session.userId).toEqual(1);
  });
});
