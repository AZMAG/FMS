import React, { useRef } from "react";
import ReportChartsSection from "./ReportChartsSection";
import ScrollToTopButton from "../ScrollToTop/scrollToTop";
import GeneratedReportMap from "./GeneratedReportMap";
import TimePeriodCard from "./TimePeriodCard";
import ErrorTable from "../Detector/ErrorTable";
import DetectorNotes from "../Detector/detectorNotes";
import DetectorQualityTable from "../Detector/qualityTable";
import DetectorDefinition from "../Detector/detectorDefinition";
import PageHeader from "./PageHeader";
import PageSideMenu from "./PageSideMenu";

export default function GeneratedReport({ data }) {
    const containerRef = useRef();

    return (
        <div>
            <PageHeader data={data} />
            <div className="mx-36 flex pt-32">
                <div className="fixed z-50 h-screen w-64 overflow-y-auto">
                    <PageSideMenu />
                </div>
                <div className="ml-64 flex-1 overflow-y-auto">
                    <div>
                        <div id="section-map" className="flex">
                            <GeneratedReportMap
                                x={data.x}
                                y={data.y}
                                segment={data.segment}
                                direction={data.Direction}
                            />
                        </div>
                        <div className="mt-6 flex grid-cols-2 ">
                            <div className="flex-1 space-y-4 border-r-2 px-3">
                                <div className="flex items-start">
                                    <TimePeriodCard
                                        data={data}
                                        period1={true}
                                    />

                                    <div
                                        id="section-notes"
                                        className="ml-2 flex-1"
                                    >
                                        <DetectorNotes />
                                    </div>
                                </div>
                                <ErrorTable />
                                {/* <DetectorQualityTable /> */}
                                <ReportChartsSection
                                    id={data.id}
                                    period1={true}
                                />
                                <div className="h-52"></div>
                            </div>
                            {data.startDate2 || data.timePeriodYear2 ? (
                                <div className="flex-1 space-y-4 border-l-2 px-3">
                                    <TimePeriodCard
                                        data={data}
                                        period1={false}
                                    />
                                    <ErrorTable />
                                    <DetectorQualityTable />
                                    <ReportChartsSection
                                        id={data.id}
                                        period1={false}
                                    />
                                </div>
                            ) : null}
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
