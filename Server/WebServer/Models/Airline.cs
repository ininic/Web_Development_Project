using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebServer.Models
{
    public class Airline
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string About { get; set; }
        public double Rating { get; set; }
   
        public Airline() { }
    }
}
