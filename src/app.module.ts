import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/user.module';
import { ClassModule } from './classes/class.module';
import { EnrollmentModule } from './enrollments/enrollment.module';
import { SportModule } from './sports/sport.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import * as dotenv from 'dotenv';

dotenv.config();

ConfigModule.forRoot()

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',  // or 'mysql', 'sqlite'
    host: 'localhost',
    port: 5432,
    username: 'keva',
    password: 'limun',
    database: 'testdb',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true, // Automatically sync database schema (not for production)
  }),
    UserModule,
    ClassModule,
    EnrollmentModule,
    SportModule,
    AuthModule,
    PassportModule.register({ defaultStrategy: 'jwt' })
  ],
})
export class AppModule {}
