import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';
import { CustomLoggerModule } from './custom-logger/custom-logger.module';
import 'dotenv/config';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [ join( __dirname, '**', '*.entity.{ts,js}' ) ],
      synchronize: true
    }),
    UsersModule,
    FilesModule,
    CustomLoggerModule,
    CacheModule.register({
      isGlobal: true,
      ttl: 30
    }),
    MulterModule.register({
      dest: './uploads'
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads')
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
