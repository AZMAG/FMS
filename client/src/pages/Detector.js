import React from "react";

import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import MiscDetectorData from "./../components/Detector/MiscDetectorData";
import ErrorTable from "./../components/Detector/ErrorTable";
import DetectorNotes from "./../components/Detector/detectorNotes";
import DetectorDefinition from "../components/Detector/detectorDefinition";

import AnnualHourlyAverageSpeeds from "./../components/Detector/Charts/AnnualHourlyAverageSpeeds";
import AnnualHourlyAverageThroughput from "./../components/Detector/Charts/AnnualHourlyAverageThroughput";
import AnnualHourlyAverageOccupancyPercent from "./../components/Detector/Charts/AnnualHourlyAverageOccupancyPercent";
import AnnualAverageByLane from "./../components/Detector/Charts/AnnualAverageByLane";
import DistributionOfDataPassingQCByDate from "./../components/Detector/Charts/DistributionOfDataPassingQCByDate";
import DistributionOfDataPassingQCByWeekday from "./../components/Detector/Charts/DistributionOfDataPassingQCByWeekday";

export default function Detector() {
    const id = 50;

    return (
        <div className="detector-page flex flex-col container mx-auto">
            <Container className="flex">
                <Row>
                    <Col xs={4}>
                        <MiscDetectorData det_num={id} />
                    </Col>
                    <Col xs={8} className="bg-[#eeeeee]">
                        <DetectorNotes />
                    </Col>
                </Row>
            </Container>
            <div className="charts-section mb-20">
                <div className="flex w-1/2 my-2">
                    <ErrorTable det_num={id} />
                </div>
                <div className="flex my-2">
                    <DetectorDefinition />
                </div>
                <div className="flex my-2">
                    <AnnualHourlyAverageSpeeds det_num={id} />
                    <AnnualHourlyAverageThroughput det_num={id} />
                </div>
                <div className="flex my-2">
                    <AnnualHourlyAverageOccupancyPercent det_num={id} />
                    <AnnualAverageByLane det_num={id} />
                </div>
                <div className="flex my-2">
                    <DistributionOfDataPassingQCByDate det_num={id} />
                    <DistributionOfDataPassingQCByWeekday det_num={id} />
                </div>
            </div>
        </div>
    );
}
