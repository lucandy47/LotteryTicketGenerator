import { AfterContentChecked, AfterViewChecked, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TicketHelper } from 'src/app/helpers/ticket-helper';
import { Ticket } from 'src/app/services/api/dto/ticket';
import { TicketBox } from 'src/app/services/api/dto/ticket-box';
import { TicketService } from 'src/app/services/api/ticket.service';
import { TicketBoxRow } from 'src/app/services/ui/models/ticket-box-row';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit, AfterViewChecked{

  constructor(
    private _ticketService: TicketService
  ){}

  public ticket: Ticket = {
    id: 0,
    ticketBoxes: []
  };
  public performNewTicketAction: boolean = true;
  public ticketBoxRows: TicketBoxRow[] = [];
  public ticketForm!: FormGroup;
  public ticketAlreadySent: boolean = false;

  ngOnInit(): void {
    this.ticketForm = new FormGroup({
      ticketBoxesCount: new FormControl(
          1,
          [Validators.required]
        ),
      isSuperzahl: new FormControl(false)
    });
  }

  ngAfterViewChecked(): void{
    if(this.ticket.ticketBoxes.length > 0 && !this.ticketAlreadySent){
      this.addTicket();
    }
  }

  private addTicket(): void{
    this._ticketService.addTicket(this.ticket).subscribe(
      {
        next: (ticketId: number) => {
          console.log(ticketId);
          this.ticketAlreadySent = true;
        },
        error: (error: any) => {
          console.log(error.error);
          this.ticketAlreadySent = true;
        }
      }
    );
  }
  public generateNewTicket(): void{
    const formData = this.ticketForm.getRawValue();
    this.ticketAlreadySent = false;

    this.performNewTicketAction = !this.performNewTicketAction;
    this.ticket.id = 0;
    this.ticket.ticketBoxes = [];
    let totalTicketBoxesNumber: number = formData.ticketBoxesCount;

    for(let index = 0; index < totalTicketBoxesNumber; index++){
      let ticketBox: TicketBox = {
        id: 0,
        numberRows: [],
        drawnNumbers: ''
      }
      this.ticket.ticketBoxes.push(ticketBox);
    }
    this.splitTicketBoxes();
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
