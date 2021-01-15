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
    public class ReservationController : ControllerBase
    {
        readonly ReservationDatabaseLogic Rdbl = new ReservationDatabaseLogic();
        readonly CarDatabaseLogic Cdbl = new CarDatabaseLogic();

        // GET: api/Reservation
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Reservation/5
        [HttpGet("{start}/{end}")]
        public List<Car> Get(DateTime start, DateTime end)
        {
            List<Car> carList = new List<Car>();
            List<Car> availableCars = new List<Car>();
            carList = Cdbl.GetCars();
            availableCars.AddRange(carList);
            List<Reservation> reservationList = new List<Reservation>();
            reservationList = Rdbl.GetReservation();


            //uzimamo sve automobile
            foreach (var car in carList)
            {
                //if(reservations.Contains(carId))
                //prolazimo kroz sve rezervacije
                foreach (var res in reservationList)
                {
                    //kad nadjemo neki automobil u rezervacijama
                    if (car.Id == res.CarId)
                    {
                        //proverimo da li se potencijalna nova rezervacija preklapa sa rezervacijom
                        //koja vec postoji za taj automobil
                        if ((res.Start <= start && res.End >= start) || (res.Start <= end && res.End >= end) || (res.Start > start && res.End < end)) 
                        {
                            //ako rezervacija postoji, taj album izbacujemo iz liste availableCars
                            //s tim sto moramo proveriti da li ga nismo ranije vec izbacili
                            //oni automobili koji nisu u rezervacijama, svakako ne treba da budu izbaceni
                            availableCars.Remove(car);
                        }
                    }
                }
            }
            return availableCars;
        }
        // POST: api/Reservation
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Reservation/5
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
