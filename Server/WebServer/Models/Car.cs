using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebServer.Models
{
    public class Car
    {
        public int Id { get; set; }
        public string NameOfCompany { get; set; }
        public string Mark { get; set; } 
        public string Model { get; set; }
        public int Year { get; set; }
        public int NumberOfSeats { get; set; }
        public string Type { get; set; }  
        public int CarRenalId { get; set; }
        public double Rating { get; set; }
        public int RatingCounter { get; set; }

    }
}
