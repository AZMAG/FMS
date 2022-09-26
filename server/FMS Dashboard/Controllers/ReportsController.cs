using FMS_Dashboard.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FMS_Dashboard.Controllers
{
    public class ReportsController : Controller
    {
        // GET: Reports
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetGeneratedReports()
        {
            using (var context = new Jacobs_PlayPenEntities())
            {
                var data = context.GeneratedReports.ToList();
                return Json(data, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult AddGeneratedReport(GeneratedReport newReport)
        {
            using (var context = new Jacobs_PlayPenEntities())
            {
                try
                {
                    context.GeneratedReports.Add(newReport);
                    context.SaveChanges();
                    return Json(newReport, JsonRequestBehavior.AllowGet);
                }
                catch (Exception ex)
                {
                    return Json(ex.Message, JsonRequestBehavior.AllowGet);
                }
            }
        }

    }
}
