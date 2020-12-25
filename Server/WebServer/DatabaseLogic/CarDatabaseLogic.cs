using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebServer.DatabaseConfig;
using WebServer.Models;

namespace WebServer.DatabaseLogic
{
    public class CarDatabaseLogic
    {
        private static readonly object Obj = new object();
        public bool AddCar(Car newCar)
        {
            lock (Obj)
            {
                using (var acess = new DatabaseAccess())
                {
                    var cars = acess.Cars;
                    foreach (var car in cars)
                    {
                        if (car.UniqueIdentifier == newCar.UniqueIdentifier)
                        {

                            return false;

                        }
                    }

                    acess.Cars.Add(newCar);
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

        public List<Car> GetCarsByRentalId(int carRentalId) 
        {
            List<Car> listOfCars = new List<Car>();

            using (var access = new DatabaseAccess())
            {
                var cars = access.Cars;
                foreach (var car in cars)
                {
                    if (car.CarRenalId == carRentalId)
                    {
                        listOfCars.Add(car);
                    }
                }
            }

            return listOfCars;
        }
    }
}
