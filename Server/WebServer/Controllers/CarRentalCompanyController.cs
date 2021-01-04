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
        readonly CarRentalCompanyDatabaseLogic Crdbl = new CarRentalCompanyDatabaseLogic();
        readonly UserDatabaseLogic Udbl = new UserDatabaseLogic();
        // GET: api/CarRentalCompany
        [HttpGet]
        public IEnumerable<CarRentalCompany> Get()
        {
            return Crdbl.GetAllCarRentalCompanies();
        }

        // GET: api/CarRentalCompany/5
        [HttpGet("{id}/{name}")]
        public CarRentalCompany Get(int id, string name)
        {
            if(name == "000")
            { 
                return Crdbl.FindCompanyById(id);
            }
            else
            {
                return Crdbl.FindCompanyByName(name);
            }
        }

    
   
        // POST: api/CarRentalCompany
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/CarRentalCompany/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] CarRentalCompany editedCompany)
        {
            CarRentalCompany company = new CarRentalCompany();
            CarRentalCompany companyTemp = new CarRentalCompany();
            companyTemp = Crdbl.FindCompanyById(editedCompany.Id);
            Udbl.EditUserByCompanyName(companyTemp.Name, editedCompany.Name);
            company.Id = editedCompany.Id;
            company.Name = editedCompany.Name;
            company.Address = editedCompany.Address;
            company.Branches = editedCompany.Branches;
            company.PriceList = editedCompany.PriceList;
            company.About = editedCompany.About;
            Crdbl.EditCarRentalCompany(company);

            return Ok();
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
