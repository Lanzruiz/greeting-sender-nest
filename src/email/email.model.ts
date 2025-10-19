export interface Email {
  id: string;
  subject: string;
  message: string;
  reciever: string;
  status: EmailStatus;
}

export enum EmailStatus {
  SENT = 'SENT',
  IN_PROGRESS = 'IN_PROGRESS',
  NOT_SENT = 'NOT_SENT',
}
