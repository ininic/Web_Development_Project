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
    public class CarController : ControllerBase
    {
        readonly CarDatabaseLogic Cdbl = new CarDatabaseLogic();
        readonly CarRentalCompanyDatabaseLogic Crdbl = new CarRentalCompanyDatabaseLogic();
        // GET: api/Car
        [HttpGet]
        public List<Car> Get()
        {
            return Cdbl.GetCars();
        }

        // GET: api/Car/5
        [HttpGet("{id}")]
        public List<Car> Get(int id)
        {
            return Cdbl.GetCarsByRentalId(id);
        }

        // POST: api/Car
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]  Car newCar) 
        {
            Car car = new Car();
            CarRentalCompany company = new CarRentalCompany();
            car.NameOfCompany = newCar.NameOfCompany;
            company = Crdbl.FindCompanyByName(newCar.NameOfCompany);

            car.CarRenalId = company.Id;
            car.Mark = newCar.Mark;
            car.Model = newCar.Model;
            car.Type = newCar.Type;
            car.Year = newCar.Year;
            car.NumberOfSeats = newCar.NumberOfSeats;


            if(Cdbl.AddCar(car))
            {
                return Ok();
            }
            {
                return BadRequest();
            }
           
        }

        // PUT: api/Car/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult>  Delete(int id)
        {
            if (Cdbl.DeleteCar(id) != 0)
            {
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }
    }
}
