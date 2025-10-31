import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { UserStatus } from './user.model';

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
  status: UserStatus;
}
