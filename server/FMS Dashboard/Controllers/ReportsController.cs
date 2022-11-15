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
                                    Location = det.Location,
                                    Route = det.Route,
                                    Direction = det.Direction,
                                    Milepost = det.Milepost,
                                    GPS = det.GPS,
                                    Type = det.Type,
                                    Length_ft = det.Length_ft,
                                    y = det.y,
                                    x = det.x
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
                try
                {
                    var rep = context.GeneratedReports.First(r => r.id == report.id);
                       rep.completed = true;
                    context.SaveChanges();

                    return true;
            }
                catch (Exception ex)
                {
                    return false;
                }
            }
        }

        public bool AddAvgHourlySpeed(GeneratedReport newReport)
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
                    context.GenerateAvgHourlySpeedData(newReport.id, newReport.det_num, startDate1, endDate1, true);
                    context.GenerateAvgHourlySpeedData(newReport.id, newReport.det_num, startDate2, endDate2, false);
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
