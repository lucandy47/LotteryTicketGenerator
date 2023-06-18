import { NumbersRow } from "./numbers-row";

export interface TicketBox{
    id: number;
    numberRows: NumbersRow[];
    drawnNumbers: string;
}