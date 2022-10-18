using FMS_Dashboard.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Common.CommandTrees;
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
                    this.AddReportMiscData(newReport);
                    context.SaveChanges();
                    return Json(newReport, JsonRequestBehavior.AllowGet);
                }
                catch (Exception ex)
                {
                    return Json(ex.Message, JsonRequestBehavior.AllowGet);
                }
            }
        }

        public bool AddReportMiscData(GeneratedReport newReport)
        {

            string startDate1 = newReport.startDate1;
            string endDate1 = newReport.endDate1;

            if (newReport.timePeriodYear1 != null)
            {
                startDate1 = "1/1/" + newReport.timePeriodYear1;
                endDate1 = "12/31/" + newReport.timePeriodYear1;
            }

            string startDate2 = newReport.startDate2;
            string endDate2 = newReport.endDate2;

            if (newReport.timePeriodYear2 != null)
            {
                startDate2 = "1/1/" + newReport.timePeriodYear2;
                endDate2 = "12/31/" + newReport.timePeriodYear2;
            }

            using (var context = new Jacobs_PlayPenEntities())
            {
                try
                {
                    context.GenerateMiscDataReport(newReport.id, newReport.det_num, startDate1, endDate1, true);
                    context.GenerateMiscDataReport(newReport.id, newReport.det_num, startDate2, endDate2, false);
                    return true;
                }
                catch (Exception ex)
                {
                    return false;
                }
            }
        }
    }
}
