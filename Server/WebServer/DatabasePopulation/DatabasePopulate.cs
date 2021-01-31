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
        readonly CarRentalCompanyDatabaseLogic Crdbl = new CarRentalCompanyDatabaseLogic();
        readonly CarDatabaseLogic Cdbl = new CarDatabaseLogic();
        readonly ReservationDatabaseLogic Rdbl = new ReservationDatabaseLogic();
        public void Populate()
        {
            User user = new User();
            user.Username = "1111";
            Udbl.Register(user);
            PopulateUsers("Marko", "Markovic", "sysadmin", "mmarkovic", "mmarkovic@gmail.com", "male", false, "m123", "system");
            PopulateUsers("Stefan", "Stefanovic", "airlineadmin", "sstefanovic", "sstefanovic@gmail.com", "male", false, "s123", "Lufthansa");
            PopulateUsers("Petar", "Petrovic", "carrentaladmin", "ppetrovic", "ppetrovic@gmail.com", "male", false, "p123", "Rentacar014");
            PopulateUsers("Jovana", "Jovanovic", "user", "jjovanovic", "jjovanovic@gmail.com", "male", false, "j123","none");
            PopulateUsers("Ivana", "Ivanovic", "user", "iivanovic", "iivanovic@gmail.com", "male", false, "i123", "none");


            PopulateAirlines("Nemacka kompanija koja se bavi avioprevozom", "Lufthansa", 4.55);
            PopulateAirlines("Srpska kompanija koja se bavi avioprevozom", "Air Serbia", 4.75);
            PopulateAirlines("Turska kompanija koja se bavi avio prevozom", "Turkish Airlines", 4.85);
            PopulateAirlines("Britanska kompanija koja se bavi avio prevozom", "British Airways", 4.15);
            PopulateAirlines("Francuska kompanija koja se bavi avio prevozom", "Air France", 4.35);
            PopulateAirlines("Svajcarska kompanija koja se bavi avio prevozom", "Helvetic Airways", 4.35);

            PopulateCarRentalCompanies("Novosadska komanija", "Svetozara Miletica 12", "Rentacar021", "u izradi", "trenutno nedostupno", 0, 0);
            PopulateCarRentalCompanies("Valjevska komanija", "Ilije Bircanina 71", "Rentacar014", "u izradi", "trenutno nedostupno", 0, 0);
            PopulateCarRentalCompanies("Beogradska komanija", "Krunska 42", "Rentacar011", "u izradi", "trenutno nedostupno", 0, 0);
            PopulateCarRentalCompanies("Zrenjaninska komanija", "Žarka Zrenjanina 16", "Rentacar023", "u izradi", "trenutno nedostupno", 0, 0);
            PopulateCarRentalCompanies("Niška komanija", "Sinđelićeva 22", "Rentacar018", "u izradi", "trenutno nedostupno", 0, 0);
            PopulateCarRentalCompanies("Pančevačka komanija", "Miloša Crnjanskog 33", "Rentacar013", "u izradi", "trenutno nedostupno", 0, 0);

            DateTime dt = new DateTime(2021, 11, 05, 14, 5, 11);
            Reservation r = new Reservation();
            r.Start = DateTime.Now;
            r.End = dt;
            r.CarId = 510;
            r.UserId = 17;
            r.IsCarRated = false;
            r.IsCompanyRated = false;
            Rdbl.AddReservation(r);
       
        }

        public void PopulateUsers(string firstName, string lastName, string role, string username, string email, string gender, bool logedIn, string password, string CompanyName)
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
            user.CompanyName = CompanyName;
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

        public void PopulateCarRentalCompanies(string about, string address, string name, string priceList, string branches, double rating, int ratingCounter)
        {
            CarRentalCompany carRentalCompany = new CarRentalCompany();
            carRentalCompany.About = about;
            carRentalCompany.Address = address;
            carRentalCompany.Branches = branches;
            carRentalCompany.Name = name;
            carRentalCompany.Rating = rating;
            carRentalCompany.RatingCounter = ratingCounter;
            carRentalCompany.PriceList = priceList;
            Crdbl.AddCarRentalCompany(carRentalCompany);
            PopulateCars("mercedes", "m2000", "caravan", 2010, 5, carRentalCompany.Id, carRentalCompany.Name, 0, 0);
            PopulateCars("toyota", "t2000", "caravan", 2007, 5, carRentalCompany.Id, carRentalCompany.Name, 0, 0);
            PopulateCars("ford", "f2000", "caravan", 1990, 5, carRentalCompany.Id, carRentalCompany.Name, 0, 0);
            PopulateCars("audi", "a2000", "caravan", 2000, 4, carRentalCompany.Id, carRentalCompany.Name, 0, 0);
            PopulateCars("fiat", "f2000", "caravan", 2011, 4, carRentalCompany.Id, carRentalCompany.Name, 0, 0);
            PopulateCars("fiat", "f2000", "caravan", 2011, 4, carRentalCompany.Id, carRentalCompany.Name, 0, 0);
            PopulateCars("fiat", "f2000", "caravan", 2011, 4, carRentalCompany.Id, carRentalCompany.Name, 0, 0);
            PopulateCars("fiat", "f2000", "caravan", 2011, 4, carRentalCompany.Id, carRentalCompany.Name, 0, 0);
            PopulateCars("fiat", "f2000", "caravan", 2011, 4, carRentalCompany.Id, carRentalCompany.Name, 0, 0);
            PopulateCars("fiat", "f2000", "caravan", 2011, 4, carRentalCompany.Id, carRentalCompany.Name, 0, 0);
            PopulateCars("fiat", "f2000", "caravan", 2011, 4, carRentalCompany.Id, carRentalCompany.Name, 0, 0);

        }


        public void PopulateCars(string mark, string model, string type, int year, int numberOfSeats, int carRentalId, string nameOfCompany, double rating, int ratingCounter)
        {
            Car car = new Car();
            car.Mark = mark;
            car.Model = model;
            car.Type = type;
            car.Year = year;
            car.NumberOfSeats = numberOfSeats;
            car.CarRenalId = carRentalId;
            car.NameOfCompany = nameOfCompany;
            car.Rating = rating;
            car.RatingCounter = ratingCounter;
            Cdbl.AddCar(car);


        }
    }
}
