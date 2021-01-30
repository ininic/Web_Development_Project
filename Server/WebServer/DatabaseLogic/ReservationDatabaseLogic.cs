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

        public List<Reservation> GetReservationByUserId(int userId)
        {
            lock (Obj)
            {
                List<Reservation> listOfReservation = new List<Reservation>();
                using (var access = new DatabaseAccess())
                {
                    var reservations = access.Reservations;
                    foreach(var res in reservations)
                    {
                        if(res.UserId == userId)
                        {
                        listOfReservation.Add(res);
                        }
                    }              
                }

                return listOfReservation;
            }
        }

        public int DeleteReservation(int id)
        {
            int valid = 0;
            TimeSpan diff;
            DateTime dtl = new DateTime();
           // DateTime dtl = new DateTime();
            dtl = DateTime.Now;
            using (var access = new DatabaseAccess())
            {
                var reservations = access.Reservations;
                foreach (var res in reservations)
                {
                    if (res.Id == id)
                    {

                        DateTime dt = new DateTime(res.Start.Year, res.Start.Month, res.Start.Day, res.Start.Hour, res.Start.Minute, res.Start.Second);
                      
                        diff = dt - dtl;
                        if(diff.TotalMinutes < 60)
                            {
                                return 0;
                            }   
                        

                        reservations.Remove(res);
                    }
                }
                valid = access.SaveChanges();
            }

            if (valid > 0)
            {
                return valid;
            }
            else
            {
                return 0;
            }
        }

        public bool IsCarRated(int id)
        {
            //Reservation reservation = new Reservation();

            using (var access = new DatabaseAccess())
            {
                var reservations = access.Reservations;
                foreach (var reservation in reservations)
                {
                    if (reservation.Id == id)
                    {
                        if (reservation.IsCarRated == false)
                        {
                            return false;
                        }                                           
                    }
                }

                return true;
            }
          
        }

        public bool IsCompanyRated(int id)
        {
            //Reservation reservation = new Reservation();

            using (var access = new DatabaseAccess())
            {
                var reservations = access.Reservations;
                foreach (var reservation in reservations)
                {
                    if (reservation.Id == id)
                    {
                        if (reservation.IsCompanyRated == false)
                        {
                            return false;
                        }
                    }
                }

                return true;
            }

        }

        public bool SetCarRate(int reservationId)
        {
            int valid;

            using (var access = new DatabaseAccess())
            {
                var reservations = access.Reservations;
                foreach (var reservation in reservations)
                {
                    if (reservation.Id == reservationId)
                    {
                        reservation.IsCarRated = true;
                    }
                }

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

        public bool SetCompanyRate(int reservationId)
        {
            int valid;

            using (var access = new DatabaseAccess())
            {
                var reservations = access.Reservations;
                foreach (var reservation in reservations)
                {
                    if (reservation.Id == reservationId)
                    {
                        reservation.IsCompanyRated = true;
                    }
                }

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
