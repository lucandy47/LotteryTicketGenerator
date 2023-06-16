import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketModule } from './ticket/ticket.module';

const routes: Routes = [
  {
    path:'',
    loadChildren: () => TicketModule
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
