using System;
using System.Collections.Generic;
using System.Linq;
using FMS_Dashboard.Models;
using System.Web.Mvc;
using System.Linq.Dynamic.Core;
using Microsoft.EntityFrameworkCore;
using System.Data.Entity.SqlServer;
using System.Data.SqlTypes;

namespace FMS_Dashboard.Controllers
{
    public class DetectorController : Controller
    {
        public JsonResult GetValidityData()
        {
            using (var context = new Jacobs_PlayPenEntities())
            {
                var data = context.detector_Validity.ToList();
                return Json(data, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetMiscDetectorData(int det_num, int? year, DateTime? start, DateTime? end)
        {
            using (var context = new Jacobs_PlayPenEntities())
            {
                //if (year != null)
                //{
                    var data = context.detector_MiscData.Where(x => x.detector_number == det_num && x.year == year).FirstOrDefault();
                    return Json(data, JsonRequestBehavior.AllowGet);
                //}
                
            }
        }

        public JsonResult GetAnnualAvgByLane(int det_num, int year)
        {
            using (var context = new Jacobs_PlayPenEntities())
            {
                var data = context.detector_AvgByLane.Where(x => x.detector_number == det_num && x.year == year).ToList();
                return Json(data, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetValidity()
        {
            using (var context = new Jacobs_PlayPenEntities())
            {
                var data = context.detector_Validity.ToList();
                return Json(data, JsonRequestBehavior.AllowGet);
            }
        }


        public JsonResult GetDetectors()
        {
            using (var context = new Jacobs_PlayPenEntities())
            {
                try
                {
                    context.Database.Connection.Open();
                    var data = context.Detectors.ToList();
                    return Json(data, JsonRequestBehavior.AllowGet);
                }
                catch (Exception ex)
                {
                    return Json(ex.Message, JsonRequestBehavior.AllowGet);
                    throw;
                }
                
            }
        }

        public static Corridor GetCorridor(int corridor_id)
        {
            using (var context = new Jacobs_PlayPenEntities())
            {
                var detector = context.Corridors.Where(x => x.id == corridor_id).FirstOrDefault();
                return detector;
            }
        }

        public static Detector GetDetector(int det_num)
        {
            using (var context = new Jacobs_PlayPenEntities())
            {
                var detector = context.Detectors.Where(x => x.det_num == det_num).FirstOrDefault();
                return detector;
            }
        }

        public JsonResult GetErrorData(int det_num, int year)
        {
            using (var context = new Jacobs_PlayPenEntities())
            {
                var data = context.vw_Errors.Where(x => x.detector_number == det_num && x.year == year)
                    .GroupBy(x => x.detector_number)
                    .Select(y => new 
                    {
                        speed_error = y.Sum(x => x.speed_error == true ? 1 : 0),
                        volume_error = y.Sum(x => x.volume_error == true ? 1 : 0),
                        occupancy_error = y.Sum(x => x.occupancy_error == true ? 1 : 0),
                        zeros_error = y.Sum(x => x.zeros_error == true ? 1 : 0),
                        difference_error = y.Sum(x => x.difference_error == true ? 1 : 0)
                    }).FirstOrDefault();

                var totalRows = context.vw_RawData.Where(x => x.detector_number == det_num && x.year == year).Count();

                var list = new List<dynamic>();
                var speed = new {
                    value = data.speed_error,
                    pct = (float)data.speed_error / (float)totalRows,
                    label = "Speed"
                };

                var volume = new
                {
                    value = data.volume_error,
                    pct = (float)data.volume_error / (float)totalRows,
                    label = "Volume"
                };

                var occupancy = new
                {
                    value = data.occupancy_error,
                    pct = (float)data.occupancy_error / (float)totalRows,
                    label = "Occupancy"
                };

                var zeros = new
                {
                    value = data.zeros_error,
                    pct = (float)data.zeros_error / (float)totalRows,
                    label = "Zeros"
                };

                var difference = new
                {
                    value = data.difference_error,
                    pct = (float)data.difference_error / (float)totalRows,
                    label = "Difference"
                };

                list.Add(speed);
                list.Add(volume);
                list.Add(occupancy);
                list.Add(zeros);
                list.Add(difference);

                return Json(list, JsonRequestBehavior.AllowGet);
            }
        }



        public JsonResult AvgHourlySpeed(int det_num, int year)
        {
            using (var context = new Jacobs_PlayPenEntities())
            {
                var data = context.detector_AvgHourlySpeed.Where(x => x.detector_number == det_num && x.year == year).ToList();
                return Json(data, JsonRequestBehavior.AllowGet);
            }
        }


        public JsonResult DistributionDataPassingQualityControlCriteriaByDateByReportId(Guid reportId)
        {
            using (var context = new Jacobs_PlayPenEntities())
            {
                var report = context.GeneratedReports.Where(x => x.id == reportId).FirstOrDefault();

                DateTime startDate = DateTime.Parse(report.startDate1);
                DateTime endDate = DateTime.Parse(report.endDate1);

                var data = context.vw_Errors
                    .Where(x => x.detector_number == report.det_num && x.collected > startDate && x.collected < endDate)
                    .GroupBy(x => x.collected)
                    .Select(g => new { num_errors = g.Count(), collected = g.Key })
                    .ToList();

                return Json(data, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult AnnualQualityControlFlagsByHourOfDay(Guid reportId)
        {
            using (var context = new Jacobs_PlayPenEntities())
            {
                var report = context.GeneratedReports.Where(x => x.id == reportId).FirstOrDefault();

                DateTime startDate = DateTime.Parse(report.startDate1);
                DateTime endDate = DateTime.Parse(report.endDate1).Date;
                endDate = endDate.AddDays(1);

                var results = from e in context.vw_Errors
                              where SqlFunctions.DatePart("dw", e.collected) >= 2 &&
                                    SqlFunctions.DatePart("dw", e.collected) <= 6
                                    && e.detector_number == report.det_num
                                    && e.collected > startDate && e.collected < endDate
                              group e by new
                              {
                                  min_since = e.min_since
                              } into g
                              select new
                              {
                                  min_since = g.Key.min_since,
                                  all_rows = g.Count(),
                                  occupancy_error = g.Count(x => x.occupancy_error == true),
                                  speed_error = g.Count(x => x.speed_error == true),
                                  volume_error = g.Count(x => x.volume_error == true),
                                  zeros_error = g.Count(x => x.zeros_error == true),
                                  difference_error = g.Count(x => x.difference_error == true)
                              };
                var data = results.ToList();

                return Json(data, JsonRequestBehavior.AllowGet);
            }
        }

        private bool isWeekday(DateTime? date)
        {
            if (date == null) return false;

            return date.Value.DayOfWeek <= DayOfWeek.Friday; // weekday is Monday-Friday (0-4)
        }


        public JsonResult DistributionDataPassingQualityControlCriteriaByWeekdayByReportId(Guid reportId)
        {
            using (var context = new Jacobs_PlayPenEntities())
            {
                var report = context.GeneratedReports.Where(x => x.id == reportId).FirstOrDefault();

                DateTime startDate = DateTime.Parse(report.startDate1);
                DateTime endDate = DateTime.Parse(report.endDate1);

                TimeSpan span = endDate - startDate;
                int numDays = span.Days + 1;

                var data = context.vw_Errors
                    .Where(x => x.detector_number == report.det_num && x.collected > startDate && x.collected < endDate)
                    .Select(x => new { x.collected, x.min_since })
                    .ToList()
                    .Select(x => new { Weekday = x.collected.HasValue ? x.collected.Value.DayOfWeek : DayOfWeek.Sunday, MinSince = x.min_since })
                    .GroupBy(x => new { x.Weekday, x.MinSince })
                    .Select(g => new { NumErrors = g.Count(), Weekday = g.Key.Weekday.ToString(), MinSince = g.Key.MinSince })
                    .OrderBy(x => x.Weekday)
                    .ThenBy(x => x.MinSince)
                    .ToList();


                return Json(new
                {
                    data = data,
                    numDays = numDays
                }, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult AvgHourlyOccupancyByReportId(Guid reportId)
        {
            using (var context = new Jacobs_PlayPenEntities())
            {
                var data = context.detector_AvgHourlyOccupancy.Where(x => x.reportId == reportId).ToList();
                return Json(data, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetMiscDetectorDataByReportId(Guid reportId)
        {
            using (var context = new Jacobs_PlayPenEntities())
            {
                //if (year != null)
                //{
                var data = context.detector_MiscData.Where(x => x.reportId == reportId).ToList();
                return Json(data, JsonRequestBehavior.AllowGet);
                //}

            }
        }

        public JsonResult GetErrorDataByReportId(Guid reportId)
        {
            using (var context = new Jacobs_PlayPenEntities())
            {
                //if (year != null)
                //{
                var report = context.GeneratedReports.Where(x => x.id == reportId).FirstOrDefault();

                DateTime startDate = DateTime.Parse(report.startDate1);
                DateTime endDate = DateTime.Parse(report.endDate1).Date;
                endDate = endDate.AddDays(1);

                
                return Json(new {}, JsonRequestBehavior.AllowGet);
                //}

            }
        }

        public JsonResult SpeedVsDensityByReportId(Guid reportId, bool isPeriod1)
        {
            using (var context = new Jacobs_PlayPenEntities())
            {
                try
                {
                    var report = context.GeneratedReports.Where(x => x.id == reportId).FirstOrDefault();

                    DateTime startDate = DateTime.Parse(report.startDate1);
                    DateTime endDate = DateTime.Parse(report.endDate1).Date;
                    endDate = endDate.AddDays(1);

                    var results = from e in context.vw_RawData
                                  where SqlFunctions.DatePart("dw", e.collected) >= 2 &&
                                        SqlFunctions.DatePart("dw", e.collected) <= 6
                                        && e.detector_number == report.det_num
                                        && e.collected > startDate && e.collected < endDate
                                        && e.speed > 0
                                  select new
                                  {
                                      min_since = e.min_since,
                                      occupancy = e.occupancy,
                                      speed = e.speed
                                  };

                    var data = results.Take(5000).ToList();

                    return Json(data, JsonRequestBehavior.AllowGet);

                }
                catch (Exception ex)
                {
                    return Json(ex.Message, JsonRequestBehavior.AllowGet);
                }
            }
        }

        public JsonResult FlowVsDensityByReportId(Guid reportId, bool isPeriod1)
        {
            using (var context = new Jacobs_PlayPenEntities())
            {
                try
                {
                    var report = context.GeneratedReports.Where(x => x.id == reportId).FirstOrDefault();

                    DateTime startDate = DateTime.Parse(report.startDate1);
                    DateTime endDate = DateTime.Parse(report.endDate1).Date;
                    endDate = endDate.AddDays(1);

                    var results = from e in context.vw_RawData
                                  where SqlFunctions.DatePart("dw", e.collected) >= 2 &&
                                        SqlFunctions.DatePart("dw", e.collected) <= 6
                                        && e.detector_number == report.det_num
                                        && e.collected > startDate && e.collected < endDate
                                        && e.speed > 0
                                  select new
                                  {
                                      min_since = e.min_since,
                                      occupancy = e.occupancy,
                                      vph = e.vph
                                  };

                    var data = results.Take(5000).ToList();

                    return Json(data, JsonRequestBehavior.AllowGet);

                }
                catch (Exception ex)
                {
                    return Json(ex.Message, JsonRequestBehavior.AllowGet);
                }
            }
        }

        public JsonResult SpeedVsFlowByReportId(Guid reportId, bool isPeriod1)
        {
            using (var context = new Jacobs_PlayPenEntities())
            {
                try
                {
                    var report = context.GeneratedReports.Where(x => x.id == reportId).FirstOrDefault();

                    DateTime startDate = DateTime.Parse(report.startDate1);
                    DateTime endDate = DateTime.Parse(report.endDate1).Date;
                    endDate = endDate.AddDays(1);

                    var results = from e in context.vw_RawData
                                  where SqlFunctions.DatePart("dw", e.collected) >= 2 &&
                                        SqlFunctions.DatePart("dw", e.collected) <= 6
                                        && e.detector_number == report.det_num
                                        && e.collected > startDate && e.collected < endDate
                                        && e.speed > 0
                                  select new
                                  {
                                      min_since = e.min_since,
                                      speed = e.speed,
                                      vph = e.vph
                                  };

                    var data = results.Take(5000).ToList();

                    return Json(data, JsonRequestBehavior.AllowGet);
                    
                }
                catch (Exception ex)
                {
                    return Json(ex.Message, JsonRequestBehavior.AllowGet);
                }
            }
        }

        public JsonResult AvgVolumeByLaneByReportId(Guid reportId)
        {
            using (var context = new Jacobs_PlayPenEntities())
            {
                var data = context.detector_AvgVolumeByLane.Where(x => x.reportId == reportId).ToList();
                return Json(data, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult AvgHourlySpeedByReportId(Guid reportId)
        {
            using (var context = new Jacobs_PlayPenEntities())
            {
                var data = context.detector_AvgHourlySpeed.Where(x => x.reportId == reportId).ToList();
                return Json(data, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult AvgHourlyThroughputByReportId(Guid reportId)
        {
            using (var context = new Jacobs_PlayPenEntities())
            {
                var data = context.detector_AvgHourlyThroughput.Where(x => x.reportId == reportId).ToList();
                return Json(data, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult AvgHourlyThroughput(int det_num, int year)
        {
            using (var context = new Jacobs_PlayPenEntities())
            {
                var data = context.detector_AvgHourlyThroughput.Where(x => x.detector_number == det_num && x.year == year).ToList();
                return Json(data, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult AvgAnnualTraffic(int det_num, int year)
        {
            using (var context = new Jacobs_PlayPenEntities())
            {
                var data = context.detector_AvgVolumeByLane.Where(x => x.detector_number == det_num && x.year == year).ToList();
                return Json(data, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetLaneErrors(int det_num, int year)
        {
            using (var context = new Jacobs_PlayPenEntities())
            {
                var data = context.vw_LaneErrors.Where(x => x.detector_number == det_num && x.year == year).ToList();
                return Json(data, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetErrors(int det_num, int year)
        {
            using (var context = new Jacobs_PlayPenEntities())
            {
                var data = context.vw_Errors.Where(x => x.detector_number == det_num && x.year == year).Take(10000).ToList();
                var jsonResult = Json(data, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
        }
    }
}
