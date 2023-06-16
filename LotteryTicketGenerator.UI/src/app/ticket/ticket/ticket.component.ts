import { Component, OnInit } from '@angular/core';
import { TicketHelper } from 'src/app/helpers/ticket-helper';
import { Ticket } from 'src/app/services/api/dto/ticket';
import { TicketBox } from 'src/app/services/api/dto/ticket-box';
import { TicketBoxRow } from 'src/app/services/ui/models/ticket-box-row';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit{

  constructor(){

  }

  private splitTicketBoxes(): void{
    this.ticketBoxRows = [];
    let currentTickedBoxRow: TicketBoxRow = {
      ticketBoxes: []
    }
    for(let i = 0; i < this.ticket.ticketBoxes.length; i++){
      let tb = this.ticket.ticketBoxes[i];
      currentTickedBoxRow.ticketBoxes.push(tb);
      if(currentTickedBoxRow.ticketBoxes.length === TicketHelper.MaxBoxesPerRow || i === this.ticket.ticketBoxes.length - 1){
        this.ticketBoxRows.push(currentTickedBoxRow);
        currentTickedBoxRow = {
          ticketBoxes: []
        };
      }
    }
  }

  public ticket: Ticket = {
    id: 0,
    ticketBoxes: []
  };

  public performNewTicketAction: boolean = true;
  public ticketBoxRows: TicketBoxRow[] = [];

  ngOnInit(): void {
    this.generateNewTicketBoxes();
  }

  public generateNewTicket(): void{
    this.generateNewTicketBoxes();
    this.performNewTicketAction = !this.performNewTicketAction;
  }

  private generateNewTicketBoxes(): void{
    this.ticket.id = 0;
    this.ticket.ticketBoxes = [];
    let totalTicketBoxesNumber: number = Math.floor(Math.random() * 16) + 1;

    for(let index = 0; index < totalTicketBoxesNumber; index++){
      let ticketBox: TicketBox = {
        id: index,
        numberRows: []
      }
      this.ticket.ticketBoxes.push(ticketBox);
    }
    this.splitTicketBoxes();
    console.log(this.ticket);
  }

  public onNewTicketBoxGenerate(ticketBox: TicketBox): void {
    const foundTicketBox = this.ticket.ticketBoxes.find((tb: TicketBox) => tb.id === ticketBox.id);
  
    if (foundTicketBox) {
      foundTicketBox.numberRows = ticketBox.numberRows;
    }
  }

}
