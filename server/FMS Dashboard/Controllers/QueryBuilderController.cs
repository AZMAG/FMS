using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using FMS_Dashboard.Models;

namespace FMS_Dashboard.Controllers
{

    public class QueryBuilderFormData
    {
        public bool AAL { get; set; }
        public bool AHAOP { get; set; }
        public bool AHAS { get; set; }
        public bool AHATPL { get; set; }
        public bool AQCFHD { get; set; }
        public bool DDPQCCD { get; set; }
        public bool DDPQCCW { get; set; }
        public bool FVD { get; set; }
        public bool SVD { get; set; }
        public bool SVF { get; set; }
        public int det_num { get; set; }
        public int corridor_id { get; set; }
        public string end1 { get; set; }
        public string end2 { get; set; }
        public string start1 { get; set; }
        public string start2 { get; set; }
        public int? year1 { get; set; }
        public int? year2 { get; set; }
        public Detector detector { get; set; }
        public Corridor corridor { get; set; }
    }

    public class QueryBuilderController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Result(QueryBuilderFormData data)
        {
            if (data.det_num > 0)
            {
                data.detector = DetectorController.GetDetector(data.det_num);
            }

            if (data.det_num > 0)
            {
                data.corridor = DetectorController.GetCorridor(data.corridor_id);
            }

            return View(data);
        }
    }
}