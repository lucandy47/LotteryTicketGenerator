using AutoMapper;
using LotteryTicketGenerator.Domains.Entities;
using LotteryTicketGenerator.Tickets.Abstraction;
using LotteryTicketGenerator.Tickets.Abstraction.DTO;
using LotteryTicketGenerator.Tickets.Repository;

namespace LotteryTicketGenerator.Tickets
{
    public class TicketsService : ITicketsService
    {
        private readonly ITicketsRepository _ticketsRepository;
        private readonly IMapper _mapper;

        public TicketsService(ITicketsRepository ticketsRepository, IMapper mapper)
        {
            _ticketsRepository = ticketsRepository;
            _mapper = mapper;
        }

        public async Task<int> AddTicket(TicketDTO ticket)
        {
            try
            {
                var ticketEntity = _mapper.Map<Ticket>(ticket);

                if (ticketEntity == null) throw new Exception("Ticket is null.");

                var ticketEntityId = await _ticketsRepository.AddTicket(ticketEntity);

                return ticketEntityId;
            }
            catch(Exception ex)
            {
                throw new Exception($"Could not map the DTO to Entity, reason: {ex.Message}");
            }

        }

        public async Task<TicketDTO> GetTicketById(int ticketId)
        {
            var ticketEntity = await _ticketsRepository.GetTicketById(ticketId);

            var ticket = _mapper.Map<TicketDTO>(ticketEntity);

            return ticket;
        }

        public async Task<IEnumerable<TicketDTO>> GetTickets()
        {
            var ticketsEntities = await _ticketsRepository.GetTickets();

            if (ticketsEntities == null) throw new Exception("No tickets yet.");

            var tickets = _mapper.Map<List<TicketDTO>>(ticketsEntities);

            return tickets;
        }
    }
}