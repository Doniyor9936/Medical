import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GrpcMethod } from '@nestjs/microservices';
import { News } from './entities/news.entity';
import { Announcement } from './entities/announcement.entity';
import { Repository } from 'typeorm';
import { CreateNewsDto } from './dto/create-new.dto';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(News) private readonly newRepo: Repository<News>,
    @InjectRepository(Announcement)
    private announcementRepo: Repository<Announcement>,
  ) {}

  @GrpcMethod('AdminService', 'CreateNews')
  async createNews(data: CreateNewsDto): Promise<{ news: News }> {
    const news = this.newRepo.create(data);
    const saved = await this.newRepo.save(news);
    return { news: saved };
  }

  @GrpcMethod('AdminService', 'CreateAnnouncement')
  async createAnnouncement(data: CreateAnnouncementDto): Promise<{ announcement: Announcement }> {
    const announcement = this.announcementRepo.create(data);
    const saved = await this.announcementRepo.save(announcement);
    return { announcement: saved };
  }
}
