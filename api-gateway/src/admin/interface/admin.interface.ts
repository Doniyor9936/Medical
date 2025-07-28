import { CreateAnnouncementDto } from "../dto/create-announcement.dto";
import { CreateNewsDto } from "../dto/create-new.dto";

export interface News {
    id: string;
    title: string;
    content: string;
    created_at: string;
  }
  
  export interface Announcement {
    id: string;
    title: string;
    content: string;
    created_at: string;
  }
  
  export interface AdminServiceGrpc {
    CreateNews(data:CreateNewsDto ): Promise<{ news: News }>;
    CreateAnnouncement(data: CreateAnnouncementDto): Promise<{ announcement: Announcement }>;
  }
  