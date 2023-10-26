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
            using (var context = new FreewayMSEntities2())
            {
                var query = context.GeneratedReports.GroupJoin(
                    context.Detectors,
                    generatedReport => generatedReport.det_num,
                    detector => detector.det_num,
                    (gr, detGroup) => new {
                        gr,
                        detGroup
                    })
                    .SelectMany(
                        result => context.Corridors.Where(c => c.id == result.gr.corridor_id)
                                                   .DefaultIfEmpty(),
                        (result, corridor) => new {
                            result.gr.id,
                            result.gr.det_num,
                            result.gr.startDate,
                            result.gr.endDate,
                            result.gr.completed,
                            result.gr.date_submitted,
                            result.gr.date_completed,
                            result.gr.corridor_id,
                            Location = result.detGroup.Select(det => det.Location).FirstOrDefault(),
                            Route = result.detGroup.Select(det => det.Route).FirstOrDefault(),
                            Direction = result.detGroup.Select(det => det.Direction).FirstOrDefault(),
                            Milepost = result.detGroup.Select(det => det.Milepost).FirstOrDefault(),
                            GPS = result.detGroup.Select(det => det.GPS).FirstOrDefault(),
                            Type = result.detGroup.Select(det => det.Type).FirstOrDefault(),
                            Length_ft = result.detGroup.Select(det => det.Length_ft).FirstOrDefault(),
                            y = result.detGroup.Select(det => det.y).FirstOrDefault(),
                            x = result.detGroup.Select(det => det.x).FirstOrDefault(),
                            segment = result.detGroup.Select(det => det.Segment).FirstOrDefault(),
                            CorridorName = corridor != null ? corridor.Name : null,
                            CorridorDescription = corridor != null ? corridor.Description : null,
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
            using (var context = new FreewayMSEntities2())
            {
                try
                {
                    context.GeneratedReports.Add(newReport);
                    context.SaveChanges();
                    Task.Run(() =>
                    {
                        if (newReport.corridor_id == null)
                        {
                            GenerateReportData(newReport);
                        }
                        
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
            using (var context = new FreewayMSEntities2())
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
                    Console.WriteLine(ex.Message, "Update Status to Complete Processing failed.");
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
            using (var context = new FreewayMSEntities2())
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
                    Console.WriteLine(ex.Message, "Delete Report Processing failed.");
                    return Json(new { id = "Error!" }, JsonRequestBehavior.AllowGet);
                }
            }
        }

        public bool GenerateReportData(GeneratedReport newReport)
        {

            using (var context = new FreewayMSEntities2())
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
                    Console.WriteLine(ex.Message, "New Report Processing failed.");
                    return false;
                }
            }
        }

        
    }
}
