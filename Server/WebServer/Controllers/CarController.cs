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
        [HttpGet("{companyId}/{carId}")]
        public List<Car> Get(int companyId, string carId)
        {
            if(carId == "000")
            {
                return Cdbl.GetCarsByRentalId(companyId);
            }
            else
            {
                return Cdbl.GetCarById(Int32.Parse(carId));
            }
            
        }

        // POST: api/Car
        [HttpPost]
        [Authorize(Roles = "carrentaladmin")]
        public IActionResult Post([FromBody]  Car newCar) 
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
        [Authorize(Roles = "carrentaladmin")]
        public IActionResult Put(int id, [FromBody] Car editedCar) 
        {
            Car car = new Car();
            car.Id = editedCar.Id;
            car.Mark = editedCar.Mark;
            car.Model = editedCar.Model;
            car.Type = editedCar.Type;
            car.NameOfCompany = editedCar.NameOfCompany;
            car.Year = editedCar.Year;
            car.NumberOfSeats = editedCar.NumberOfSeats;
            car.CarRenalId = editedCar.CarRenalId;
            if(Cdbl.EditCar(car))
            {
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "carrentaladmin")]
        public IActionResult Delete(int id)
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
