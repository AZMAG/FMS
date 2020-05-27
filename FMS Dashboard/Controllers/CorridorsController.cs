using FMS_Dashboard.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FMS_Dashboard.Controllers
{
    public class CorridorsController : Controller
    {
        // GET: Corridors
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Add()
        {
            return View();
        }

        public ActionResult AddNew(AddCorridorVM vm)
        {
            using (var context = new Jacobs_PlayPenEntities())
            {
                var corridor = new Corridor();
                corridor.Description = vm.corridorDescription;
                corridor.Name = vm.corridorName;
                context.Corridors.Add(corridor);
                context.SaveChanges();

                foreach (var detector in vm.detectorNumbers)
                {
                    try
                    {
                        var id = context.Detectors.Where(x => x.det_num == detector).FirstOrDefault().ID;
                        var corridorDetector = new CorridorDetector();
                        corridorDetector.detectorId = id;
                        corridorDetector.corridorId = corridor.id;

                        context.CorridorDetectors.Add(corridorDetector);
                    }
                    catch (Exception ex)
                    {
                        throw;
                    }
                }
                context.SaveChanges();

                return Json(corridor, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult GetCorridors()
        {
            using (var context = new Jacobs_PlayPenEntities())
            {
                var corridors = context.Corridors.ToList();

                var corridorVMs = new List<CorridorVM>();

                foreach (var corridor in corridors)
                {
                    var corridorVM = new CorridorVM();
                    corridorVM.id = corridor.id;
                    corridorVM.Description = corridor.Description;
                    corridorVM.Name = corridor.Name;

                    var corridorDetectors = context.CorridorDetectors.Where(x => x.corridorId == corridor.id).Select(x => x.detectorId).ToList();

                    var detectors = context.Detectors.Where(x => corridorDetectors.Contains(x.ID)).ToList();
                    corridorVM.Detectors = detectors;
                    corridorVMs.Add(corridorVM);
                }

                return Json(corridorVMs, JsonRequestBehavior.AllowGet);
            }


                
        }

    }
    public class AddCorridorVM
    {
        public string corridorName { get; set; }
        public string corridorDescription { get; set; }
        public int[] detectorNumbers { get; set; }
    }

    public class CorridorVM : Corridor
    {
        public List<Detector> Detectors { get; set; }
        
    }
}