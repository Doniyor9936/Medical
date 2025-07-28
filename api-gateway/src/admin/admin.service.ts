import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { AdminServiceGrpc } from './interface/admin.interface';
import { ClientGrpc } from '@nestjs/microservices';
import { CreateNewsDto } from './dto/create-new.dto';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';

@Injectable()
export class AdminService implements OnModuleInit {
  private adminService: AdminServiceGrpc;
  constructor(@Inject('ADMIN_PACKAGE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.adminService =
      this.client.getService<AdminServiceGrpc>('AdminService');
  }
  createNews(dto: CreateNewsDto) {
    return this.adminService.CreateNews(dto);
  }
  createAnnouncement(dto: CreateAnnouncementDto) {
    return this.adminService.CreateAnnouncement(dto);
  }
}
