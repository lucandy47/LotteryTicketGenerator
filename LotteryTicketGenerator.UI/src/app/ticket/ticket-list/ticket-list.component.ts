import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Ticket } from 'src/app/services/api/dto/ticket';
import { TicketService } from 'src/app/services/api/ticket.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit{

  constructor(
    private _router: Router,
    private _ticketService: TicketService
  ){}

  public tickets$!: Observable<Ticket[]>;

  ngOnInit(): void {
    this.getTickets();
  }

  public goToNewTicketGenerator(): void{
    this._router.navigate(['new']);
  }

  private getTickets(): void{
    this.tickets$ = this._ticketService.getTickets();
  }

  public getTicketById(ticketId: number): void{
    this._router.navigate([`view/${ticketId}`]);
  }

}
