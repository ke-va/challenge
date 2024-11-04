import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Sport } from './sports/sport.entity';
import { Class } from './classes/class.entity';
import { Enrollment } from './enrollments/enrollment.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres', // or 'mysql', etc.
  host: 'localhost',
  port: 5432, // Change if using a different port
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Sport, Class, Enrollment],
  synchronize: false, // Set this to false to avoid auto-syncing database schema
  migrations: ['dist/migrations/*.js']
};
