import React from 'react';

import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import MiscDetectorData from './../components/Detector/MiscDetectorData';
import ErrorTable from './../components/Detector/ErrorTable';

import AnnualHourlyAverageSpeeds from './../components/Detector/Charts/AnnualHourlyAverageSpeeds';
import AnnualHourlyAverageThroughput from './../components/Detector/Charts/AnnualHourlyAverageThroughput';
import AnnualHourlyAverageOccupancyPercent from './../components/Detector/Charts/AnnualHourlyAverageOccupancyPercent';
import AnnualAverageByLane from './../components/Detector/Charts/AnnualAverageByLane';
import DistributionOfDataPassingQCByDate from './../components/Detector/Charts/DistributionOfDataPassingQCByDate';
import DistributionOfDataPassingQCByWeekday from './../components/Detector/Charts/DistributionOfDataPassingQCByWeekday';

export default function Detector() {
  const id = 50;
  return (
    <div>
      <div className="black-banner">
        <span>Detector Number: {id}</span>
      </div>
      <br />
      <Container className="h-96">
        <br />
        <div style={{ display: 'flex', width: '50%', margin: 'auto' }}>
          <MiscDetectorData det_num={id} />
          <ErrorTable det_num={id} />
        </div>
        <hr />
        <div style={{ display: 'flex' }}>
          <AnnualHourlyAverageSpeeds det_num={id} />
          <AnnualHourlyAverageThroughput det_num={id} />
        </div>
        <div style={{ display: 'flex' }}>
          <AnnualHourlyAverageOccupancyPercent det_num={id} />
          <AnnualAverageByLane det_num={id} />
        </div>
        <div style={{ display: 'flex' }}>
          <DistributionOfDataPassingQCByDate det_num={id} />
          <DistributionOfDataPassingQCByWeekday det_num={id} />
        </div>
        <br />
        <br />
      </Container>
    </div>
  );
}
