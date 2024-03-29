USE [FreewayMS]
GO
/****** Object:  StoredProcedure [dbo].[GenerateAvgHourlyOccupancyData]    Script Date: 10/25/2023 6:35:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		Jack Fairfield
-- Create date: 11/15/2022
-- Description:	This procedure inserts data into dbo.detector_AvgHourlySpeed using submitted parameters.
-- =============================================
CREATE PROCEDURE [dbo].[GenerateAvgHourlyOccupancyData]
	@report_id uniqueidentifier,
	@det_num int,
	@start_date date,
	@end_date date
AS
BEGIN
	SET NOCOUNT ON;
	Insert into dbo.detector_AvgHourlyOccupancy (id, detector_number, avg_occupancy_pct, min_since, lane_type, reportId)
	select NEWID(), detector_number, avg_occupancy, min_since, lane_type, @report_id
	from (
		select
			@det_num as detector_number,
			AVG(ad.occupancy) as avg_occupancy,
			ad.min_since,
			case 
				when ad.isGP = 1 then 'GP'
				when ad.isGP = 0  then 'HOV' end as lane_type
		from [dbo].[vw_RawData] ad
		where ad.isGP is not null
		and ad.detector_number = @det_num
		and ad.collected between @start_date and @end_date
		and DATEPART(WEEKDAY, ad.collected) BETWEEN 2 AND 6
		group by ad.min_since,
			case 
				when ad.isGP = 1 then 'GP'
				when ad.isGP = 0  then 'HOV'
			end

		union all 

		select
			@det_num as detector_number,
			AVG(ad.occupancy),
			ad.min_since,
			'All Lanes'
		from [dbo].[vw_RawData] ad
		where ad.isGP is not null
		and ad.detector_number = @det_num
		and ad.collected between @start_date and @end_date
		and DATEPART(WEEKDAY, ad.collected) BETWEEN 2 AND 6
		group by ad.min_since
	) data
END
GO
