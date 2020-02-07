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

        public JsonResult AvgHourlySpeed(int det_num)
        {
            using (var context = new Entities())
            {
                var data = context.AvgHourlySpeed2018.Where(x => x.detector_number == det_num).ToList();
                return Json(data, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult AvgHourlyThroughput(int det_num)
        {
            using (var context = new Entities())
            {
                var data = context.AvgHourlyThroughput2018.Where(x => x.detector_number == det_num).ToList();
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