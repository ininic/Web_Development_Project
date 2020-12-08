using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebServer.Models
{
    public class User
    {
       
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string Lastname { get; set; }     
        public string Email { get; set; }
        public string Gender { get; set; }
        public string Role { get; set; }              
        public string ListOfFriends { get; set; }
        public bool LoggedIn { get; set; }
        public bool IsDeleted { get; set; }

        public User() { }
    }
}
