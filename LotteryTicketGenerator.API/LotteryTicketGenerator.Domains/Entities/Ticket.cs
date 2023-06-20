namespace LotteryTicketGenerator.Domains.Entities
{
    public class Ticket
    {
        public int Id { get; set; }
        public int? SuperZahl { get; set; }
        public virtual ICollection<TicketBox> TicketBoxes { get; set; }

        public Ticket()
        {
            TicketBoxes = new List<TicketBox>();
        }
    }
}
