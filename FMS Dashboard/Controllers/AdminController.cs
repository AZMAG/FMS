using FMS_Dashboard.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.DirectoryServices;
using System.DirectoryServices.AccountManagement;
using System.Dynamic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FMS_Dashboard.Controllers
{
    public class AdminController : Controller
    {
        public class SimpleADObj
        {
            public string lastName { get; set; }
            public string firstName { get; set; }
            public string id { get; set; }
            public List<string> OUGroups { get; set; }
        }

        public class UserRole{
            public string name { get; set; }
            public string role { get; set; }
            public string domainName { get; set; }
        }

        public JsonResult GetADUsers()
        {
            var users = GetListOfADUsers();
            return Json(users, JsonRequestBehavior.AllowGet);
        }

        public List<SimpleADObj> GetListOfADUsers()
        {
            var data = new List<SimpleADObj>();

            using (var context = new PrincipalContext(ContextType.Domain, "azmag"))
            {
                using (var searcher = new PrincipalSearcher(new UserPrincipal(context)))
                {
                    var principals = searcher.FindAll().Cast<UserPrincipal>().Where(x => x.StructuralObjectClass == "user" && x.Enabled == true)
                        .Where(x => x.GetGroups().Where(y => y.Name == "All MAG Staff").Any());

                    foreach (var up in principals)
                    {
                        var obj = ConvertUserPrincipalToSimpleADObj(up);
                        data.Add(obj);
                    }
                }
            }
            return data;
        }

        public SimpleADObj GetADUser(string domainName)
        {
            using (var context = new PrincipalContext(ContextType.Domain, "azmag"))
            {
                using (var searcher = new PrincipalSearcher(new UserPrincipal(context)))
                {
                    var pu = searcher.FindAll().Cast<UserPrincipal>().Where(x => x.Enabled == true && x.SamAccountName == domainName).FirstOrDefault();
                    return ConvertUserPrincipalToSimpleADObj(pu);
                }
            }
        }

        public SimpleADObj ConvertUserPrincipalToSimpleADObj(UserPrincipal user)
        {
            var obj = new SimpleADObj();
            obj.id = user.SamAccountName;
            obj.firstName = user.GivenName;
            obj.lastName = user.Surname;
            obj.OUGroups = user.GetGroups().Select(x => x.Name).ToList();
            return obj;
        }


        public JsonResult GetUserRole()
        {
            using (var context = new Entities())
            {
                var userRoleList = new List<UserRole>();
                var users = context.ApplicationUsers.Include("ApplicationRole").ToList();

                foreach (var user in users)
                {
                    var adUser = GetADUser(user.domainName);
                    var userRole = new UserRole();
                    userRole.domainName = user.domainName;
                    userRole.role = user.ApplicationRole.name;
                    userRole.name = adUser.firstName + " " + adUser.lastName;
                    userRoleList.Add(userRole);
                }

                return Json(userRoleList, JsonRequestBehavior.AllowGet);
            }


        }
    }
}