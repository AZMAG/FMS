USE [FreewayMS]
GO
/****** Object:  View [dbo].[vw_Errors]    Script Date: 10/25/2023 6:35:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE view [dbo].[vw_Errors] as
select 2018 as year, * from dbo.Errors2018
union all select 2017 as year, * from dbo.Errors2017
union all select 2016 as year, * from dbo.Errors2016
union all select 2015 as year, * from dbo.Errors2015 
union all select 2019 as year, * from dbo.Errors2019
union all select 2020 as year, * from dbo.Errors2020
union all select 2021 as year, * from dbo.Errors2021
union all select 2022 as year, * from dbo.Errors2022
GO
