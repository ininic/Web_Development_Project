using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebServer.DatabaseLogic;
using WebServer.DatabasePopulation;
using WebServer.Models;

namespace WebServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        // GET api/values
        readonly UserDatabaseLogic Udbl = new UserDatabaseLogic();
        readonly AirlineDatabaseLogic Adbl = new AirlineDatabaseLogic();
        [HttpGet]
        [Authorize(Roles = "sysadmin")]
        public ActionResult<IEnumerable<string>> Get()
        {
            return new string[] { "value1", "value2" };         
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            DatabasePopulate dp = new DatabasePopulate();
            dp.Populate();
            return "value";
        }

        // POST api/values
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Nesto nest)
        {
            //var user = await Udbl.FindUserById(2);
             if (nest.ime == "nesto")
            {
               
                return  NotFound();
            }
              User user4 = new User();
            user4.FirstName = nest.ime;
            user4.Lastname = nest.ime;
            user4.LoggedIn = false;
            user4.IsDeleted = false;
            user4.Password = "12345678";
            user4.Username = nest.ime;
            user4.Username = nest.ime;
            user4.Gender = "male";
            user4.Role = "sysadmin";
            user4.Email = "ininic95@gmail.com";
            user4.ListOfFriends = "";
                Udbl.AddUser(user4);
            return  Ok("Inserted");
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
           
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
    public class Nesto
    {
        public string ime;
    }
}
