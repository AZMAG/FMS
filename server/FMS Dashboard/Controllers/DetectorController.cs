using FMS_Dashboard.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.SqlServer;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Web.Mvc;

namespace FMS_Dashboard.Controllers
{
    public static class Helpers
    {
        public static IEnumerable<T> ReservoirSample<T>(IEnumerable<T> sequence, int k)
        {
            var reservoir = new T[k];
            int i = 0;
            foreach (var item in sequence)
            {
                if (i < k)
                {
                    reservoir[i] = item;
                }
                else
                {
                    int j = new Random().Next(i + 1);
                    if (j < k)
                    {
                        reservoir[j] = item;
                    }
                }
                i++;
            }
            return reservoir;
        }
    }

    public class DetectorController : Controller
    {
        int scatterChartTake = 5000;

        public JsonResult GetValidityData()
        {
            using (var context = new FreewayMSEntities2())
            {
                var data = context.detector_Validity.ToList();
                return Json(data, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetValidity()
        {
            using (var context = new FreewayMSEntities2())
            {
                var data = context.detector_Validity.ToList();
                return Json(data, JsonRequestBehavior.AllowGet);
            }
        }


        public JsonResult GetDetectors()
        {
            using (var context = new FreewayMSEntities2())
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
            using (var context = new FreewayMSEntities2())
            {
                var detector = context.Corridors.Where(x => x.id == corridor_id).FirstOrDefault();
                return detector;
            }
        }

        public JsonResult GetCorridorJSON(int corridor_id)
        {
            using (var context = new FreewayMSEntities2())
            {
                var corridor = context.Corridors.Where(x => x.id == corridor_id).FirstOrDefault();
                return Json(corridor, JsonRequestBehavior.AllowGet);
            }
        }

        public static Detector GetDetector(int det_num)
        {
            using (var context = new FreewayMSEntities2())
            {
                var detector = context.Detectors.Where(x => x.det_num == det_num).FirstOrDefault();
                return detector;
            }
        }


        public JsonResult GetDetectorJSON(int det_num)
        {
            using (var context = new FreewayMSEntities2())
            {
                var detector = context.Detectors.Where(x => x.det_num == det_num).FirstOrDefault();
                return Json(detector, JsonRequestBehavior.AllowGet);
            }
        }

        //public JsonResult GetErrorData(int det_num, int year)
        //{
        //    using (var context = new FreewayMSEntities2())
        //    {
        //        var data = context.vw_Errors.Where(x => x.detector_number == det_num && x.year == year)
        //            .GroupBy(x => x.detector_number)
        //            .Select(y => new 
        //            {
        //                speed_error = y.Sum(x => x.speed_error == true ? 1 : 0),
        //                volume_error = y.Sum(x => x.volume_error == true ? 1 : 0),
        //                occupancy_error = y.Sum(x => x.occupancy_error == true ? 1 : 0),
        //                zeros_error = y.Sum(x => x.zeros_error == true ? 1 : 0),
        //                difference_error = y.Sum(x => x.difference_error == true ? 1 : 0)
        //            }).FirstOrDefault();

        //        var totalRows = context.vw_RawData.Where(x => x.detector_number == det_num && x.year == year).Count();

        //        var list = new List<dynamic>();
        //        var speed = new {
        //            value = data.speed_error,
        //            pct = (float)data.speed_error / (float)totalRows,
        //            label = "Speed"
        //        };

        //        var volume = new
        //        {
        //            value = data.volume_error,
        //            pct = (float)data.volume_error / (float)totalRows,
        //            label = "Volume"
        //        };

        //        var occupancy = new
        //        {
        //            value = data.occupancy_error,
        //            pct = (float)data.occupancy_error / (float)totalRows,
        //            label = "Occupancy"
        //        };

        //        var zeros = new
        //        {
        //            value = data.zeros_error,
        //            pct = (float)data.zeros_error / (float)totalRows,
        //            label = "Zeros"
        //        };

        //        var difference = new
        //        {
        //            value = data.difference_error,
        //            pct = (float)data.difference_error / (float)totalRows,
        //            label = "Difference"
        //        };

        //        list.Add(speed);
        //        list.Add(volume);
        //        list.Add(occupancy);
        //        list.Add(zeros);
        //        list.Add(difference);

        //        return Json(list, JsonRequestBehavior.AllowGet);
        //    }
        //}



        public JsonResult AvgHourlySpeed(int det_num, int year)
        {
            using (var context = new FreewayMSEntities2())
            {
                var data = context.detector_AvgHourlySpeed.Where(x => x.detector_number == det_num && x.year == year).ToList();
                return Json(data, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult DistributionDataPassingQualityControlCriteriaByDate(Guid? reportId, int? det_num, int? year)
        {
            using (var context = new FreewayMSEntities2())
            {
                int detector_number = 0;

                DateTime startDate;
                DateTime endDate;

                if (det_num != null)
                {
                    detector_number = (int)det_num;
                }

                if (reportId != null)
                {
                    var report = context.GeneratedReports.Where(x => x.id == reportId).FirstOrDefault();

                    detector_number = (int)report.det_num;

                    startDate = report.startDate;
                    endDate = report.endDate;
                }
                else
                {
                    startDate = new DateTime((int)year, 1, 1);
                    endDate = new DateTime((int)year, 12, 31);
                }

                var data = context.vw_Errors
                    .Where(x => x.detector_number == detector_number && x.collected > startDate && x.collected < endDate)
                    .GroupBy(x => x.collected)
                    .Select(g => new { num_errors = g.Count(), collected = g.Key })
                    .ToList();

                return Json(data, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult AnnualQualityControlFlagsByHourOfDay(Guid reportId)
        {
            using (var context = new FreewayMSEntities2())
            {
                var report = context.GeneratedReports.Where(x => x.id == reportId).FirstOrDefault();

                DateTime startDate = report.startDate;
                DateTime endDate = report.endDate;
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

        public JsonResult DistributionDataPassingQualityControlCriteriaByWeekday(Guid? reportId, int? year, int? det_num)
        {
            using (var context = new FreewayMSEntities2())
            {
                int detector_number = 0;

                DateTime startDate;
                DateTime endDate;

                if (det_num != null)
                {
                    detector_number = (int)det_num;
                }

                if (reportId != null)
                {
                    var report = context.GeneratedReports.Where(x => x.id == reportId).FirstOrDefault();

                    detector_number = (int)report.det_num;

                    startDate = report.startDate;
                    endDate = report.endDate;
                }
                else
                {
                    startDate = new DateTime((int)year, 1, 1);
                    endDate = new DateTime((int)year, 12, 31);
                }

                TimeSpan span = endDate - startDate;
                int numDays = span.Days + 1;

                var data = context.vw_Errors
                    .Where(x => x.detector_number == det_num && x.collected > startDate && x.collected < endDate)
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
            using (var context = new FreewayMSEntities2())
            {
                var data = context.detector_AvgHourlyOccupancy.Where(x => x.reportId == reportId).ToList();
                return Json(data, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult AvgHourlyOccupancyByDetNum(int det_num, int year)
        {
            using (var context = new FreewayMSEntities2())
            {
                var data = context.detector_AvgHourlyOccupancy.Where(x => x.detector_number == det_num && x.year == year).ToList();
                return Json(data, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult AvgHourlyOccupancyByParams(int det_num, DateTime startDate, DateTime endDate)
        {
            using (var context = new FreewayMSEntities2())
            {
                IEnumerable<ReturnAvgHourlyOccupancyData_Result> result = context.ReturnAvgHourlyOccupancyData(det_num, startDate, endDate);
                 // http://localhost:56118/Detector/AvgHourlyOccupancyByParams?det_num=573&startDate=2018-01-01&endDate=2019-01-01
                var data = result.ToList();
                return Json(data, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetMiscDetectorDataByReportId(Guid reportId)
        {
            using (var context = new FreewayMSEntities2())
            {
                var report = context.GeneratedReports.Where(x => x.id == reportId).FirstOrDefault();
                var existingLanes = context.vw_ExistingLanes.Where(x => x.detector_number == report.det_num && x.year == report.startDate.Year).FirstOrDefault();
                //var errorCount = (from e in context.vw_Errors
                //                  where e.collected >= report.startDate && e.collected <= report.endDate && e.detector_number == report.det_num
                //                  group e by e.collected into errorGroup
                //                  select errorGroup.Count()).Count();

                return Json(new { existingLanes = existingLanes }, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetMiscDetectorDataByParams(int det_num, int year)
        {
            using (var context = new FreewayMSEntities2())
            {
                var existingLanes = context.vw_ExistingLanes.Where(x => x.detector_number == det_num && x.year == year).FirstOrDefault();
                return Json(new { existingLanes = existingLanes }, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetErrorDataByReportId(Guid reportId)
        {
            using (var context = new FreewayMSEntities2())
            {
                //if (year != null)
                //{
                var report = context.GeneratedReports.Where(x => x.id == reportId).FirstOrDefault();

                DateTime startDate = report.startDate;
                DateTime endDate = report.endDate;
                endDate = endDate.AddDays(1);

                
                return Json(new {}, JsonRequestBehavior.AllowGet);
                //}

            }
        }

        public JsonResult SpeedVsDensityByReportId(Guid reportId)
        {
            using (var context = new FreewayMSEntities2())
            {
                try
                {
                    var report = context.GeneratedReports.Where(x => x.id == reportId).FirstOrDefault();

                    DateTime startDate = report.startDate;
                    DateTime endDate = report.endDate;
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

                    //var data = Helpers.ReservoirSample(results, scatterChartTake).ToList();
                    var data = results.Take(scatterChartTake).ToList();
                    

                    return Json(data, JsonRequestBehavior.AllowGet);

                }
                catch (Exception ex)
                {
                    return Json(ex.Message, JsonRequestBehavior.AllowGet);
                }
            }
        }

        public JsonResult SpeedVsDensityByDetNum(int year, int det_num)
        {
            using (var context = new FreewayMSEntities2())
            {
                try
                {
                    var results = from e in context.vw_RawData
                                  where SqlFunctions.DatePart("dw", e.collected) >= 2 &&
                                        SqlFunctions.DatePart("dw", e.collected) <= 6
                                        && e.detector_number == det_num
                                        && e.collected.Value.Year == year
                                  select new
                                  {
                                      min_since = e.min_since,
                                      occupancy = e.occupancy,
                                      speed = e.speed
                                  };
                    var data = results.Take(scatterChartTake).ToList();
                    return Json(data, JsonRequestBehavior.AllowGet);

                }
                catch (Exception ex)
                {
                    return Json(ex.Message, JsonRequestBehavior.AllowGet);
                }
            }
        }

        public JsonResult FlowVsDensityByReportId(Guid reportId)
        {
            using (var context = new FreewayMSEntities2())
            {
                try
                {
                    var report = context.GeneratedReports.Where(x => x.id == reportId).FirstOrDefault();

                    DateTime startDate = report.startDate;
                    DateTime endDate = report.endDate;
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

                    var data = Helpers.ReservoirSample(results, scatterChartTake).ToList();

                    return Json(data, JsonRequestBehavior.AllowGet);

                }
                catch (Exception ex)
                {
                    return Json(ex.Message, JsonRequestBehavior.AllowGet);
                }
            }
        }

        public JsonResult FlowVsDensityByDetNum(int year, int det_num)
        {
            using (var context = new FreewayMSEntities2())
            {
                context.Database.CommandTimeout = 60;
                try
                {
                    var results = from e in context.vw_RawData
                                  where SqlFunctions.DatePart("dw", e.collected) >= 2 &&
                                        SqlFunctions.DatePart("dw", e.collected) <= 6
                                        && e.detector_number == det_num
                                        
                                        && e.year == year
                                  select new
                                  {
                                      min_since = e.min_since,
                                      occupancy = e.occupancy,
                                      vph = e.vph
                                  };
                    //var data = Helpers.ReservoirSample(results, scatterChartTake).ToList();
                    var data = results.Take(scatterChartTake).ToList();
                    return Json(data, JsonRequestBehavior.AllowGet);

                }
                catch (Exception ex)
                {
                    return Json(ex.Message, JsonRequestBehavior.AllowGet);
                }
            }
        }

        public JsonResult SpeedVsFlowByReportId(Guid reportId)
        {
            using (var context = new FreewayMSEntities2())
            {
                try
                {
                    var report = context.GeneratedReports.Where(x => x.id == reportId).FirstOrDefault();

                    DateTime startDate = report.startDate;
                    DateTime endDate = report.endDate;
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

                    //context.Database.SqlQuery()


                    var data = Helpers.ReservoirSample(results, scatterChartTake).ToList();


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
            using (var context = new FreewayMSEntities2())
            {
                var data = context.detector_AvgVolumeByLane.Where(x => x.reportId == reportId).ToList();
                return Json(data, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult AvgVolumeByLaneByDetNum(int det_num, int year)
        {
            using (var context = new FreewayMSEntities2())
            {
                var data = context.detector_AvgVolumeByLane.Where(x => x.detector_number == det_num && x.year == year).ToList();
                return Json(data, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult AvgVolumeByLaneByParams(int det_num, DateTime startDate, DateTime endDate)
        {
            using (var context = new FreewayMSEntities2())
            {
                IEnumerable<ReturnAvgVolumeByLane_Result> result = context.ReturnAvgVolumeByLane(det_num, startDate, endDate);
                // http://localhost:56118/Detector/AvgVolumeByLaneByParams?det_num=573&startDate=2018-01-01&endDate=2019-01-01
                var data = result.ToList();
                return Json(data, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult AvgHourlySpeedByDetNum(int det_num, int year)
        {
            using (var context = new FreewayMSEntities2())
            {
                var data = context.detector_AvgHourlySpeed.Where(x => x.detector_number == det_num && x.year == year).ToList();
                return Json(data, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult AvgHourlySpeedByReportId(Guid reportId)
        {
            using (var context = new FreewayMSEntities2())
            {
                var data = context.detector_AvgHourlySpeed.Where(x => x.reportId == reportId).ToList();
                return Json(data, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult AvgHourlySpeedByParams(int det_num, DateTime startDate, DateTime endDate)
        {
            using (var context = new FreewayMSEntities2())
            {
                IEnumerable<ReturnAvgHourlySpeedData_Result> result = context.ReturnAvgHourlySpeedData(det_num, startDate, endDate);
                // var data = context.ReturnAvgHourlySpeedData.Where(x => x.detector_number == det_num && x.start_date == startDate && x.end_date == endDate).ToList();
                // http://localhost:56118/Detector/AvgHourlySpeedByParams?det_num=573&startDate=2018-01-01&endDate=2019-01-01
                var data = result.ToList();
                return Json(data, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult AvgHourlyThroughputByReportId(Guid reportId)
        {
            using (var context = new FreewayMSEntities2())
            {
                var data = context.detector_AvgHourlyThroughput.Where(x => x.reportId == reportId).ToList();
                return Json(data, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult AvgHourlyThroughputByDetNum(int det_num, int year)
        {
            using (var context = new FreewayMSEntities2())
            {
                var data = context.detector_AvgHourlyThroughput.Where(x => x.detector_number == det_num && x.year == year).ToList();
                return Json(data, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult AvgHourlyThroughputByParams(int det_num, DateTime startDate, DateTime endDate)
        {
            using (var context = new FreewayMSEntities2())
            {
                IEnumerable<ReturnAvgHourlyThroughputData_Result> result = context.ReturnAvgHourlyThroughputData(det_num, startDate, endDate);
                // http://localhost:56118/Detector/AvgHourlyThroughputByParams?det_num=573&startDate=2018-01-01&endDate=2019-01-01
                var data = result.ToList();
                return Json(data, JsonRequestBehavior.AllowGet);
            }
        }

        //public JsonResult GetLaneErrors(int det_num, int year)
        //{
        //    using (var context = new FreewayMSEntities2())
        //    {
        //        var data = context.vw_LaneErrors.Where(x => x.detector_number == det_num && x.year == year).ToList();
        //        return Json(data, JsonRequestBehavior.AllowGet);
        //    }
        //}
        //public JsonResult GetErrors(int det_num, int year)
        //{
        //    using (var context = new FreewayMSEntities2())
        //    {
        //        var data = context.vw_Errors.Where(x => x.detector_number == det_num && x.year == year).Take(10000).ToList();
        //        var jsonResult = Json(data, JsonRequestBehavior.AllowGet);
        //        jsonResult.MaxJsonLength = int.MaxValue;
        //        return jsonResult;
        //    }
        //}
    }
}
