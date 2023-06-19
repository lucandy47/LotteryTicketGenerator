import { Injectable } from '@angular/core';
import { environment } from 'src/environment';
import { HttpClient } from '@angular/common/http';
import { Ticket } from './dto/ticket';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private readonly apiUrl = `${environment.apiUrl}/api/ticket`;

  constructor(private httpClient: HttpClient) { }

  public addTicket(ticket: Ticket): Observable<number>{
    return this.httpClient.post<number>(`${this.apiUrl}`, ticket);
  }

  public getTickets(): Observable<Ticket[]>{
    return this.httpClient.get<Ticket[]>(this.apiUrl);
  }

  public getTicketById(ticketId: number): Observable<Ticket>{
    return this.httpClient.get<Ticket>(`${this.apiUrl}/${ticketId}`)
  }
}
