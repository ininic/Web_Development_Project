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

    }
}
