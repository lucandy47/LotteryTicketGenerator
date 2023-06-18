import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  public ticket: Ticket = {
    id: 0,
    ticketBoxes: []
  };
  public performNewTicketAction: boolean = true;
  public ticketBoxRows: TicketBoxRow[] = [];
  public ticketForm!: FormGroup;

  ngOnInit(): void {
    this.ticketForm = new FormGroup({
      ticketBoxesCount: new FormControl(
          1,
          [Validators.required]
        ),
      isSuperzahl: new FormControl(false)
    });
  }

  public generateNewTicket(): void{
    const formData = this.ticketForm.getRawValue();

    this.performNewTicketAction = !this.performNewTicketAction;
    this.ticket.id = 0;
    this.ticket.ticketBoxes = [];
    let totalTicketBoxesNumber: number = formData.ticketBoxesCount;

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

}
