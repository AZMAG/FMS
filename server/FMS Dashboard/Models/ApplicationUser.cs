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
    
    public partial class ApplicationUser
    {
        public int id { get; set; }
        public string domainName { get; set; }
        public int RoleId { get; set; }
    
        public virtual ApplicationRole ApplicationRole { get; set; }
    }
}
