using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebServer.DatabaseLogic;
using WebServer.Models;

namespace WebServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        readonly ReservationDatabaseLogic Rdbl = new ReservationDatabaseLogic();
        readonly CarDatabaseLogic Cdbl = new CarDatabaseLogic();
        readonly CarRentalCompanyDatabaseLogic Crdbl = new CarRentalCompanyDatabaseLogic();
        // GET: api/Report
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Report/5
        // metoda koja vraca izvestaj o poslovanju
        [HttpGet("{companyId}/{companyName}")]
        public IEnumerable<string> Get(int companyId, string companyName)
        {
            int carCounter = 0;
            int bookedCarCounter = 0;
            int availableCarCounter = 0;

            int lastWeekReservations = 0;
            int lastMonthReservations = 0;
            int lastYearReservations = 0;

            double lastWeekReservationTime = 0;
            double lastMonthReservationTime = 0;
            double lastYearReservationTime = 0;

            List<Car> listOfCars = new List<Car>();
            List<Car> listOfCompanyCars = new List<Car>();
            List<Reservation> listOfReservations = new List<Reservation>();
            List<int> uniqueIdentifiers = new List<int>();
            listOfCars = Cdbl.GetCars();
            listOfReservations = Rdbl.GetReservations();
            DateTime now = new DateTime();
            now = DateTime.Now;
            DateTime lastWeak = now;
            DateTime lastMonth = now;
            DateTime lastYear = now;
            TimeSpan diff;
            for (int i = 0; i < 7; i++)
            {
                lastWeak = lastWeak.AddDays(-1);
                Console.WriteLine(lastWeak.Date.ToShortDateString());
            }
            lastMonth = lastMonth.AddMonths(-1);
            lastYear = lastYear.AddYears(-1);

            if (companyName == "000")
            {
                foreach (var car in listOfCars)
                {
                    if (car.CarRenalId == companyId)
                    {
                        carCounter++;
                        listOfCompanyCars.Add(car);
                        foreach (var res in listOfReservations)
                        {
                            if (car.Id == res.CarId)
                            {
                                if (!res.IsCarRated && !res.IsCompanyRated)
                                {
                                    if (res.Start < now && res.End > now)
                                    {
                                        if (!uniqueIdentifiers.Contains(res.CarId))
                                        {
                                            bookedCarCounter++;
                                            uniqueIdentifiers.Add(res.CarId);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                foreach (var car in listOfCompanyCars)
                {
                    foreach (var res in listOfReservations)
                    {
                        if (car.Id == res.CarId)
                        {
                            if (res.Start > lastWeak && res.Start < now)
                            {
                                lastWeekReservations++;
                                diff = res.End - res.Start;
                                lastWeekReservationTime += diff.TotalHours;
                            }
                            if (res.Start > lastMonth && res.Start < now)
                            {
                                lastMonthReservations++;
                                diff = res.End - res.Start;
                                lastMonthReservationTime += diff.TotalHours;
                            }
                            if (res.Start > lastYear && res.Start < now)
                            {
                                lastYearReservations++;
                                diff = res.End - res.Start;
                                lastYearReservationTime += diff.TotalHours;
                            }
                        }
                    }
                }
            }                  
            else
            {
                foreach (var car in listOfCars)
                {
                    if (car.NameOfCompany == companyName)
                    {
                        carCounter++;
                        listOfCompanyCars.Add(car);
                        foreach (var res in listOfReservations)
                        {
                            if (car.Id == res.CarId)
                            {
                                if (!res.IsCarRated && !res.IsCompanyRated)
                                {
                                    if (res.Start < now && res.End > now)
                                    {
                                        if (!uniqueIdentifiers.Contains(res.CarId))
                                        {
                                            bookedCarCounter++;
                                            uniqueIdentifiers.Add(res.CarId);
                                        }
                                    }
                                }
                            }

                        }
                    }
                }

                foreach (var car in listOfCompanyCars)
                {
                    foreach (var res in listOfReservations)
                    {
                        if (car.Id == res.CarId)
                        {
                            if (res.Start > lastWeak && res.Start < now)
                            {
                                lastWeekReservations++;
                                diff = res.End - res.Start;
                                lastWeekReservationTime += diff.TotalHours;
                            }
                            if (res.Start > lastMonth && res.Start < now)
                            {
                                lastMonthReservations++;
                                diff = res.End - res.Start;
                                lastMonthReservationTime += diff.TotalHours;
                            }
                            if (res.Start > lastYear && res.Start < now)
                            {
                                lastYearReservations++;
                                diff = res.End - res.Start;
                                lastYearReservationTime += diff.TotalHours;
                            }
                        }
                    }
                }
            }
        
            availableCarCounter = carCounter - bookedCarCounter;

            string answer = "";

            answer += carCounter.ToString();
            answer += "#";
            answer += bookedCarCounter.ToString();
            answer += "#";
            answer += availableCarCounter.ToString();
            answer += "#";

            answer += lastWeekReservations.ToString();
            answer += "#";
            answer += lastMonthReservations.ToString();
            answer += "#";
            answer += lastYearReservations.ToString();
            answer += "#";

            answer += lastWeekReservationTime.ToString();
            answer += "#";
            answer += lastMonthReservationTime.ToString();
            answer += "#";
            answer += lastYearReservationTime.ToString();
            
            return new string[] { answer };
           
        }

        // POST: api/Report
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Report/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
