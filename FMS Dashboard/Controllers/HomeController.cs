﻿using FMS_Dashboard.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FMS_Dashboard.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Corridors()
        {
            return View();
        }

        public ActionResult QueryBuilder()
        {
            return View();
        }

        public JsonResult GetValidityData()
        {
            using (var context = new Jacobs_PlayPenEntities())
            {
                var data = context.detector_Validity.ToList();
                return Json(data, JsonRequestBehavior.AllowGet);
            }
        }
    }
}