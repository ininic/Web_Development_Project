using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebServer.Models
{
    public class Car
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Model { get; set; }
        public int Year { get; set; }
        public int NumberOfSeats { get; set; }
        public string Tip { get; set; } 
        public int CarRenalId { get; set; }

    }
}
