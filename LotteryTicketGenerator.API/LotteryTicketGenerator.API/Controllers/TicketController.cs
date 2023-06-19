using LotteryTicketGenerator.Tickets.Abstraction;
using LotteryTicketGenerator.Tickets.Abstraction.DTO;
using Microsoft.AspNetCore.Mvc;

namespace LotteryTicketGenerator.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketController : ControllerBase
    {
        private readonly ITicketsService _ticketsService;
        public TicketController(ITicketsService ticketsService)
        {
            _ticketsService = ticketsService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTickets()
        {
            try
            {
                var tickets = await _ticketsService.GetTickets();
                return Ok(tickets);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("{ticketId:int}")]
        public async Task<IActionResult> GetTicketById([FromRoute] int ticketId)
        {
            try
            {
                var ticket = await _ticketsService.GetTicketById(ticketId);
                return Ok(ticket);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddTicket([FromBody] TicketDTO ticket)
        {
            try
            {
                var ticketId = await _ticketsService.AddTicket(ticket);

                return Ok(ticketId);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
