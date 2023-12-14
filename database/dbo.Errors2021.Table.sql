USE [FreewayMS]
GO
/****** Object:  Table [dbo].[Errors2021]    Script Date: 11/6/2023 3:04:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Errors2021](
	[id] [int] IDENTITY(0,1) NOT NULL,
	[detector_number] [int] NULL,
	[collected] [date] NULL,
	[min_since] [smallint] NULL,
	[speed_error] [bit] NULL,
	[volume_error] [bit] NULL,
	[occupancy_error] [bit] NULL,
	[difference_error] [bit] NULL,
	[zeros_error] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
