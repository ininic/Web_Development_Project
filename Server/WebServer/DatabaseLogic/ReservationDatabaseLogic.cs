using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebServer.DatabaseConfig;
using WebServer.Models;

namespace WebServer.DatabaseLogic
{
    public class ReservationDatabaseLogic
    {
        private static readonly object Obj = new object();
        public bool AddReservation(Reservation newReservation)
        {
            lock (Obj)
            {
                int valid = 0;
                using (var access = new DatabaseAccess())
                {
                    var reservations = access.Reservations;

                    foreach(var res in reservations)
                    {
                        //trazimo samo rezervacije za trazeni automobil
                        if(newReservation.CarId == res.CarId)
                        {
                            //za svaku koju nadjemo, proverimo da li se preklapa na neki nacin sa 
                            //terminom nove rezervacije, ako je to slucaj vracamo false
                            if((res.Start <= newReservation.Start && res.End >= newReservation.Start) || (res.Start <= newReservation.End && res.End >= newReservation.End) || (res.Start > newReservation.Start && res.End < newReservation.End))
                            {
                                return false;
                            }
                        }

                    }
                    access.Reservations.Add(newReservation);
                    valid = access.SaveChanges();

                }

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

        public List<Reservation> GetReservation()
        {
            lock (Obj)
            {
                //List<int> allCars = new List<int>();
                //int[] allCars = new int[5];
                List<Reservation> listOfReservation = new List<Reservation>();

                using (var access = new DatabaseAccess())
                {
                    var reservations = access.Reservations;
                    listOfReservation = reservations.ToList();


                }

                return listOfReservation;
            }
        }

    }
}
