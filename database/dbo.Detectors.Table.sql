USE [FreewayMS]
GO
/****** Object:  Table [dbo].[Detectors]    Script Date: 11/6/2023 3:04:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Detectors](
	[ID] [int] NOT NULL,
	[det_num] [int] NOT NULL,
	[Location] [nvarchar](255) NULL,
	[Route] [nvarchar](255) NULL,
	[Direction] [nvarchar](255) NULL,
	[Milepost] [float] NULL,
	[GPS] [bit] NULL,
	[Type] [nvarchar](255) NULL,
	[Length_ft] [float] NULL,
	[y] [float] NULL,
	[x] [float] NULL,
	[Segment] [varchar](max) NULL,
 CONSTRAINT [PK_Detectors] PRIMARY KEY CLUSTERED 
(
	[det_num] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
