USE [FreewayMS]
GO
/****** Object:  StoredProcedure [dbo].[ReturnAvgHourlyThroughputData]    Script Date: 10/26/2023 9:09:28 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		Mark Egge, High Street (based on Jack Dangerfield's original stored procedure)
-- Create date: 11/1/2023
-- Description:	This procedure returns AvgHourlySpeed using submitted parameters.
-- =============================================
CREATE PROCEDURE [dbo].[ReturnAvgHourlyThroughputData]
	@det_num int,
	@start_date date,
	@end_date date
AS
BEGIN
	SET NOCOUNT ON;
	select detector_number, avg_throughput, min_since, lane_type
	from (
		select
			@det_num as detector_number,
			AVG(ad.volume) as avg_throughput,
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
			AVG(ad.volume),
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
