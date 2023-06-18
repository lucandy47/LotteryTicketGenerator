using LotteryTicketGenerator.Domains.Entities;
using Microsoft.EntityFrameworkCore;

namespace LotteryTicketGenerator.Domains.DataAccess
{
    public class ApplicationDbContext: DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> dbContextOptions) : base(dbContextOptions)
        {
        }

        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<TicketBox> TicketBoxes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Ticket>()
                .HasKey(t => t.Id);

            modelBuilder.Entity<Ticket>()
                .HasMany(t => t.TicketBoxes)
                .WithOne(tb => tb.Ticket);

            modelBuilder.Entity<TicketBox>()
                .HasKey(t => t.Id);
        }
    }
}
