﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebServer.DatabaseLogic;
using WebServer.Models;

namespace WebServer.DatabasePopulation
{
    public class DatabasePopulate
    {
        readonly UserDatabaseLogic Udbl = new UserDatabaseLogic();
        readonly AirlineDatabaseLogic Adbl = new AirlineDatabaseLogic();
        readonly CarRentalCompanyDatabaseLogic Cdbl = new CarRentalCompanyDatabaseLogic();
        public void Populate()
        {

            PopulateUsers("Marko", "Markovic", "sysadmin", "mmarkovic", "mmarkovic@gmail.com", "male", false, "m123");
            PopulateUsers("Stefan", "Stefanovic", "airlineadmin", "sstefanovic", "sstefanovic@gmail.com", "male", false, "s123");
            PopulateUsers("Petar", "Petrovic", "carrentaladmin", "ppetrovic", "ppetrovic@gmail.com", "male", false, "p123");
            PopulateUsers("Jovana", "Jovanovic", "user", "jjovanovic", "jjovanovic@gmail.com", "male", false, "j123");
            PopulateUsers("Ivana", "Ivanovic", "user", "iivanovic", "iivanovic@gmail.com", "male", false, "i123");


            PopulateAirlines("Nemacka kompanija koja se bavi avioprevozom", "Lufthansa", 4.55);
            PopulateAirlines("Srpska kompanija koja se bavi avioprevozom", "Air Serbia", 4.75);
            PopulateAirlines("Turska kompanija koja se bavi avio prevozom", "Turkish Airlines", 4.85);
            PopulateAirlines("Britanska kompanija koja se bavi avio prevozom", "British Airways", 4.15);
            PopulateAirlines("Francuska kompanija koja se bavi avio prevozom", "Air France", 4.35);
            PopulateAirlines("Svajcarska kompanija koja se bavi avio prevozom", "Helvetic Airways", 4.35);

            PopulateCarRentalCompanies("Novosadska komanija", "Svetozara Miletica 12", "Rentacar021", "u izradi", "trenutno nedostupno");
            PopulateCarRentalCompanies("Valjevska komanija", "Ilije Bircanina 71", "Rentacar014", "u izradi", "trenutno nedostupno");
            PopulateCarRentalCompanies("Beogradska komanija", "Krunska 42", "Rentacar021", "u izradi", "trenutno nedostupno");
            PopulateCarRentalCompanies("Zrenjaninska komanija", "Žarka Zrenjanina 16", "Rentacar023", "u izradi", "trenutno nedostupno");
            PopulateCarRentalCompanies("Niška komanija", "Sinđelićeva 22", "Rentacar018", "u izradi", "trenutno nedostupno");
            PopulateCarRentalCompanies("Pančevačka komanija", "Miloša Crnjanskog 33", "Rentacar013", "u izradi", "trenutno nedostupno");


        }

        public void PopulateUsers(string firstName, string lastName, string role, string username, string email, string gender, bool logedIn, string password)
        {
            User user = new User();
            user.FirstName = firstName;
            user.Lastname = lastName;
            user.Role = role;
            user.Username = username;
            user.Email = email;
            user.Gender = gender;
            user.LoggedIn = logedIn;
            user.Password = password;
            Udbl.AddUser(user);    
        }
        public void PopulateAirlines(string about, string name, double rating)
        {
            Airline airline = new Airline();
            airline.About = about;
            airline.Name = name;
            airline.Rating = rating;
            Adbl.AddAirline(airline);
        }

        public void PopulateCarRentalCompanies(string about, string adress, string name, string priceList, string branches)
        {
            CarRentalCompany carRentalCompany = new CarRentalCompany();
            carRentalCompany.About = about;
            carRentalCompany.Adress = adress;
            carRentalCompany.Branches = branches;
            carRentalCompany.Name = name;
            carRentalCompany.PriceList = priceList;
            Cdbl.AddCarRentalCompany(carRentalCompany);
        }
    }
}
