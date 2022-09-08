import React from "react";

import DetectorMap from "./../components/Map/DetectorMap";
import DetectorMapControls from "./../components/Map/DetectorMapControls/DetectorMapControls";

export default function Home() {
    return (
        <div className="flex mx-8 items-center h-4/5">
            <div className="h-full w-2/3">
                <DetectorMap />
            </div>
            <div className="h-full w-1/3 ml-5">
                <DetectorMapControls />
            </div>
        </div>
    );
}
