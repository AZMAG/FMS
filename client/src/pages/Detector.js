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
        <Container className="detector-page flex flex-col space-y-6 mt-4">
            <Row>
                <Col xs={4}>
                    <MiscDetectorData det_num={id} />
                </Col>
                <Col xs={8} className="bg-[#eeeeee]">
                    <DetectorNotes />
                </Col>
            </Row>
            <Row
                className="text-xl font-bold text-center"
                style={{ borderBottom: "1.5px solid" }}
            >
                <h5>
                    Tables, Quality Control Charts and Additional Information
                </h5>
            </Row>
            <Row>
                <Col xs={5}>
                    <h6>
                        Count of Quality Control Flags by Time Period - weekdays
                    </h6>
                    <ErrorTable det_num={id} />
                </Col>
                <Col xs={7}>
                    <AnnualHourlyAverageSpeeds det_num={id} />
                </Col>
            </Row>
            <Row>
                <Col xs={5}></Col>
                <Col xs={7}>
                    <AnnualHourlyAverageThroughput det_num={id} />
                </Col>
            </Row>
            <Row>
                <Col xs={5}>
                    <DetectorDefinition />
                </Col>
                <Col xs={7}>
                    <AnnualHourlyAverageOccupancyPercent det_num={id} />
                </Col>
            </Row>
            <Row>
                <Col xs={5}></Col>
                <Col xs={7}>
                    <AnnualAverageByLane det_num={id} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <DistributionOfDataPassingQCByDate det_num={id} />
                </Col>
                <Col>
                    <DistributionOfDataPassingQCByWeekday det_num={id} />
                </Col>
            </Row>
        </Container>
    );
}
