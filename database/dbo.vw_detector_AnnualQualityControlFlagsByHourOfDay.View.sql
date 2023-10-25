USE [FreewayMS]
GO
/****** Object:  View [dbo].[vw_detector_AnnualQualityControlFlagsByHourOfDay]    Script Date: 10/25/2023 6:35:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE view [dbo].[vw_detector_AnnualQualityControlFlagsByHourOfDay] as
SELECT
	detector_number,
	e.collected,
    SUM(e.occupancy_error * 1) AS occupancy_error,
    SUM(e.speed_error * 1) AS speed_error,
    SUM(e.volume_error * 1) AS volume_error,
    SUM(e.zeros_error * 1) AS zeros_error,
    SUM(e.difference_error * 1) AS difference_error,
    dbo.fnHourInDayFromMinsSinceMN(e.min_since) AS hour_in_day
FROM [Jacobs_PlayPen].[dbo].[vw_Errors] e
WHERE DATEPART(dw, e.collected) BETWEEN 2 AND 6
GROUP BY dbo.fnHourInDayFromMinsSinceMN(e.min_since), e.detector_number, e.collected
GO
