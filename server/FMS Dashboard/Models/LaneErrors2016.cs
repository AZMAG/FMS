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
    
    public partial class LaneErrors2016
    {
        public int id { get; set; }
        public Nullable<short> detector_number { get; set; }
        public Nullable<System.DateTime> collected { get; set; }
        public Nullable<short> min_since { get; set; }
        public Nullable<short> lane1 { get; set; }
        public Nullable<short> lane2 { get; set; }
        public Nullable<short> lane3 { get; set; }
        public Nullable<short> lane4 { get; set; }
        public Nullable<short> lane5 { get; set; }
        public Nullable<short> lane6 { get; set; }
        public Nullable<short> lane7 { get; set; }
        public Nullable<short> lane8 { get; set; }
        public Nullable<short> lane9 { get; set; }
        public Nullable<short> lane10 { get; set; }
        public Nullable<short> HOV { get; set; }
        public Nullable<short> HOV2 { get; set; }
    }
}