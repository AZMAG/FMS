using FMS_Dashboard.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.DirectoryServices;
using System.DirectoryServices.AccountManagement;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace FMS_Dashboard
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);            
        }
        protected void Application_PostAuthenticateRequest(object sender, EventArgs e)
        {
            if (User.Identity.IsAuthenticated)
            {
                var role = GetRoleByDomainName(HttpContext.Current.User.Identity.Name);

                GenericPrincipal principal = new GenericPrincipal(HttpContext.Current.User.Identity, new string[1] { role });
                Thread.CurrentPrincipal = HttpContext.Current.User = principal;
            }
        }

        private string GetRoleByDomainName(string name)
        {
            using (var context = new Entities())
            {
                var currentUser = context.ApplicationUsers.Where(x => x.domainName == name.Replace("AZMAG\\", "")).FirstOrDefault();
                var currentRole = currentUser.ApplicationRole.name;
                return currentRole;
            }
        }
    }
}
