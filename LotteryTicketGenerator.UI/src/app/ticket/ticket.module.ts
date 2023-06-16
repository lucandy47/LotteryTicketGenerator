import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketRoutingModule } from './ticket-routing.module';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketBoxComponent } from './ticket-box/ticket-box.component';
import { TicketComponent } from './ticket/ticket.component';


@NgModule({
  declarations: [
    TicketListComponent,
    TicketBoxComponent,
    TicketComponent
  ],
  imports: [
    CommonModule,
    TicketRoutingModule
  ]
})
export class TicketModule { }
