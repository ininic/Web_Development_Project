using System;
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
    }
}
