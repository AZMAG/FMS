using FMS_Dashboard.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Core.Common.CommandTrees;
using System.Linq;
using System.Threading.Tasks;
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
                       AddReportMiscData(newReport);
                        AddAvgHourlySpeed(newReport);
                        AddAvgHourlyThroughput(newReport);
                        AddAvgVolumeByLane(newReport);
                        AddAvgOccupancyByLane(newReport);
                        UpdateStatusToComplete(newReport);
                       
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

        public bool AddAvgHourlySpeed(GeneratedReport newReport)    
        {
            var dateObj = GetStartAndEndDatesFromReport(newReport);

            using (var context = new Jacobs_PlayPenEntities())
            {
                try
                {
                    context.Database.CommandTimeout = 180;
                    context.GenerateAvgHourlySpeedData(newReport.id, newReport.det_num, dateObj.startDate1, dateObj.endDate1, true);
                    context.GenerateAvgHourlySpeedData(newReport.id, newReport.det_num, dateObj.startDate2, dateObj.endDate2, false);
                    return true;
                }
                catch (Exception ex)
                {
                    return false;
                }
            }
        }

        public bool AddAvgOccupancyByLane(GeneratedReport newReport)
        {
            var dateObj = GetStartAndEndDatesFromReport(newReport);

            using (var context = new Jacobs_PlayPenEntities())
            {

                context.Database.CommandTimeout = 180;
                try
                {
                    context.GenerateAvgHourlyOccupancyData(newReport.id, newReport.det_num, dateObj.startDate1, dateObj.endDate1, true);
                    context.GenerateAvgHourlyOccupancyData(newReport.id, newReport.det_num, dateObj.startDate2, dateObj.endDate2, false);
                    return true;
                }
                catch (Exception ex)
                {
                    return false;
                }
            }
        }

        public bool AddAvgVolumeByLane(GeneratedReport newReport)
        {
            var dateObj = GetStartAndEndDatesFromReport(newReport);

            using (var context = new Jacobs_PlayPenEntities())
            {

                context.Database.CommandTimeout = 180;
                try
                {
                    context.GenerateAvgVolumeByLane(newReport.id, newReport.det_num, dateObj.startDate1, dateObj.endDate1, true);
                    context.GenerateAvgVolumeByLane(newReport.id, newReport.det_num, dateObj.startDate2, dateObj.endDate2, false);
                    return true;
                }
                catch (Exception ex)
                {
                    return false;
                }
            }
        }

        public bool AddAvgHourlyThroughput(GeneratedReport newReport)
        {
            var dateObj = GetStartAndEndDatesFromReport(newReport);

            using (var context = new Jacobs_PlayPenEntities())
            {

                context.Database.CommandTimeout = 180;
                try
                {
                    context.GenerateAvgHourlyThroughputData(newReport.id, newReport.det_num, dateObj.startDate1, dateObj.endDate1, true);
                    context.GenerateAvgHourlyThroughputData(newReport.id, newReport.det_num, dateObj.startDate2, dateObj.endDate2, false);
                    return true;
                }
                catch (Exception ex)
                {
                    return false;
                }
            }
        }

        public bool AddReportMiscData(GeneratedReport newReport)
        {

            var dateObj = GetStartAndEndDatesFromReport(newReport);

            using (var context = new Jacobs_PlayPenEntities())
            {

                context.Database.CommandTimeout = 180;
                try
                {
                    context.GenerateMiscDataReport(newReport.id, newReport.det_num, dateObj.startDate1, dateObj.endDate1, true);
                    context.GenerateMiscDataReport(newReport.id, newReport.det_num, dateObj.startDate2, dateObj.endDate2, false);
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
