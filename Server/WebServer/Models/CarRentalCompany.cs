﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebServer.Models
{
    public class CarRentalCompany
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string About { get; set; }
        public string PriceList { get; set; }
        public string Branches { get; set; }
        public double Rating { get; set; }
        public int RatingCounter { get; set; }



    }
}
