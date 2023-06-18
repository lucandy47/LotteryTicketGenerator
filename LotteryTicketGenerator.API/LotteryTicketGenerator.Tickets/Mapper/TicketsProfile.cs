using AutoMapper;
using LotteryTicketGenerator.Domains.Entities;
using LotteryTicketGenerator.Tickets.Abstraction.DTO;

namespace LotteryTicketGenerator.Tickets.Mapper
{
    public class TicketsProfile: Profile
    {
        public TicketsProfile()
        {
            CreateMap<Ticket, TicketDTO>();
            CreateMap<TicketDTO, Ticket>();

            CreateMap<TicketBox, TicketBoxDTO>();
            CreateMap<TicketBoxDTO, TicketBox>();
        }
    }
}
