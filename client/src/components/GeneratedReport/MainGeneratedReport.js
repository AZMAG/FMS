import React, { useRef } from "react";
import ReportChartsSection from "./ReportChartsSection";
import ScrollToTopButton from "../ScrollToTop/scrollToTop";
import GeneratedReportMap from "./GeneratedReportMap";
import TimePeriodCard from "./TimePeriodCard";
import ErrorTable from "../Detector/ErrorTable";
import DetectorNotes from "../Detector/detectorNotes";
import DetectorQualityTable from "../Detector/qualityTable";
import DetectorDefinition from "../Detector/detectorDefinition";
import PageHeader from "./pageHeader";
import PageSideMenu from "./pageSideMenu";

export default function GeneratedReport({ data }) {
    const containerRef = useRef();

    return (
        <main
            tag="ReportsPage"
            className="container mx-auto flex grow flex-col justify-items-center py-8 px-10"
            ref={containerRef}
        >
            <PageHeader data={data} />
            <div className="flex">
                <div className="mt-4 w-1/5">
                    <PageSideMenu />
                </div>
                <div className="flex w-4/5 flex-col justify-items-center">
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
                            <TimePeriodCard data={data} period1={true} />
                            <ErrorTable />
                            <DetectorQualityTable />
                            <ReportChartsSection id={data.id} period1={true} />
                        </div>
                        {(data.startDate2 || data.timePeriodYear2) && (
                            <div className="flex-1 space-y-4 border-l-2 px-3">
                                <TimePeriodCard data={data} period1={false} />
                                <ErrorTable />
                                <DetectorQualityTable />
                                <ReportChartsSection
                                    id={data.id}
                                    period1={false}
                                />
                            </div>
                        )}
                    </div>
                    <div id="section-notes" className="mt-4">
                        <DetectorNotes />
                    </div>
                    <div id="section-def" className="mt-4">
                        <DetectorDefinition />
                    </div>
                </div>
            </div>

            <ScrollToTopButton containerRef={containerRef} />
        </main>
    );
}
