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
    
    public partial class Detectors_
    {
        public int ID { get; set; }
        public int det_num { get; set; }
        public Nullable<double> Milepost { get; set; }
        public Nullable<double> x { get; set; }
        public Nullable<double> y { get; set; }
        public string Route { get; set; }
        public string Direction { get; set; }
        public string Location { get; set; }
    }
}