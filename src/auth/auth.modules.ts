import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { UsersController } from '../users/users.controller';

@Module({
  imports: [UsersModule],
  providers: [AuthService],
  controllers: [UsersController],
  exports: [AuthService],
})
export class AuthModule {}
