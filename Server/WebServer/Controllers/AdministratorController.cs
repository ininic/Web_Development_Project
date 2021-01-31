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
    public class AdministratorController : ControllerBase     
    {
        readonly UserDatabaseLogic Udbl = new UserDatabaseLogic();
        // GET: api/Admin
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Admin/5
        // preuzimanje korisnika na osnovu njihove uloge u sistemu
        [HttpGet("{role}")]
        [Authorize(Roles = "sysadmin")]
        public List<User> Get(string role)
        {
            return Udbl.GetUsersByRole(role);           
        }

        // POST: api/Admin
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Admin/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        // brisanje korisnika
        [HttpDelete("{id}")]
        [Authorize(Roles = "sysadmin")]
        public IActionResult Delete(int id)
        {
            if (Udbl.DeleteUser(id))
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
