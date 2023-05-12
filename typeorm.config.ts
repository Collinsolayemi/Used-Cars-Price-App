import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3302,
  username: 'collins',
  password: 'password',
  database: 'car_app',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
};
