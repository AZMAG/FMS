USE [FreewayMS]
GO
/****** Object:  StoredProcedure [dbo].[GenerateMiscDataReport]    Script Date: 10/25/2023 6:35:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Jack Fairfield
-- Create date: 9/29/2022
-- Description:	This procedure inserts data into dbo.detector_MiscData using submitted parameters.
-- =============================================
CREATE PROCEDURE [dbo].[GenerateMiscDataReport]
	@report_id uniqueidentifier,
	@det_num int,
	@start_date nvarchar(15),
	@end_date nvarchar(15),
	@isPeriod1 bit
AS
BEGIN
	SET NOCOUNT ON;
	Insert into dbo.detector_MiscData (id, detector_number, num_days, gp_lane_cnt, hov_lane_cnt, reportId, isPeriod1)
	select NEWID(), detector_number, num_days, gp_lane_cnt, hov_lane_cnt, @report_id, @isPeriod1
	from (
		select
		el.detector_number,
		el.lane1 + el.lane2 + el.lane3 + el.lane4 + el.lane5 +
		el.lane6 + el.lane7 + el.lane8 + el.lane9 + el.lane10 as gp_lane_cnt,
		el.HOV + el.HOV2 as hov_lane_cnt,
		ISNULL((SELECT count(distinct ad.collected)
			FROM [Jacobs_PlayPen].[dbo].[vw_RawData] ad
			where 
			(
				ad.speed is not null
				or ad.volume <> 0
				or ad.volume is not null
				or ad.occupancy is not null
			)
			and ad.detector_number = @det_num
			and ad.collected between @start_date and @end_date
			), 0) as num_days
		from [Jacobs_PlayPen].[dbo].[vw_ExistingLanes] el
		where el.detector_number = @det_num
		and el.year = RIGHT( @start_date, 4 )
	) data
END
GO
