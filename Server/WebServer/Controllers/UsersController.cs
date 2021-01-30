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
        [HttpGet("{userId}/{username}")]
        [Authorize]
        public User Get(int userId, string username)
        {
            if(username == "000")
            {
                return Udbl.FindUserById(userId);
            }
            { 
                return Udbl.FindUserByUsername(username);
            }
        }

        // POST: api/Users
        [HttpPost]
        [Authorize(Roles = "sysadmin")]
        public IActionResult Post([FromBody] User user)
        {
            User newUser = new User();
            newUser.FirstName = user.FirstName;
            newUser.Lastname = user.Lastname;
            newUser.Username = user.Username;
            newUser.ListOfFriends = "";
            newUser.Role = user.Role;
            newUser.Email = user.Email;
            newUser.Password = user.Password;
            newUser.LoggedIn = false;
            newUser.IsDeleted = false;
            newUser.Gender = user.Gender;
            newUser.CompanyName = user.CompanyName;

            if (Udbl.AddUser(newUser))
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
           
            
            
        }



        // PUT: api/Users/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] User user)
        {
            Udbl.EditUser(user);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
