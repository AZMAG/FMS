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
    
    public partial class detector_AvgAnnualVolumeByLane
    {
        public Nullable<short> detector_number { get; set; }
        public string lane { get; set; }
        public int year { get; set; }
        public Nullable<int> avg_annual_daily_traffic { get; set; }
    }
}
