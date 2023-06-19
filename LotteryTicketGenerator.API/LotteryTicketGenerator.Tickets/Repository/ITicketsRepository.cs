using LotteryTicketGenerator.Domains.Entities;

namespace LotteryTicketGenerator.Tickets.Repository
{
    public interface ITicketsRepository
    {
        Task<int> AddTicket(Ticket ticket);
        Task<IEnumerable<Ticket>> GetTickets();
        Task<Ticket> GetTicketById(int ticketId);

    }
}
