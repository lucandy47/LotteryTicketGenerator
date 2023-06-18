using LotteryTicketGenerator.Domains.Entities;

namespace LotteryTicketGenerator.Tickets.Abstraction.DTO
{
    public class TicketBoxDTO
    {
        public int Id { get; set; }
        public string DrawnNumbers { get; set; }
    }
}
