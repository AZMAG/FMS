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
    
    public partial class RawData2016
    {
        public int id { get; set; }
        public Nullable<short> detector_number { get; set; }
        public Nullable<System.DateTime> collected { get; set; }
        public Nullable<short> min_since { get; set; }
        public string lane { get; set; }
        public Nullable<short> speed { get; set; }
        public Nullable<short> samples { get; set; }
        public Nullable<short> occupancy { get; set; }
        public Nullable<short> volume { get; set; }
        public Nullable<short> vph { get; set; }
        public Nullable<bool> isGP { get; set; }
    }
}
