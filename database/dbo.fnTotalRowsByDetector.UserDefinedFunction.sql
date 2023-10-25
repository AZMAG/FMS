USE [FreewayMS]
GO
/****** Object:  UserDefinedFunction [dbo].[fnTotalRowsByDetector]    Script Date: 10/25/2023 6:35:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO





CREATE FUNCTION [dbo].[fnTotalRowsByDetector]
(
    @det_num INT,
	@year INT
)
RETURNS INT
AS
BEGIN
    RETURN 
	(
		select (
		[lane1] + [lane2] + [lane3] + [lane4] + [lane5] + 
		[lane6] + [lane7] + [lane8] + [lane9] + [lane10] + 
		[HOV] + [HOV2]) * (DATEPART(Dy,DATEFROMPARTS(@year,12,31)) * 288)
		from dbo.vw_existingLanes
		where detector_number = @det_num
		and year = @year
	)
END
GO
