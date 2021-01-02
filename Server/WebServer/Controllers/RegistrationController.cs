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
    public class RegistrationController : ControllerBase
    {
        readonly UserDatabaseLogic Udbl = new UserDatabaseLogic();
        // GET: api/Registration
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Registration/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Registration
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] User user)
        {
            User newUser = new User();
            newUser.FirstName = user.FirstName;
            newUser.Lastname = user.Lastname;
            newUser.Username = user.Username;
            newUser.ListOfFriends = "";
            newUser.Role = "user";
            newUser.Email = user.Email;
            newUser.Password = user.Password;
            newUser.LoggedIn = false;
            newUser.IsDeleted = false;
            newUser.Gender = user.Gender;
            if (Udbl.Register(newUser))
            {
                return Ok(newUser);
            }
            else
            {
                return NotFound("not found");
            }
        }

        // PUT: api/Registration/5
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
