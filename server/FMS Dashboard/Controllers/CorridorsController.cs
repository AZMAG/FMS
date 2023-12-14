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
        public ActionResult AddNew(AddCorridorVM vm)
        {
            using (var context = new FreewayMSEntities2())
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
                        Console.WriteLine(ex.Message, "New Corridor Processing failed.");
                        throw;
                    }
                }
                context.SaveChanges();

                return Json(corridor, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult GetCorridorValidity()
        {

            using (var context = new FreewayMSEntities2())
            {
                var data = context.detector_Validity
                    .Join(context.CorridorDetectors,
                    validity => (int)validity.detector_number,
                   other => other.detectorId,
                   (validity, other) => new { Validity = validity, Other = other })
               .GroupBy(x => new { x.Validity.year, x.Other.corridorId })
               .Select(row => new CorridorValidityResult
               {
                   year = row.Key.year,
                   corridor = row.Key.corridorId,
                   valid = row.Sum(c => c.Validity.valid),
                   errors = row.Sum(c => c.Validity.error),
                   total = row.Sum(c => c.Validity.total),
               })
               .ToList();

                return Json(data, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult GetCorridors()
        {
            using (var context = new FreewayMSEntities2())
            {
                var corridors = context.Corridors.ToList();

                var corridorVMs = new List<CorridorVM>();

                foreach (var corridor in corridors)
                {
                    var corridorVM = new CorridorVM();
                    corridorVM.id = corridor.id;
                    corridorVM.Description = corridor.Description;
                    corridorVM.Name = corridor.Name;
                    corridorVM.Year = corridor.Year;

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

    public class CorridorValidityResult
    {
        public int? year { get; set; }
        public int? errors { get; set; }
        public int? valid { get; set; }
        public decimal? total { get; set; }
        public int corridor { get; set; }
    }
}
