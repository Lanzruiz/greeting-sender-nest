export interface Email {
  id: string;
  subject: string;
  message: string;
  date: Date;
  reciever: string;
}

export interface EmailSend {
  subject: string;
  message: string;
  reciever: string;
  date: Date;
  status: EmailStatus;
}

export enum EmailStatus {
  SENT = 'SENT',
  IN_PROGRESS = 'IN_PROGRESS',
  NOT_SENT = 'NOT_SENT',
}
