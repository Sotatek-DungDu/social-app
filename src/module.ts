// import { BullModule } from '@nestjs/bull';
import { BullModule } from '@nestjs/bull';
import { ServeStaticModule } from '@nestjs/serve-static/dist/serve-static.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { UserEntity } from './model/entities/user.entity';
import { AuthModule } from './modules/auth/auth.module';
import { PostModule } from './modules/post/post.module';
// import { QueueModule } from './modules/queue/queue.module';
import { UserModule } from './modules/user/user.module';

export const Modules = [
  TypeOrmModule.forRootAsync({
    useFactory: () => ({
      type: 'mysql',
      host: process.env.HOST,
      port: parseInt(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [UserEntity],
      synchronize: true,
    }),
  }),
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', '..', 'public'),
  }),
  // BullModule.forRoot({
  //   redis: {
  //     host: process.env.REDIS_HOST,
  //     port: parseInt(process.env.REDIS_PORT),
  //   },
  // }),
  UserModule,
  AuthModule,
  PostModule,
  // QueueModule,
];
