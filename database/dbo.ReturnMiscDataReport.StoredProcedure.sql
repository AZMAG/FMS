USE [FreewayMS]
GO
/****** Object:  StoredProcedure [dbo].[ReturnMiscDataReport]    Script Date: 10/26/2023 9:09:28 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Mark Egge, High Street, based on original SP by Jack Fairfield
-- Create date: 9/29/2023
-- Description:	This procedure returns MiscData using submitted parameters.
-- =============================================
CREATE PROCEDURE [dbo].[ReturnMiscDataReport]
	@det_num int,
	@start_date date,
	@end_date date
AS
BEGIN
	SET NOCOUNT ON;
	select detector_number, num_days, gp_lane_cnt, hov_lane_cnt
	from (
		select
		el.detector_number,
		el.lane1 + el.lane2 + el.lane3 + el.lane4 + el.lane5 +
		el.lane6 + el.lane7 + el.lane8 + el.lane9 + el.lane10 as gp_lane_cnt,
		el.HOV + el.HOV2 as hov_lane_cnt,
		ISNULL((SELECT count(distinct ad.collected)
			FROM [dbo].[vw_RawData] ad
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
		from [dbo].[vw_ExistingLanes] el
		where el.detector_number = @det_num
		and el.year = RIGHT( @start_date, 4 )
	) data
END
GO
