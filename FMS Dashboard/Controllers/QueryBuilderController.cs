using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

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
        public DateTime? end1 { get; set; }
        public DateTime? end2 { get; set; }
        public DateTime? start1 { get; set; }
        public DateTime? start2 { get; set; }
        public int? year1 { get; set; }
        public int? year2 { get; set; }
    }

    public class QueryBuilderController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Result(QueryBuilderFormData data)
        {
            return View(data);
        }
    }
}