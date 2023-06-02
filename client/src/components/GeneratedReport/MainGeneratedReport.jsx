import React, { useRef } from "react";
import ReportChartsSection from "./ReportChartsSection";
import ScrollToTopButton from "../ScrollToTop/scrollToTop";
import GeneratedReportMap from "./GeneratedReportMap";
import TimePeriodCard from "./TimePeriodCard";
import ErrorTable from "../Detector/ErrorTable";
import DetectorNotes from "../Detector/DetectorNotes";
import DetectorQualityTable from "../Detector/QualityTable";
import DetectorDefinition from "../Detector/DetectorDefinition";
import PageHeader from "./PageHeader";
import PageSideMenu from "./PageSideMenu";

export default function GeneratedReport({ data, det_num, year }) {
    const containerRef = useRef();
    console.log({ data, det_num, year });

    return (
        <div className="bg-white">
            {/* <PageHeader data={data} /> */}
            <div className="mx-36 flex pt-32">
                <div className="fixed z-50 h-screen w-64 overflow-y-auto">
                    <PageSideMenu />
                </div>
                <div className="ml-64 flex-1 overflow-y-auto">
                    <div>
                        <div id="section-map" className="flex">
                            {/* <GeneratedReportMap
                                x={data.x}
                                y={data.y}
                                segment={data.segment}
                                direction={data.Direction}
                            /> */}
                        </div>
                        <div className="mt-6 flex grid-cols-2 ">
                            <div className="flex-1 space-y-4 border-r-2 px-3">
                                <div className="flex items-start">
                                    {/* <TimePeriodCard data={data} /> */}

                                    <div
                                        id="section-notes"
                                        className="ml-2 flex-1"
                                    >
                                        <DetectorNotes />
                                    </div>
                                </div>
                                {/* <ErrorTable /> */}
                                {/* <DetectorQualityTable /> */}
                                <ReportChartsSection
                                    id={data?.id}
                                    det_num={det_num}
                                    year={year}
                                />
                                <div className="h-52"></div>
                            </div>
                        </div>

                        {/* <div id="section-def" className="mt-4">
                            <DetectorDefinition />
                        </div> */}
                    </div>
                </div>
            </div>
            <ScrollToTopButton containerRef={containerRef} />
        </div>
    );
}
