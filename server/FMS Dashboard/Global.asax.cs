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

        protected void Application_BeginRequest(Object sender, EventArgs e)
        {
            // Preflight request comes with HttpMethod OPTIONS
            if (HttpContext.Current.Request.HttpMethod == "OPTIONS")
            {
                HttpContext.Current.Response.AddHeader("Cache-Control", "no-cache");
                HttpContext.Current.Response.AddHeader("Access-Control-Allow-Methods", "GET, POST");
                // The following line solves the error message
                //HttpContext.Current.Response.AddHeader("Access-Control-Allow-Origin", "http://localhost:3000");
                // If any http headers are shown in preflight error in browser console add them below
                HttpContext.Current.Response.AddHeader("Access-Control-Allow-Headers", "Content-Type, Accept, Pragma, Cache-Control, Authorization ");
                HttpContext.Current.Response.AddHeader("Access-Control-Max-Age", "1728000");
                HttpContext.Current.Response.End();
            }
        }

        private string GetRoleByDomainName(string name)
        {
            using (var context = new FreewayMSEntities())
            {
                //var currentUser = context.ApplicationUsers.Where(x => x.domainName == name.Replace("AZMAG\\", "")).FirstOrDefault();
                //if (currentUser == null)
                //{
                //    return "Unknown";
                //}
                //var currentRole = currentUser.ApplicationRole.name;
                return "Admin";
                //return currentRole;
            }
        }
    }
}
