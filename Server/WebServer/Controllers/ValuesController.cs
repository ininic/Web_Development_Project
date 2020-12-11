using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebServer.DatabaseLogic;
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
        [Authorize]
        public ActionResult<IEnumerable<string>> Get()
        {


            User user = new User();
            user.FirstName = "Mira";
            user.Lastname = "Miric";
            user.LoggedIn = false;
            user.IsDeleted = false;
            user.Password = "12345678";
            user.Username = "mmiric";
            user.Gender = "male";
            user.Role = "sysadmin";
            user.Email = "ininic95@gmail.com";
            user.ListOfFriends = "";
            Udbl.AddUser(user);

            User user2 = new User();
            user2.FirstName = "Mira";
            user2.Lastname = "Miric";
            user2.LoggedIn = false;
            user2.IsDeleted = false;
            user2.Password = "12345678";
            user2.Username = "hmiric";
            user2.Gender = "male";
            user2.Role = "sysadmin";
            user2.Email = "ininic95@gmail.com";
            user2.ListOfFriends = "";
            Udbl.AddUser(user2);

            User user3 = new User();
            user3.FirstName = "Mira";
            user3.Lastname = "Miric";
            user3.LoggedIn = false;
            user3.IsDeleted = false;
            user3.Password = "12345678";
            user3.Username = "umiric";
            user3.Gender = "male";
            user3.Role = "sysadmin";
            user3.Email = "ininic95@gmail.com";
            user3.ListOfFriends = "";
            Udbl.AddUser(user3);

            Airline airline1 = new Airline();

            airline1.About = "Nesto o kompaniji";
            airline1.Name = "Kompanija 1";
            airline1.Rating = 4.5;
            Adbl.AddAirline(airline1);

            return new string[] { "value1", "value2" };

          
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
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
