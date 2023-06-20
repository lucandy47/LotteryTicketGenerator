﻿// <auto-generated />
using System;
using LotteryTicketGenerator.Domains.DataAccess;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace LotteryTicketGenerator.Domains.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20230620084241_add-superzahl")]
    partial class addsuperzahl
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.7")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("LotteryTicketGenerator.Domains.Entities.Ticket", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("SuperZahl")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Tickets");
                });

            modelBuilder.Entity("LotteryTicketGenerator.Domains.Entities.TicketBox", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("DrawnNumbers")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("TicketId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("TicketId");

                    b.ToTable("TicketBoxes");
                });

            modelBuilder.Entity("LotteryTicketGenerator.Domains.Entities.TicketBox", b =>
                {
                    b.HasOne("LotteryTicketGenerator.Domains.Entities.Ticket", "Ticket")
                        .WithMany("TicketBoxes")
                        .HasForeignKey("TicketId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Ticket");
                });

            modelBuilder.Entity("LotteryTicketGenerator.Domains.Entities.Ticket", b =>
                {
                    b.Navigation("TicketBoxes");
                });
#pragma warning restore 612, 618
        }
    }
}
