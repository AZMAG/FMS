//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace FMS_Dashboard.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Detector
    {
        public short detector_id { get; set; }
        public string detector_location { get; set; }
        public string detector_route { get; set; }
        public string detector_direction { get; set; }
        public Nullable<decimal> detector_milepost { get; set; }
    }
}
