USE [FreewayMS]
GO
/****** Object:  View [dbo].[vw_detector_Validity]    Script Date: 10/25/2023 6:35:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO






CREATE View [dbo].[vw_detector_Validity] as
select 
NEWID() as id,
t.detector_number,
t.year,
MAX(case when t.errCnt = 1 then rows ELSE 0 end) as error,
MAX(case when t.errCnt = 0 then rows ELSE 0 end) as valid,
(dbo.fnTotalRowsByDetector(detector_number, t.year) * 1.0) as total,

(MAX(case when t.errCnt = 0 then rows ELSE 0 end) * 1.0) / 
(dbo.fnTotalRowsByDetector(detector_number, t.year) * 1.0)
 as pct
from
(
	select
	detector_number, errCnt, count(*) as rows, year
	from
	(
		select 
		rd.detector_number,
		rd.collected,
		rd.min_since,
		rd.year,
		case when cast(e.occupancy_error as int) +
			cast(e.volume_error as int) +
			cast(e.speed_error as int) +
			cast(e.difference_error as int) +
			cast(e.zeros_error as int) > 0 then 1 else 0 end
		as errCnt
		from [Jacobs_PlayPen].[dbo].vw_RawData rd
		left join [Jacobs_PlayPen].[dbo].[vw_Errors] e
	
		on rd.collected = e.collected
		   and rd.detector_number = e.detector_number
		   and rd.min_since = e.min_since
		where 
		(
			rd.GP = 1 OR rd.HOV = 1
		)
	) as validity
	group by detector_number, errCnt, year
) t
group by detector_number, year
GO
