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
                var query = acces.Airlines;
                          
                listOfAirlines = query.ToList();
            }

            return listOfAirlines;
        }

        public Airline FindUserById(int id)
        {
            Airline a = new Airline();
            bool boolvalue = false;
            lock (Obj)
            {
                using (var access = new DatabaseAccess())
                {
                    var airlines = access.Airlines;

                    foreach (var airline in airlines)
                    {
                        if (airline.Id == id)
                        {
                            boolvalue = true;
                            a = airline;
                        }
                    }
                }
                if (boolvalue)
                {
                    return a;
                }
                else
                {

                }

                return null;
            }
        }

    }
}
