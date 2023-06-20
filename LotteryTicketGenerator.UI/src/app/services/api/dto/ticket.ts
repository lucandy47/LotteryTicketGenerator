import { TicketBox } from "./ticket-box";

export interface Ticket{
    id: number;
    superZahl: number | null;
    ticketBoxes: TicketBox[];
}