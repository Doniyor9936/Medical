import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('news')
export class News {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 150 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ nullable: true, length: 100 })
  author?: string;

  @Column({ nullable: true, length: 100 })
  category?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
