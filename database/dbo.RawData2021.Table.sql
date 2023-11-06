USE [FreewayMS]
GO
/****** Object:  Table [dbo].[RawData2021]    Script Date: 11/6/2023 3:04:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RawData2021](
	[id] [int] IDENTITY(0,1) NOT NULL,
	[detector_number] [smallint] NULL,
	[collected] [date] NULL,
	[min_since] [smallint] NULL,
	[lane] [nvarchar](50) NULL,
	[speed] [smallint] NULL,
	[samples] [smallint] NULL,
	[occupancy] [smallint] NULL,
	[volume] [smallint] NULL,
	[vph] [smallint] NULL,
	[isGP] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
