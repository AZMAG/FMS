USE [FreewayMS]
GO
/****** Object:  View [dbo].[vw_RawData]    Script Date: 10/25/2023 6:35:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE view [dbo].[vw_RawData] as
select 2015 as year, * from dbo.RawData2015
union all select 2016 as year, * from dbo.RawData2016
union all select 2017 as year, * from dbo.RawData2017
union all select 2018 as year, * from dbo.RawData2018
union all select 2019 as year, * from dbo.RawData2019
union all select 2020 as year, * from dbo.RawData2020
union all select 2021 as year, * from dbo.RawData2021
union all select 2022 as year, * from dbo.RawData2022
GO
