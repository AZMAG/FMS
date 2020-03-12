using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using FMS_Dashboard.Models;
using System.Web.Mvc;

namespace FMS_Dashboard.Controllers
{
    public class DetectorController : Controller
    {
        public ActionResult Index(int det_num)
        {
            ViewBag.det_num = det_num;
            return View("../Home/Detector");
        }

        public JsonResult GetMiscDetectorData(int det_num)
        {
            using (var context = new Entities())
            {
                var data = context.vw_DetectorMiscData.Where(x => x.detector_number == det_num).FirstOrDefault();
                return Json(data, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetAnnualAvgByLane()
        {
            using (var context = new Entities())
            {
                var data = context.AnnualAvgByLanes.ToList();
                return Json(data, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetValidity()
        {
            using (var context = new Entities())
            {
                var data = context.Validities.ToList();
                return Json(data, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetDetectors()
        {
            using (var context = new Entities())
            {
                var data = context.Detectors.ToList();
                return Json(data, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetErrorData(int det_num)
        {
            using (var context = new Entities())
            {
                var data = context.Errors2018.Where(x => x.detector_number == det_num)
                    .GroupBy(x => x.detector_number)
                    .Select(y => new 
                    {
                        speed_error = y.Sum(x => x.speed_error == true ? 1 : 0),
                        volume_error = y.Sum(x => x.volume_error == true ? 1 : 0),
                        occupancy_error = y.Sum(x => x.occupancy_error == true ? 1 : 0),
                        zeros_error = y.Sum(x => x.zeros_error == true ? 1 : 0),
                        difference_error = y.Sum(x => x.difference_error == true ? 1 : 0)
                    }).FirstOrDefault();

                var totalRows = context.RawData2018.Where(x => x.detector_number == det_num).Count();

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

        public JsonResult AvgHourlySpeed(int det_num)
        {
            using (var context = new Entities())
            {
                var data = context.vw_AvgHourlySpeed.Where(x => x.detector_number == det_num).ToList();
                return Json(data, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult AvgHourlyThroughput(int det_num)
        {
            using (var context = new Entities())
            {
                var data = context.vw_AvgHourlyThroughput.Where(x => x.detector_number == det_num).ToList();
                return Json(data, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetErrors(int det_num)
        {
            using (var context = new Entities())
            {
                var data = context.LaneErrors2018.Where(x => x.detector_number == det_num).ToList();
                return Json(data, JsonRequestBehavior.AllowGet);
            }
        }
    }
}