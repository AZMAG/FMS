USE [FreewayMS]
GO
/****** Object:  View [dbo].[vw_LaneErrors]    Script Date: 10/25/2023 6:35:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE view [dbo].[vw_LaneErrors] as
select 2018 as year, * from Jacobs_PlayPen.dbo.LaneErrors2018
union all select 2019 as year, * from Jacobs_PlayPen.dbo.LaneErrors2019
union all select 2020 as year, * from Jacobs_PlayPen.dbo.LaneErrors2020
union all select 2021 as year, * from Jacobs_PlayPen.dbo.LaneErrors2021
union all select 2017 as year, * from Jacobs_PlayPen.dbo.LaneErrors2017
union all select 2016 as year, * from Jacobs_PlayPen.dbo.LaneErrors2016
union all select 2015 as year, * from Jacobs_PlayPen.dbo.LaneErrors2015 
GO
