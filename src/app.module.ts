import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { UsersEntity } from './users/entities/user.entity';
import { PostEntity } from './posts/entities/post.entity';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRESS_HOST'),
        port: +configService.get('POSTGRESS_PORT'),
        username: configService.get('POSTGRESS_USER'),
        password: configService.get('POSTGRESS_PASSWORD'),
        database: configService.get('POSTGRESS_DATABASE'),
        entities: [UsersEntity, PostEntity],
        synchronize: true,
      })
    }),
    UsersModule, PostsModule, CloudinaryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
