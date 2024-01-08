export interface Ticket {
    id: string;
    title: string;
    due: Date;
    value: number;
    code: string;
    payed: boolean;
  }