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
    
    public partial class detector_AvgHourlyOccupancy
    {
        public System.Guid id { get; set; }
        public Nullable<short> detector_number { get; set; }
        public Nullable<int> avg_occupancy_pct { get; set; }
        public string hour_in_day { get; set; }
        public string lane_type { get; set; }
        public Nullable<int> year { get; set; }
        public Nullable<System.Guid> reportId { get; set; }
        public Nullable<bool> isPeriod1 { get; set; }
    }
}