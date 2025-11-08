export interface Email {
  id: string;
  subject: string;
  message: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  reciever: string;
  userId: string;
  status: EmailStatus;
}

export interface EmailSend {
  subject: string;
  message: string;
  name: string;
  reciever: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export enum EmailStatus {
  SENT = 'SENT',
  IN_PROGRESS = 'IN_PROGRESS',
  NOT_SENT = 'NOT_SENT',
}
