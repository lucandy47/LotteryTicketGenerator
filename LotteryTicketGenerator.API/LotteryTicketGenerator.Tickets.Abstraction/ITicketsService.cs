﻿using LotteryTicketGenerator.Domains.Entities;
using LotteryTicketGenerator.Tickets.Abstraction.DTO;

namespace LotteryTicketGenerator.Tickets.Abstraction
{
    public interface ITicketsService
    {
        Task<int> AddTicket(TicketDTO ticket);
        Task<IEnumerable<TicketDTO>> GetTickets();
        Task<TicketDTO> GetTicketById(int ticketId);
    }
}