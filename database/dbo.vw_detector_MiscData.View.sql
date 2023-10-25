USE [FreewayMS]
GO
/****** Object:  View [dbo].[vw_detector_MiscData]    Script Date: 10/25/2023 6:35:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE view [dbo].[vw_detector_MiscData] as
select 
NEWID() as Id,
num_days.detector_number,
num_days.num_days,
lane_cnt.gp_lane_cnt,
lane_cnt.hov_lane_cnt,
num_days.year
from (
	SELECT ad.detector_number, count(distinct ad.collected) as num_days, year
	FROM [Jacobs_PlayPen].[dbo].[vw_RawData] ad
	where ad.speed is not null
	or ad.volume <> 0
	or ad.volume is not null
	or ad.occupancy is not null
	group by detector_number, year
) as num_days
left join 
(
	select 
	el.detector_number,
	el.lane1 + el.lane2 + el.lane3 + el.lane4 + el.lane5 +
	el.lane6 + el.lane7 + el.lane8 + el.lane9 + el.lane10 as gp_lane_cnt,
	el.HOV + el.HOV2 as hov_lane_cnt,
	year
	from [Jacobs_PlayPen].[dbo].[vw_ExistingLanes] el
) lane_cnt on num_days.detector_number = lane_cnt.detector_number AND num_days.year = lane_cnt.year
GO
