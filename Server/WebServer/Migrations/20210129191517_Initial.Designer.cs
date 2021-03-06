﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WebServer.DatabaseConfig;

namespace WebServer.Migrations
{
    [DbContext(typeof(DatabaseAccess))]
    [Migration("20210129191517_Initial")]
    partial class Initial
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.14-servicing-32113")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("WebServer.Models.Airline", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("About");

                    b.Property<string>("Name");

                    b.Property<double>("Rating");

                    b.HasKey("Id");

                    b.ToTable("Airlines");
                });

            modelBuilder.Entity("WebServer.Models.Car", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("CarRenalId");

                    b.Property<string>("Mark");

                    b.Property<string>("Model");

                    b.Property<string>("NameOfCompany");

                    b.Property<int>("NumberOfSeats");

                    b.Property<double>("Rating");

                    b.Property<int>("RatingCounter");

                    b.Property<string>("Type");

                    b.Property<int>("Year");

                    b.HasKey("Id");

                    b.ToTable("Cars");
                });

            modelBuilder.Entity("WebServer.Models.CarRentalCompany", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("About");

                    b.Property<string>("Address");

                    b.Property<string>("Branches");

                    b.Property<string>("Name");

                    b.Property<string>("PriceList");

                    b.Property<double>("Rating");

                    b.Property<int>("RatingCounter");

                    b.HasKey("Id");

                    b.ToTable("CarRentalCompaies");
                });

            modelBuilder.Entity("WebServer.Models.Reservation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("CarId");

                    b.Property<DateTime>("End");

                    b.Property<bool>("IsCarRated");

                    b.Property<bool>("IsCompanyRated");

                    b.Property<DateTime>("Start");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.ToTable("Reservations");
                });

            modelBuilder.Entity("WebServer.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("CompanyName");

                    b.Property<string>("Email");

                    b.Property<string>("FirstName");

                    b.Property<string>("Gender");

                    b.Property<bool>("IsDeleted");

                    b.Property<string>("Lastname");

                    b.Property<string>("ListOfFriends");

                    b.Property<bool>("LoggedIn");

                    b.Property<string>("Password");

                    b.Property<string>("Role");

                    b.Property<string>("Username");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });
#pragma warning restore 612, 618
        }
    }
}
