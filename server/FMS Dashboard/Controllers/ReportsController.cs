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

        public JsonResult GetGeneratedReports()
        {
            using (var context = new FreewayMSEntities())
            {
                var query = context.GeneratedReports.Join(context.Detectors,
                                generatedReport => generatedReport.det_num,
                                detector => detector.det_num,
                                (gr, det) => new {
                                    id = gr.id,
                                    det_num = gr.det_num,
                                    startDate = gr.startDate,
                                    endDate = gr.endDate,
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
            using (var context = new FreewayMSEntities())
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
            using (var context = new FreewayMSEntities())
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

        public JsonResult DeleteGeneratedReport(Guid id)
        {
            using (var context = new FreewayMSEntities())
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

            using (var context = new FreewayMSEntities())
            {

                context.Database.CommandTimeout = 180;
                try
                {
                    context.GenerateAvgVolumeByLane(newReport.id, newReport.det_num, newReport.startDate, newReport.endDate);
                    context.GenerateAvgHourlyOccupancyData(newReport.id, newReport.det_num, newReport.startDate, newReport.endDate);
                    context.GenerateAvgHourlyThroughputData(newReport.id, newReport.det_num, newReport.startDate, newReport.endDate);
                    context.GenerateAvgHourlySpeedData(newReport.id, newReport.det_num, newReport.startDate, newReport.endDate);
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
