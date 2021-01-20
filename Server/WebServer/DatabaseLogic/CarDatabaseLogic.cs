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
                        if (car.Id == newCar.Id)
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

        public List<Car> GetCars()
        {
            List<Car> listOfCars = new List<Car>();

            using (var access = new DatabaseAccess())
            {
                var cars = access.Cars;
                listOfCars = cars.ToList();
            }

            return listOfCars;
        } 

        public void EditCarsCompanyName(string newCompanyName, int id)
        {
            List<Car> listOfCars = new List<Car>();

            using (var access = new DatabaseAccess())
            {
                var cars = access.Cars;
                foreach (var car in cars)
                {
                    if (car.CarRenalId == id)
                    {
                        car.NameOfCompany = newCompanyName;
                    }
                }
         
                int valid = access.SaveChanges();
            }        
           
        }

        public int DeleteCar(int id)
        {
            int valid = 0;

            using (var access = new DatabaseAccess())
            {
                var cars = access.Cars;
                foreach (var car in cars)
                {
                    if (car.Id == id)
                    {
                        cars.Remove(car);
                    }
                }
                valid = access.SaveChanges();
            }
            
            if(valid > 0)
            {
                return valid;
            }
            else
            {
                return 0;
            }
        }


        public List<Car> GetCarById(int carId)
        {
            List<Car> listOfCars = new List<Car>();

            using (var access = new DatabaseAccess())
            {
                var cars = access.Cars;
                foreach (var car in cars)
                {
                    if (car.Id == carId)
                    {
                        listOfCars.Add(car);
                    }
                }
            }

            return listOfCars;
        }

        public Car GetCarObjectById(int carId) 
        {
            Car carObj = new Car();

            using (var access = new DatabaseAccess())
            {
                var cars = access.Cars;
                foreach (var car in cars)
                {
                    if (car.Id == carId)
                    {
                        carObj = car;
                    }
                }
            }

            return carObj;
        }
        public bool EditCar(Car editedCar)
        {
            int valid = 0;
            using (var access = new DatabaseAccess())
            {
                var cars = access.Cars;
                foreach (var car in cars)
                {
                    if (car.Id == editedCar.Id)
                    {                       
                        car.Mark = editedCar.Mark;
                        car.Model = editedCar.Model;
                        car.Type = editedCar.Type;
                        car.NameOfCompany = editedCar.NameOfCompany;
                        car.Year = editedCar.Year;
                        car.NumberOfSeats = editedCar.NumberOfSeats;
                        car.CarRenalId = car.CarRenalId;
                        break;
                    }
                }
                valid = access.SaveChanges();
            }
            if(valid > 0)
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
