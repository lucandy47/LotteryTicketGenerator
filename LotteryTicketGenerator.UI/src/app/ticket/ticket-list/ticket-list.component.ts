import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit{

  constructor(
    private _router: Router
  ){

  }
  ngOnInit(): void {
  }

  public goToNewTicketGenerator(): void{
    this._router.navigate(['new']);
  }

}
