import React from 'react';
import YearSelector from './YearSelector';
import ValidityStats from './ValidityStats';
import RouteSelector from './RouteSelector';
import DownloadShapefileButton from './DownloadShapefileButton';

export default function DetectorMapControls() {
  return (
    <div>
      <YearSelector />
      <RouteSelector />
      <ValidityStats />
      <br />
      <DownloadShapefileButton />
    </div>
  );
}
