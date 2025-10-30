export interface User {
  id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  nick_name: string;
  email: string;
  birth_date: Date;
  country: string;
  status: UserStatus;
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  IN_ACTIVE = 'IN_ACTIVE',
}
