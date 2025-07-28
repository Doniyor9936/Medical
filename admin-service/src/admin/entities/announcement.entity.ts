import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export enum AnnouncementAudience {
  STAFF = 'staff',
  PATIENTS = 'patients',
  DOCTORS = 'doctors',
  ALL = 'all',
}

export enum AnnouncementPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  EMERGENCY = 'emergency',
}

@Entity('announcements')
export class Announcement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 150 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({
    type: 'enum',
    enum: AnnouncementAudience,
    default: AnnouncementAudience.ALL,
  })
  audience: AnnouncementAudience;

  @Column({
    type: 'enum',
    enum: AnnouncementPriority,
    default: AnnouncementPriority.MEDIUM,
  })
  priority: AnnouncementPriority;

  @Column({ type: 'timestamp', nullable: true })
  validUntil?: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
