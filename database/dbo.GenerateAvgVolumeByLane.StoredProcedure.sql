USE [FreewayMS]
GO
/****** Object:  StoredProcedure [dbo].[GenerateAvgVolumeByLane]    Script Date: 10/25/2023 6:35:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO





CREATE PROCEDURE [dbo].[GenerateAvgVolumeByLane]
	@report_id uniqueidentifier,
	@det_num int,
	@start_date date,
	@end_date date
AS
BEGIN
	SET NOCOUNT ON;
	Insert into dbo.detector_AvgVolumeByLane(id, detector_number, lane, avg_daily_traffic, reportId)
	select NEWID(), @det_num as detector_number, lane, AVG(throughput) AS avg_daily_traffic, @report_id
	FROM
	(
		SELECT
			ad.lane,
			@det_num as detector_number,
			SUM(COALESCE(ad.volume, 0)) AS throughput
		FROM [dbo].[vw_RawData] ad
		WHERE ad.isGP is not null
		and ad.detector_number = @det_num
		and ad.collected between @start_date and @end_date
		and DATEPART(WEEKDAY, ad.collected) BETWEEN 2 AND 6
		GROUP BY 
			ad.lane,
			ad.collected
	) a
	GROUP BY lane
END
GO
