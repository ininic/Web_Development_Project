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
    public class UsersController : ControllerBase
    {
        readonly UserDatabaseLogic Udbl = new UserDatabaseLogic();
        // GET: api/Users
        [HttpGet]
        public IEnumerable<User> Get()
        {
            User user = new User();
            user.FirstName = "Pera";
            user.Lastname = "Peric";
            user.LoggedIn = false;
            user.IsDeleted = false;
            user.Password = "12345678";
            user.Username = "pperic";
            user.Gender = "male";
            user.Role = "sysadmin";
            user.Email = "ininic95@gmail.com";
            user.ListOfFriends = "";
            //Udbl.AddUser(user);
            Udbl.EditUser(user);

            return Udbl.GetAllUsers();
            //return new string[] { "value1", "value2" };
        }

        // GET: api/Users/5
        [HttpGet("{id}", Name = "Get")]
        public String Get(int id)
        {
           
            return "assaa";
        }

        // POST: api/Users
        [HttpPost]
        public ActionResult Post(User user)
        { 
            
            bool flag = Udbl.AddUser(user);
            if (flag)
            {
                return Content("Here's the ContentResult message.");
            }

    
            else
            {
                return Ok();
            }
            
        }



        // PUT: api/Users/5
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
