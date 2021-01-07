using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebServer.DatabaseConfig;
using WebServer.Models;

namespace WebServer.DatabaseLogic
{
    public class CarRentalCompanyDatabaseLogic
    {
        private static readonly object Obj = new object();
        public bool AddCarRentalCompany(CarRentalCompany newCompany) 
        {
            lock (Obj)
            {
                using (var acess = new DatabaseAccess())
                {
                    var companies = acess.CarRentalCompaies;
                    foreach (var company in companies)
                    {
                        if (company.Name == newCompany.Name)
                        {

                            return false;

                        }
                    }

                    acess.CarRentalCompaies.Add(newCompany);
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
        public List<CarRentalCompany> GetAllCarRentalCompanies()
        {
            List<CarRentalCompany> listOfcompanies = new List<CarRentalCompany>();

            using (var acces = new DatabaseAccess())
            {
                var query = acces.CarRentalCompaies;

                listOfcompanies = query.ToList();
            }

            return listOfcompanies;
        }


        public CarRentalCompany FindCompanyById(int id)
        {
            CarRentalCompany c = new CarRentalCompany();
            bool boolvalue = false;
            lock (Obj)
            {
                using (var access = new DatabaseAccess())
                {
                    var companies = access.CarRentalCompaies;

                    foreach (var company in companies)
                    {
                        if (company.Id == id)
                        {
                            boolvalue = true;
                            c = company;
                        }
                    }
                }
                if (boolvalue)
                {
                    return c;
                }
                else
                {

                }

                return null;
            }
        }


        public CarRentalCompany FindCompanyByName(string name)
        {
            CarRentalCompany c = new CarRentalCompany();
            bool boolvalue = false;
            lock (Obj)
            {
                using (var access = new DatabaseAccess())
                {
                    var companies = access.CarRentalCompaies;

                    foreach (var company in companies)
                    {
                        if (company.Name == name)
                        {
                            boolvalue = true;
                            c = company;
                        }
                    }
                }
                if (boolvalue)
                {
                    return c;
                }
                else
                {

                }

                return null;
            }
        }

        public bool EditCarRentalCompany(CarRentalCompany newCompany)
        {
            lock (Obj)
            {
                using (var acess = new DatabaseAccess())
                {
                    var companies = acess.CarRentalCompaies;
                    foreach (var company in companies)
                    {
                        if (company.Id == newCompany.Id)
                        {

                            company.Name = newCompany.Name;
                            company.Address = newCompany.Address;
                            company.Branches = newCompany.Branches;
                            company.PriceList = newCompany.PriceList;
                            company.About = newCompany.About;
                        }
                    }
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
        public bool CheckCompanyName(string companyName)
        {

            lock (Obj)
            {
                using (var acess = new DatabaseAccess())
                {
                    var companies = acess.CarRentalCompaies;
                    foreach (var company in companies)
                    {
                        if (company.Name == companyName)
                        {
                            return false;


                        }
                    }
                }
            }
            return true;
        }
    }
}
