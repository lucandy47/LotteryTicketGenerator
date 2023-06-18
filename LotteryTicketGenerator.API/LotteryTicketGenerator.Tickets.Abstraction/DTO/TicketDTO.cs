namespace LotteryTicketGenerator.Tickets.Abstraction.DTO
{
    public class TicketDTO
    {
        public int Id { get; set; }
        public IEnumerable<TicketBoxDTO> TicketBoxes { get; set; }
    }
}
