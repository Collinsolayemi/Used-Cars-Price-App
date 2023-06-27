import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth-controller';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entiites/users.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  //imports: [UsersModule],
  imports: [PassportModule, TypeOrmModule.forFeature([User]), JwtModule],
  providers: [AuthService, UsersService],
  controllers: [AuthController],
  exports: [AuthService, UsersService],
})
export class AuthModule {}
