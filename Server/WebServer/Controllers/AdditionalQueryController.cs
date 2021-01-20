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
    public class AdditionalQueryController : ControllerBase
    {
        readonly ReservationDatabaseLogic Rdbl = new ReservationDatabaseLogic();
        readonly CarDatabaseLogic Cdbl = new CarDatabaseLogic();
        // GET: api/AdditionalQuery
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/AdditionalQuery/5
        [HttpGet("{userId}")]
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
