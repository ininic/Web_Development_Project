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
        public void Post([FromBody] string value)
        {
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
