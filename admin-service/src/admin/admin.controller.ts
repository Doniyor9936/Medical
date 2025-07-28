import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { AdminService } from './admin.service';
import { CreateNewsDto } from './dto/create-new.dto';

@Controller()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @GrpcMethod('AdminService', 'CreateNews')
  createNews(dto: CreateNewsDto) {
    return this.adminService.createNews(dto);
  }

  @GrpcMethod('AdminService', 'CreateAnnouncement')
  createAnnouncement(dto: CreateAnnouncementDto) {
    return this.adminService.createAnnouncement(dto);
  }
}
