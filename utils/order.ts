import { isBefore } from 'date-fns';

import { Ticket } from '../dtos/Ticket';

export const orderByDate = (a: Ticket, b: Ticket) => {
  return isBefore(a.due, b.due) ? -1 : 1;
};
