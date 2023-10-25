USE [FreewayMS]
GO
/****** Object:  View [dbo].[vw_detector_AvgByLane]    Script Date: 10/25/2023 6:35:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE view [dbo].[vw_detector_AvgByLane] as
select
ROW_NUMBER()OVER(ORDER BY rd.detector_number) as id,
rd.detector_number,
rd.lane,
rd.year,
avg(rd.speed) as avg_speed,
avg(rd.volume) as avg_volume,
avg(rd.samples) as avg_ADT
from dbo.vw_RawData rd
where (rd.lane = 'HOV' OR rd.lane like 'lane%')
group by rd.detector_number, rd.lane, rd.year
GO
