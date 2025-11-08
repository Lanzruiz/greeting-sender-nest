import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { UserStatus } from './user.model';
import { Email } from './../email/email.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  first_name: string;
  @Column()
  middle_name: string;
  @Column()
  last_name: string;
  @Column()
  nick_name: string;
  @Column()
  email: string;
  @Column()
  birth_date: Date;
  @Column()
  country: string;
  @Column()
  time_zone: string;
  @Column()
  status: UserStatus;
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
  @OneToMany(() => Email, (email) => email.user)
  emails: Email[];
}
