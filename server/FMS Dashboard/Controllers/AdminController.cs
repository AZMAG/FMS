using FMS_Dashboard.Models;
using Kendo.Mvc.UI;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.DirectoryServices;
using System.DirectoryServices.AccountManagement;
using System.Dynamic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Kendo.Mvc.Extensions;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
using FMS_Dashboard.Helpers;

namespace FMS_Dashboard.Controllers
{
    [CustomAuthorize(Roles = "Admin")]
    public class AdminController : Controller
    {
        public class SimpleADObj
        {
            public string fullName {get; set;}

            public string lastName { get; set; }
            public string firstName { get; set; }
            public string id { get; set; }
        }

        public class UserViewModel{
            public string roleName { get; set; }
            public string name { get; set; }

            [DisplayName("Product name")]
            [Required(ErrorMessage = "my custom error message")]
            public string domainName { get; set; }
            public int roleId { get; set; }
        }

        public ActionResult Index()
        {
            PopulateRoles();
            return View();
        }

        private void PopulateRoles()
        {
            ViewData["Roles"] = GetRoles();
        }

        public JsonResult GetADUsers()
        {
            var appUsers = GetAppUsers().Select(x => x.domainName);
            var adUsers = GetListOfADUsers().Where(x => !appUsers.Contains(x.id)).ToList();
            adUsers.Sort((x, y) => x.firstName.CompareTo(y.firstName));
            return Json(adUsers, JsonRequestBehavior.AllowGet);
        }

        private List<UserViewModel> GetAppUsers()
        {
            using (var context = new Jacobs_PlayPenEntities())
            {
                var userRoleList = new List<UserViewModel>();
                var users = context.ApplicationUsers.Include("ApplicationRole").ToList();

                foreach (var user in users)
                {
                    var adUser = GetADUser(user.domainName);
                    var userRole = new UserViewModel();
                    userRole.domainName = user.domainName;
                    userRole.name = adUser.firstName + " " + adUser.lastName;
                    userRole.roleName = user.ApplicationRole.name;
                    userRole.roleId = user.RoleId;
                    userRoleList.Add(userRole);
                }
                return userRoleList;
            }
        }

        public List<ApplicationRole> GetRoles()
        {
            using (var context = new Jacobs_PlayPenEntities())
            {
                context.Configuration.ProxyCreationEnabled = false;
                var roles = context.ApplicationRoles.ToList();
                return roles;
            }
        }

        public JsonResult GetJSONRoles()
        {
            var roles = GetRoles();
            return Json(roles, JsonRequestBehavior.AllowGet);
        }


        public List<SimpleADObj> GetListOfADUsers()
        {
            var data = new List<SimpleADObj>();
            var entry = new DirectoryEntry("LDAP://" + Environment.UserDomainName);
            using (entry)
            {
                var searcher = new DirectorySearcher(entry, "(&(objectCategory=person)(objectClass=user)(memberof=CN=All MAG Staff,OU=MAGGPs,OU=MAGORG,DC=AZMAG,DC=local))");
                searcher.PropertiesToLoad.AddRange(new string[] { "samAccountname", "GivenName", "sn" });

                using (searcher)
                {

                    var results = searcher.FindAll();

                    foreach (var result in results.Cast<SearchResult>())
                    {
                        var properties = result.Properties;
                        var samAccountName = properties["samAccountName"][0];
                        var givenName = properties["GivenName"][0];
                        var surName = properties["sn"][0];

                        var obj = new SimpleADObj();
                        obj.id = samAccountName.ToString();
                        obj.firstName = givenName.ToString();
                        obj.lastName = surName.ToString();
                        obj.fullName = givenName.ToString() + " " + surName.ToString();
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

            if (user != null)
            {
                obj.id = user.SamAccountName;
                obj.firstName = user.GivenName;
                obj.lastName = user.Surname;
            }
            
            return obj;
        }


        public ActionResult GetUsers([DataSourceRequest]DataSourceRequest request)
        {
            using (var context = new Jacobs_PlayPenEntities())
            {
                var users = GetAppUsers();
                return Json(users.ToDataSourceResult(request), JsonRequestBehavior.AllowGet);
            }
        }

        //public ActionResult UpdateUser([DataSourceRequest]DataSourceRequest request)
        //{

        //}

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult DeleteUser([DataSourceRequest]DataSourceRequest request, UserViewModel ur)
        {
            using (var context = new Jacobs_PlayPenEntities())
            {
                var user = context.ApplicationUsers.Include("ApplicationRole").Where(x => x.domainName == ur.domainName).FirstOrDefault();
                var entry = context.Entry(user);
                if (entry.State == EntityState.Detached)
                {
                    context.ApplicationUsers.Attach(user);
                }
                context.ApplicationUsers.Remove(user);
                context.SaveChanges();
                return Json(new[] { user }.ToDataSourceResult(request, ModelState));
            }
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult UpdateUser([DataSourceRequest]DataSourceRequest request, UserViewModel ur)
        {
            using (var context = new Jacobs_PlayPenEntities())
            {
                context.Configuration.ProxyCreationEnabled = false;
                var user = context.ApplicationUsers.Include("ApplicationRole").Where(x => x.domainName == ur.domainName).FirstOrDefault();
                user.RoleId = ur.roleId;

                var newRole = context.ApplicationRoles.Where(x => x.id == ur.roleId).FirstOrDefault();
                ur.roleName = newRole.name;


                var entry = context.Entry(user);
                if (entry.State == EntityState.Detached)
                {
                    context.ApplicationUsers.Attach(user);
                }
                context.SaveChanges();
                return Json(new[] { ur }.ToDataSourceResult(request, ModelState));
            }
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult CreateUser([DataSourceRequest]DataSourceRequest request, UserViewModel ur)
        {
            using (var context = new Jacobs_PlayPenEntities())
            {
                var user = new ApplicationUser();
                user.RoleId = ur.roleId;
                user.domainName = ur.domainName;

                var entry = context.Entry(user);
                if (entry.State == EntityState.Detached)
                {
                    context.ApplicationUsers.Attach(user);
                }
                context.ApplicationUsers.Add(user);
                context.SaveChanges();
                return Json(new[] { user }.ToDataSourceResult(request, ModelState));
            }
        }
    }
}