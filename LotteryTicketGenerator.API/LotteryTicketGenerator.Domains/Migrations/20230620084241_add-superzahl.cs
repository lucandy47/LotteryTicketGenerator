using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LotteryTicketGenerator.Domains.Migrations
{
    /// <inheritdoc />
    public partial class addsuperzahl : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SuperZahl",
                table: "Tickets",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SuperZahl",
                table: "Tickets");
        }
    }
}
