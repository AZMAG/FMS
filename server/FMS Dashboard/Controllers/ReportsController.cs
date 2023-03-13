using FMS_Dashboard.Models;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Configuration;
using System.Data.Entity;
using System.Data.Entity.Core.Common.CommandTrees;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using System.Web.UI.WebControls;
using System.IO;

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
                var query = context.GeneratedReports.Join(context.Detectors,
                                generatedReport => generatedReport.det_num,
                                detector => detector.det_num,
                                (gr, det) => new {
                                    id = gr.id,
                                    AHAS = gr.AHAS,
                                    AHATPL = gr.AHATPL,
                                    AHAOP = gr.AHAOP,
                                    AAL = gr.AAL,
                                    DDPQCCD = gr.DDPQCCD,
                                    DDPQCCW = gr.DDPQCCW,
                                    AQCFHD = gr.AQCFHD,
                                    FVD = gr.FVD,
                                    SVD = gr.SVD,
                                    SVF = gr.SVF,
                                    det_num = gr.det_num,
                                    timePeriodYear1 = gr.timePeriodYear1,
                                    timePeriodYear2 = gr.timePeriodYear2,
                                    startDate1 = gr.startDate1,
                                    startDate2 = gr.startDate2,
                                    endDate1 = gr.endDate1,
                                    endDate2 = gr.endDate2,
                                    completed = gr.completed,
                                    date_submitted = gr.date_submitted,
                                    date_completed = gr.date_completed,
                                    Location = det.Location,
                                    Route = det.Route,
                                    Direction = det.Direction,
                                    Milepost = det.Milepost,
                                    GPS = det.GPS,
                                    Type = det.Type,
                                    Length_ft = det.Length_ft,
                                    y = det.y,
                                    x = det.x,
                                    segment = det.Segment
                                });

                return Json(query.ToList(), JsonRequestBehavior.AllowGet);
            }
        }
        public bool SendEmail(GeneratedReport report)
        {
            if (report.email != null)
            {
                string path = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, @"Email Templates\ReportFinished.html");
               
                ListDictionary replacements = new ListDictionary();
                foreach (var p in report.GetType().GetProperties())
                {
                    replacements.Add("{{" + p.Name + "}}", p.GetValue(report, null)?.ToString() ?? "");
                }

                string body = System.IO.File.ReadAllText(path);

                MailDefinition md = new MailDefinition();
                md.CC = "Jfairfield@azmag.gov";
                md.From = "fmsAdmin@azmag.gov";
                md.IsBodyHtml = true;
                md.Subject = "Report Finished";

                MailMessage mailMsg = md.CreateMailMessage(report.email, replacements, body, new System.Web.UI.Control());
                SmtpClient client = new SmtpClient();
                client.Send(mailMsg);
            }
            return true;
        }

        public JsonResult AddGeneratedReport(GeneratedReport newReport)
        {
            using (var context = new Jacobs_PlayPenEntities())
            {
                try
                {
                    context.GeneratedReports.Add(newReport);
                    context.SaveChanges();
                    Task.Run(() =>
                    {
                        GenerateReportData(newReport);
                        UpdateStatusToComplete(newReport);
                        SendEmail(newReport);
                       
                     });
                    
                    return Json(newReport, JsonRequestBehavior.AllowGet);
                }
                catch (Exception ex)
                {
                    return Json(ex.Message, JsonRequestBehavior.AllowGet);
                }
            }
        }

        public bool UpdateStatusToComplete(GeneratedReport report)
        {
            using (var context = new Jacobs_PlayPenEntities())
            {

                context.Database.CommandTimeout = 180;
                try
                {
                    var rep = context.GeneratedReports.First(r => r.id == report.id);
                       rep.completed = true;
                    rep.date_completed = DateTime.Now;
                    context.SaveChanges();

                    return true;
            }
                catch (Exception ex)
                {
                    return false;
                }
            }
        }
        class StartAndEndDates {
            public string startDate1 { get; set; }
            public string endDate1 { get; set; }
            public string startDate2 { get; set; }
            public string endDate2 { get; set; }
        }

        

        private StartAndEndDates GetStartAndEndDatesFromReport(GeneratedReport report)
        {
            string startDate1 = report.startDate1;
            string endDate1 = report.endDate1;

            if (report.timePeriodYear1 != null)
            {
                startDate1 = "1/1/" + report.timePeriodYear1;
                endDate1 = "12/31/" + report.timePeriodYear1;
            }

            string startDate2 = report.startDate2;
            string endDate2 = report.endDate2;

            if (report.timePeriodYear2 != null)
            {
                startDate2 = "1/1/" + report.timePeriodYear2;
                endDate2 = "12/31/" + report.timePeriodYear2;
            }
            var rtnObj = new StartAndEndDates();
            rtnObj.startDate1 = startDate1;
            rtnObj.endDate1 = endDate1;
            rtnObj.startDate2 = startDate2;
            rtnObj.endDate2 = endDate2;
            return rtnObj;
        }

        public JsonResult DeleteGeneratedReport(Guid id)
        {
            using (var context = new Jacobs_PlayPenEntities())
            {
                context.Database.CommandTimeout = 180;
                try
                {
                    var report = context.GeneratedReports.SingleOrDefault(x => x.id == id);
                    if (report != null)
                    {
                        context.GeneratedReports.Remove(report);
                        context.SaveChanges();
                        return Json(new { id = id }, JsonRequestBehavior.AllowGet);
                    }
                    else
                    {
                        return Json(new { id = "Record not found" }, JsonRequestBehavior.AllowGet);
                    }
                }
                catch (Exception ex)
                {
                    return Json(new { id = "Error!" }, JsonRequestBehavior.AllowGet);
                }
            }
        }

        public bool GenerateReportData(GeneratedReport newReport)
        {
            var dateObj = GetStartAndEndDatesFromReport(newReport);

            using (var context = new Jacobs_PlayPenEntities())
            {

                context.Database.CommandTimeout = 180;
                try
                {
                    context.GenerateMiscDataReport(newReport.id, newReport.det_num, dateObj.startDate1, dateObj.endDate1, true);
                    context.GenerateAvgVolumeByLane(newReport.id, newReport.det_num, dateObj.startDate1, dateObj.endDate1, true);
                    context.GenerateAvgHourlyOccupancyData(newReport.id, newReport.det_num, dateObj.startDate1, dateObj.endDate1, true);
                    context.GenerateAvgHourlyThroughputData(newReport.id, newReport.det_num, dateObj.startDate1, dateObj.endDate1, true);
                    context.GenerateAvgHourlySpeedData(newReport.id, newReport.det_num, dateObj.startDate1, dateObj.endDate1, true);


                    if (dateObj.startDate2 != null)
                    {
                        context.GenerateMiscDataReport(newReport.id, newReport.det_num, dateObj.startDate2, dateObj.endDate2, false);
                        context.GenerateAvgVolumeByLane(newReport.id, newReport.det_num, dateObj.startDate2, dateObj.endDate2, true);
                        context.GenerateAvgHourlyOccupancyData(newReport.id, newReport.det_num, dateObj.startDate2, dateObj.endDate2, true);
                        context.GenerateAvgHourlyThroughputData(newReport.id, newReport.det_num, dateObj.startDate2, dateObj.endDate2, true);
                        context.GenerateAvgHourlySpeedData(newReport.id, newReport.det_num, dateObj.startDate2, dateObj.endDate2, true);
                    }
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
