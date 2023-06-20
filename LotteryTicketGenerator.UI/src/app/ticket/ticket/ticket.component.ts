import { AfterViewChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, take } from 'rxjs';
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
    superZahl: - 1,
    ticketBoxes: []
  };
  public performNewTicketAction: boolean = true;
  public ticketForm!: FormGroup;
  public ticketAlreadySent: boolean = false;
  public ticket$!: Observable<Ticket>;

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
    this.ticket$ = this._ticketService.getTicketById(ticketId).pipe(take(1));

    this.ticket$.subscribe({
      next: (t: Ticket) => {
        this.ticket = t;
        this.generateTicketBoxes(this.ticket.ticketBoxes);
      },
      error: (error: any) => {
        console.log(error.error);
      }
    });
  }

  private generateTicketBoxes(ticketBoxes: TicketBox[]): void{
    for(let tb of ticketBoxes){
      const ticketBox: TicketBox = {
        id: tb.id,
        numberRows: [],
        drawnNumbers: tb.drawnNumbers
      }
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
