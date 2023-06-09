import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entiites/users.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  //creating new user

  //Get one user base on certain id
  findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.repo.findOne({ where: { id } });
  }

  //Get all user
  find(email: string) {
    return this.repo.find({ where: { email } });
  }

  async update(id: number, attributes: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, attributes);
    return this.repo.save(user);
  }

  async remove(id: string) {
    const user = await this.find(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return this.repo.remove(user);
  }
}
