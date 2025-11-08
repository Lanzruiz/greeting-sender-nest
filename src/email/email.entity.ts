import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { EmailStatus } from './email.model';
import { User } from './../user/user.entity';

@Entity()
export class Email {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  subject: string;
  @Column()
  message: string;
  @Column()
  name: string;
  @Column()
  reciever: string;
  @Column()
  userId: string;
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
  @Column()
  status: EmailStatus;
  @ManyToOne(() => User, (user) => user.email, { nullable: false })
  user: User;
}
