namespace LotteryTicketGenerator.Domains.Entities
{
    public class TicketBox
    {
        public int Id { get; set; }
        public string DrawnNumbers { get; set; }
        public virtual Ticket Ticket { get; set; }
    }
}
