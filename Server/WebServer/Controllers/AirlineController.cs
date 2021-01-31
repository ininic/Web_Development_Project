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
    public class AirlineController : ControllerBase
    {
        readonly AirlineDatabaseLogic Adbl = new AirlineDatabaseLogic();
        // GET: api/Airline
        // preuzimanje aviokompanija
        [HttpGet]
        public IEnumerable<Airline> Get()
        {
            return Adbl.GetAllAirlines();
        }

        // GET: api/Airline/5
        [HttpGet("{id}")]
        public Airline Get(int id)
        {
            return Adbl.FindAirlineById(id);
        }

        // POST: api/Airline
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Airline/5
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
