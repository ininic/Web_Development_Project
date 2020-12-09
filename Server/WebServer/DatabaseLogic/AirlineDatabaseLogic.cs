using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebServer.DatabaseConfig;
using WebServer.Models;

namespace WebServer.DatabaseLogic
{
    public class AirlineDatabaseLogic
    {
        private static readonly object Obj = new object();
        public bool AddAirline(Airline newAirline)
        {
            lock (Obj)
            {
                using (var acess = new DatabaseAccess())
                {
                    var airlines = acess.Airlines;
                    foreach (var user in airlines)
                    {
                        if (user.Name == newAirline.Name)
                        {
                            
                            acess.Airlines.Add(newAirline);
                            
                        }
                    }

                    acess.Airlines.Add(newAirline);
                    int valid = acess.SaveChanges();
                    if (valid > 0)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
            }
        }

        public List<Airline> GetAllAirlines() 
        {
            List<Airline> listOfAirlines = new List<Airline>();

            using (var acces = new DatabaseAccess())
            {
                var query = from us in acces.Airlines
                            where us.Name == "kompanija 1"
                            select us;
                listOfAirlines = query.ToList();
            }

            return listOfAirlines;
        }
    }
}
