import { AfterViewChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Ticket } from 'src/app/services/api/dto/ticket';
import { TicketBox } from 'src/app/services/api/dto/ticket-box';
import { TicketService } from 'src/app/services/api/ticket.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit, AfterViewChecked, OnDestroy{

  constructor(
    private _ticketService: TicketService,
    public route: ActivatedRoute,
    private _router: Router
  ){}

  private routeParamsSubscription: Subscription | undefined;
  public ticket: Ticket = {
    id: 0,
    superZahl: null,
    ticketBoxes: []
  };
  public performNewTicketAction: boolean = true;
  public ticketForm!: FormGroup;
  public ticketAlreadySent: boolean = false;
  public displayedDrawnNumbers: string[] = [];

  ngOnInit(): void {
    this.ticketForm = new FormGroup({
      ticketBoxesCount: new FormControl(
          1,
          [Validators.required]
        ),
      withSuperzahl: new FormControl(false)
    });

    this.routeParamsSubscription = this.route.params.subscribe((params) => {
      const ticketId: number = params['id'];
      if(!!ticketId){
        this.fetchTicketById(ticketId);
      }
    });

  }

  ngAfterViewChecked(): void{
    if(this.ticket.ticketBoxes.length > 0 && !this.ticketAlreadySent && this.ticket.id == 0){
      this.addTicket();
    }
  }

  ngOnDestroy(): void {
    this.routeParamsSubscription?.unsubscribe();
  }

  private fetchTicketById(ticketId: number){
    this._ticketService.getTicketById(ticketId).subscribe(
      {
        next: (t: Ticket) => {
          this.ticket = t;
        },
        error: (error: any) => {
          console.log(error.error);
        }
      }
    );
  }

  private addTicket(): void{
    this._ticketService.addTicket(this.ticket).subscribe(
      {
        next: (ticketId: number) => {
          console.log(ticketId);
          this.ticketAlreadySent = true;
          this.displayedDrawnNumbers = this.ticket.ticketBoxes.map(tb => tb.drawnNumbers);
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
    this.ticket = {
      id: 0,
      superZahl: formData.withSuperzahl ? Math.floor(Math.random() * 10) : null,
      ticketBoxes: []
    }
    let totalTicketBoxesNumber: number = formData.ticketBoxesCount;

    for(let index = 0; index < totalTicketBoxesNumber; index++){
      let ticketBox: TicketBox = {
        id: 0,
        numberRows: [],
        drawnNumbers: ''
      }
      this.ticket.ticketBoxes.push(ticketBox);
    }
  }

  public onNewTicketBoxGenerate(ticketBox: TicketBox): void {
    const foundTicketBox = this.ticket.ticketBoxes.find((tb: TicketBox) => tb.id === ticketBox.id);
  
    if (foundTicketBox) {
      foundTicketBox.numberRows = ticketBox.numberRows;
    }
  }

  public goToTicketsList(): void{
    this._router.navigate(['']);
  }

}
