import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Visit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  patient_id: string;

  @Column()
  visit_date: Date;
}
