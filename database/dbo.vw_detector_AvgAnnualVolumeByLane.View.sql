USE [FreewayMS]
GO
/****** Object:  View [dbo].[vw_detector_AvgAnnualVolumeByLane]    Script Date: 10/25/2023 6:35:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE View [dbo].[vw_detector_AvgAnnualVolumeByLane] as

select detector_number, lane, year, avg(throughput) as avg_annual_daily_traffic
	from
	(
		select
			ISNULL(ROW_NUMBER() OVER (ORDER BY detector_number), 0) as id,
			ad.lane,
			detector_number,
			SUM(ad.volume) as throughput,
			year
		from [dbo].[vw_RawData] ad
		where ad.isGP is not null
		group by 
			ad.lane,
			detector_number,
			year,
			ad.collected
	) a
	group by lane, year, detector_number
GO
