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
    
    public partial class ReturnAvgVolumeByLane_Result
    {
        public Nullable<int> detector_number { get; set; }
        public string lane { get; set; }
        public Nullable<int> avg_daily_traffic { get; set; }
    }
}