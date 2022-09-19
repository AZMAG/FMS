import React from "react";

import DetectorMap from "./../components/Map/DetectorMap";
import DetectorMapControls from "./../components/Map/DetectorMapControls/DetectorMapControls";

export default function Home() {
    return (
        <div className="container flex flex-row mx-auto grid-cols-2 relative top-20 justify-items-center">
            <DetectorMap className="w-2/3" />
            <DetectorMapControls className="w-1/3" />
        </div>
    );
}
