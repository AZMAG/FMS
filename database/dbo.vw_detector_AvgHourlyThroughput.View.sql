USE [FreewayMS]
GO
/****** Object:  View [dbo].[vw_detector_AvgHourlyThroughput]    Script Date: 10/25/2023 6:35:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO





CREATE View [dbo].[vw_detector_AvgHourlyThroughput] as
select
	detector_number,
	AVG(ad.volume) as avg_throughput,
	dbo.fnHourInDayFromMinsSinceMN(ad.min_since) as hour_in_day,
	case 
		when ad.gp = 1 then 'GP'
		when ad.HOV = 1 then 'HOV'
	 end as lane_type,
	year
from [Jacobs_PlayPen].[dbo].[vw_RawData] ad
where (ad.gp = 1 or ad.HOV = 1)
group by dbo.fnHourInDayFromMinsSinceMN(ad.min_since),
	case 
		when ad.gp = 1 then 'GP'
		when ad.HOV = 1 then 'HOV'
	end,
	detector_number,
	year

union all 

select
	detector_number,
	AVG(ad.volume),
	dbo.fnHourInDayFromMinsSinceMN(ad.min_since),
	'All Lanes',
	year
from [Jacobs_PlayPen].[dbo].[vw_RawData] ad
where ad.gp = 1 or ad.HOV = 1
group by dbo.fnHourInDayFromMinsSinceMN(ad.min_since), detector_number, year
GO
