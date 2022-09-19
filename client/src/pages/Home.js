import React from "react";

import DetectorMap from "./../components/Map/DetectorMap";
import DetectorMapControls from "./../components/Map/DetectorMapControls/DetectorMapControls";

export default function Home() {
    return (
        <div className="grid grid-cols-2 gap-y-4">
            <DetectorMap />

            <DetectorMapControls />
        </div>
    );
}
