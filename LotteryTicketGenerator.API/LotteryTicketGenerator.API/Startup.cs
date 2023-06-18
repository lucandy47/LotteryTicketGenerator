using LotteryTicketGenerator.Domains.DataAccess;
using LotteryTicketGenerator.Tickets;
using LotteryTicketGenerator.Tickets.Abstraction;
using LotteryTicketGenerator.Tickets.Mapper;
using LotteryTicketGenerator.Tickets.Repository;
using Microsoft.EntityFrameworkCore;

namespace LotteryTicketGenerator.API
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            services.AddCors();

            var connectionString = "Data Source=.;Initial Catalog=LotteryTicketGeneratorDB;Integrated Security=True; TrustServerCertificate=true";

            services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(connectionString), ServiceLifetime.Scoped);

            services.AddScoped<ITicketsRepository, TicketsRepository>();
            services.AddScoped<ITicketsService, TicketsService>();

            services.AddAutoMapper(typeof(Startup));
            services.AddAutoMapper(typeof(TicketsProfile));

            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            var cors = "http://localhost:4200";

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(policy => policy.WithOrigins(
                cors.Split(",").Select(site => site.Trim()).ToArray()
            ).AllowAnyHeader().AllowAnyMethod());

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
