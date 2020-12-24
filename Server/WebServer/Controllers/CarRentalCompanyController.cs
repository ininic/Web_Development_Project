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
    public class CarRentalCompanyController : ControllerBase
    {
        readonly CarRentalCompanyDatabaseLogic Cdbl = new CarRentalCompanyDatabaseLogic();
        // GET: api/CarRentalCompany
        [HttpGet]
        public IEnumerable<CarRentalCompany> Get()
        {
            return Cdbl.GetAllCarRentalCompanies();
        }

        // GET: api/CarRentalCompany/5
        [HttpGet("{id}")]
        public CarRentalCompany Get(int id)
        {
            return Cdbl.FindCompanyById(id);
        }

        // POST: api/CarRentalCompany
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/CarRentalCompany/5
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
