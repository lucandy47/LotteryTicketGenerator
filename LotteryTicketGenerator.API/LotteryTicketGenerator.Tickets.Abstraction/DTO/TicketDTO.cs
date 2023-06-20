namespace LotteryTicketGenerator.Tickets.Abstraction.DTO
{
    public class TicketDTO
    {
        public int Id { get; set; }
        public int? SuperZahl { get; set; }
        public IEnumerable<TicketBoxDTO> TicketBoxes { get; set; }
    }
}
