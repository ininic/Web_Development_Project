using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebServer.DatabaseLogic;
using WebServer.Models;

namespace WebServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdditionalQueryController : ControllerBase
    {
        readonly ReservationDatabaseLogic Rdbl = new ReservationDatabaseLogic();
        readonly CarDatabaseLogic Cdbl = new CarDatabaseLogic();
        readonly CarRentalCompanyDatabaseLogic Crdbl = new CarRentalCompanyDatabaseLogic();
        // GET: api/AdditionalQuery
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/AdditionalQuery/5
        // preuzimanje rezervacija za zadatog korisnika
        [HttpGet("{userId}")]
        [Authorize]
        public object Get(int userId)
        {
            List<Reservation> listOfReservations = Rdbl.GetReservationByUserId(userId);
            List<Car> listOfCars = new List<Car>();
            foreach(var res in listOfReservations)
            {
                listOfCars.Add(Cdbl.GetCarObjectById(res.CarId));
            }
            return new {listOfReservations, listOfCars };          
        }

        // POST: api/AdditionalQuery
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/AdditionalQuery/5
        // Ocenjivanje renacar servisa
        [HttpPut("{carId}/{reservationId}")]
        [Authorize(Roles = "user")]
        public IActionResult Put(int carId, int reservationId, [FromBody] int newCopmanyRating)
        {
            CarRentalCompany Company = new CarRentalCompany();
            Car car = new Car();
            car = Cdbl.GetCarObjectById(carId);
            
            if (Rdbl.IsCompanyRated(reservationId))
            {
                return BadRequest();
            }
            else
            {
                Rdbl.SetCompanyRate(reservationId);
                Company = Crdbl.FindCompanyByName(car.NameOfCompany);
                Company.Rating = (Company.Rating * Company.RatingCounter + newCopmanyRating) / (Company.RatingCounter + 1);
                Company.RatingCounter++;
                if (Crdbl.EditCarRentalCompany(Company))
                {
                    return Ok();
                }
                else
                {
                    return BadRequest();
                }
            }

        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
