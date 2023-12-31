﻿using LotteryTicketGenerator.Domains.DataAccess;
using LotteryTicketGenerator.Domains.Entities;
using Microsoft.EntityFrameworkCore;

namespace LotteryTicketGenerator.Tickets.Repository
{
    public class TicketsRepository : ITicketsRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public TicketsRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<int> AddTicket(Ticket ticket)
        {
            try
            {
                await _dbContext.Tickets.AddAsync(ticket);

                await _dbContext.SaveChangesAsync();

                return ticket.Id;
            } 
            catch (Exception ex)
            {
                throw new Exception($"Could not save new ticket, reason: {ex.Message}");
            }
        }

        public async Task<Ticket> GetTicketById(int ticketId)
        {
            var ticket = await _dbContext.Tickets
                .Include(t => t.TicketBoxes)
                .FirstOrDefaultAsync(t => t.Id == ticketId);

            if(ticket == null) throw new Exception($"There is no ticket with id: {ticketId}");

            return ticket;
        }

        public async Task<IEnumerable<Ticket>> GetTickets()
        {
            var tickets = await _dbContext.Tickets
                .Include(t => t.TicketBoxes)
                .ToListAsync();

            return tickets;
        }
    }
}
