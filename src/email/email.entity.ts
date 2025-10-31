import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { EmailStatus } from './email.model';

@Entity()
export class Email {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  subject: string;
  @Column()
  message: string;
  @Column()
  reciever: string;
  @Column()
  date: Date;
  @Column()
  userId: string;
  @Column()
  status: EmailStatus;
}
