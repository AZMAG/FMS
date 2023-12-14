﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    using System.Data.Entity.Core.Objects;
    using System.Linq;
    
    public partial class FreewayMSEntities2 : DbContext
    {
        public FreewayMSEntities2()
            : base("name=FreewayMSEntities2")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<CorridorDetector> CorridorDetectors { get; set; }
        public virtual DbSet<Corridor> Corridors { get; set; }
        public virtual DbSet<detector_AvgByLane> detector_AvgByLane { get; set; }
        public virtual DbSet<detector_AvgHourlyOccupancy> detector_AvgHourlyOccupancy { get; set; }
        public virtual DbSet<detector_AvgHourlySpeed> detector_AvgHourlySpeed { get; set; }
        public virtual DbSet<detector_AvgHourlyThroughput> detector_AvgHourlyThroughput { get; set; }
        public virtual DbSet<detector_AvgVolumeByLane> detector_AvgVolumeByLane { get; set; }
        public virtual DbSet<detector_MiscData> detector_MiscData { get; set; }
        public virtual DbSet<detector_SpeedVsFlow> detector_SpeedVsFlow { get; set; }
        public virtual DbSet<detector_Validity> detector_Validity { get; set; }
        public virtual DbSet<GeneratedReport> GeneratedReports { get; set; }
        public virtual DbSet<Detector> Detectors { get; set; }
        public virtual DbSet<vw_detector_AvgAnnualVolumeByLane> vw_detector_AvgAnnualVolumeByLane { get; set; }
        public virtual DbSet<vw_detector_AvgByLane> vw_detector_AvgByLane { get; set; }
        public virtual DbSet<vw_detector_AvgHourlySpeed> vw_detector_AvgHourlySpeed { get; set; }
        public virtual DbSet<vw_detector_AvgHourlyThroughput> vw_detector_AvgHourlyThroughput { get; set; }
        public virtual DbSet<vw_detector_MiscData> vw_detector_MiscData { get; set; }
        public virtual DbSet<vw_detector_Validity> vw_detector_Validity { get; set; }
        public virtual DbSet<vw_Errors> vw_Errors { get; set; }
        public virtual DbSet<vw_ExistingLanes> vw_ExistingLanes { get; set; }
        public virtual DbSet<vw_LaneErrors> vw_LaneErrors { get; set; }
        public virtual DbSet<vw_RawData> vw_RawData { get; set; }
    
        public virtual ObjectResult<ReturnAvgHourlySpeedData_Result> ReturnAvgHourlySpeedData(Nullable<int> det_num, Nullable<System.DateTime> start_date, Nullable<System.DateTime> end_date)
        {
            var det_numParameter = det_num.HasValue ?
                new ObjectParameter("det_num", det_num) :
                new ObjectParameter("det_num", typeof(int));
    
            var start_dateParameter = start_date.HasValue ?
                new ObjectParameter("start_date", start_date) :
                new ObjectParameter("start_date", typeof(System.DateTime));
    
            var end_dateParameter = end_date.HasValue ?
                new ObjectParameter("end_date", end_date) :
                new ObjectParameter("end_date", typeof(System.DateTime));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<ReturnAvgHourlySpeedData_Result>("ReturnAvgHourlySpeedData", det_numParameter, start_dateParameter, end_dateParameter);
        }
    
        public virtual int GenerateAvgHourlyOccupancyData(Nullable<System.Guid> report_id, Nullable<int> det_num, Nullable<System.DateTime> start_date, Nullable<System.DateTime> end_date)
        {
            var report_idParameter = report_id.HasValue ?
                new ObjectParameter("report_id", report_id) :
                new ObjectParameter("report_id", typeof(System.Guid));
    
            var det_numParameter = det_num.HasValue ?
                new ObjectParameter("det_num", det_num) :
                new ObjectParameter("det_num", typeof(int));
    
            var start_dateParameter = start_date.HasValue ?
                new ObjectParameter("start_date", start_date) :
                new ObjectParameter("start_date", typeof(System.DateTime));
    
            var end_dateParameter = end_date.HasValue ?
                new ObjectParameter("end_date", end_date) :
                new ObjectParameter("end_date", typeof(System.DateTime));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("GenerateAvgHourlyOccupancyData", report_idParameter, det_numParameter, start_dateParameter, end_dateParameter);
        }
    
        public virtual int GenerateAvgHourlySpeedData(Nullable<System.Guid> report_id, Nullable<int> det_num, Nullable<System.DateTime> start_date, Nullable<System.DateTime> end_date)
        {
            var report_idParameter = report_id.HasValue ?
                new ObjectParameter("report_id", report_id) :
                new ObjectParameter("report_id", typeof(System.Guid));
    
            var det_numParameter = det_num.HasValue ?
                new ObjectParameter("det_num", det_num) :
                new ObjectParameter("det_num", typeof(int));
    
            var start_dateParameter = start_date.HasValue ?
                new ObjectParameter("start_date", start_date) :
                new ObjectParameter("start_date", typeof(System.DateTime));
    
            var end_dateParameter = end_date.HasValue ?
                new ObjectParameter("end_date", end_date) :
                new ObjectParameter("end_date", typeof(System.DateTime));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("GenerateAvgHourlySpeedData", report_idParameter, det_numParameter, start_dateParameter, end_dateParameter);
        }
    
        public virtual int GenerateAvgHourlyThroughputData(Nullable<System.Guid> report_id, Nullable<int> det_num, Nullable<System.DateTime> start_date, Nullable<System.DateTime> end_date)
        {
            var report_idParameter = report_id.HasValue ?
                new ObjectParameter("report_id", report_id) :
                new ObjectParameter("report_id", typeof(System.Guid));
    
            var det_numParameter = det_num.HasValue ?
                new ObjectParameter("det_num", det_num) :
                new ObjectParameter("det_num", typeof(int));
    
            var start_dateParameter = start_date.HasValue ?
                new ObjectParameter("start_date", start_date) :
                new ObjectParameter("start_date", typeof(System.DateTime));
    
            var end_dateParameter = end_date.HasValue ?
                new ObjectParameter("end_date", end_date) :
                new ObjectParameter("end_date", typeof(System.DateTime));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("GenerateAvgHourlyThroughputData", report_idParameter, det_numParameter, start_dateParameter, end_dateParameter);
        }
    
        public virtual int GenerateAvgVolumeByLane(Nullable<System.Guid> report_id, Nullable<int> det_num, Nullable<System.DateTime> start_date, Nullable<System.DateTime> end_date)
        {
            var report_idParameter = report_id.HasValue ?
                new ObjectParameter("report_id", report_id) :
                new ObjectParameter("report_id", typeof(System.Guid));
    
            var det_numParameter = det_num.HasValue ?
                new ObjectParameter("det_num", det_num) :
                new ObjectParameter("det_num", typeof(int));
    
            var start_dateParameter = start_date.HasValue ?
                new ObjectParameter("start_date", start_date) :
                new ObjectParameter("start_date", typeof(System.DateTime));
    
            var end_dateParameter = end_date.HasValue ?
                new ObjectParameter("end_date", end_date) :
                new ObjectParameter("end_date", typeof(System.DateTime));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("GenerateAvgVolumeByLane", report_idParameter, det_numParameter, start_dateParameter, end_dateParameter);
        }
    
        public virtual int GenerateMiscDataReport(Nullable<System.Guid> report_id, Nullable<int> det_num, string start_date, string end_date, Nullable<bool> isPeriod1)
        {
            var report_idParameter = report_id.HasValue ?
                new ObjectParameter("report_id", report_id) :
                new ObjectParameter("report_id", typeof(System.Guid));
    
            var det_numParameter = det_num.HasValue ?
                new ObjectParameter("det_num", det_num) :
                new ObjectParameter("det_num", typeof(int));
    
            var start_dateParameter = start_date != null ?
                new ObjectParameter("start_date", start_date) :
                new ObjectParameter("start_date", typeof(string));
    
            var end_dateParameter = end_date != null ?
                new ObjectParameter("end_date", end_date) :
                new ObjectParameter("end_date", typeof(string));
    
            var isPeriod1Parameter = isPeriod1.HasValue ?
                new ObjectParameter("isPeriod1", isPeriod1) :
                new ObjectParameter("isPeriod1", typeof(bool));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("GenerateMiscDataReport", report_idParameter, det_numParameter, start_dateParameter, end_dateParameter, isPeriod1Parameter);
        }
    
        public virtual ObjectResult<ReturnAvgHourlyOccupancyData_Result> ReturnAvgHourlyOccupancyData(Nullable<int> det_num, Nullable<System.DateTime> start_date, Nullable<System.DateTime> end_date)
        {
            var det_numParameter = det_num.HasValue ?
                new ObjectParameter("det_num", det_num) :
                new ObjectParameter("det_num", typeof(int));
    
            var start_dateParameter = start_date.HasValue ?
                new ObjectParameter("start_date", start_date) :
                new ObjectParameter("start_date", typeof(System.DateTime));
    
            var end_dateParameter = end_date.HasValue ?
                new ObjectParameter("end_date", end_date) :
                new ObjectParameter("end_date", typeof(System.DateTime));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<ReturnAvgHourlyOccupancyData_Result>("ReturnAvgHourlyOccupancyData", det_numParameter, start_dateParameter, end_dateParameter);
        }
    
        public virtual ObjectResult<ReturnAvgHourlyThroughputData_Result> ReturnAvgHourlyThroughputData(Nullable<int> det_num, Nullable<System.DateTime> start_date, Nullable<System.DateTime> end_date)
        {
            var det_numParameter = det_num.HasValue ?
                new ObjectParameter("det_num", det_num) :
                new ObjectParameter("det_num", typeof(int));
    
            var start_dateParameter = start_date.HasValue ?
                new ObjectParameter("start_date", start_date) :
                new ObjectParameter("start_date", typeof(System.DateTime));
    
            var end_dateParameter = end_date.HasValue ?
                new ObjectParameter("end_date", end_date) :
                new ObjectParameter("end_date", typeof(System.DateTime));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<ReturnAvgHourlyThroughputData_Result>("ReturnAvgHourlyThroughputData", det_numParameter, start_dateParameter, end_dateParameter);
        }
    
        public virtual ObjectResult<ReturnAvgVolumeByLane_Result> ReturnAvgVolumeByLane(Nullable<int> det_num, Nullable<System.DateTime> start_date, Nullable<System.DateTime> end_date)
        {
            var det_numParameter = det_num.HasValue ?
                new ObjectParameter("det_num", det_num) :
                new ObjectParameter("det_num", typeof(int));
    
            var start_dateParameter = start_date.HasValue ?
                new ObjectParameter("start_date", start_date) :
                new ObjectParameter("start_date", typeof(System.DateTime));
    
            var end_dateParameter = end_date.HasValue ?
                new ObjectParameter("end_date", end_date) :
                new ObjectParameter("end_date", typeof(System.DateTime));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<ReturnAvgVolumeByLane_Result>("ReturnAvgVolumeByLane", det_numParameter, start_dateParameter, end_dateParameter);
        }
    
        public virtual ObjectResult<ReturnMiscDataReport_Result> ReturnMiscDataReport(Nullable<int> det_num, Nullable<System.DateTime> start_date, Nullable<System.DateTime> end_date)
        {
            var det_numParameter = det_num.HasValue ?
                new ObjectParameter("det_num", det_num) :
                new ObjectParameter("det_num", typeof(int));
    
            var start_dateParameter = start_date.HasValue ?
                new ObjectParameter("start_date", start_date) :
                new ObjectParameter("start_date", typeof(System.DateTime));
    
            var end_dateParameter = end_date.HasValue ?
                new ObjectParameter("end_date", end_date) :
                new ObjectParameter("end_date", typeof(System.DateTime));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<ReturnMiscDataReport_Result>("ReturnMiscDataReport", det_numParameter, start_dateParameter, end_dateParameter);
        }
    }
}