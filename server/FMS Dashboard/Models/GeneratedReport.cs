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
    
    public partial class GeneratedReport
    {
        public System.Guid id { get; set; }
        public bool AHAS { get; set; }
        public bool AHATPL { get; set; }
        public bool AHAOP { get; set; }
        public bool AAL { get; set; }
        public bool DDPQCCD { get; set; }
        public bool DDPQCCW { get; set; }
        public bool AQCFHD { get; set; }
        public bool FVD { get; set; }
        public bool SVD { get; set; }
        public bool SVF { get; set; }
        public int det_num { get; set; }
        public Nullable<int> timePeriodYear1 { get; set; }
        public Nullable<int> timePeriodYear2 { get; set; }
        public string startDate1 { get; set; }
        public string startDate2 { get; set; }
        public string endDate1 { get; set; }
        public string endDate2 { get; set; }
        public bool completed { get; set; }
        public System.DateTime date_submitted { get; set; }
    }
}
