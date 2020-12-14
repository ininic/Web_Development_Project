using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebServer.DatabaseConfig;
using WebServer.Models;

namespace WebServer.DatabaseLogic
{
    public class UserDatabaseLogic 
    {
        private static readonly object Obj = new object();
        public bool AddUser(User newUser)
        {
            lock (Obj)
            {
                using (var acess = new DatabaseAccess())
                {
                    var users = acess.Users;
                    foreach (var user in users)
                    {
                        if (user.Username == newUser.Username)
                        {
                            if (user.IsDeleted == false)
                            {
                                //exists in database, but it is not deleted
                                return false;
                            }
                            else
                            {
                                // exists in database, and it is deleted(logicaly), so we can add another one
                                // with same name
                                acess.Users.Add(newUser);
                            }
                        }
                    }

                    acess.Users.Add(newUser);
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

        public User FindUserById(int id)
        {
            User u = new User();
            bool boolvalue = false;
            lock (Obj)
            {
                using (var access = new DatabaseAccess())
                {
                    var users = access.Users;

                    foreach (var user in users)
                    {
                        if (user.Id == id)
                        {
                            boolvalue = true;
                            u = user;
                        }
                    }
                }
                if (boolvalue)
                {                   
                    return u;
                }
                else
                {
                   
                }

                return null;
            }
        }

        public bool EditUser(User u)
        {
            lock (Obj)
            {
                using (var access = new DatabaseAccess())
                {
                    int valid = 0;
                    foreach (var us in access.Users)
                    {
                        if (us.Id == u.Id)
                        {
                            us.Username = u.Username;
                            us.Password = u.Password;
                            us.FirstName = u.FirstName;
                            us.Lastname = u.Lastname;
                            us.Gender = u.Gender;
                            us.Role = u.Role;
                            us.IsDeleted = u.IsDeleted;
                            us.LoggedIn = u.LoggedIn;
                            goto label;
                        }
                    }
                label: { }
                    try
                    {
                        valid = access.SaveChanges();

                        if (valid > 0)
                        {
                            return true;
                        }
                        else
                        {
                            return false;
                        }
                    }
                    catch
                    {
                        AddUser(u);
                        return true;
                    }
                }
            }
        }

        public bool DeleteUser(User u)
        {
            using (var access = new DatabaseAccess())
            {
                int valid = 0;
                //access.Users.Attach(u);
                //access.Users.Remove(u);
                foreach (var user in access.Users)
                {
                    if (user.Id == u.Id)
                    {
                        if (user.IsDeleted == false)
                        {

                            user.IsDeleted = true;
                            goto label;
                        }
                    }
                }


            label:
                {
                }
                try
                {
                    valid = access.SaveChanges();

                    if (valid > 0)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
                catch
                {
                    return false;
                }
            }
        }
        public List<User> GetAllUsers()
        {
            List<User> listOfUsers = new List<User>();

            using (var acces = new DatabaseAccess())
            {
                var query = from us in acces.Users
                            where us.FirstName == "mira"
                            select us;
                listOfUsers = query.ToList();
            }         

            return listOfUsers;
        }

        public User LogInUser(string username, string password)
        {
            User u = new User();
            bool boolvalue = false;
            lock (Obj)
            {
                using (var access = new DatabaseAccess())
                {
                    var users = access.Users;

                    foreach (var user in users)
                    {
                        if (user.Username == username)
                        {
                            if (user.Password == password)
                            {
                                return user;
                            }
                        }
                    }

                
                }

                if (boolvalue)
                {
                    Console.WriteLine("Korisnik " + username + " je pronadjen!");
                    return u;
                }
                else
                {
                    Console.WriteLine("Korisnik " + username + " nije pronadjen!");
                }

                return null;
            }
        }
    }
}
