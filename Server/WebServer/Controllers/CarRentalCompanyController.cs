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
    public class CarRentalCompanyController : ControllerBase
    {
        readonly CarRentalCompanyDatabaseLogic Crdbl = new CarRentalCompanyDatabaseLogic();
        readonly UserDatabaseLogic Udbl = new UserDatabaseLogic();
        readonly CarDatabaseLogic Cdbl = new CarDatabaseLogic();
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
        [Authorize(Roles = "sysadmin")]
        public IActionResult Post([FromBody] CarRentalCompany company)
        {
            CarRentalCompany newCompany = new CarRentalCompany();
            newCompany.Name = company.Name;
            newCompany.Address = company.Address;
            newCompany.Branches = company.Branches;
            newCompany.PriceList = company.PriceList;
            newCompany.About = company.About;
            if(Crdbl.AddCarRentalCompany(newCompany))
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        // PUT: api/CarRentalCompany/5
        [HttpPut("{id}")]
        [Authorize(Roles = "carrentaladmin")]
        public IActionResult Put(int id, [FromBody] CarRentalCompany editedCompany)
        {
            CarRentalCompany company = new CarRentalCompany();
            CarRentalCompany companyTemp = new CarRentalCompany();
            companyTemp = Crdbl.FindCompanyById(editedCompany.Id);
            //moramo izmeniti i administratore i automobile te kompanije zbog polja companyName
            Udbl.EditUserByCompanyName(companyTemp.Name, editedCompany.Name);
            Cdbl.EditCarsCompanyName(editedCompany.Name, editedCompany.Id);

            company.Id = editedCompany.Id;
            company.Name = editedCompany.Name;
            company.Address = editedCompany.Address;
            company.Branches = editedCompany.Branches;
            company.PriceList = editedCompany.PriceList;
            company.About = editedCompany.About;

            //proveravamo da li je novoizabrano ime kompanije dozvoljeno
            //ne mogu postojati dve kompanije sa istim imenom
            //ali prvo moramo da provrimo da li se ime uopste menja
            //jer ako se ne menja ne moramo da proveravamo da li je ime odgovarajuce
            if(editedCompany.Name != companyTemp.Name)
            {
          
                if(Crdbl.CheckCompanyName(company.Name))
                {
                    Crdbl.EditCarRentalCompany(company);
                    return Ok();
                }
                else
                {
                    return BadRequest();
                }
            }
            else
            {
                Crdbl.EditCarRentalCompany(company);
                return Ok();
            }
           
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
