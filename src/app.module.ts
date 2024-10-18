import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',  // or 'mysql', 'sqlite'
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'yourpassword',
    database: 'sports_complex',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true, // Automatically sync database schema (not for production)
  }),
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
