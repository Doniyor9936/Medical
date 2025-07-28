import { Body, Controller, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateNewsDto } from './dto/create-new.dto';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('news')
  createNews(@Body() dto:CreateNewsDto) {
    return this.adminService.createNews(dto);
  }

  @Post('announcement')
  createAnnouncement(@Body() dto:CreateAnnouncementDto) {
    return this.adminService.createAnnouncement(dto);
  }
}
