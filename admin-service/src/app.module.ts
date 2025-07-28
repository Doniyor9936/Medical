import { Module } from '@nestjs/common';

import { AdminModule } from './admin/admin.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from './admin/entities/news.entity';
import { Announcement } from './admin/entities/announcement.entity';
import { AdminController } from './admin/admin.controller';
import { AdminService } from './admin/admin.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AdminModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [News, Announcement],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([News, Announcement]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AppModule {}
